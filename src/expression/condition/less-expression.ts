import { ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';
import { JoinExpression } from '../utils.js';

export class LessExpression extends Expression<ExpressionType.LESS> {
    private readonly join: JoinExpression;

    public constructor(
        left: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>,
        right: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>,
    ) {
        super(ExpressionType.LESS);

        this.join = new JoinExpression(' < ', [
            left,
            right,
        ]);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.join.evaluate(names, values);
    }
}
