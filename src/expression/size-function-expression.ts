import { BetweenExpression } from './condition/between-expression.js';
import { EqualExpression } from './condition/equal-expression.js';
import { GreaterEqualExpression } from './condition/greater-equal-expression.js';
import { GreaterExpression } from './condition/greater-expression.js';
import { InExpression } from './condition/in-expression.js';
import { LessEqualExpression } from './condition/less-equal-expression.js';
import { LessExpression } from './condition/less-expression.js';
import { NotEqualExpression } from './condition/not-equal-expression.js';
import { ExpressionType } from './expression-type.js';
import { Expression } from './expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from './placeholder.js';
import { FunctionExpression } from './utils.js';

export class SizeFunctionExpression extends Expression<ExpressionType.SIZE_FUNCTION> {
    private readonly function: FunctionExpression;

    public constructor(
        value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE>,
    ) {
        super(ExpressionType.SIZE_FUNCTION);

        this.function = new FunctionExpression('size', [
            value,
        ]);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.function.evaluate(names, values);
    }

    public equal(value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>): EqualExpression {
        return new EqualExpression(this, value);
    }

    public notEqual(value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>): NotEqualExpression {
        return new NotEqualExpression(this, value);
    }

    public less(value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>): LessExpression {
        return new LessExpression(this, value);
    }

    public lessEqual(value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>): LessEqualExpression {
        return new LessEqualExpression(this, value);
    }

    public greater(value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>): GreaterExpression {
        return new GreaterExpression(this, value);
    }

    public greaterEqual(value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>): GreaterEqualExpression {
        return new GreaterEqualExpression(this, value);
    }

    public between(startValue: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>, endValue: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>): BetweenExpression {
        return new BetweenExpression(this, startValue, endValue);
    }

    public in(values: ReadonlyArray<Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>>): InExpression {
        return new InExpression(this, values);
    }
}
