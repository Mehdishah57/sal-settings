This library aims to facilitate using the env variables in a nodejs app..

To beign, you can import BaseSettings decorator from sal-settings and use it like this:

```ts
import { BaseSettings } from "sal-settings"
```

This decorator can be applied to any class with some properties:

```ts
@BaseSettings()
class Settings {}
```

In the settings class, now you can declare multiple properties:

```ts
@BaseSettings()
class Settings {
    POSTGRES_USER: string;
}
```

Now at runtime, it'll try to resolve the properties from `.env` file in root directory of project.
in case it is different i:e file name or file path are different, you can supply them in
BaseSettings like this:

```ts
@BaseSettings({
    fileName: '<your-env-file-name>',
    filePath: '<path-to-your-env-file>/'
})
class Settings {
    POSTGRES_USER: string
}
```

Now you can export its singleton and use it anywhere, with intellisense.

```ts
export const settings = new Settings()
```

If you're using some DI library / framework, you can always set this instance in container:

```ts
container.set(settings, Settings)
```

Then it can be auto injected in any constructors of components or services etc.

```ts
import { @Component } from "sal-core"

@Component
class UserService {
    constructor(
        private readonly settings: Settings
    ) {}
}
```

# Enviornment variable validations

Normally, a basic level validation is required for env variables i:e string. number, boolean, nullable etc.
And its a pain to write that code all by yourself isn't it? I mean its boring stuff mate.

Hence sal-settings provides you with some built-in validators and you can use them like this:

```ts
@BaseSettings()
class Settings {
    @string POSTGRES_USER: string;
    @number POSTGRES_PORT: number;
    @boolean ALLOW_SOMETHING: boolean;
    @nullable @string SECONDARY_EMAIL_ADDRESS?: string;
    @nullable @number OPTIONAL_PHONE_NUMBER?: number;
    @nullable @boolean ...    
}
```

this way, you'll enforce some constraints on your env variables which are good as it makes your
application more predictable.

