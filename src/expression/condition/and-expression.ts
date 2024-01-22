import { ConditionExpressionType, ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';
import { JoinExpression } from '../utils.js';

export class AndExpression extends Expression<ExpressionType.AND> {
    private readonly join: JoinExpression;

    public constructor(
        expressions: ReadonlyArray<Expression<ConditionExpressionType>>,
    ) {
        super(ExpressionType.AND);

        this.join = new JoinExpression(' AND ', expressions);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.join.evaluate(names, values);
    }
}
