export enum ReturnConsumedCapacity {
    INDEXES = 'INDEXES',
    TOTAL = 'TOTAL',
    NONE = 'NONE',
}

export interface Capacity {
    readonly capacityUnits: number;
    readonly readCapacityUnits: null | number;
    readonly writeCapacityUnits: null | number;
}

export interface ConsumedCapacity extends Capacity {
    readonly globalSecondaryIndexes: null | Readonly<Record<string, Capacity>>;
    readonly localSecondaryIndexes: null | Readonly<Record<string, Capacity>>;
    readonly table: null | Capacity;
    readonly tableName: string;
}

export type Key = Readonly<Record<string, unknown>>;

export type Item = Readonly<Record<string, unknown>>;

export type Attributes = Readonly<Record<string, unknown>>;

export enum ReturnItemCollectionMetrics {
    SIZE = 'SIZE',
    NONE = 'NONE',
}

export enum ReturnValues {
    ALL_NEW = 'ALL_NEW',
    ALL_OLD = 'ALL_OLD',
    NONE = 'NONE',
    UPDATED_NEW = 'UPDATED_NEW',
    UPDATED_OLD = 'UPDATED_OLD',
}

export enum ReturnValuesOnConditionCheckFailure {
    ALL_OLD = 'ALL_OLD',
    NONE = 'NONE',
}

export interface ItemCollectionMetrics {
    readonly itemCollectionKey: Key;
    readonly sizeEstimateRangeGB: readonly [number, number];
}

export enum Select {
    ALL_ATTRIBUTES = 'ALL_ATTRIBUTES',
    ALL_PROJECTED_ATTRIBUTES = 'ALL_PROJECTED_ATTRIBUTES',
    COUNT = 'COUNT',
    SPECIFIC_ATTRIBUTES = 'SPECIFIC_ATTRIBUTES',
}
