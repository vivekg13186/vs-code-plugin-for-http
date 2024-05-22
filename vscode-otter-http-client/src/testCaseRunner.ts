
import { getDoc, putDoc } from "./docs";

import vscode, { ExtensionContext, WebviewPanel } from "vscode";
import { OtterHttpRequest, OtterHttpResponse } from "./model";
import { OtterHttpTreeProvider } from "./testCaseController";
import { runTestCase } from "./service";

function getUri(webview: any, extensionUri: any, pathList: string[]) {
  return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
}

async function execute(httpRequest: OtterHttpRequest): Promise<OtterHttpResponse> {
  return await runTestCase(httpRequest);
}
export function registereEditHttpRequest(id: string, context: ExtensionContext, treeProvider: OtterHttpTreeProvider) {
  var plugin = vscode.commands.registerCommand(id, async function (treeItem) {
    var tc = await getDoc(treeItem.label);
    if (!tc){return;} 



    var panel: WebviewPanel = vscode.window.createWebviewPanel(
      "Test Case",
      treeItem.label,
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        enableFindWidget: true,
      }
    );

    var html = generateHTML(panel, context, tc);
    panel.webview.html = html;
    panel.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.command) {
          case "saveTestCase":
            putDoc(treeItem.label, JSON.parse(message.text));
            vscode.window.showInformationMessage(`${treeItem.label} saved`);
            return;
          case "runTestCase":
            var result = await runTestCase(JSON.parse(message.text));
            if (result) {
              panel.webview.postMessage(JSON.stringify(result, null, 4));
            }
            return;
        }
      },
      undefined,
      context.subscriptions
    );
  });

  context.subscriptions.push(plugin);
};

function generateHTML(panel: WebviewPanel, context: ExtensionContext, input: OtterHttpRequest) {
  var app_js = getUri(panel.webview, context.extensionUri, [
    "media",
    "entry-testcase.js",
  ]);

  var app_css = getUri(panel.webview, context.extensionUri, [
    "media",
    "testcase.css",
  ]);


  return `
    <!doctype  html>
    <html lang="">
    <head> 
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE-edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title></title>
       
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