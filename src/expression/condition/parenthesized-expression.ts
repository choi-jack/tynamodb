import { ConditionExpressionType, ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';

export class ParenthesizedExpression extends Expression<ExpressionType.PARENTHESIZED> {
    public constructor(
        private readonly expression: Expression<ConditionExpressionType>,
    ) {
        super(ExpressionType.PARENTHESIZED);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return `(${this.expression.evaluate(names, values)})`;
    }
}
