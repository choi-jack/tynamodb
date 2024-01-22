import { ExpressionAttributeNames, ExpressionAttributeValues } from './placeholder.js';

export interface Evaluable {
    evaluate(names: ExpressionAttributeNames, values: ExpressionAttributeValues): string;
}
