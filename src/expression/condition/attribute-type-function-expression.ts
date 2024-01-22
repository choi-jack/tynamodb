import { ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';
import { SimpleValueExpression } from '../simple-value-expression.js';
import { FunctionExpression } from '../utils.js';

export enum AttributeType {
    BINARY = 'B',
    BOOLEAN = 'BOOL',
    BINARY_SET = 'BS',
    LIST = 'L',
    MAP = 'M',
    NUMBER = 'N',
    NUMBER_SET = 'NS',
    NULL = 'NULL',
    STRING = 'S',
    STRING_SET = 'SS',
}

export class AttributeTypeFunctionExpression extends Expression<ExpressionType.ATTRIBUTE_TYPE_FUNCTION> {
    private readonly function: FunctionExpression;

    public constructor(
        value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE>,
        type: AttributeType,
    ) {
        super(ExpressionType.ATTRIBUTE_TYPE_FUNCTION);

        this.function = new FunctionExpression('attribute_type', [
            value,
            new SimpleValueExpression(type),
        ]);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.function.evaluate(names, values);
    }
}
