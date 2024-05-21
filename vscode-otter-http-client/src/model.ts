
export type OtterNameValue = {
    name:string,
    value:string
};
export type OtterHttpAuth = {
    type:string,
    username:string,
    password:string,
};
export type OtterHttpBody= {
    type:string,
    mimeType:string,
    test:string[],
    keyValues:OtterNameValue[],
    filepath:string
};
export type OtterHttpRequest ={
    name:string,
    baseurl:string,
    method:string,
    params:OtterNameValue[],
    headers:OtterNameValue[],
    auth:OtterHttpAuth[],
    prescript:string[],
    postscript:string[],
    body:OtterHttpBody
};

export type OtterHttpResponse ={
    status:string,
    cookies:OtterNameValue[],
    headers:OtterNameValue[],
    body:string,
    result:string, 
};

