import {FindOperator} from "../";

/**
 * Find Options Operator.
 * Example: { someField: LessThanOrEqual(10) }
 */
export function LessThanOrEqual<T>(value: T|FindOperator<T>) {
    return new FindOperator("lessThanOrEqual", value);
}
