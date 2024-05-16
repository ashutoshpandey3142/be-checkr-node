import { DataTypes } from "sequelize";
import { database } from "../config/db";

export interface ICandidate {
    name: string;
    adjudication: '-' | 'ENGAGED' | 'ADVERSE ACTION';
    status: 'CLEAR' | 'CONSIDER';
    location: string;
    application_date: Date;
    email: string;
    phone: string;
    zipcode: string;
    social_security: string;
    drivers_license: string;
    created_at: Date;
    dob: Date;
    completed_at: Date;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     Candidate:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the candidate
 *         name:
 *           type: string
 *           description: The name of the candidate
 *         adjudication:
 *           type: string
 *           enum: ["-", "ENGAGED", "ADVERSE ACTION"]
 *           description: The adjudication status of the candidate
 *         status:
 *           type: string
 *           enum: ["CLEAR", "CONSIDER"]
 *           description: The status of the candidate
 *         location:
 *           type: string
 *           description: The location of the candidate
 *         application_date:
 *           type: string
 *           format: date
 *           description: The application date of the candidate
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the candidate
 *         phone:
 *           type: string
 *           description: The phone number of the candidate
 *         zipcode:
 *           type: string
 *           description: The zipcode of the candidate
 *         social_security:
 *           type: string
 *           description: The social security number of the candidate
 *         drivers_license:
 *           type: string
 *           description: The driver's license number of the candidate
 *         package:
 *           type: string
 *           description: The package of the candidate
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the candidate was created
 *         dob:
 *           type: string
 *           format: date
 *           description: The date of birth of the candidate
 *         completed_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the candidate was completed
 *       required:
 *         - name
 *         - adjudication
 *         - status
 *         - location
 *         - application_date
 *         - email
 *         - phone
 *         - zipcode
 *         - dob
 */

const Candidate = database.define('Candidate', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    
    name: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    adjudication: {
        type: DataTypes.ENUM('-', 'ENGAGED', 'ADVERSE ACTION'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('CLEAR', 'CONSIDER'),
        allowNull: false
    },
    location: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    application_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    zipcode: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    social_security: {
        type: DataTypes.STRING(15),
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },
    drivers_license: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    package: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    completed_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'candidate',
    timestamps: false
});

export default Candidate;
