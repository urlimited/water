import * as types from "../constants/types";

export class PageError {
    name;
    content;
    type;

    constructor(errorName, errorContent = "", errorType = types.ERROR_TYPE_WARNING) {
        this.name = errorName;
        this.content = errorContent;
        this.type = errorType;
    }
}