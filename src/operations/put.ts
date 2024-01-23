import { ConditionExpressionType, Expression } from '../expression.js';
import { Attributes, ConsumedCapacity, Item, ItemCollectionMetrics, ReturnConsumedCapacity, ReturnItemCollectionMetrics, ReturnValues, ReturnValuesOnConditionCheckFailure } from './types.js';

export interface PutInput {
    readonly conditionExpression?: Expression<ConditionExpressionType>;
    readonly item: Item;
    readonly returnConsumedCapacity?: ReturnConsumedCapacity;
    readonly returnItemCollectionMetrics?: ReturnItemCollectionMetrics;
    readonly returnValues?: ReturnValues.NONE | ReturnValues.ALL_OLD;
    readonly returnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
    readonly tableName: string;
}

export interface PutOutput<T extends Attributes = Attributes> {
    readonly attributes: null | T;
    readonly consumedCapacity: null | ConsumedCapacity;
    readonly itemCollectionMetrics: null | ItemCollectionMetrics;
}
