import { Evaluable } from '../evaluable.js';
import { ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';
import { JoinExpression } from '../utils.js';

class Clause implements Evaluable {
    private readonly join: JoinExpression;

    public constructor(
        private readonly type: string,
        expressions: ReadonlyArray<Evaluable>,
    ) {
        this.join = new JoinExpression(', ', expressions);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return `${this.type} ${this.join.evaluate(names, values)}`;
    }
}

export class UpdateExpression extends Expression<ExpressionType.UPDATE> {
    private readonly join: JoinExpression;

    public constructor(
        expressions: ReadonlyArray<Expression<ExpressionType.SET | ExpressionType.REMOVE | ExpressionType.ADD | ExpressionType.DELETE>>,
    ) {
        super(ExpressionType.UPDATE);

        const classifiedExpressions: Map<ExpressionType, ReadonlyArray<Evaluable>> = new Map();

        for (const expression of expressions) {
            const previous: ReadonlyArray<Evaluable> = classifiedExpressions.get(expression.type) ?? [];
            const next: ReadonlyArray<Evaluable> = previous.concat(expression);

            classifiedExpressions.set(expression.type, next);
        }

        this.join = new JoinExpression(
            ' ',
            Array
                .from(classifiedExpressions)
                .map(([expressionType, expressions]: [ExpressionType, ReadonlyArray<Evaluable>]): Clause => new Clause(ExpressionType[expressionType], expressions)),
        );
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.join.evaluate(names, values);
    }
}
