import { Router } from "express";
import { adverseActionController } from "../controllers/adverse_action";
import { validateAdverseActionRequestBody } from "../utils/validation/adverseAction";
import { handleValidationErrors } from "../utils/validation/handleValidation";
import { pageAndLimitValidationRules } from "../utils/validation/candidate";

const adverseActionRoutes = Router()

/**
 * @openapi
 * /adverse-action:
 *   get:
 *     summary: Retrieve all adverse actions
 *     tags:
 *       - Adverse Action
 *     responses:
 *       '200':
 *         description: A list of adverse actions
 *       '500':
 *         description: Internal server error
 */
adverseActionRoutes.get('', pageAndLimitValidationRules, handleValidationErrors, adverseActionController.getAll)

/**
 * @openapi
 * /adverse-action:
 *   post:
 *     summary: Create a new adverse action
 *     tags:
 *       - Adverse Action
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdverseAction'
 *     responses:
 *       '201':
 *         description: Adverse action created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
adverseActionRoutes.post('/', validateAdverseActionRequestBody, handleValidationErrors, adverseActionController.create)

/**
 * @openapi
 * /adverse-action/{candidatesId}:
 *   get:
 *     summary: Retrieve all adverse actions for a specific candidate
 *     tags:
 *       - Adverse Action
 *     parameters:
 *       - in: path
 *         name: candidatesId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the candidate to retrieve adverse actions for
 *     responses:
 *       '200':
 *         description: Adverse actions found
 *       '404':
 *         description: Adverse actions not found
 *       '500':
 *         description: Internal server error
 */
adverseActionRoutes.get('/:candidatesId', adverseActionController.getCandidate)

export default adverseActionRoutes
