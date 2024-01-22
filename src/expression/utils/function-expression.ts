import { Evaluable } from '../evaluable.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';
import { JoinExpression } from './join-expression.js';

export class FunctionExpression implements Evaluable {
    private readonly join: JoinExpression;

    public constructor(
        private readonly name: string,
        private readonly parameters: ReadonlyArray<Evaluable>,
    ) {
        this.join = new JoinExpression(', ', this.parameters);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return `${this.name} (${this.join.evaluate(names, values)})`;
    }
}
