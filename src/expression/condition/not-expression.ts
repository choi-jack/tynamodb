import { ConditionExpressionType, ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';

export class NotExpression extends Expression<ExpressionType.NOT> {
    public constructor(
        private readonly expression: Expression<ConditionExpressionType>,
    ) {
        super(ExpressionType.NOT);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return `NOT ${this.expression.evaluate(names, values)}`;
    }
}
