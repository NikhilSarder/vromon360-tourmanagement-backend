import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    console.log(envVars.NODE_ENV);
    await mongoose.connect(envVars.DB_URL);
    console.log("Connected to DB!!😉");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening to port ${envVars.PORT} `);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

process.on("SIGTERM",()=>{
  console.log("SIGTERM Rejection detected..... Server Shutting down..!");
  if(server){
    server.close(()=>{
      process.exit(0)
    })
  }
  process.exit(0)
})

process.on("SIGINT",()=>{
  console.log("SIGINT Rejection detected..... Server Shutting down..!");
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1)
})


process.on("unhandledRejection",(err)=>{
  console.log("unhandled Rejection detected..... Server Shutting down..!",err);
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1)
})


process.on("uncaughtException",(err)=>{
  console.log("Uncaught Exception detected..... Server Shutting down..!",err);
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1)
})

// UnHandle Rejection Error
// Promise.reject(new Error("I forgot to catch this promise"))

// UnCaught Exception Error
// throw new Error("I forgot to handle this exception local error")
