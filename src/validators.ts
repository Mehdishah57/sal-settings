import { ValueType } from "./enum"
import { state } from "./state"

const validator = (type: ValueType) => (target: any, propertyKey: string) => {
    if(!state.map[propertyKey]) state.map[propertyKey] = [type]
    else state.map[propertyKey].push(type)
}

export const string = validator(ValueType.STRING)
export const number = validator(ValueType.NUMBER)
export const boolean = validator(ValueType.BOOLEAN)
export const nullable = validator(ValueType.NULLABLE)
