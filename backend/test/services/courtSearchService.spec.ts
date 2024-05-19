import { expect, assert } from 'chai';
import sinon from 'sinon';
import CourtSearch from '../../src/models/court_search';
import CandidateCourtSearch from '../../src/models/candidate_court_search';
import { courtSearchService } from '../../src/services/courtSearchService';
import { GlobalError } from '../../src/utils/exceptionHandling/GlobalError';

describe('courtSearchService', () => {

    afterEach(() => {
        sinon.restore(); // Restore all stubs after each test
    });
    
    describe('createCourtSearch', () => {
        it('should create a court search and associate it with a candidate', async () => {
            const courtSearchData = { searchDetails: 'details' };
            const candidateId = 'candidateId';
            const createdCourtSearch = { dataValues: { id: 'courtSearchId' } };

            CourtSearch.create = sinon.stub().returns(createdCourtSearch);
            const candidateCourtSearchCreateStub = sinon.stub(CandidateCourtSearch, 'create').resolves();

            const result = await courtSearchService.createCourtSearch(courtSearchData, candidateId);

            expect(result).to.equal(createdCourtSearch);
            expect(candidateCourtSearchCreateStub.calledOnceWith({
                candidate_id: candidateId,
                court_search_id: 'courtSearchId'
            })).to.be.true;
        });

        it('should throw a GlobalError when court search creation fails', async () => {
            const courtSearchData = { searchDetails: 'details' };
            const candidateId = 'candidateId';

            CourtSearch.create = sinon.stub().throws(new Error('Database error'));

            try {
                await courtSearchService.createCourtSearch(courtSearchData, candidateId);
                assert.fail('Expected error was not thrown');
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.message).to.equal('Failed to create court search: Error: Database error');
            }
        });
    });

    describe('getAllCourtSearches', () => {
        it('should return all court searches', async () => {
            const courtSearches = [{ id: 1 }, { id: 2 }];
            CourtSearch.findAll = sinon.stub().resolves(courtSearches);

            const result = await courtSearchService.getAllCourtSearches();

            expect(result).to.equal(courtSearches);
        });

        it('should throw a GlobalError when fetching court searches fails', async () => {
            CourtSearch.findAll = sinon.stub().throws(new Error('Database error'));

            try {
                await courtSearchService.getAllCourtSearches();
                assert.fail('Expected error was not thrown');
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.message).to.equal('Failed to get court searches: Error: Database error');
            }
        });
    });

    describe('getAllCourtSearchesByCandidateId', () => {
        it('should return all court searches for a given candidate', async () => {
            const candidateId = 'candidateId';
            const candidateCourtSearches = [{ id: 1 }, { id: 2 }];
            CourtSearch.findAll = sinon.stub().resolves(candidateCourtSearches);

            const result = await courtSearchService.getAllCourtSearchesByCandidateId(candidateId);

            expect(result).to.equal(candidateCourtSearches);

        });

        it('should throw a GlobalError when no court searches are found for a candidate', async () => {
            const candidateId = 'candidateId';
            CourtSearch.findAll = sinon.stub().resolves(null);

            try {
                await courtSearchService.getAllCourtSearchesByCandidateId(candidateId);
                assert.fail('Expected error was not thrown');
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.statusCode).to.equal(404);
                expect(error.message).to.equal('Court searches not found for candidate: ' + candidateId);
            }
        });

        it('should throw a GlobalError when fetching court searches fails', async () => {
            const candidateId = 'candidateId';
            CourtSearch.findAll = sinon.stub().throws(new Error('Database error'));

            try {
                await courtSearchService.getAllCourtSearchesByCandidateId(candidateId);
                assert.fail('Expected error was not thrown');
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.message).to.equal('Failed to fetch court searches: Error: Database error');
            }
        });
    });
});
