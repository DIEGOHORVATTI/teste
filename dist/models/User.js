"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    User: function() {
        return User;
    },
    UserSchema: function() {
        return UserSchema;
    }
});
const _elysia = require("elysia");
const _mongoose = require("mongoose");
const _config = require("../constants/config");
const _setdefaultsettingsschema = require("../shared/set-default-settings-schema");
const _connectiondb = require("../shared/connection-db");
const UserSchema = {
    body: _elysia.t.Object({
        email: _elysia.t.String({
            format: 'email'
        }),
        password: _elysia.t.String({
            minLength: 6,
            maxLength: 20,
            pattern: '^[a-zA-Z0-9]*$'
        })
    })
};
const SchemaModel = new _mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: _config.collectionsData.User.collection
});
(0, _setdefaultsettingsschema.setDefaultSettingsSchema)(SchemaModel);
SchemaModel.methods.comparePassword = function(password) {
    return this.password === password;
};
const User = _connectiondb.connectDB.model(_config.collectionsData.User.name, SchemaModel);

//# sourceMappingURL=User.js.map