"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDoc = exports.getKeys = exports.getDoc = exports.putDoc = exports.setDatabase = void 0;
const level_1 = require("level");
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
console.log(path_1.default.join(os_1.default.homedir(), "vs_otter_http_client"));
var db = null;
async function setDatabase() {
    db = new level_1.Level(path_1.default.join(os_1.default.homedir(), "vs_otter_http_client"), {
        valueEncoding: "json",
    });
}
exports.setDatabase = setDatabase;
function putDoc(key, data) {
    if (db) {
        db.put(key, JSON.stringify(data));
    }
}
exports.putDoc = putDoc;
async function getDoc(key) {
    if (db) {
        var data = await db.get(key);
        if (data) {
            return JSON.parse(data);
        }
    }
    return undefined;
}
exports.getDoc = getDoc;
;
async function getKeys() {
    var result = [];
    if (db) {
        for await (const key of db.keys()) {
            result.push(key);
        }
    }
    console.log(result);
    return result;
}
exports.getKeys = getKeys;
async function deleteDoc(name) {
    if (db) {
        await db.del(name);
    }
}
exports.deleteDoc = deleteDoc;
;
//# sourceMappingURL=docs.js.map