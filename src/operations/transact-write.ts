import { ConditionExpressionType, Expression, ExpressionType } from '../expression.js';
import { ConsumedCapacity, Item, ItemCollectionMetricsMap, Key, ReturnConsumedCapacity, ReturnItemCollectionMetrics, ReturnValuesOnConditionCheckFailure } from './types.js';

export enum TransactWriteItemType {
    CONDITION_CHECK,
    DELETE,
    PUT,
    UPDATE,
}

interface Typed<T extends TransactWriteItemType> {
    readonly type: T;
}

export interface TransactConditionCheck extends Typed<TransactWriteItemType.CONDITION_CHECK> {
    readonly conditionExpression: Expression<ConditionExpressionType>;
    readonly key: Key;
    readonly returnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
    readonly tableName: string;
}

export interface TransactDelete extends Typed<TransactWriteItemType.DELETE> {
    readonly conditionExpression?: Expression<ConditionExpressionType>;
    readonly key: Key;
    readonly returnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
    readonly tableName: string;
}

export interface TransactPut extends Typed<TransactWriteItemType.PUT> {
    readonly conditionExpression?: Expression<ConditionExpressionType>;
    readonly item: Item;
    readonly returnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
    readonly tableName: string;
}

export interface TransactUpdate extends Typed<TransactWriteItemType.UPDATE> {
    readonly conditionExpression?: Expression<ConditionExpressionType>;
    readonly key: Key;
    readonly returnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
    readonly tableName: string;
    readonly updateExpression: Expression<ExpressionType.UPDATE>;
}

export type TransactWriteItem = TransactConditionCheck | TransactDelete | TransactPut | TransactUpdate;

export interface TransactWriteInput {
    readonly clientRequestToken?: string;
    readonly returnConsumedCapacity?: ReturnConsumedCapacity;
    readonly returnItemCollectionMetrics?: ReturnItemCollectionMetrics;
    readonly transactItems: ReadonlyArray<TransactWriteItem>;
}

export interface TransactWriteOutput {
    readonly consumedCapacity: null | ReadonlyArray<ConsumedCapacity>;
    readonly itemCollectionMetrics: null | ItemCollectionMetricsMap;
}
