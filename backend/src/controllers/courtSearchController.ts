
import { NextFunction, Request, Response } from 'express';
import { courtSearchService } from '../services/courtSearchService';
export const courtSearchController = {
    create: async(req: Request, res: Response, next: NextFunction) =>  {
        try {
            const {candidateId} = req.params
            const { name, status, verification_date } = req.body;

            const newCourtSearch = await courtSearchService.createCourtSearch({
                name,
                status,
                verification_date
            }, candidateId);

            res.status(201).json(newCourtSearch);
        } catch (error) {
            next(error)
        }
    },

    getAll: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const courtSearches = await courtSearchService.getAllCourtSearches();
            res.status(200).json(courtSearches);
        } catch (error) {
            next(error)
        }
    },
    getAllCourtSearchesForCandidate : async (req: Request, res: Response) => {
        try {
            const { candidateId } = req.params;

    
            const courtSearches = await courtSearchService.getAllCourtSearchesByCandidateId(candidateId);
    
            res.status(200).json(courtSearches);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get court searches for candidate', error: error });
        }
    }

}
