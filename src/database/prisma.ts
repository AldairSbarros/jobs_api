import { PrismaClient } from "@prisma/client";
import { IUser } from "../interfaces/user.interfaces";

let id = 0;

export const generateId = () => {
    id++
    return id;
}

export const userDatabase: IUser[] = [];

export const prisma = new PrismaClient();