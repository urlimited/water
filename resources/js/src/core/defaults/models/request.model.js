export class DefaultRequest {
    // Default params
    headers = {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        'Accept': 'application/json'
    };

    body = "";

    method = "post";

    setParams = (params = {headers: {}, body: "", method: "post"}) => {
        this.headers = {
            ...this.headers,
            ...params.headers
        }
        this.body = params.body;
        this.method = params.method;

        return this;
    }

    getRequest = () => {
        return {
            headers: this.headers,
            body: this.body,
            method: this.method
        }
    }
}