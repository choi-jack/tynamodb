import { Expression, ExpressionType } from '../expression.js';
import { ConsumedCapacity, Item, Key, ReturnConsumedCapacity } from './types.js';

export interface TransactGetItem {
    readonly key: Key;
    readonly projectionExpression?: Expression<ExpressionType.PROJECTION>;
    readonly tableName: string;
}

export interface TransactGetInput {
    readonly returnConsumedCapacity?: ReturnConsumedCapacity;
    readonly transactItems: ReadonlyArray<TransactGetItem>;
}

export interface TransactGetOutput<T extends Item = Item> {
    readonly consumedCapacity: null | ReadonlyArray<ConsumedCapacity>;
    readonly responses: ReadonlyArray<null | T>;
}
