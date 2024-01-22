import { ExpressionType } from '../expression-type.js';
import { Expression } from '../expression.js';
import { ExpressionAttributeNames, ExpressionAttributeValues } from '../placeholder.js';
import { FunctionExpression, JoinExpression } from '../utils.js';

export class SetExpression extends Expression<ExpressionType.SET> {
    private readonly join: JoinExpression;

    public constructor(
        attribute: Expression<ExpressionType.ATTRIBUTE>,
        value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.PLUS | ExpressionType.MINUS | ExpressionType.LIST_APPEND_FUNCTION | ExpressionType.IF_NOT_EXISTS_FUNCTION>,
    ) {
        super(ExpressionType.SET);

        this.join = new JoinExpression(' = ', [
            attribute,
            value,
        ]);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.join.evaluate(names, values);
    }
}

export class PlusExpression extends Expression<ExpressionType.PLUS> {
    private readonly join: JoinExpression;

    public constructor(
        left: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.IF_NOT_EXISTS_FUNCTION>,
        right: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.IF_NOT_EXISTS_FUNCTION>,
    ) {
        super(ExpressionType.PLUS);

        this.join = new JoinExpression(' + ', [
            left,
            right,
        ]);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.join.evaluate(names, values);
    }
}

export class MinusExpression extends Expression<ExpressionType.MINUS> {
    private readonly join: JoinExpression;

    public constructor(
        left: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.IF_NOT_EXISTS_FUNCTION>,
        right: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.IF_NOT_EXISTS_FUNCTION>,
    ) {
        super(ExpressionType.MINUS);

        this.join = new JoinExpression(' - ', [
            left,
            right,
        ]);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.join.evaluate(names, values);
    }
}

export class ListAppendFunctionExpression extends Expression<ExpressionType.LIST_APPEND_FUNCTION> {
    private readonly function: FunctionExpression;

    public constructor(
        a: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.IF_NOT_EXISTS_FUNCTION>,
        b: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE | ExpressionType.IF_NOT_EXISTS_FUNCTION>,
    ) {
        super(ExpressionType.LIST_APPEND_FUNCTION);

        this.function = new FunctionExpression('list_append', [
            a,
            b,
        ]);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.function.evaluate(names, values);
    }
}

export class IfNotExistsFunctionExpression extends Expression<ExpressionType.IF_NOT_EXISTS_FUNCTION> {
    private readonly function: FunctionExpression;

    public constructor(
        attribute: Expression<ExpressionType.ATTRIBUTE>,
        value: Expression<ExpressionType.ATTRIBUTE | ExpressionType.VALUE>,
    ) {
        super(ExpressionType.IF_NOT_EXISTS_FUNCTION);

        this.function = new FunctionExpression('if_not_exists', [
            attribute,
            value,
        ]);
    }

    public evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string {
        return this.function.evaluate(names, values);
    }
}
