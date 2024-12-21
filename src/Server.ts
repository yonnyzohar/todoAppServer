import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import mongoose from "mongoose";
import { TodoRoutes } from "./routes/todoRoutes";

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureDatabase();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  private configureDatabase(): void {
    let mongoURI = "mongodb://localhost:27017/todoAppDB";

    if(true)
    {
      mongoURI = "mongodb://127.0.0.1:27017/todoAppDB";
    }
    mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });
  }

  private configureRoutes(): void {
    const todoRoutes = new TodoRoutes();
    this.app.use("/todos", todoRoutes.router);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
}

export default Server;
