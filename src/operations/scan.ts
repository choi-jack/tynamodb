import { ConditionExpressionType, Expression, ExpressionType } from '../expression.js';
import { ConsumedCapacity, Item, Key, ReturnConsumedCapacity, Select } from './types.js';

export interface ScanInput {
    readonly consistentRead?: boolean;
    readonly exclusiveStartKey?: Key;
    readonly filterExpression?: Expression<ConditionExpressionType>;
    readonly indexName?: string;
    readonly limit?: number;
    readonly projectionExpression?: Expression<ExpressionType.PROJECTION>;
    readonly returnConsumedCapacity?: ReturnConsumedCapacity;
    readonly segment?: number;
    readonly select?: Select;
    readonly tableName: string;
    readonly totalSegments?: number;
}

export interface ScanOutput<T extends Item = Item> {
    readonly consumedCapacity: null | ConsumedCapacity;
    readonly count: number;
    readonly items: ReadonlyArray<T>;
    readonly lastEvaluatedKey: null | Key;
    readonly scannedCount: number;
}
