import { ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';
import { JoinExpression } from '../utils.js';

export class DeleteExpression extends Expression<ExpressionType.DELETE> {
    private readonly join: JoinExpression;

    public constructor(
        attribute: Expression<ExpressionType.ATTRIBUTE>,
        value: Expression<ExpressionType.VALUE>,
    ) {
        super(ExpressionType.DELETE);

        this.join = new JoinExpression(' ', [
            attribute,
            value,
        ]);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.join.evaluate(names, values);
    }
}
