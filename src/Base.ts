import path from "path"
import fs from "fs"

import { ISalSettingsConfig } from "./types"
import { state } from "./state"
import { ValueType } from "./enum"

const SalSettings = (config?: ISalSettingsConfig) => <T extends {new(...args: any[]):{}}>(constructor: T) => {
    const { filePath = "./", fileName = ".env" } = config || {};
    const corePath = filePath ? path.join(filePath) : path.dirname("."); 
    try {
        const envFile = fs.readFileSync(filePath + fileName, {
            encoding: "utf-8"
        })

        // Split the env per line
        const perLineEntries = envFile.split('\n');

        // Remove Comments
        const commentsRemoved = perLineEntries.filter(entry => !entry.startsWith('#'))

        // Create list of lists where index 0 is key & index 1 is value i: e [['Key', 'Val'], ['Key', 'Val']]
        const list: string[][] = commentsRemoved.map(value => value.split('='))

        // Assign variables to process.env & settings instance
        for(const [key, value] of list) {
            let assignableValue: any = value
            if(state.map[key]) {
                const validationRuleList = state.map[key];
                if(validationRuleList.includes(ValueType.NULLABLE) && !value) {}
                else for(const type of validationRuleList) {
                    if(type === ValueType.NUMBER) {
                        assignableValue = +value
                        if(Number.isNaN(assignableValue))
                            throw new Error(`${key} has invalid type ${typeof value}. It must be number.`)
                    }
                    else if(type === ValueType.BOOLEAN) {
                        const boolmap: Record<string, boolean> = {
                            "true": true,
                            "false": false,
                        }
                        assignableValue = boolmap[value.trim()]
                        if(assignableValue === undefined) {
                            throw new Error(`${key} has invalid type ${typeof value}. It must be boolean.`)
                        }
                    }
                    else if(type === ValueType.STRING) {
                        const boolmap: Record<string, boolean> = {
                            "true": true,
                            "false": false,
                        }
                        if(!value || !Number.isNaN(+value))
                            throw new Error(`${key} has invalid type ${typeof value}. It must be string.`)
                        else if (boolmap[value])
                            throw new Error(`${key} has invalid type boolean. It must be string.`)
                    }
                }
            }
            process.env[key] = assignableValue;
            constructor.prototype[key] = assignableValue;
        }
    } catch (error: any) {
        if(error?.message?.includes("has invalid type")) {
            throw error
        }
        throw new Error(`Env file not found at: ${corePath}`)
    }
}

export default SalSettings
