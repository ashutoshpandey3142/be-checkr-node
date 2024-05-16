import { DataTypes } from 'sequelize';
import { database } from '../config/db';

/**
 * @openapi
 * components:
 *   schemas:
 *     CourtSearch:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the court search
 *         name:
 *           type: string
 *           maxLength: 45
 *           description: The name of the court search
 *         status:
 *           type: string
 *           enum: ["CLEAR", "CONSIDER"]
 *           description: The status of the court search
 *         verification_date:
 *           type: string
 *           format: date
 *           description: The date of verification for the court search
 *       required:
 *         - name
 *         - status
 *         - verification_date
 */

export interface ICourtSearch {
    id: string;
    name: string;
    status: 'CLEAR' | 'CONSIDER';
    verification_date: Date;
}

const CourtSearch = database.define('CourtSearch', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('CLEAR', 'CONSIDER'),
        allowNull: false,
    },
    verification_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    tableName: 'court_search',
    timestamps: false,
});

export default CourtSearch;
