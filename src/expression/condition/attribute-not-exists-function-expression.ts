import { ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';
import { FunctionExpression } from '../utils.js';

export class AttributeNotExistsFunctionExpression extends Expression<ExpressionType.ATTRIBUTE_NOT_EXISTS_FUNCTION> {
    private readonly function: FunctionExpression;

    public constructor(
        attribute: Expression<ExpressionType.ATTRIBUTE>,
    ) {
        super(ExpressionType.ATTRIBUTE_NOT_EXISTS_FUNCTION);

        this.function = new FunctionExpression('attribute_not_exists', [
            attribute,
        ]);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.function.evaluate(names, values);
    }
}
