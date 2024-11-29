"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _elysia = require("elysia");
const _cors = require("@elysiajs/cors");
const _swagger = require("@elysiajs/swagger");
const _router = require("./use-cases/auth/router");
const _router1 = require("./use-cases/users/router");
const _config = require("./constants/config");
const app = new _elysia.Elysia().use((0, _cors.cors)()).use((0, _swagger.swagger)()).get('/', ()=>'API is running 🚀').use(_router.authRouter).use(_router1.userRouter).listen(_config.PORT);
console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);

//# sourceMappingURL=index.js.map