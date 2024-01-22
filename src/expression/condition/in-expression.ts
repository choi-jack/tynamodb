import { ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';
import { JoinExpression } from '../utils.js';

export class InExpression extends Expression<ExpressionType.IN> {
    private readonly join: JoinExpression;

    public constructor(
        private readonly value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>,
        values: ReadonlyArray<Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>>,
    ) {
        super(ExpressionType.IN);

        this.join = new JoinExpression(', ', values);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return `${this.value.evaluate(names, values)} IN (${this.join.evaluate(names, values)})`;
    }
}
