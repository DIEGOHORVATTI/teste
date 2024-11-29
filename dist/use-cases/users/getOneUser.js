"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getOneUserService", {
    enumerable: true,
    get: function() {
        return getOneUserService;
    }
});
const _User = require("../../models/User");
const _elysia = require("elysia");
const getOneUserService = async (useId)=>{
    const user = await _User.User.findById(useId).select('-password');
    if (!user) {
        (0, _elysia.error)(404, 'User not found');
    }
    return user;
};

//# sourceMappingURL=getOneUser.js.map