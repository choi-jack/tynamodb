import { ConditionExpressionType, Expression, ExpressionType } from '../expression.js';
import { Attributes, ConsumedCapacity, ItemCollectionMetrics, Key, ReturnConsumedCapacity, ReturnItemCollectionMetrics, ReturnValues, ReturnValuesOnConditionCheckFailure } from './types.js';

export interface UpdateInput {
    readonly conditionExpression?: Expression<ConditionExpressionType>;
    readonly key: Key;
    readonly returnConsumedCapacity?: ReturnConsumedCapacity;
    readonly returnItemCollectionMetrics?: ReturnItemCollectionMetrics;
    readonly returnValues?: ReturnValues;
    readonly returnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
    readonly tableName: string;
    readonly updateExpression?: Expression<ExpressionType.UPDATE>;
}

export interface UpdateOutput<T extends Attributes = Attributes> {
    readonly attributes: null | T;
    readonly consumedCapacity: null | ConsumedCapacity;
    readonly itemCollectionMetrics: null | ItemCollectionMetrics;
}
