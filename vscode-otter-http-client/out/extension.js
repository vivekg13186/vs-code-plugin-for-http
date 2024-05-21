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
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const testCaseController_1 = require("./testCaseController");
const testCaseRunner_1 = require("./testCaseRunner");
const docs_1 = require("./docs");
function activate(context) {
    (0, docs_1.setDatabase)();
    var treeProvider = new testCaseController_1.OtterHttpTreeProvider(context);
    context.subscriptions.push(vscode.window.createTreeView('httpexplorer', {
        canSelectMany: true,
        showCollapseAll: true,
        treeDataProvider: treeProvider
    }));
    (0, testCaseController_1.registerAddNewHttpRequest)("otter.http.new.testcase", context, treeProvider);
    (0, testCaseController_1.registerDeleteHttpRequest)("otter.http.delete.testcase", context, treeProvider);
    (0, testCaseRunner_1.registereEditHttpRequest)("otter.http.edit.testcase", context, treeProvider);
    var plugin = vscode.commands.registerCommand("otter.http.tree.reload", async function (data) {
        treeProvider.refresh();
    });
    context.subscriptions.push(plugin);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map