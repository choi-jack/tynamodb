import { ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';
import { JoinExpression } from '../utils.js';

export class AddExpression extends Expression<ExpressionType.ADD> {
    private readonly join: JoinExpression;

    public constructor(
        attribute: Expression<ExpressionType.ATTRIBUTE>,
        value: Expression<ExpressionType.VALUE>,
    ) {
        super(ExpressionType.ADD);

        this.join = new JoinExpression(' ', [
            attribute,
            value,
        ]);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.join.evaluate(names, values);
    }
}
