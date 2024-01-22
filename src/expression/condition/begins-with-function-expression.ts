import { ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';
import { FunctionExpression } from '../utils.js';

export class BeginsWithFunctionExpression extends Expression<ExpressionType.BEGINS_WITH_FUNCTION> {
    private readonly function: FunctionExpression;

    public constructor(
        string: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE>,
        substring: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE>,
    ) {
        super(ExpressionType.BEGINS_WITH_FUNCTION);

        this.function = new FunctionExpression('begins_with', [
            string,
            substring,
        ]);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.function.evaluate(names, values);
    }
}
