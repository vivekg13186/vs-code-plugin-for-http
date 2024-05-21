import axios, { AxiosRequestConfig, AxiosResponseHeaders } from "axios";
import { OtterHttpRequest, OtterHttpResponse, OtterNameValue } from "./model";

function nvtoObj(nvs: OtterNameValue[]) {
    var obj: any = {}
    for (var i = 0; i < nvs.length; i++) {
        obj[nvs[i].name] = nvs[i].value;
    }
    return obj;
}

function toNv(headers: any) {
    var result: OtterNameValue[] = [];
    var keys  = Object.keys(headers);
    keys.map(k=>{
        result.push({name : k ,value :headers[k]});
    });
    return result;
}
export async function runTestCase(input: OtterHttpRequest): Promise<OtterHttpResponse> {

    var config: AxiosRequestConfig = {};
    config.method = input.method;
    config.baseURL = input.baseurl;
    if(input.headers){

        config.headers = nvtoObj(input.headers);
    
    }
    if (input.auth && input.auth.length >0 && input.auth[0].type === "basic") {
        config.auth = {
            username: input.auth[0].username,
            password: input.auth[0].password
        };
    }

    var output: OtterHttpResponse = {
        status: "",
        cookies: [],
        headers: [],
        body: "",
        result: ""
    };
    try {
        var result = await axios(config);
        output.status = result.statusText;
        output.body = result.data;
        output.headers = toNv(result.headers);
    }catch(e){
        output.status = "Client Error";
        output.body = String(e);
    }
    return output;
     
}