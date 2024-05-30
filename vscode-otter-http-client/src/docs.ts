import { Level } from "level";


import { OtterHttpRequest } from "./model";
import { ExtensionContext, FileType, Uri } from "vscode";
import vscode from "vscode";
 
var db: Level | null = null;

var encoder = new TextEncoder();
var decoder  = new TextDecoder();
var baseUri:Uri;

 
export async function setDatabase(context: ExtensionContext) {
    baseUri = context.globalStorageUri;
     
}

export async function putDoc(key: string, data: OtterHttpRequest) {
    
    var p = Uri.joinPath(baseUri,key);
    await vscode.workspace.fs.writeFile(p,encoder.encode(JSON.stringify(data)));
 
}

export async function getDoc(key: string): Promise<OtterHttpRequest | undefined> {
    var p = Uri.joinPath(baseUri,key);
    var text = await vscode.workspace.fs.readFile(p);
    return JSON.parse(decoder.decode(text));
};

export async function getKeys(): Promise<Array<string>> {
   var file:[string, FileType][]  =await  vscode.workspace.fs.readDirectory(baseUri);
   var result = [];
   for(var i=0;i<file.length;i++){
    result.push(file[i][0]);
   }
   return result;

}

export async function deleteDoc(name: string) {
    var p = Uri.joinPath(baseUri,name);
    var text = await vscode.workspace.fs.delete(p);
};
