import { ConditionExpressionType, Expression, ExpressionType } from '../expression.js';
import { ConsumedCapacity, Item, Key, ReturnConsumedCapacity, Select } from './types.js';

export interface QueryInput {
    readonly consistentRead?: boolean;
    readonly exclusiveStartKey?: Key;
    readonly filterExpression?: Expression<ConditionExpressionType>;
    readonly indexName?: string;
    readonly keyConditionExpression?: Expression<ConditionExpressionType>;
    readonly limit?: number;
    readonly projectionExpression?: Expression<ExpressionType.PROJECTION>;
    readonly returnConsumedCapacity?: ReturnConsumedCapacity;
    readonly scanIndexForward?: boolean;
    readonly select?: Select;
    readonly tableName: string;
}

export interface QueryOutput<T extends Item = Item> {
    readonly consumedCapacity: null | ConsumedCapacity;
    readonly count: number;
    readonly items: ReadonlyArray<T>;
    readonly lastEvaluatedKey: null | Key;
    readonly scannedCount: number;
}
