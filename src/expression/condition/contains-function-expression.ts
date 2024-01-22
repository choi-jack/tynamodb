import { ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';
import { FunctionExpression } from '../utils.js';

export class ContainsFunctionExpression extends Expression<ExpressionType.CONTAINS_FUNCTION> {
    private readonly function: FunctionExpression;

    public constructor(
        value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE>,
        subvalue: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>,
    ) {
        super(ExpressionType.CONTAINS_FUNCTION);

        this.function = new FunctionExpression('contains', [
            value,
            subvalue,
        ]);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.function.evaluate(names, values);
    }
}
