import { Response } from "express";

export const sendResponse = (res: Response, status: number, json: any) => {
    return res.status(status).json(json)
}