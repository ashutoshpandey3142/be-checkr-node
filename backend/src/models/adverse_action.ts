import { DataTypes } from "sequelize";
import { database } from "../config/db";
import Candidate from "./candidate";


interface IAdverseAction {
  status: 'SCHEDULE';
  preNoticeDate: Date;
  postNoticeDate: Date;
  candidatesId: Buffer;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     AdverseAction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the adverse action
 *         status:
 *           type: string
 *           enum: ["SCHEDULE"]
 *           description: The status of the adverse action
 *         preNoticeDate:
 *           type: string
 *           format: date-time
 *           description: The date and time of the pre-notice for the adverse action
 *         postNoticeDate:
 *           type: string
 *           format: date-time
 *           description: The date and time of the post-notice for the adverse action
 *         candidatesId:
 *           type: string
 *           format: uuid
 *           description: The ID of the candidate associated with the adverse action
 *       required:
 *         - status
 *         - preNoticeDate
 *         - postNoticeDate
 *         - candidatesId
 */

const AdverseAction = database.define('adverse_action', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  status: {
    type: DataTypes.ENUM('SCHEDULE'),
    allowNull: false,
    validate: {
      isIn: [['SCHEDULE']]
    }
  },
  preNoticeDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  postNoticeDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'adverse_action',
  timestamps: false
});

AdverseAction.belongsTo(Candidate, { foreignKey: 'candidatesId', targetKey: 'id' });


export { AdverseAction, IAdverseAction };
