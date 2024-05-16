import { Router } from "express";
import { candidateController } from "../controllers/candidate";
import {pageAndLimitValidationRules, validateCandidateRequestBody, validateCandidateUpdateRequest} from "../utils/validation/candidate";
import { handleValidationErrors } from "../utils/validation/handleValidation";

const candidateRoutes = Router()

/**
 * @openapi
 * /candidates:
 *   get:
 *     summary: Retrieve all candidates
 *     tags:
 *       - Candidates
 *     responses:
 *       '200':
 *         description: A list of candidates
 *       '500':
 *         description: Internal server error
 */
candidateRoutes.get('', pageAndLimitValidationRules, handleValidationErrors, candidateController.fetchAllCandidates);

/**
 * @openapi
 * /candidates:
 *   post:
 *     summary: Create a new candidate
 *     tags:
 *       - Candidates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       '201':
 *         description: Candidate created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
candidateRoutes.post('/', validateCandidateRequestBody, handleValidationErrors, candidateController.createCandidate);

/**
 * @openapi
 * /candidates/{candidateId}:
 *   get:
 *     summary: Retrieve a candidate by ID
 *     tags:
 *       - Candidates
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the candidate to retrieve
 *     responses:
 *       '200':
 *         description: Candidate found
 *       '404':
 *         description: Candidate not found
 *       '500':
 *         description: Internal server error
 */
candidateRoutes.get('/:candidateId', candidateController.fetchCandidateById);

/**
 * @openapi
 * /candidates/{candidateId}:
 *   patch:
 *     summary: Update a candidate by ID
 *     tags:
 *       - Candidates
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the candidate to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       '200':
 *         description: Candidate updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Candidate not found
 *       '500':
 *         description: Internal server error
 */
candidateRoutes.patch('/:candidateId', validateCandidateUpdateRequest, handleValidationErrors, candidateController.updateCandidate);

export default candidateRoutes;