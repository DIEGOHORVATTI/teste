"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authenticateUserService", {
    enumerable: true,
    get: function() {
        return authenticateUserService;
    }
});
const _User = require("../../models/User");
const _elysia = require("elysia");
const authenticateUserService = async ({ email, password })=>{
    const user = await _User.User.findOne({
        email
    });
    if (!user) {
        (0, _elysia.error)(401, 'Email not registered');
    }
    const passwordMatch = user?.comparePassword?.(password);
    if (!passwordMatch) {
        (0, _elysia.error)(401, 'Invalid credentials');
    }
    return user;
};

//# sourceMappingURL=authenticate-service.js.map