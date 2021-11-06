# Resthub (Redis branch)

The main code for Redis demonstration can be found at `/server/contactController.js` line 1-30.

## Running locally

### Connecting to local database

- Open command prompt
- Run ``mongod``
- Keep the command prompt open

Database connection can be checked using MongoDB Compass.

### Running the application

In `/server`, run

```
npm install
npm run devStart
```

Server would be running at http://localhost:8080

In `/client`, run

```
npm install
npm start
```

## Performance Improvement with Redis cache

In this implementation, we used `response-time` as middleware that adds `X-Response-Time` header to responses. We can check how long it takes for each request made and compare the performance improvements.

To demonstrate

- Keep redis-server running in background
- Run the GET request at `http://localhost:8080/api/contacts` in `requests.rest` It should return a response with `X-Response-Time` of 100-200ms.

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 174439
ETag: W/"2a967-ftg+zJS0XiHAYPa3GBhCtcOQyb0"
X-Response-Time: 220.119ms
Date: Sat, 06 Nov 2021 03:55:54 GMT
Connection: close

[
  {
    "_id": "613deef69e2b642cd6b5d291", ...
```

- Now that the first request is done, this response would have been cached into Redis. This can be verified in redis-cli:

```
127.0.0.1:6379> KEYS *
1) "contacts"
```

```
127.0.0.1:6379> GET contacts
"[{\"_id\":\"613deef69e2b642cd6b5d291\",\"create_date\":\"2021-...
```

- Run the request again. The response time should improve to 10-20ms.

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 174439
ETag: W/"2a967-ftg+zJS0XiHAYPa3GBhCtcOQyb0"
X-Response-Time: 6.215ms
Date: Sat, 06 Nov 2021 03:59:26 GMT
Connection: close

[
  {
    "_id": "613deef69e2b642cd6b5d291", ...
```

## Running tests

- Ensure `NODE_ENV` in `.env` file is set to `test`.
- Run `npm test`.
