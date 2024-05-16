import { Router } from "express";
import { courtSearchController } from "../controllers/courtSearchController";
import { validateCourtSearchRequestBody } from "../utils/validation/courtSearch";
import { handleValidationErrors } from "../utils/validation/handleValidation";

const courtSearchRoutes = Router()

/**
 * @openapi
 * /court-searches:
 *   get:
 *     summary: Retrieve all court searches
 *     tags:
 *       - Court Searches
 *     responses:
 *       '200':
 *         description: A list of court searches
 *       '500':
 *         description: Internal server error
 */
courtSearchRoutes.get('/', courtSearchController.getAll)

/**
 * @openapi
 * /court-searches/{candidateId}/:
 *   post:
 *     summary: Create a new court search for a candidate
 *     tags:
 *       - Court Searches
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the candidate for whom the court search is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourtSearch'
 *     responses:
 *       '201':
 *         description: Court search created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
courtSearchRoutes.post('/:candidateId/', validateCourtSearchRequestBody, handleValidationErrors, courtSearchController.create)

/**
 * @openapi
 * /court-searches/{candidateId}/:
 *   get:
 *     summary: Retrieve all court searches for a candidate
 *     tags:
 *       - Court Searches
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the candidate to retrieve court searches for
 *     responses:
 *       '200':
 *         description: Court searches found
 *       '404':
 *         description: Court searches not found
 *       '500':
 *         description: Internal server error
 */
courtSearchRoutes.get('/:candidateId/', courtSearchController.getAllCourtSearchesForCandidate)

export default courtSearchRoutes
