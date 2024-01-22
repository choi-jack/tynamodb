import { ExpressionType } from './expression-type.js';
import { Expression } from './expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from './placeholder.js';
import { JoinExpression } from './utils.js';

export class ProjectionExpression extends Expression<ExpressionType.PROJECTION> {
    private readonly join: JoinExpression;

    public constructor(
        attributes: ReadonlyArray<Expression<ExpressionType.ATTRIBUTE>>,
    ) {
        super(ExpressionType.PROJECTION);

        this.join = new JoinExpression(', ', attributes);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.join.evaluate(names, values);
    }
}
