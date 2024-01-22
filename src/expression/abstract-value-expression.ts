import { ExpressionType } from './expression-type.js';
import { Expression } from './expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from './placeholder.js';

export abstract class AbstractValueExpression extends Expression<ExpressionType.VALUE> {
    public constructor(
        public readonly value: unknown,
    ) {
        super(ExpressionType.VALUE);
    }

    public evaluate(_names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return values.add(this.value);
    }
}
