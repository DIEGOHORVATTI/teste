"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateUserService", {
    enumerable: true,
    get: function() {
        return updateUserService;
    }
});
const _User = require("../../models/User");
const _elysia = require("elysia");
const updateUserService = async (id, { email, password })=>{
    const user = await _User.User.findById(id);
    if (!user) {
        throw (0, _elysia.error)('Not Found', 'User not found');
    }
    if (email) {
        const existingUser = await _User.User.findOne({
            email
        });
        const isDifferentUser = existingUser?.id !== id;
        if (isDifferentUser) {
            throw (0, _elysia.error)('Conflict', 'User of this email already exists');
        }
        user.email = email;
    }
    if (password) {
        user.password = password;
    }
    await user?.save().catch(()=>{
        throw (0, _elysia.error)('Internal Server Error', 'Failed to update user');
    });
    return user;
};

//# sourceMappingURL=updateUser.js.map