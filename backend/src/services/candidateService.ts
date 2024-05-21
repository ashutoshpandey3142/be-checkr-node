import Candidate from "../models/candidate"
import { GlobalError } from "../utils/exceptionHandling/GlobalError"

export const candidateService = {
    fetchAllCandidates: async (page: number, limit: number | null) => {
        try {
            let options = {};
            if (limit) {
                options = {
                    offset: (page - 1) * limit,
                    limit: limit
                };
            }
            const candidates = await Candidate.findAll(options);
            const totalCount = await Candidate.count();
            const totalPages = limit ? Math.ceil(totalCount / limit) : 1;
            return { candidates, totalCount, totalPages };
        } catch (err) {
            throw new GlobalError(500, 'Error occurred: ' + err);
        }
    },    
    createCandidate: async (candidate: any) => {
        try{
            const newCandidate = await Candidate.create(candidate)
            return newCandidate
        }catch(err) {
            throw new GlobalError(500, 'Error ocurred:'+ err)
        }
    },
    fetchCandidateById: async(id: string) => {
        try{
            const candidate = await Candidate.findByPk(id)
            if (!candidate) {
                throw new GlobalError(404, 'Candidate not found');
            }
            return candidate
        }catch(error) {
            if(error instanceof GlobalError) throw new GlobalError(error.statusCode, error.message)
            throw new GlobalError(500, error as string);
        }
    },
    updateCandidate: async (candidateId: string, data: any) => {
        try {
            const candidate = await Candidate.findByPk(candidateId);
            if (!candidate) {
                throw new GlobalError(404, 'Candidate not found');
            }
    
            const updatedCandidate = await candidate.update(data);
    
            return updatedCandidate;
        } catch (error) {
            if(error instanceof GlobalError) throw new GlobalError(error.statusCode, error.message)
            throw new GlobalError(500, error as string);
        }
    },
}