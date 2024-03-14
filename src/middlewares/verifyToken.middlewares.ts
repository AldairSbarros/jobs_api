import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";


export class verifyToken{
    static execute(req: Request, res: Response, next: NextFunction){
        
            const token = req.headers.authorization;
            
            if(!token){
                throw new AppError(401, "Token is required" );
            }
            
                
            const secret = process.env.JWT_SECRET as string;

                jwt.verify(token, secret);
    
                const payload = jwt.decode(token);
    
                res.locals.decode = jwt.decode(token);
                
                next();
            }
          
            
        
}