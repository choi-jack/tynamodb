import { Expression, ExpressionType } from '../expression.js';
import { ConsumedCapacity, Item, Key, ReturnConsumedCapacity } from './types.js';

export interface GetInput {
    readonly consistentRead?: boolean;
    readonly key: Key;
    readonly projectionExpression?: Expression<ExpressionType.PROJECTION>;
    readonly returnConsumedCapacity?: ReturnConsumedCapacity;
    readonly tableName: string;
}

export interface GetOutput<T extends Item = Item> {
    readonly consumedCapacity: null | ConsumedCapacity;
    readonly item: null | T;
}
