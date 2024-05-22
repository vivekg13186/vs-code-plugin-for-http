import axios, { AxiosRequestConfig, AxiosResponseHeaders } from "axios";
import { OtterHttpRequest, OtterHttpResponse, OtterNameValue } from "./model";
import   Coffeescript  from  "coffeescript";

function nvtoObj(nvs: OtterNameValue[]) {
    var obj: any = {};
    for (var i = 0; i < nvs.length; i++) {
        obj[nvs[i].name] = nvs[i].value;
    }
    return obj;
}

function eval_js(code:string,requestInput:any,responseInput:any){
        var updated_code= "";
        if(requestInput){
            updated_code +=`request=${JSON.stringify(requestInput)}\n\n`;
        }
         
        if(responseInput){
            updated_code +=`response=${JSON.stringify(responseInput)}\n\n`;
        }
        updated_code+=code;
        console.log('JS code',updated_code);
        
        try {
            var result =  Coffeescript.run(updated_code);
            console.log("result",result);
            return result;
        }catch(e){
            return String(e);
        }
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

   /*
    if(input.prescript && input.prescript.length>0){
        eval_js(input.prescript[0],input,null);
    }*/
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
        /*if(input.postscript && input.postscript.length>0){
            eval_js(input.prescript[0],input,null);
        }*/
    }catch(e){
        output.status = "Client Error";
        output.body = String(e);
    }
    return output;
     
}