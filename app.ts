import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
    res.send("Hello from the server side!!")
})
app.post("/",(req:Request,res:Response)=>{
    res.json({"req":req.body})
})

export default app;