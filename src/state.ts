import { ValueType } from "./enum"

class State {
    map: Record<string, ValueType[]> = {}
}

export const state = new State()