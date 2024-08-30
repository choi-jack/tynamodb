# TynamoDB

An abstracted DynamoDB document client and expression dsl.

## Getting Started

This package is based on the AWS SDK for JavaScript v3. For more information about AWS SDK, please check the official documentation.

- <https://github.com/aws/aws-sdk-js-v3>
- <https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-dynamodb>
- <https://github.com/aws/aws-sdk-js-v3/tree/main/lib/lib-dynamodb>

### Prerequisites

The following versions of Node.js and TypeScript are required:

- Node.js 20 or higher
- TypeScript 4.7 or higher

This package is [pure ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c), and you must configure your project to use the ESM package.

### Installation

```sh
npm install tynamodb @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

## Usage

First you need to create a client.

```typescript
import { TynamoDB } from 'tynamodb';

const tynamodb: TynamoDB = new TynamoDB();
```

Instead of using the default configuration, you can configure the client yourself.

```typescript
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { TynamoDB } from 'tynamodb';

const client: DynamoDBClient = new DynamoDBClient({ ... });
const documentClient: DynamoDBDocument = DynamoDBDocument.from(client, { ... });
const tynamodb: TynamoDB = new TynamoDB(documentClient);
```

You can call operations with expression dsl.

```typescript
import { attribute, value } from 'tynamodb';

await tynamodb.put({
    tableName: 'example',
    item: {
        key: 'value',
        foo: 'bar',
    },
    conditionExpression: attribute('key').notExists(),
});
```

### Expression DSL

Expression dsl makes it easy to write expressions and handle placeholders easily.

```typescript
import { and, attribute, update, value } from 'tynamodb';

await tynamodb.update({
    tableName: 'example',
    key: {
        key: 'value',
    },
    conditionExpression: and(
        attribute('foo').equal(value('bar')),
        attribute('foo').notEqual(value('baz')),
    ),
    updateExpression: update(
        attribute('foo').set(value('baz')),
    ),
});
```

Duplicate expression attribute names and values ​​are automatically optimized as follows:

```typescript
{
    ConditionExpression: '#0 = :0 AND #0 <> :1',
    UpdateExpression: 'SET #0 = :1',
    ExpressionAttributeNames: {
        '#0': 'foo',
    },
    ExpressionAttributeValues: {
        ':0': 'bar',
        ':1': 'baz',
    },
}
```

If you are not using the TynamoDB client, you must evaluate the expression yourself, as follows:

```typescript
import { ExpressionAttributeNames, ExpressionAttributeValues, and, attribute, update, value } from 'tynamodb';

const conditionExpression: Expression = and(
    attribute('foo').equal(value('bar')),
    attribute('foo').notEqual(value('baz')),
);
const updateExpression: Expression = update(
    attribute('foo').set(value('baz')),
);

const names: ExpressionAttributeNames = new ExpressionAttributeNames();
const values: ExpressionAttributeValues = new ExpressionAttributeValues();

expect(conditionExpression.evaluate(names, values)).toBe('#0 = :0 AND #0 <> :1');
expect(updateExpression.evaluate(names, values)).toBe('SET #0 = :1');

expect(names.serialize()).toStrictEqual({
    '#0': 'foo',
});
expect(values.serialize()).toStrictEqual({
    ':0': 'bar',
    ':1': 'baz',
});
```

Expression dsl prevents invalid expressions from being written. For example, the following code fails to compile:

```typescript
import { attribute, update, value } from 'tynamodb';

update(
    attribute('foo').equal(value('bar')),
);
```

Nested attribute expressions and attribute expressions containing special characters can be created as follows:

```typescript
attribute('a', 'b', 0, 'c', 1, 2, 'd.e', '34');
```

Created attribute expression are evaluated as follows:

```typescript
{
    Expression: '#0.#1[0].#2[1][2].#3.#4',
    ExpressionAttributeNames: {
        '#0': 'a',
        '#1': 'b',
        '#2': 'c',
        '#3': 'd.e',
        '#4': '34',
    },
}
```

## License

Distributed under the MIT License. See the [LICENSE](https://github.com/choi-jack/tynamodb/blob/main/LICENSE) file for more details.
