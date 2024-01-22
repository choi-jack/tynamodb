import { Placeholders } from './placeholders.js';

export class ExpressionAttributeNames extends Placeholders<string> {
    public static deserialize(names: Readonly<Record<string, string>>): ExpressionAttributeNames {
        return new ExpressionAttributeNames(
            Object
                .entries(names)
                .map(([value, key]: [string, string]): [string, string] => [key, value]),
        );
    }

    public constructor(iterable: Iterable<[string, string]> = []) {
        super('#', iterable);
    }
}
