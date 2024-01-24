import { beforeEach, describe, expect, test } from '@jest/globals';

import { AttributeType, Expression, ExpressionAttributeNames, ExpressionAttributeValues, and, attribute, not, or, parenthesize, project, update, value } from '../src/index.js';

describe('expression', (): void => {
    let names: ExpressionAttributeNames;
    let values: ExpressionAttributeValues;

    function expression(expected: string, expression: Expression): void {
        expect(expression.evaluate(names, values)).toBe(expected);
    }

    function placeholders(expectedNames: Readonly<Record<string, string>>, expectedValues: Readonly<Record<string, unknown>>): void {
        expect(names.serialize() ?? {}).toStrictEqual(expectedNames);
        expect(values.serialize() ?? {}).toStrictEqual(expectedValues);
    }

    beforeEach((): void => {
        names = new ExpressionAttributeNames();
        values = new ExpressionAttributeValues();
    });

    test('names', (): void => {
        const names: ExpressionAttributeNames = ExpressionAttributeNames.deserialize({
            '#0': 'a',
        });

        expect(names.add('a')).toBe('#0');
        expect(names.add('b')).toBe('#1');
    });

    test('values', (): void => {
        const values: ExpressionAttributeValues = ExpressionAttributeValues.deserialize({
            ':0': 1,
        });

        expect(values.add(1)).toBe(':0');
        expect(values.add(2)).toBe(':1');
    });

    test('attribute', (): void => {
        expression('#0', attribute('a'));
        expression('#0[0]', attribute('a', 0));
        expression('#0.#1', attribute('a', 'b'));

        expression('#2', attribute('a[0]'));
        expression('#3', attribute('a.b'));

        placeholders({
            '#0': 'a',
            '#1': 'b',
            '#2': 'a[0]',
            '#3': 'a.b',
        }, {});
    });

    test('size', (): void => {
        expression('size (#0)', attribute('a').size());
        expression('size (:0)', value([1]).size());

        placeholders({
            '#0': 'a',
        }, {
            ':0': [1],
        });
    });

    test('projection', (): void => {
        expression('#0, #1', project(attribute('a'), attribute('b')));

        placeholders({
            '#0': 'a',
            '#1': 'b',
        }, {});
    });

    describe('condition', (): void => {
        test('equal', (): void => {
            expression('#0 = :0', attribute('a').equal(value(1)));
            expression(':0 = :0', value(1).equal(value(1)));
            expression('size (#0) = :1', attribute('a').size().equal(value(2)));

            placeholders({
                '#0': 'a',
            }, {
                ':0': 1,
                ':1': 2,
            });
        });

        test('not-equal', (): void => {
            expression('#0 <> :0', attribute('a').notEqual(value(1)));
            expression(':0 <> :0', value(1).notEqual(value(1)));
            expression('size (#0) <> :1', attribute('a').size().notEqual(value(2)));

            placeholders({
                '#0': 'a',
            }, {
                ':0': 1,
                ':1': 2,
            });
        });

        test('less', (): void => {
            expression('#0 < :0', attribute('a').less(value(1)));
            expression(':0 < :0', value(1).less(value(1)));
            expression('size (#0) < :1', attribute('a').size().less(value(2)));

            placeholders({
                '#0': 'a',
            }, {
                ':0': 1,
                ':1': 2,
            });
        });

        test('less-equal', (): void => {
            expression('#0 <= :0', attribute('a').lessEqual(value(1)));
            expression(':0 <= :0', value(1).lessEqual(value(1)));
            expression('size (#0) <= :1', attribute('a').size().lessEqual(value(2)));

            placeholders({
                '#0': 'a',
            }, {
                ':0': 1,
                ':1': 2,
            });
        });

        test('greater', (): void => {
            expression('#0 > :0', attribute('a').greater(value(1)));
            expression(':0 > :0', value(1).greater(value(1)));
            expression('size (#0) > :1', attribute('a').size().greater(value(2)));

            placeholders({
                '#0': 'a',
            }, {
                ':0': 1,
                ':1': 2,
            });
        });

        test('greater-equal', (): void => {
            expression('#0 >= :0', attribute('a').greaterEqual(value(1)));
            expression(':0 >= :0', value(1).greaterEqual(value(1)));
            expression('size (#0) >= :1', attribute('a').size().greaterEqual(value(2)));

            placeholders({
                '#0': 'a',
            }, {
                ':0': 1,
                ':1': 2,
            });
        });

        test('between', (): void => {
            expression('#0 BETWEEN :0 AND :1', attribute('a').between(value(1), value(2)));
            expression(':0 BETWEEN :0 AND :1', value(1).between(value(1), value(2)));
            expression('size (#0) BETWEEN :0 AND :1', attribute('a').size().between(value(1), value(2)));

            placeholders({
                '#0': 'a',
            }, {
                ':0': 1,
                ':1': 2,
            });
        });

        test('in', (): void => {
            expression('#0 IN (:0)', attribute('a').in([value(1)]));
            expression(':0 IN (:0, :1)', value(1).in([value(1), value(2)]));
            expression('size (#0) IN (:0, :1, :2)', attribute('a').size().in([value(1), value(2), value(3)]));

            placeholders({
                '#0': 'a',
            }, {
                ':0': 1,
                ':1': 2,
                ':2': 3,
            });
        });

        test('attribute-exists', (): void => {
            expression('attribute_exists (#0)', attribute('a').exists());

            placeholders({
                '#0': 'a',
            }, {});
        });

        test('attribute-not-exists', (): void => {
            expression('attribute_not_exists (#0)', attribute('a').notExists());

            placeholders({
                '#0': 'a',
            }, {});
        });

        test('attribute-type', (): void => {
            expression('attribute_type (#0, :0)', attribute('a').typeIs(AttributeType.BINARY));
            expression('attribute_type (:1, :2)', value(1).typeIs(AttributeType.BINARY_SET));

            placeholders({
                '#0': 'a',
            }, {
                ':0': AttributeType.BINARY,
                ':1': 1,
                ':2': AttributeType.BINARY_SET,
            });
        });

        test('begins-with', (): void => {
            expression('begins_with (#0, :0)', attribute('a').beginsWith(value('a')));
            expression('begins_with (:0, :0)', value('a').beginsWith(value('a')));

            placeholders({
                '#0': 'a',
            }, {
                ':0': 'a',
            });
        });

        test('contains', (): void => {
            expression('contains (#0, :0)', attribute('a').contains(value('a')));
            expression('contains (:0, :0)', value('a').contains(value('a')));

            placeholders({
                '#0': 'a',
            }, {
                ':0': 'a',
            });
        });

        test('and', (): void => {
            expression(
                '#0 = :0 AND #0 <> :0',
                and(
                    attribute('a').equal(value(1)),
                    attribute('a').notEqual(value(1)),
                ),
            );

            placeholders({
                '#0': 'a',
            }, {
                ':0': 1,
            });
        });

        test('or', (): void => {
            expression(
                '#0 = :0 OR #0 <> :0',
                or(
                    attribute('a').equal(value(1)),
                    attribute('a').notEqual(value(1)),
                ),
            );

            placeholders({
                '#0': 'a',
            }, {
                ':0': 1,
            });
        });

        test('not', (): void => {
            expression(
                'NOT #0 = :0',
                not(
                    attribute('a').equal(value(1)),
                ),
            );

            placeholders({
                '#0': 'a',
            }, {
                ':0': 1,
            });
        });

        test('parenthesize', (): void => {
            expression(
                '(#0 = :0)',
                parenthesize(
                    attribute('a').equal(value(1)),
                ),
            );

            placeholders({
                '#0': 'a',
            }, {
                ':0': 1,
            });
        });
    });

    describe('update', (): void => {
        describe('set', (): void => {
            test('plus', (): void => {
                expression(
                    'SET #0 = #0 + :0, #1 = :1 + #1',
                    update(
                        attribute('a').set(attribute('a').plus(value(1))),
                        attribute('b').set(value(2).plus(attribute('b'))),
                    ),
                );

                placeholders({
                    '#0': 'a',
                    '#1': 'b',
                }, {
                    ':0': 1,
                    ':1': 2,
                });
            });

            test('minus', (): void => {
                expression(
                    'SET #0 = #0 - :0, #1 = :1 - #1',
                    update(
                        attribute('a').set(attribute('a').minus(value(1))),
                        attribute('b').set(value(2).minus(attribute('b'))),
                    ),
                );

                placeholders({
                    '#0': 'a',
                    '#1': 'b',
                }, {
                    ':0': 1,
                    ':1': 2,
                });
            });

            test('list-append', (): void => {
                expression(
                    'SET #0 = list_append (#0, :0), #1 = list_append (:1, #1)',
                    update(
                        attribute('a').append(value([1])),
                        attribute('b').set(value([2]).concat(attribute('b'))),
                    ),
                );

                placeholders({
                    '#0': 'a',
                    '#1': 'b',
                }, {
                    ':0': [1],
                    ':1': [2],
                });
            });

            test('if-not-exists', (): void => {
                expression(
                    'SET #0 = if_not_exists (#0, :0)',
                    update(
                        attribute('a').set(attribute('a').orElse(value(1))),
                    ),
                );

                placeholders({
                    '#0': 'a',
                }, {
                    ':0': 1,
                });
            });
        });

        test('remove', (): void => {
            expression(
                'REMOVE #0',
                update(
                    attribute('a').remove(),
                ),
            );

            placeholders({
                '#0': 'a',
            }, {});
        });

        test('add', (): void => {
            expression(
                'ADD #0 :0',
                update(
                    attribute('a').add(value(new Set([1]))),
                ),
            );

            placeholders({
                '#0': 'a',
            }, {
                ':0': new Set([1]),
            });
        });

        test('delete', (): void => {
            expression(
                'DELETE #0 :0',
                update(
                    attribute('a').delete(value(new Set([1]))),
                ),
            );

            placeholders({
                '#0': 'a',
            }, {
                ':0': new Set([1]),
            });
        });
    });
});
