import { Placeholders } from './placeholders.js';

export class ExpressionAttributeValues extends Placeholders<unknown> {
    public static deserialize(names: Readonly<Record<string, unknown>>): ExpressionAttributeValues {
        return new ExpressionAttributeValues(
            Object
                .entries(names)
                .map(([value, key]: [string, unknown]): [unknown, string] => [key, value]),
        );
    }

    public constructor(iterable: Iterable<[unknown, string]> = []) {
        super(':', iterable);
    }
}
