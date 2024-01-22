import { Evaluable } from '../evaluable.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';

export class JoinExpression implements Evaluable {
    public constructor(
        private readonly separator: string,
        private readonly expressions: ReadonlyArray<Evaluable>,
    ) { }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.expressions
            .map((expression: Evaluable): string => expression.evaluate(names, values))
            .join(this.separator);
    }
}
