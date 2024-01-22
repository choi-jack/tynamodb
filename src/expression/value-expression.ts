import { AbstractValueExpression } from './abstract-value-expression.js';
import { AttributeType, AttributeTypeFunctionExpression, BeginsWithFunctionExpression, BetweenExpression, ContainsFunctionExpression, EqualExpression, GreaterEqualExpression, GreaterExpression, InExpression, LessEqualExpression, LessExpression, NotEqualExpression } from './condition.js';
import { ExpressionType } from './expression-type.js';
import { Expression } from './expression.js';
import { SizeFunctionExpression } from './size-function-expression.js';
import { ListAppendFunctionExpression, MinusExpression, PlusExpression } from './update.js';

export class ValueExpression extends AbstractValueExpression {
    public size(): SizeFunctionExpression {
        return new SizeFunctionExpression(this);
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

    public typeIs(type: AttributeType): AttributeTypeFunctionExpression {
        return new AttributeTypeFunctionExpression(this, type);
    }

    public beginsWith(value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE>): BeginsWithFunctionExpression {
        return new BeginsWithFunctionExpression(this, value);
    }

    public contains(value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.SIZE_FUNCTION>): ContainsFunctionExpression {
        return new ContainsFunctionExpression(this, value);
    }

    public plus(value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.IF_NOT_EXISTS_FUNCTION>): PlusExpression {
        return new PlusExpression(this, value);
    }

    public minus(value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.IF_NOT_EXISTS_FUNCTION>): MinusExpression {
        return new MinusExpression(this, value);
    }

    public concat(value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.IF_NOT_EXISTS_FUNCTION>): ListAppendFunctionExpression {
        return new ListAppendFunctionExpression(this, value);
    }
}
