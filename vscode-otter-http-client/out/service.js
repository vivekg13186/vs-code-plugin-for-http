"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTestCase = void 0;
const axios_1 = __importDefault(require("axios"));
function nvtoObj(nvs) {
    var obj = {};
    for (var i = 0; i < nvs.length; i++) {
        obj[nvs[i].name] = nvs[i].value;
    }
    return obj;
}
function toNv(headers) {
    var result = [];
    var keys = Object.keys(headers);
    keys.map(k => {
        result.push({ name: k, value: headers[k] });
    });
    return result;
}
async function runTestCase(input) {
    var config = {};
    config.method = input.method;
    config.baseURL = input.baseurl;
    if (input.headers) {
        config.headers = nvtoObj(input.headers);
    }
    if (input.auth && input.auth.length > 0 && input.auth[0].type === "basic") {
        config.auth = {
            username: input.auth[0].username,
            password: input.auth[0].password
        };
    }
    var output = {
        status: "",
        cookies: [],
        headers: [],
        body: "",
        result: ""
    };
    try {
        var result = await (0, axios_1.default)(config);
        output.status = result.statusText;
        output.body = result.data;
        output.headers = toNv(result.headers);
    }
    catch (e) {
        output.status = "Client Error";
        output.body = String(e);
    }
    return output;
}
exports.runTestCase = runTestCase;
//# sourceMappingURL=service.js.map