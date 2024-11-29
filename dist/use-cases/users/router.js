"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userRouter", {
    enumerable: true,
    get: function() {
        return userRouter;
    }
});
const _elysia = require("elysia");
const _createUser = require("./createUser");
const _getOneUser = require("./getOneUser");
const _updateUser = require("./updateUser");
const _removeUser = require("./removeUser");
const _jwt = require("../../middlewares/jwt");
const _User = require("../../models/User");
const userRouter = new _elysia.Elysia({
    prefix: '/users'
}).post('/', async ({ body })=>{
    const user = await (0, _createUser.createUserService)(body);
    return {
        message: 'User created successfully',
        user
    };
}, _User.UserSchema).use(_jwt.jwt).get('/:id', async ({ params: { id } })=>{
    const user = await (0, _getOneUser.getOneUserService)(id);
    return {
        message: 'User found successfully',
        user
    };
}).put('/:id', async ({ params: { id }, body })=>{
    const user = await (0, _updateUser.updateUserService)(id, body);
    return {
        message: 'User updated successfully',
        user
    };
}, _User.UserSchema).delete('/:id', async ({ params: { id } })=>{
    await (0, _removeUser.deleteUserService)(id);
    return {
        message: 'User deleted successfully'
    };
});

//# sourceMappingURL=router.js.map