export class DataNotValidException extends Error{
    constructor(error) {
        super();

        this.message = Object.values(error.errors)
            .map(error => error.reduce((accum, nextError) => accum + nextError + "\r\n", ""))
            .reduce((accum, next) => accum + next, "");

    }
}