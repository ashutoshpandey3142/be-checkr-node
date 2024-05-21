import { expect, assert } from 'chai';
import User from '../../src/models/user';
import sinon from 'sinon';
import { userService } from '../../src/services/userService';
import { GlobalError } from '../../src/utils/exceptionHandling/GlobalError';
import * as testConstant from '../../src/utils/testConstant'

const { userData, existingUser, updateUser } = testConstant;

describe('userService', () => {
    describe('createUser', () => {
        afterEach(() => {
            sinon.restore();
        });

        it('should create a new user', async () => {
            User.create = sinon.stub().returns(userData);
            User.findOne = sinon.stub().resolves(null);
            const newUser = await userService.createUser(userData);
            expect(newUser).to.deep.equal(userData);
        });

        it("should throw custom error saying user already exists", async () => {
            User.findOne = sinon.stub().returns(existingUser);
            User.create = sinon.stub().callsFake((user) => user);
            try {
                await userService.createUser(existingUser);
                assert.fail("Expected an error to be thrown.");
            } catch (error: any) {
                expect(error.statusCode).to.equal(409);
                expect(error.message).to.equal('Error while creating user: User with this email already exists');
            };
        });

        it("should throw a general error when an unexpected error occurs", async () => {
            User.findOne = sinon.stub().returns(null);
            User.create = sinon.stub().throws(new Error("Database error"));
            try {
                await userService.createUser(userData);
                assert.fail("Expected an error to be thrown.");
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.statusCode).to.equal(500);
                expect(error.message).to.equal("Error while creating user: Error: Database error");
            }
        });
    });

    describe('getUserByEmail', () => {
        it('should get user by email', async () => {
            const email = 'test@example.com';
            const user = { ...existingUser, email };
            User.findOne = sinon.stub().returns(user)
            const fetchedUser = await userService.getUserByEmail(email);
            expect(fetchedUser).to.deep.equal(user);
        });
    });

    describe('updateUserPassword', () => {
        afterEach(() => {
            sinon.restore();
        });

        it('should update user password', async () => {
            const userId = '123';
            const newPassword = 'newPassword123';
            existingUser.update = sinon.stub().resolves({ ...existingUser, password: newPassword });
            updateUser.update = sinon.stub().resolves({ ...existingUser, password: newPassword });
            const findByPkStub = sinon.stub(User, 'findByPk').returns(Promise.resolve(existingUser));
            await userService.updateUserPassword(userId, newPassword);
            expect(findByPkStub.calledOnceWith(userId)).to.be.true;
            expect(existingUser.update.calledOnceWith({ password: newPassword })).to.be.true;
            findByPkStub.restore();
        });

        it('should throw custom error saying user not found', async () => {
            const userId = 'nonexistent';
            const newPassword = 'newPassword123';
            const findByPkStub = sinon.stub(User, 'findByPk').returns(Promise.resolve(null));
            try {
                await userService.updateUserPassword(userId, newPassword);
                assert.fail("Expected an error to be thrown.");
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.statusCode).to.equal(404);
                expect(error.message).to.equal("User not found with id: " + userId);
            }
            findByPkStub.restore();
        });

        it('should throw a general error on failure', async () => {
            const userId = '123';
            const newPassword = 'newPassword123';
            const findByPkStub = sinon.stub(User, 'findByPk').throws(new Error('Database error'));
            try {
                await userService.updateUserPassword(userId, newPassword);
                assert.fail("Expected an error to be thrown.");
            } catch (error: any) {
                expect(error).to.be.instanceOf(GlobalError);
                expect(error.statusCode).to.equal(500);
                expect(error.message).to.equal("Error while updating user password: Error: Database error");
            }
            findByPkStub.restore();
        });
    });
});
