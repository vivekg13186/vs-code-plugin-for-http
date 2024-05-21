"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDeleteHttpRequest = exports.registerAddNewHttpRequest = exports.OtterHttpTreeProvider = exports.HttpRequestNode = void 0;
const vscode_1 = __importStar(require("vscode"));
const docs_1 = require("./docs");
function new_id() {
    var num = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    return `id_${num}`;
}
class HttpRequestNode extends vscode_1.TreeItem {
    constructor(name) {
        super(name, vscode_1.default.TreeItemCollapsibleState.None);
        this.id = new_id();
        this.contextValue = "httprequest";
        this.iconPath = new vscode_1.default.ThemeIcon("ports-open-browser-icon");
    }
    getChildren() {
        return [];
    }
}
exports.HttpRequestNode = HttpRequestNode;
class OtterHttpTreeProvider {
    context;
    _onDidChangeTreeData = new vscode_1.default.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;
    httpRequests;
    constructor(context) {
        this.context = context;
        this.httpRequests = [];
    }
    getTreeItem(element) {
        return element;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    async getChildren(element) {
        if (element === undefined) {
            var result = [];
            var keys = await (0, docs_1.getKeys)();
            for (var i = 0; i < keys.length; i++) {
                var c = keys[i];
                this.httpRequests.push(c);
                result.push(new HttpRequestNode(c));
            }
            return result;
        }
        return element.getChildren();
    }
}
exports.OtterHttpTreeProvider = OtterHttpTreeProvider;
function registerAddNewHttpRequest(id, context, tree) {
    var plugin = vscode_1.default.commands.registerCommand(id, async function () {
        var name = await vscode_1.default.window.showInputBox({ placeHolder: "http request name", title: "Http request name" });
        if (!name) {
            vscode_1.default.window.showErrorMessage("Enter name");
            return;
        }
        var output = {
            name: "",
            baseurl: "",
            method: "",
            params: [],
            headers: [],
            auth: [{ type: "noauth", username: "", password: "" }],
            prescript: [],
            postscript: [],
            body: [{
                    type: "raw",
                    mimeType: "",
                    text: [],
                    keyValues: [],
                    filepath: ""
                }]
        };
        (0, docs_1.putDoc)(name, output);
        vscode_1.default.window.showInformationMessage(`${name} added`);
        tree.refresh();
    });
    context.subscriptions.push(plugin);
}
exports.registerAddNewHttpRequest = registerAddNewHttpRequest;
function registerDeleteHttpRequest(id, context, tree) {
    var plugin = vscode_1.default.commands.registerCommand(id, async function (item) {
        var name = item.label;
        await (0, docs_1.deleteDoc)(name);
        vscode_1.default.window.showInformationMessage(`${name} removed`);
        tree.refresh();
    });
    context.subscriptions.push(plugin);
}
exports.registerDeleteHttpRequest = registerDeleteHttpRequest;
//# sourceMappingURL=testCaseController.js.map