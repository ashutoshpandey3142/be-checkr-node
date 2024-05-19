import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/helper";
import { GlobalError } from "../utils/exceptionHandling/GlobalError";
import { candidateService } from "../services/candidateService";
import { ICandidate } from "../models/candidate";
import fs from 'fs'

export const candidateController = {
    fetchAllCandidates: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const page = req.query.page ? parseInt(req.query.page as string) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit as string) : null;
            const { candidates, totalCount, totalPages } = await candidateService.fetchAllCandidates(page, limit);
            sendResponse(res, 200, {
                status: 'success',
                data: candidates,
                totalCount,
                totalPages
            });
        }catch(err){
            next(err)
        }
    },
    createCandidate: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                name,
                adjudication,
                status,
                location,
                application_date,
                email,
                phone,
                zipcode,
                social_security,
                drivers_license,
                created_at,
                dob,
                completed_at
            } = req.body;
            const newCandidate: ICandidate = {
                name,
                adjudication,
                status,
                location,
                application_date,
                email,
                phone,
                zipcode,
                social_security,
                drivers_license,
                created_at,
                dob,
                completed_at
            };

            const createdCandidate = await candidateService.createCandidate(newCandidate);

            sendResponse(res, 201, { message: 'Candidate created successfully', candidate: createdCandidate });
        } catch (err) {
            next(err);
        }
    },
    fetchCandidateById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { candidateId } = req.params;
            const candidate = await candidateService.fetchCandidateById(candidateId);
            if (!candidate) {
                throw new GlobalError(404, 'Candidate not found');
            }
            sendResponse(res, 200, { message: 'Candidate fetched successfully', candidate });
        } catch (err) {
            next(err);
        }
    },
    updateCandidate: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { candidateId } = req.params;
            const { adjudication, status } = req.body;
            const updatedCandidate = await candidateService.updateCandidate(candidateId, { adjudication, status });
            sendResponse(res, 200, { message: 'Candidate updated successfully', candidate: updatedCandidate });
        } catch (err) {
            next(err);
        }
    },
    getExportReport: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const startDate = req.query.startDate as string;
            const endDate = req.query.endDate as string;
            const fileName = await candidateService.generateCSVReport(startDate, endDate);

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

            const fileStream = fs.createReadStream(fileName);
            fileStream.pipe(res);
        } catch (error) {
            next(error);
        }
    }
}
