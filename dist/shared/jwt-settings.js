"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "jwtSettings", {
    enumerable: true,
    get: function() {
        return jwtSettings;
    }
});
const _elysia = require("elysia");
const _jwt = require("@elysiajs/jwt");
const _config = require("../constants/config");
const schema = _elysia.t.Object({
    id: _elysia.t.String(),
    email: _elysia.t.Optional(_elysia.t.String({
        format: 'email'
    }))
});
const jwtSettings = (0, _jwt.jwt)({
    name: 'jwt',
    exp: '7d',
    secret: _config.JWT_SECRET,
    schema
});

//# sourceMappingURL=jwt-settings.js.map