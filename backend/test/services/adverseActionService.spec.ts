import { expect } from 'chai';
import sinon from 'sinon';
import { AdverseAction } from '../../src/models/adverse_action';
import { adverseActionService } from '../../src/services/adverseActionService';
import { GlobalError } from '../../src/utils/exceptionHandling/GlobalError';

describe('adverseActionService', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('createAdverseAction', () => {
        it('should create an adverse action', async () => {
            const adverseActionData = {
                status: 'SCHEDULE',
                preNoticeDate: new Date(),
                postNoticeDate: new Date(),
                candidatesId: Buffer.from('1')
            };
            const createdAdverseAction = {
                id: '1',
                ...adverseActionData
            };
            AdverseAction.create = sinon.stub().resolves(createdAdverseAction);

            const result = await adverseActionService.createAdverseAction(adverseActionData);

            expect(result).to.equal(createdAdverseAction);
        });

        it('should throw an error when creation fails', async () => {
            const adverseActionData = {
                status: 'SCHEDULE',
                preNoticeDate: new Date(),
                postNoticeDate: new Date(),
                candidatesId: Buffer.from('1')
            };
            const errorMessage = 'Database error';
            AdverseAction.create = sinon.stub().rejects(errorMessage);

            try {
                await adverseActionService.createAdverseAction(adverseActionData);
                throw new Error('Expected an error to be thrown');
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.statusCode).to.equal(500);
                expect(error.message).to.equal(errorMessage);
            }
        });
    });

    describe('getAllAdverseActions', () => {
        it('should fetch all adverse actions with pagination', async () => {
            const adverseActions = [{
                status: 'SCHEDULE',
                preNoticeDate: new Date(),
                postNoticeDate: new Date(),
                candidatesId: Buffer.from('1')
            }];
            AdverseAction.findAll = sinon.stub().resolves(adverseActions);
            AdverseAction.count = sinon.stub().resolves(adverseActions.length);

            const result = await adverseActionService.getAllAdverseActions(1, 10);

            expect(result.adverseActions).to.deep.equal(adverseActions);
            expect(result.totalPages).to.equal(1);
            expect(result.totalCount).to.equal(adverseActions.length);
        });

        it('should fetch all adverse actions without pagination', async () => {
            const adverseActions = [{
                status: 'SCHEDULE',
                preNoticeDate: new Date(),
                postNoticeDate: new Date(),
                candidatesId: Buffer.from('1')
            }];
            AdverseAction.findAll = sinon.stub().resolves(adverseActions);
            AdverseAction.count = sinon.stub().resolves(adverseActions.length);

            const result = await adverseActionService.getAllAdverseActions(1, null);

            expect(result.adverseActions).to.deep.equal(adverseActions);
            expect(result.totalPages).to.equal(1);
            expect(result.totalCount).to.equal(adverseActions.length);
        });


        it('should throw an error when fetching fails', async () => {
            const errorMessage = 'Database error';
            AdverseAction.findAll = sinon.stub().rejects(errorMessage);
            AdverseAction.count = sinon.stub().resolves(0);

            try {
                await adverseActionService.getAllAdverseActions(1, 10);
                throw new Error('Expected an error to be thrown');
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.statusCode).to.equal(500);
                expect(error.message).to.equal(errorMessage);
            }
        });
    });

    describe('getAdverseActionForCandidate', () => {
        it('should fetch adverse actions for a candidate', async () => {
            const candidateId = '1';
            const adverseActions = [{
                status: 'SCHEDULE',
                preNoticeDate: new Date(),
                postNoticeDate: new Date(),
                candidatesId: Buffer.from('1')
            }];
            AdverseAction.findAll = sinon.stub().resolves(adverseActions);

            const result = await adverseActionService.getAdverseActionForCandidate(candidateId);

            expect(result).to.deep.equal(adverseActions);
        });

        it('should throw an error when fetching fails', async () => {
            const candidateId = '1';
            const errorMessage = 'Database error';
            AdverseAction.findAll = sinon.stub().rejects(errorMessage);

            try {
                await adverseActionService.getAdverseActionForCandidate(candidateId);
                throw new Error('Expected an error to be thrown');
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.statusCode).to.equal(500);
                expect(error.message).to.equal(errorMessage);
            }
        });
    });
});
