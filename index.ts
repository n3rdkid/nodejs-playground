import app from "./app";

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`nodejs-playground up and running on port :: ${PORT}`)
})