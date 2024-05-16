import { AdverseAction } from "../models/adverse_action";
import Candidate from "../models/candidate";
import { GlobalError } from "../utils/exceptionHandling/GlobalError";
export const adverseActionService = {
    createAdverseAction : async (adverseActionData: any) => {
        try {
            const adverseAction = await AdverseAction.create(adverseActionData);
            return adverseAction;
        } catch (error) {
            throw new GlobalError(500, error as string);
        }
    },
    
getAllAdverseActions: async (page: number, limit: number | null) => {
        try {
            let options = {};
            if (limit) {
                options = {
                    offset: (page - 1) * limit,
                    limit: limit
                };
            }
            const totalCount = await AdverseAction.count();
            const adverseActions = await AdverseAction.findAll({
                ...options,
                include: [{
                    model: Candidate,
                    attributes: ['name']
                }]
            });
            const totalPages = limit ? Math.ceil(totalCount / limit) : 1;;
            return { adverseActions, totalPages, totalCount };
        } catch (error) {
            throw new GlobalError(500, error as string);
        }
    },
    getAdverseActionForCandidate: async (candidatesId: string) =>   {
        try {
            const candidates = await AdverseAction.findAll({ 
                where: {candidatesId:  candidatesId},
                include: [{
                    model: Candidate,
                    attributes: ['name']
                }]
            });
            return candidates;
        } catch (error) {
            throw new GlobalError(500, error as string);
        }
    },
}

