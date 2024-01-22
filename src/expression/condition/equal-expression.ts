import { ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';
import { JoinExpression } from '../utils.js';

export class EqualExpression extends Expression<ExpressionType.EQUAL> {
    private readonly join: JoinExpression;

    public constructor(
        left: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>,
        right: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>,
    ) {
        super(ExpressionType.EQUAL);

        this.join = new JoinExpression(' = ', [
            left,
            right,
        ]);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.join.evaluate(names, values);
    }
}
