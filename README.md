## Before Start

you should install blow deps before you start

- mysql
- redis

For Macos, you can use brew to install

```bash
brew install mysql@5.7
brew install redis
```

## Use Docker for develop env

```bash
docker-compose -f ./docker-compose-dev.yml up -d
```

## Starter

```bash
pnpm install
pnpm start:debug
```

## Production

```bash
pnpm build
pnpm start:prod
```

## Avaliable

* [X] auth jwt
* [X] prisma mysql
* [X] user

  * [X] register
  * [X] login
  * [X] logout
  * [X] info
* [X] logger
* [X] swagger
* [X] validator
* [X] throttler
* [X] redis
* [X] logger
* [X] file

  * [X] upload
  * [X] multiple upload
* [X] order

  * [X] pagination
  * [X] crud
