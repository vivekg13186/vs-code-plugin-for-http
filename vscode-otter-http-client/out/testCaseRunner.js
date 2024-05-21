"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registereEditHttpRequest = void 0;
const docs_1 = require("./docs");
const vscode_1 = __importDefault(require("vscode"));
const service_1 = require("./service");
function getUri(webview, extensionUri, pathList) {
    return webview.asWebviewUri(vscode_1.default.Uri.joinPath(extensionUri, ...pathList));
}
async function execute(httpRequest) {
    return await (0, service_1.runTestCase)(httpRequest);
}
function registereEditHttpRequest(id, context, treeProvider) {
    var plugin = vscode_1.default.commands.registerCommand(id, async function (treeItem) {
        var tc = await (0, docs_1.getDoc)(treeItem.label);
        if (!tc)
            return;
        var panel = vscode_1.default.window.createWebviewPanel("Test Case", treeItem.label, vscode_1.default.ViewColumn.One, {
            enableScripts: true,
            enableFindWidget: true,
        });
        var html = generateHTML(panel, context, tc);
        panel.webview.html = html;
        panel.webview.onDidReceiveMessage(async (message) => {
            switch (message.command) {
                case "saveTestCase":
                    (0, docs_1.putDoc)(treeItem.label, JSON.parse(message.text));
                    vscode_1.default.window.showInformationMessage(`${treeItem.label} saved`);
                    return;
                case "runTestCase":
                    var result = await (0, service_1.runTestCase)(JSON.parse(message.text));
                    if (result) {
                        console.log("resulkt", result);
                        panel.webview.postMessage(JSON.stringify(result, null, 4));
                    }
                    vscode_1.default.window.showInformationMessage(`${treeItem.label} exected`);
                    return;
            }
        }, undefined, context.subscriptions);
    });
    context.subscriptions.push(plugin);
}
exports.registereEditHttpRequest = registereEditHttpRequest;
;
function generateHTML(panel, context, input) {
    var app_js = getUri(panel.webview, context.extensionUri, [
        "media",
        "entry-testcase.js",
    ]);
    var collapse_css = getUri(panel.webview, context.extensionUri, [
        "media",
        "_plugin-vue_export-helper.css",
    ]);
    var app_css = getUri(panel.webview, context.extensionUri, [
        "media",
        "testcase.css",
    ]);
    var icon_css = getUri(panel.webview, context.extensionUri, [
        "node_modules",
        "@vscode/codicons",
        "dist",
        "codicon.css",
    ]);
    return `
    <!doctype  html>
    <html lang="">
    <head> 
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE-edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title></title>
        <link href="${collapse_css}" rel="stylesheet">
        <link href="${icon_css}" rel="stylesheet">
          <link href="${app_css}" rel="stylesheet">
        
       
        <script>
        const vscode = acquireVsCodeApi();
            window.input = ${JSON.stringify(input)};
        </script>
        </head>
        <body>
            <div id="app"></div>
            <script type="module" src="${app_js}"></script>
        </body>
        </html>
    `;
}
//# sourceMappingURL=testCaseRunner.js.map