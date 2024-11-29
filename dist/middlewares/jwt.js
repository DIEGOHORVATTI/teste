"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "jwt", {
    enumerable: true,
    get: function() {
        return jwt;
    }
});
const _elysia = require("elysia");
const _User = require("../models/User");
const _jwtsettings = require("../shared/jwt-settings");
const bearerTokenGuard = {
    headers: _elysia.t.Object({
        authorization: _elysia.t.String({
            pattern: '^Bearer \\S+$'
        })
    })
};
const jwt = new _elysia.Elysia().use(_jwtsettings.jwtSettings).guard(bearerTokenGuard).derive(async ({ headers: { authorization }, jwt })=>{
    const token = authorization.slice('Bearer '.length);
    const decoded = await jwt.verify(token);
    if (!decoded) {
        throw (0, _elysia.error)('Unauthorized', 'Invalid token payload');
    }
    const user = await _User.User.findById(decoded.id).select('-password');
    if (!user) {
        throw (0, _elysia.error)('Unauthorized', 'User not found');
    }
    return {
        user
    };
});

//# sourceMappingURL=jwt.js.map