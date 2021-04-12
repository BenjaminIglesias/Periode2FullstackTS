import express from "express";
import dotenv from "dotenv";
dotenv.config()
import path from "path"
const app = express()
import friendsRoutes from "./routes/Friendsrouter"
const debug = require("debug")("app")

app.use((request,response,next)=> {
  console.log("Time: " + new Date().toLocaleDateString() + " Method " , request.method, "URL " + request.originalUrl, "IP-Address " + request.ip) ;
  next();
})

app.use(express.static(path.join(process.cwd(), "public")))



app.use("/api/friends", friendsRoutes )

import authMiddleware from "./middelware/basic-auth"
app.use("/demo", authMiddleware)

app.get("/demo", (req, res) => {
  res.send("Server is up!!");
})




export default app;
//const PORT = process.env.PORT || 3333;
//app.listen(PORT, () => console.log(`Server started, listening on PORT: ${PORT}`))
