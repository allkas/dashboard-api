import express, { Express } from "express";
import { Server } from 'http';
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/user.controller";

export class App {

    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    UserController: UserController;


    constructor(
        logger: LoggerService,
        userController: UserController
        ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.UserController = userController;
    }
    
    useRoutes() {
        this.app.use('/users', this.UserController.router);
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }
}