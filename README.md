# Nested Comments POC

poc of nested comments.


<details>
<summary>View Screenshot</summary>

![screenshot](https://user-images.githubusercontent.com/62257716/282594542-23aac85e-d080-4a03-ac2d-266b04c8d84d.png)

</details>


## How to run

```sh
cd client
npm install
npm run dev
```

```sh
cd server
npm install
npm run devStart

```

## Required Environment Variables

```sh
DATABASE_URL=postgres://{USER}:{PASSWORD}@{SERVER_NAME}:5432/{DB_NAME}?schema=public

COOKIE_SECRET={w/e cool cookie secret you want}

PORT={####}

# optional
PGHOST
PGUSER
PGPORT
PGDATABASE
PGPASSWORD

```

