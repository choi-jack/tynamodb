import { ConditionExpressionType, Expression } from '../expression.js';
import { Attributes, ConsumedCapacity, ItemCollectionMetrics, Key, ReturnConsumedCapacity, ReturnItemCollectionMetrics, ReturnValues, ReturnValuesOnConditionCheckFailure } from './types.js';

export interface DeleteInput {
    readonly conditionExpression?: Expression<ConditionExpressionType>;
    readonly key: Key;
    readonly returnConsumedCapacity?: ReturnConsumedCapacity;
    readonly returnItemCollectionMetrics?: ReturnItemCollectionMetrics;
    readonly returnValues?: ReturnValues.NONE | ReturnValues.ALL_OLD;
    readonly returnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
    readonly tableName: string;
}

export interface DeleteOutput<T extends Attributes = Attributes> {
    readonly attributes: null | T;
    readonly consumedCapacity: null | ConsumedCapacity;
    readonly itemCollectionMetrics: null | ItemCollectionMetrics;
}
