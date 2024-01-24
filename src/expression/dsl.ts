import { AttributeExpression } from './attribute-expression.js';
import { AndExpression, NotExpression, OrExpression, ParenthesizedExpression } from './condition.js';
import { ConditionExpressionType, ExpressionType } from './expression-type.js';
import { Expression } from './expression.js';
import { ProjectionExpression } from './projection-expression.js';
import { UpdateExpression } from './update.js';
import { ValueExpression } from './value-expression.js';

export function attribute(name: string, ...path: ReadonlyArray<string | number>): AttributeExpression;
export function attribute(...path: ReadonlyArray<string | number>): AttributeExpression {
    return new AttributeExpression(path);
}

export function value(value: unknown): ValueExpression {
    return new ValueExpression(value);
}

export function and(condition1: Expression<ConditionExpressionType>, condition2: Expression<ConditionExpressionType>, ...conditions: ReadonlyArray<Expression<ConditionExpressionType>>): AndExpression;
export function and(...conditions: ReadonlyArray<Expression<ConditionExpressionType>>): AndExpression {
    return new AndExpression(conditions);
}

export function or(condition1: Expression<ConditionExpressionType>, condition2: Expression<ConditionExpressionType>, ...conditions: ReadonlyArray<Expression<ConditionExpressionType>>): OrExpression;
export function or(...conditions: ReadonlyArray<Expression<ConditionExpressionType>>): OrExpression {
    return new OrExpression(conditions);
}

export function not(condition: Expression<ConditionExpressionType>): NotExpression {
    return new NotExpression(condition);
}

export function parenthesize(condition: Expression<ConditionExpressionType>): ParenthesizedExpression {
    return new ParenthesizedExpression(condition);
}

export function update(clause: Expression<ExpressionType.SET | ExpressionType.REMOVE | ExpressionType.ADD | ExpressionType.DELETE>, ...clauses: ReadonlyArray<Expression<ExpressionType.SET | ExpressionType.REMOVE | ExpressionType.ADD | ExpressionType.DELETE>>): UpdateExpression;
export function update(...clauses: ReadonlyArray<Expression<ExpressionType.SET | ExpressionType.REMOVE | ExpressionType.ADD | ExpressionType.DELETE>>): UpdateExpression {
    return new UpdateExpression(clauses);
}

export function project(attribute: Expression<ExpressionType.ATTRIBUTE>, ...attributes: ReadonlyArray<Expression<ExpressionType.ATTRIBUTE>>): ProjectionExpression;
export function project(...attributes: ReadonlyArray<Expression<ExpressionType.ATTRIBUTE>>): ProjectionExpression {
    return new ProjectionExpression(attributes);
}
