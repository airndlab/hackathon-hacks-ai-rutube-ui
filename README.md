# Web UI + User Context

This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It solves two main tasks:

1. serves static files for clients' UI app
2. stores user queries history linked to their sessions or userId (if exists)

History and user session creation enabled via [API routes](https://nextjs.org/docs/api-routes/introduction) that can be
accessed on:

* `POST /api/session` - creates session id, stores it at backend storage and sets it to cookies. Optional query param
  is `userId` to create session for this user and access its' history (e.g. `POST /api/session?userId=123`)
* `GET /api/history` - returns list of user queries or empty list
* `PUT /api/history` - puts to users' history query, passed with query params (e.g. `PUT /api/history?query=query`)
* `DELETE /api/history` - removes from users' history query, passed with query params (
  e.g. `DELETE /api/history?query=query`)

User resolves by cookies that store user session id.

## Getting Started Development

Before steps, be sure that you enable to use `yarn` v3 (e.g. v.3.5.1)

First, install dependencies:

```bash
yarn install
```

Second, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment and Integrations

With GitHub Actions, application builds into docker image, that based on `node:20.9.0-alpine3.18` and exposes
port `3000`

As backend storage, application uses json files, stored at filesystem, that recreates on each docker build.

Application works at two different modes depending on `env`:

1. if environment variable named `NEXT_PUBLIC_BACKEND_HOST` exists, then application sends next requests at that host:
    1. `GET NEXT_PUBLIC_BACKEND_HOST/suggests/query`, where `query` is any user search query that needs suggestions for
       search autocomplete. Application awaits as a response list of objects of type SearchSuggest like this:
       `{ title: string, type: 'FROM_HISTORY' | 'FROM_SEARCH'}`, where%
        1. `title` is a suggestion itself
        2. `type` is a suggestion type - `'FROM_HISTORY'`, that means user already searched this, or `'FROM_SEARCH'`
           that means search engine suggest on users' query
    2. `POST NEXT_PUBLIC_BACKEND_HOST/search`, as a body of request app sends object of type SearchRequest. Application
       awaits as a response object of type SearchResponse
    3. `POST NEXT_PUBLIC_BACKEND_HOST/searchMore`, almost the same method as previous (`search`), but used for loading
       more videos, relevant to search request, according to `startIndex` and `stopIndex` parameters of search request.
       They bound range of results need to be fetched like kinda sort of pagination but for infinite result list.
2. if environment variable named `NEXT_PUBLIC_BACKEND_HOST` is missing, then application search videos from YouTube
