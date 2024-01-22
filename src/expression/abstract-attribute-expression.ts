import { ExpressionType } from './expression-type.js';
import { Expression } from './expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from './placeholder.js';

export abstract class AbstractAttributeExpression extends Expression<ExpressionType.ATTRIBUTE> {
    public constructor(
        public readonly path: ReadonlyArray<string | number>,
    ) {
        super(ExpressionType.ATTRIBUTE);
    }

    public evaluate(names: ExpressionAttributeNames, _values: ExpressionAttributeValues): string {
        const expression: Array<string> = [];

        for (const key of this.path) {
            if (typeof key === 'string') {
                expression.push(names.add(key));
            }
            else {
                expression[expression.length - 1] += `[${key}]`;
            }
        }

        return expression.join('.');
    }
}
