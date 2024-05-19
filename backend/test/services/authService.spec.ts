import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../src/models/user';
import { authService } from '../../src/services/authService';
import { GlobalError } from '../../src/utils/exceptionHandling/GlobalError';

describe('authService', () => {
    
    describe('login', () => {
        beforeEach(() => {
            sinon.restore();
        });
        it('should return a token on successful login', async () => {
            const email = 'test@example.com';
            const password = 'password123';
            const user = {
                dataValues: {
                    id: '1',
                    email,
                    password: await bcrypt.hash(password, 10)
                }
            };
            const token = 'mocked-token';
            
            User.findOne = sinon.stub().resolves(user);
            bcrypt.compare = sinon.stub().resolves(true);
            jwt.sign = sinon.stub().returns(token);

            const result = await authService.login(email, password);

            expect(result).to.equal(token);
        });

        it('should return false for incorrect email', async () => {
            const email = 'test@example.com';
            const password = 'password123';
            
            User.findOne = sinon.stub().returns(null); // Update this line

            const result = await authService.login(email, password);

            expect(result).to.be.false;
        });

        it('should return false for incorrect password', async () => {
            const email = 'test@example.com';
            const password = 'password123';
            const user = {
                id: '1',
                email,
                password: await bcrypt.hash('wrongpassword', 10)
            };
            
            User.findOne = sinon.stub().resolves(user);
            bcrypt.compare = sinon.stub().resolves(false);

            const result = await authService.login(email, password);

            expect(result).to.be.false;
        });

        it('should throw an error if an exception occurs', async () => {
            const email = 'test@example.com';
            const password = 'password123';
            const errorMessage = 'Some error message';

            User.findOne = sinon.stub().throws(new Error(errorMessage));

            try {
                await authService.login(email, password);
                // Fail the test if no error is thrown
                expect.fail('Expected an error to be thrown');
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.statusCode).to.equal(500);
                expect(error.message).to.equal(`Error while logging in: Error: ${errorMessage}`);
            }
        });
    });
});
