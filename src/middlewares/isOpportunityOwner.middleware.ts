import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsOpportunityOwner{
    static async execute( req: Request, res: Response, next: NextFunction){
            const userId = res.locals.id;

            const opportunityId = req.params.id;

            const opportunity = await prisma.opportunity.findFirst({ where: { id: Number(opportunityId) },
        });

        if(opportunity?.userId !== userId){
            throw new AppError(403, "User is not the owner of this opportunity.");
        }

        next();
    }
}