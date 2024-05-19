import { expect, assert } from 'chai';
import sinon from 'sinon';
import Candidate from '../../src/models/candidate';
import { candidateService } from '../../src/services/candidateService';
import { GlobalError } from '../../src/utils/exceptionHandling/GlobalError';

describe('candidateService', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('fetchAllCandidates', () => {
        it('should fetch all candidates with pagination', async () => {
            const candidates = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
            const countStub = sinon.stub(Candidate, 'count').resolves(10);
            Candidate.findAll = sinon.stub().resolves(candidates);

            const result = await candidateService.fetchAllCandidates(1, 2);

            expect(result.candidates).to.equal(candidates);
            expect(result.totalCount).to.equal(10);
            expect(result.totalPages).to.equal(5);
            expect(countStub.calledOnce).to.be.true;
        });

        it('should throw a GlobalError on failure', async () => {
            Candidate.findAll = sinon.stub().throws(new Error('Database error'));

            try {
                await candidateService.fetchAllCandidates(1, 2);
                assert.fail('Expected error was not thrown');
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.message).to.equal('Error occurred: Error: Database error');
            }
        });
    });

    describe('createCandidate', () => {
        it('should create a new candidate', async () => {
            const candidateData = { name: 'John Doe' };
            const createdCandidate = { id: 1, ...candidateData };
            Candidate.create = sinon.stub().resolves(createdCandidate);

            const result = await candidateService.createCandidate(candidateData);

            expect(result).to.equal(createdCandidate);
        });

        it('should throw a GlobalError on failure', async () => {
            Candidate.create = sinon.stub().throws(new Error('Database error'));

            try {
                await candidateService.createCandidate({ name: 'John Doe' });
                assert.fail('Expected error was not thrown');
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.message).to.equal('Error ocurred:Error: Database error');
            }
        });
    });

    describe('fetchCandidateById', () => {
        it('should fetch a candidate by ID', async () => {
            const candidate = { id: 1, name: 'John Doe' };
            Candidate.findByPk = sinon.stub().resolves(candidate);

            const result = await candidateService.fetchCandidateById('1');

            expect(result).to.equal(candidate);
        });

        it('should throw a 404 GlobalError if candidate not found', async () => {
            Candidate.findByPk = sinon.stub().resolves(null);

            try {
                await candidateService.fetchCandidateById('1');
                assert.fail('Expected error was not thrown');
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.statusCode).to.equal(404);
                expect(error.message).to.equal('Candidate not found');
            }
        });

        it('should throw a 500 GlobalError on failure', async () => {
            Candidate.findByPk = sinon.stub().throws(new Error('Database error'));

            try {
                await candidateService.fetchCandidateById('1');
                assert.fail('Expected error was not thrown');
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.message).to.equal('Error: Database error');
            }
        });
    });

    describe('updateCandidate', () => {
        it('should update a candidate', async () => {
            const candidateId = '1';
            const candidate = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                update: sinon.stub().resolves({ id: 1, name: 'Jane Doe', email: 'john@example.com' })
            };

            Candidate.findByPk = sinon.stub().resolves(candidate);
            const updatedData = { name: 'Jane Doe' };
            
            const result = await candidateService.updateCandidate(candidateId, updatedData);

            expect(candidate.update.calledOnceWith(updatedData)).to.be.true;
            expect(result).to.deep.equal({ id: 1, name: 'Jane Doe', email: 'john@example.com' });
        });

        it('should throw a 404 GlobalError if candidate not found', async () => {
            Candidate.findByPk = sinon.stub().resolves(null);

            try {
                await candidateService.updateCandidate('1', { name: 'Jane Doe' });
                assert.fail('Expected error was not thrown');
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.statusCode).to.equal(404);
                expect(error.message).to.equal('Candidate not found');
            }
        });

        it('should throw a 500 GlobalError on failure', async () => {
            Candidate.findByPk = sinon.stub().throws(new Error('Database error'));

            try {
                await candidateService.updateCandidate('1', { name: 'Jane Doe' });
                assert.fail('Expected error was not thrown');
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.message).to.equal('Error: Database error');
            }
        });
    });

    describe('generateCSVReport', () => {


    afterEach(() => {
        sinon.restore();
    });

        it('should throw an error if CSV generation fails', async () => {
            Candidate.findAll = sinon.stub().throws(new Error('Database error'));

            try {
                await candidateService.generateCSVReport('2023-01-01', '2023-12-31');
                assert.fail('Expected error was not thrown');
            } catch (error: any) {
                expect(error.message).to.equal('Internal Server Error');
            }
        });
    });
});
