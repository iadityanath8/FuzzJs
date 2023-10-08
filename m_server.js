import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
const port = process.env.PORT || 6969;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "frontend"
, "static")))

app.get("/*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "frontend", "index.html"))
})


app.listen(port, function(){
   console.log('Listening on port ' + port)
})