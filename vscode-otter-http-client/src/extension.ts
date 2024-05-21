
import * as vscode from 'vscode';
import { OtterHttpTreeProvider, registerAddNewHttpRequest, registerDeleteHttpRequest } from './testCaseController';
import { registereEditHttpRequest } from './testCaseRunner';
import { setDatabase } from './docs';

export function activate(context: vscode.ExtensionContext) {
	setDatabase();
	var treeProvider: any = new OtterHttpTreeProvider(context);

	context.subscriptions.push(vscode.window.createTreeView('httpexplorer', {
		canSelectMany: true,
		showCollapseAll: true,
		treeDataProvider: treeProvider
	}));

	registerAddNewHttpRequest("otter.http.new.testcase", context, treeProvider);
	registerDeleteHttpRequest("otter.http.delete.testcase", context, treeProvider);
	registereEditHttpRequest("otter.http.edit.testcase", context, treeProvider);
	var plugin = vscode.commands.registerCommand("otter.http.tree.reload", async function (data) {
		treeProvider.refresh();
	});
	context.subscriptions.push(plugin);
	 
	 
}


export function deactivate() { }
