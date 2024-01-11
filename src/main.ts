import { BaseSettings, string, number, nullable, boolean } from "./index"

@BaseSettings()
class Settings {
    @string POSTGRES_USER: string;
    @string POSTGRES_PASSWORD: string;
    @nullable @string POSTGRES_DB?: string;
    @string POSTGRES_HOST: string;
    @number POSTGRES_PORT: number;
}

export const settings = new Settings()

console.log(settings.POSTGRES_USER)
console.log(settings.POSTGRES_PASSWORD)
console.log(settings.POSTGRES_DB)
console.log(settings.POSTGRES_HOST)
console.log(settings.POSTGRES_PORT)
