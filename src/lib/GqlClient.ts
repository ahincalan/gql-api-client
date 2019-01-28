import {GqlOptions} from "../types/options";
import fetch from "node-fetch";

export class GqlClient {

    private _token: string | undefined;
    private _url: string | undefined;
    private _query: string | undefined;
    private _variables: any | undefined;
    private _headers: any | undefined;

    constructor(options?: GqlOptions) {
        if (options) {
            this.setOptions(options);
        }
    }

    set headers(value: any | undefined) {
        this._headers = value;
    }

    get headers(): any | undefined {
        return this._headers;
    }

    set token(value: string | undefined) {
        this._token = value;
    }

    get token(): string | undefined {
        return this._token;
    }

    set url(value: string | undefined) {
        this._url = value;
    }

    get url(): string | undefined {
        return this._url;
    }

    set query(value: string | undefined) {
        this._query = value;
    }

    get query(): string | undefined {
        return this._query;
    }

    set variables(value: any | undefined) {
        this._variables = value;
    }

    get variables(): any | undefined {
        return this._variables;
    }

    private prepareVariables(): any {
        return {
            operationName: null,
            query: this.query,
            variables: this.variables
        }
    }

    setOptions(options: GqlOptions): GqlClient {
        this.token = options.token;
        this.url = options.url;
        this.query = options.query;
        this.variables = options.variables;
        return this;
    }


    send(variables?: any): Promise<any> {

        if (variables) {
            this.variables = variables;
        }

        if (!this.url)
            throw "url not found";

        let headers: any = {
            'Content-Type': 'application/json'
        };

        if (this.token) {
            headers['Authorization'] = 'Bearer ' + this.token;
        }

        if (this.headers) {
            headers = {...headers, ...this.headers};
        }

        const fb = {
            method: 'POST',
            body: JSON.stringify(this.prepareVariables()),
            headers: headers
        };

        return fetch(this.url, fb).then(async response => {
            return {
                ...await response.json(),
                ...{
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                }
            };
        }).then(res => {
            return res;
        });
    }

}
