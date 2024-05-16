
import { NextFunction, Request, Response } from 'express';
import { adverseActionService } from '../services/adverseActionService';
export const adverseActionController = {
    create: async(req: Request, res: Response, next: NextFunction) =>  {
        try {
            const {status, preNoticeDate, postNoticeDate, candidatesId } = req.body
            const newAdverseAction = {
                status,
                preNoticeDate,
                postNoticeDate,
                candidatesId
            }
            const adverseAction = await adverseActionService.createAdverseAction(newAdverseAction);
            res.status(201).json(adverseAction);
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit as string) : null;
            const { adverseActions, totalPages, totalCount } = await adverseActionService.getAllAdverseActions(page, limit);
        res.status(200).json({ adverseActions, totalPages, totalCount });
        } catch (error) {
            next(error);
        }
    },
    getCandidate: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const {candidatesId} = req.params
            const candidates = await adverseActionService.getAdverseActionForCandidate(candidatesId);
            res.status(200).json(candidates);
        } catch (error) {
            next(error)
        }
    },

}
