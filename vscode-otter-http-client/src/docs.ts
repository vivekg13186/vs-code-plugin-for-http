import { Level } from "level";
import os from "os";
import path from "path";
 
import { OtterHttpRequest } from "./model";

 

var db: Level | null = null;

export async function setDatabase() {
    db = new Level(path.join(os.homedir(), "vs_otter_http_client"), {
        valueEncoding: "json",
    });
}

export function putDoc(key: string, data: OtterHttpRequest) {
    if (db) {
        db.put(key, JSON.stringify(data));
    }
}

export async function getDoc(key: string): Promise<OtterHttpRequest | undefined> {
    if (db) {
        var data = await db.get(key);
        if (data) { return JSON.parse(data); }
    }
    return undefined;
};

export async function getKeys(): Promise<Array<string>> {
    var result = [];
    if (db) {
        for await (const key of db.keys()) {
            result.push(key);
        }
    }
 
    return result;
}

export async function deleteDoc(name: string) {
    if (db) {
        await db.del(name);
    }

};
