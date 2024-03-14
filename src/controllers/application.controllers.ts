import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ApplicationServices } from './../services/application.services';

@injectable()
export class ApplicationControllers{
    constructor(@inject("ApplicationServices") private applicationServices: ApplicationServices) {}

    async create(req: Request, res: Response){
        

        const response = await this.applicationServices.create(Number(req.params.id), req.body);

        return res.status(200).json(response);

    }

   async findMany(req: Request, res: Response){
    

    const response = await this.applicationServices.findMany(Number(req.params.id));

    return res.status(200).json(response)
    }

   
}