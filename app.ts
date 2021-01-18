import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { spawn } from "child_process";
import fs from "fs"
import { v4 as uuidv4 } from 'uuid';
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from the server side!!")
})
app.post("/javascript", [body("code").notEmpty().withMessage("Code field is required")], async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ "error": errors.array()[0].msg })
    }
    const { code } = req.body;
    let result: any;
    let fileName = uuidv4() + ".js"
    try {
        fs.writeFileSync(fileName, code)
        // spawn a new child process 
        const javaScript = spawn("node", [fileName])
        javaScript.stdout.on('data', function (data) {
            result = { type: "success", data: data.toString() };
        });
        javaScript.stderr.on("data", function (data) {
            result = { type: "error", data: data.toString() };
        })
        javaScript.on('close', (code) => {
            fs.unlinkSync(fileName)
            res.json(result)
        });
    } catch (e) {
        fs.unlinkSync(fileName)
        console.log(`Exception occurred!!!`)
    }
})

export default app;