import { SpaceEntry } from "../model/Model";

export class MissingFieldError extends Error {
    constructor(field: string) {
        super(`${field} is required`);
    }
}

export function validateAsSpaceEntry(arg: SpaceEntry) {
    if (!arg.id) {
        throw new MissingFieldError('id');
    }
    if (!arg.location) {
        throw new MissingFieldError('location');
    }
    if (!arg.name) {
        throw new MissingFieldError('name');
    }
}