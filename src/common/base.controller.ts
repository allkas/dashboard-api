import { LoggerService } from "../logger/logger.service";
import { Router, Response } from "express";
import { IControllerRoute } from "./routes.interface";

export abstract class BaseController {
    private readonly _router: Router;

    constructor(private logger: LoggerService) {
        this._router = Router()
    }
    get router() {
        return this._router;
    }

    public send<T>(res: Response, code: number, message: T) {
        
        res.type('aplication/json')
        res.status(code).json(message)
    }

    public created(res: Response) {
        res.status(201);
    }

    protected bindRoutes(routes: IControllerRoute[]) {
        for (const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`);
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler);
        }
    }
}