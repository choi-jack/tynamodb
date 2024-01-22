import { ConditionExpressionType, ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';
import { JoinExpression } from '../utils.js';

export class OrExpression extends Expression<ExpressionType.OR> {
    private readonly join: JoinExpression;

    public constructor(
        expressions: ReadonlyArray<Expression<ConditionExpressionType>>,
    ) {
        super(ExpressionType.OR);

        this.join = new JoinExpression(' OR ', expressions);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.join.evaluate(names, values);
    }
}
