import { ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';

export class RemoveExpression extends Expression<ExpressionType.REMOVE> {
    public constructor(
        private readonly attribute: Expression<ExpressionType.ATTRIBUTE>,
    ) {
        super(ExpressionType.REMOVE);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.attribute.evaluate(names, values);
    }
}
