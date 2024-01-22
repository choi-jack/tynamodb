export enum ExpressionType {
    ATTRIBUTE,
    VALUE,

    EQUAL,
    NOT_EQUAL,
    LESS,
    LESS_EQUAL,
    GREATER,
    GREATER_EQUAL,
    BETWEEN,
    IN,

    ATTRIBUTE_EXISTS_FUNCTION,
    ATTRIBUTE_NOT_EXISTS_FUNCTION,
    ATTRIBUTE_TYPE_FUNCTION,
    BEGINS_WITH_FUNCTION,
    CONTAINS_FUNCTION,
    SIZE_FUNCTION,

    AND,
    OR,
    NOT,
    PARENTHESIZED,

    UPDATE,
    SET,
    PLUS,
    MINUS,
    LIST_APPEND_FUNCTION,
    IF_NOT_EXISTS_FUNCTION,
    REMOVE,
    ADD,
    DELETE,

    PROJECTION,
}

export type ConditionExpressionType
    = ExpressionType.EQUAL
    | ExpressionType.NOT_EQUAL
    | ExpressionType.LESS
    | ExpressionType.LESS_EQUAL
    | ExpressionType.GREATER
    | ExpressionType.GREATER_EQUAL
    | ExpressionType.BETWEEN
    | ExpressionType.IN

    | ExpressionType.ATTRIBUTE_EXISTS_FUNCTION
    | ExpressionType.ATTRIBUTE_NOT_EXISTS_FUNCTION
    | ExpressionType.ATTRIBUTE_TYPE_FUNCTION
    | ExpressionType.BEGINS_WITH_FUNCTION
    | ExpressionType.CONTAINS_FUNCTION

    | ExpressionType.AND
    | ExpressionType.OR
    | ExpressionType.NOT
    | ExpressionType.PARENTHESIZED;
