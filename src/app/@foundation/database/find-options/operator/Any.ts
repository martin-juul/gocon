import {FindOperator} from "../";

/**
 * Find Options Operator.
 * Example: { someField: Any([...]) }
 */
export function Any<T>(value: T[]|FindOperator<T>) {
    return new FindOperator("any", value as any);
}