import { DataTypes } from 'sequelize';
import { database } from '../config/db';
import Candidate from './candidate';
import CourtSearch from './court_search';

const CandidateCourtSearch = database.define('candidate_court_search', {
    candidate_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    court_search_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
}, {
    tableName: 'candidate_court_search',
    timestamps: false,
});

export default CandidateCourtSearch;

Candidate.belongsToMany(CourtSearch, {
    through: CandidateCourtSearch,
    foreignKey: 'candidate_id',
    otherKey: 'court_search_id',
});
CourtSearch.belongsToMany(Candidate, {
    through: CandidateCourtSearch,
    foreignKey: 'court_search_id',
    otherKey: 'candidate_id',
});
