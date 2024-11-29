"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteUserService", {
    enumerable: true,
    get: function() {
        return deleteUserService;
    }
});
const _User = require("../../models/User");
const _elysia = require("elysia");
const deleteUserService = async (id)=>{
    const domainExists = await _User.User.findOne({
        _id: id
    });
    if (!domainExists) {
        throw (0, _elysia.error)('Not Found', 'User not found');
    }
    return _User.User.deleteOne({
        _id: id
    });
};

//# sourceMappingURL=removeUser.js.map