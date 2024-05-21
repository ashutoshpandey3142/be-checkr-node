import { expect } from 'chai';
import sinon, {SinonStub} from 'sinon';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AuthMiddleware } from '../../src/middleware/auth';
describe('AuthMiddleware', () => {
    let req: Partial<Request>;
    let res: {
        status: SinonStub;
        json: SinonStub;
    };
    let next: NextFunction;
    let verifyStub: sinon.SinonStub;

    beforeEach(() => {
        req = {
            headers: {}
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        next = sinon.stub() as unknown as NextFunction;
        verifyStub = sinon.stub(jwt, 'verify');
    });

    afterEach(() => {
        verifyStub.restore();
    });

    it('should pass authentication with a valid token', () => {
        req.headers!['authorization'] = 'Bearer valid_token';

        verifyStub.callsFake((token: string, secret: jwt.Secret, callback: jwt.VerifyCallback) => {
            callback(null, { userId: '123' }); // Mock successful verification
        });

        AuthMiddleware.authenticateToken(req as Request, res as unknown as Response, next);

        expect(res.status.called).to.be.false;
        expect(res.json.called).to.be.false;
    });

    it('should return 401 for missing token', () => {
        AuthMiddleware.authenticateToken(req as Request, res as unknown as Response, next);

        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledWith({ message: 'Unauthorized' })).to.be.true;
    });

    it('should return 403 for invalid token', () => {
        req.headers!['authorization'] = 'Bearer invalid_token';

        verifyStub.callsFake((token: string, secret: jwt.Secret, callback: jwt.VerifyCallback) => {
            callback(new TokenExpiredError('jwt expired', new Date()), undefined); // Mock expired token
        });

        AuthMiddleware.authenticateToken(req as Request, res as unknown as Response, next);

        expect(res.status.calledWith(403)).to.be.true;
        expect(res.json.calledWith({ message: 'Invalid token' })).to.be.true;
    });
});
