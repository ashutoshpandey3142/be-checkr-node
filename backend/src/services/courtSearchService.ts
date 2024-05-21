import Candidate from "../models/candidate";
import CandidateCourtSearch from "../models/candidate_court_search";
import CourtSearch from "../models/court_search";
import { GlobalError } from '../utils/exceptionHandling/GlobalError';

export const courtSearchService = {
    createCourtSearch: async (courtSearchData: any, candidateId: string) => {
        try {
            const courtSearch = await CourtSearch.create(courtSearchData);

            await CandidateCourtSearch.create({
                candidate_id: candidateId,
                court_search_id: courtSearch.dataValues.id
            });
            return courtSearch;
        } catch (error) {
            throw new GlobalError(500, `Failed to create court search: ${error}`);
        }
    },    
    getAllCourtSearches: async () => {
        try {
            const courtSearches = await CourtSearch.findAll();
            return courtSearches;
        } catch (error) {
            throw new GlobalError(500, `Failed to get court searches: ${error}`);
        }
    },
    getAllCourtSearchesByCandidateId: async (candidateId: string) =>   {
        try {
            const candidateCourtSearches = await CourtSearch.findAll({
                include: [{
                    where: { id: candidateId },
                    attributes: ['name', 'email'],
                    model: Candidate
                }]
            });
            if(!candidateCourtSearches) throw new GlobalError(404, "Court searches not found for candidate: "+candidateId)
    
            return candidateCourtSearches;
        } catch (error) {
            if(error instanceof GlobalError) throw new GlobalError(error.statusCode, error.message)
            throw new GlobalError(500, `Failed to fetch court searches: ${error}`);
        }
    }
}
