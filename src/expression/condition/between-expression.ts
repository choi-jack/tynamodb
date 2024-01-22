import { ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';

export class BetweenExpression extends Expression<ExpressionType.BETWEEN> {
    public constructor(
        private readonly value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>,
        private readonly startValue: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>,
        private readonly endValue: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>,
    ) {
        super(ExpressionType.BETWEEN);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return `${this.value.evaluate(names, values)} BETWEEN ${this.startValue.evaluate(names, values)} AND ${this.endValue.evaluate(names, values)}`;
    }
}
