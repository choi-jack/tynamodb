import { Capacity as DynamoDBCapacity, DynamoDBClient, ConsumedCapacity as DynamoDBConsumedCapacity, ItemCollectionMetrics as DynamoDBItemCollectionMetrics } from '@aws-sdk/client-dynamodb';
import { DeleteCommandOutput, DynamoDBDocument, GetCommandOutput, PutCommandOutput, QueryCommandOutput, ScanCommandOutput, UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';

import { Expression, ExpressionAttributeNames, ExpressionAttributeValues } from './expression.js';
import { Capacity, ConsumedCapacity, DeleteInput, DeleteOutput, GetInput, GetOutput, Item, ItemCollectionMetrics, Key, PutInput, PutOutput, QueryInput, QueryOutput, ScanInput, ScanOutput, UpdateInput, UpdateOutput } from './operations.js';

type DynamoDBUnmarshalledItemCollectionMetrics = Omit<DynamoDBItemCollectionMetrics, 'ItemCollectionKey'> & {
    readonly ItemCollectionKey?: Key;
};

export class TynamoDB {
    private readonly client: DynamoDBDocument;

    public constructor(client?: null | DynamoDBDocument) {
        this.client = client ?? DynamoDBDocument.from(new DynamoDBClient());
    }

    private evaluateExpression(expression: undefined | Expression, names: ExpressionAttributeNames, values: ExpressionAttributeValues): undefined | string {
        if (expression === undefined) {
            return undefined;
        }

        return expression.evaluate(names, values);
    }

    private sanitize<T>(value: unknown): null | T {
        if (value === undefined) {
            return null;
        }

        return value as T;
    }

    private mapCapacity(capacity: DynamoDBCapacity): Capacity;
    private mapCapacity(capacity: undefined | DynamoDBCapacity): null | Capacity;
    private mapCapacity(capacity: undefined | DynamoDBCapacity): null | Capacity {
        if (capacity === undefined) {
            return null;
        }

        return {
            capacityUnits: capacity.CapacityUnits!,
            readCapacityUnits: capacity.ReadCapacityUnits ?? null,
            writeCapacityUnits: capacity.WriteCapacityUnits ?? null,
        };
    }

    private mapIndexCapacities(indexCapacities: undefined | Readonly<Record<string, DynamoDBCapacity>>): null | Readonly<Record<string, Capacity>> {
        if (indexCapacities === undefined) {
            return null;
        }

        return Object.fromEntries(
            Object
                .entries(indexCapacities)
                .map(([indexName, capacity]: [string, DynamoDBCapacity]): [string, Capacity] => [
                    indexName,
                    this.mapCapacity(capacity),
                ]),
        );
    }

    private mapConsumedCapacity(consumedCapacity: undefined | DynamoDBConsumedCapacity): null | ConsumedCapacity {
        if (consumedCapacity === undefined) {
            return null;
        }

        return {
            ...this.mapCapacity(consumedCapacity),
            globalSecondaryIndexes: this.mapIndexCapacities(consumedCapacity.GlobalSecondaryIndexes),
            localSecondaryIndexes: this.mapIndexCapacities(consumedCapacity.LocalSecondaryIndexes),
            table: this.mapCapacity(consumedCapacity.Table),
            tableName: consumedCapacity.TableName!,
        };
    }

    private mapItemCollectionMetrics(itemCollectionMetrics: undefined | DynamoDBUnmarshalledItemCollectionMetrics): null | ItemCollectionMetrics {
        if (itemCollectionMetrics === undefined) {
            return null;
        }

        return {
            itemCollectionKey: itemCollectionMetrics.ItemCollectionKey!,
            sizeEstimateRangeGB: itemCollectionMetrics.SizeEstimateRangeGB! as unknown as readonly [number, number],
        };
    }

    public async get<T extends Item = Item>(input: GetInput): Promise<GetOutput<T>> {
        const names: ExpressionAttributeNames = new ExpressionAttributeNames();
        const values: ExpressionAttributeValues = new ExpressionAttributeValues();

        const output: GetCommandOutput = await this.client.get({
            Key: input.key,
            TableName: input.tableName,
            ConsistentRead: input.consistentRead,
            ProjectionExpression: this.evaluateExpression(input.projectionExpression, names, values),
            ReturnConsumedCapacity: input.returnConsumedCapacity,

            ExpressionAttributeNames: names.serialize(),
        });

        return {
            consumedCapacity: this.mapConsumedCapacity(output.ConsumedCapacity),
            item: this.sanitize(output.Item),
        };
    }

    public async put<T extends Item = Item>(input: PutInput): Promise<PutOutput<T>> {
        const names: ExpressionAttributeNames = new ExpressionAttributeNames();
        const values: ExpressionAttributeValues = new ExpressionAttributeValues();

        const output: PutCommandOutput = await this.client.put({
            ConditionExpression: this.evaluateExpression(input.conditionExpression, names, values),
            Item: input.item,
            ReturnConsumedCapacity: input.returnConsumedCapacity,
            ReturnItemCollectionMetrics: input.returnItemCollectionMetrics,
            ReturnValues: input.returnValues,
            ReturnValuesOnConditionCheckFailure: input.returnValuesOnConditionCheckFailure,
            TableName: input.tableName,

            ExpressionAttributeNames: names.serialize(),
            ExpressionAttributeValues: values.serialize(),
        });

        return {
            attributes: this.sanitize(output.Attributes),
            consumedCapacity: this.mapConsumedCapacity(output.ConsumedCapacity),
            itemCollectionMetrics: this.mapItemCollectionMetrics(output.ItemCollectionMetrics),
        };
    }

    public async update<T extends Item = Item>(input: UpdateInput): Promise<UpdateOutput<T>> {
        const names: ExpressionAttributeNames = new ExpressionAttributeNames();
        const values: ExpressionAttributeValues = new ExpressionAttributeValues();

        const output: UpdateCommandOutput = await this.client.update({
            ConditionExpression: this.evaluateExpression(input.conditionExpression, names, values),
            Key: input.key,
            ReturnConsumedCapacity: input.returnConsumedCapacity,
            ReturnItemCollectionMetrics: input.returnItemCollectionMetrics,
            ReturnValues: input.returnValues,
            ReturnValuesOnConditionCheckFailure: input.returnValuesOnConditionCheckFailure,
            TableName: input.tableName,
            UpdateExpression: this.evaluateExpression(input.updateExpression, names, values),

            ExpressionAttributeNames: names.serialize(),
            ExpressionAttributeValues: values.serialize(),
        });

        return {
            attributes: this.sanitize(output.Attributes),
            consumedCapacity: this.mapConsumedCapacity(output.ConsumedCapacity),
            itemCollectionMetrics: this.mapItemCollectionMetrics(output.ItemCollectionMetrics),
        };
    }

    public async delete<T extends Item = Item>(input: DeleteInput): Promise<DeleteOutput<T>> {
        const names: ExpressionAttributeNames = new ExpressionAttributeNames();
        const values: ExpressionAttributeValues = new ExpressionAttributeValues();

        const output: DeleteCommandOutput = await this.client.delete({
            ConditionExpression: this.evaluateExpression(input.conditionExpression, names, values),
            Key: input.key,
            ReturnConsumedCapacity: input.returnConsumedCapacity,
            ReturnItemCollectionMetrics: input.returnItemCollectionMetrics,
            ReturnValues: input.returnValues,
            ReturnValuesOnConditionCheckFailure: input.returnValuesOnConditionCheckFailure,
            TableName: input.tableName,

            ExpressionAttributeNames: names.serialize(),
            ExpressionAttributeValues: values.serialize(),
        });

        return {
            attributes: this.sanitize(output.Attributes),
            consumedCapacity: this.mapConsumedCapacity(output.ConsumedCapacity),
            itemCollectionMetrics: this.mapItemCollectionMetrics(output.ItemCollectionMetrics),
        };
    }

    public async query<T extends Item = Item>(input: QueryInput): Promise<QueryOutput<T>> {
        const names: ExpressionAttributeNames = new ExpressionAttributeNames();
        const values: ExpressionAttributeValues = new ExpressionAttributeValues();

        const output: QueryCommandOutput = await this.client.query({
            ConsistentRead: input.consistentRead,
            ExclusiveStartKey: input.exclusiveStartKey,
            FilterExpression: this.evaluateExpression(input.filterExpression, names, values),
            IndexName: input.indexName,
            KeyConditionExpression: this.evaluateExpression(input.keyConditionExpression, names, values),
            Limit: input.limit,
            ProjectionExpression: this.evaluateExpression(input.projectionExpression, names, values),
            ReturnConsumedCapacity: input.returnConsumedCapacity,
            ScanIndexForward: input.scanIndexForward,
            Select: input.select,
            TableName: input.tableName,

            ExpressionAttributeNames: names.serialize(),
            ExpressionAttributeValues: values.serialize(),
        });

        return {
            consumedCapacity: this.mapConsumedCapacity(output.ConsumedCapacity),
            count: output.Count!,
            items: output.Items! as ReadonlyArray<T>,
            lastEvaluatedKey: this.sanitize(output.LastEvaluatedKey),
            scannedCount: output.ScannedCount!,
        };
    }

    public async scan<T extends Item = Item>(input: ScanInput): Promise<ScanOutput<T>> {
        const names: ExpressionAttributeNames = new ExpressionAttributeNames();
        const values: ExpressionAttributeValues = new ExpressionAttributeValues();

        const output: ScanCommandOutput = await this.client.scan({
            ConsistentRead: input.consistentRead,
            ExclusiveStartKey: input.exclusiveStartKey,
            FilterExpression: this.evaluateExpression(input.filterExpression, names, values),
            IndexName: input.indexName,
            Limit: input.limit,
            ProjectionExpression: this.evaluateExpression(input.projectionExpression, names, values),
            ReturnConsumedCapacity: input.returnConsumedCapacity,
            Segment: input.segment,
            Select: input.select,
            TableName: input.tableName,
            TotalSegments: input.totalSegments,

            ExpressionAttributeNames: names.serialize(),
            ExpressionAttributeValues: values.serialize(),
        });

        return {
            consumedCapacity: this.mapConsumedCapacity(output.ConsumedCapacity),
            count: output.Count!,
            items: output.Items! as ReadonlyArray<T>,
            lastEvaluatedKey: this.sanitize(output.LastEvaluatedKey),
            scannedCount: output.ScannedCount!,
        };
    }
}
