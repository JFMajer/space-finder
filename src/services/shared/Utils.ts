export function parseJson(json: string) {
    try {
        return JSON.parse(json);
    } catch (error) {
        throw new JSONError((error as Error).message);
    }
}

export class JSONError extends Error {
    constructor(message: string) {
        super(message);
    }
}