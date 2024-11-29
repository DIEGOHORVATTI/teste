"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authRouter", {
    enumerable: true,
    get: function() {
        return authRouter;
    }
});
const _elysia = require("elysia");
const _User = require("../../models/User");
const _jwtsettings = require("../../shared/jwt-settings");
const _authenticateservice = require("./authenticate-service");
const authRouter = new _elysia.Elysia({
    prefix: '/auth'
}).use(_jwtsettings.jwtSettings).post('/login', async ({ body, jwt })=>{
    const user = await (0, _authenticateservice.authenticateUserService)(body);
    const token = await jwt.sign({
        id: user?.id
    });
    return {
        token
    };
}, _User.UserSchema);

//# sourceMappingURL=router.js.map