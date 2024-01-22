import { Evaluable } from './evaluable.js';
import { ExpressionType } from './expression-type.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from './placeholder.js';

export abstract class Expression<T extends ExpressionType = ExpressionType> implements Evaluable {
    protected constructor(
        public readonly type: T,
    ) { }

    public abstract evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string;
}
