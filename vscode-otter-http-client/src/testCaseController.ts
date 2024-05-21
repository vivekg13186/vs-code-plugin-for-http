
import vscode, { TreeItem, TreeDataProvider, ExtensionContext, ProviderResult } from "vscode";

import { getKeys, putDoc, deleteDoc } from "./docs";
import { OtterHttpRequest } from "./model";



function new_id(): string {
    var num = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    return `id_${num}`;
}


export class HttpRequestNode extends TreeItem {
    constructor(name: string) {
        super(name, vscode.TreeItemCollapsibleState.None);
        this.id = new_id();
        this.contextValue = "httprequest";
        this.iconPath = new vscode.ThemeIcon("ports-open-browser-icon");
    }
    getChildren() {
        return [];
    }
}

export class OtterHttpTreeProvider implements TreeDataProvider<HttpRequestNode> {
    private context: ExtensionContext;
    private _onDidChangeTreeData: vscode.EventEmitter<HttpRequestNode | undefined | void> = new vscode.EventEmitter<HttpRequestNode | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<HttpRequestNode | undefined | void> = this._onDidChangeTreeData.event;
    private httpRequests: string[];
    constructor(context: ExtensionContext) {
        this.context = context;

        this.httpRequests = [];
    }

    getTreeItem(element: any) {
        return element;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }


    async getChildren(element?: HttpRequestNode): Promise<HttpRequestNode[] | null | undefined> {
        if (element === undefined) {
            var result: HttpRequestNode[] = [];
            var keys = await getKeys();
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



export function registerAddNewHttpRequest(id: string, context: ExtensionContext, tree: OtterHttpTreeProvider) {
    var plugin = vscode.commands.registerCommand(id, async function () {

        var name = await vscode.window.showInputBox({ placeHolder: "http request name", title: "Http request name" });

        if (!name) {
            vscode.window.showErrorMessage("Enter name");
            return;
        }
        var output: OtterHttpRequest = {
            name: "",
            baseurl: "",
            method: "",
            params: [],
            headers: [],
            auth: [],
            prescript: [],
            postscript: [],
            body: {
                type: "",
                mimeType: "",
                test: [],
                keyValues: [],
                filepath: ""
            }
        };
        putDoc(name,  output);
        vscode.window.showInformationMessage(`${name} added`);
        tree.refresh();
    });
    context.subscriptions.push(plugin);
}

export function registerDeleteHttpRequest(id: string, context: ExtensionContext, tree: OtterHttpTreeProvider) {
    var plugin = vscode.commands.registerCommand(id, async function (item) {
        var name = item.label;
        await deleteDoc(name);
        vscode.window.showInformationMessage(`${name} removed`);
        tree.refresh();
    });
    context.subscriptions.push(plugin);
}
