# Simple Server

## Simple Server

- Start simple server

  ```sh
  node server.js
  ```

- call simple server via nc

  ```sh
  echo World! | nc localhost 3000
  Hello, World!
  ```

- How simple server work

```js
socket.on('data', (buffer) => {
  console.log(buffer);
  socket.write('Hello, ' + buffer);
});
```

## Request to Mountebank

- URL: [http://localhost:2525/imposters/3000/\_requests](http://localhost:2525/imposters/3000/_requests)
- Method: POST
- Headers: 'Content-Type: application/json'
- Body

  ```json
  {
    "request": {
      "data": "World!"
    }
  }
  ```

## Response from Mountebank

```json
{
  "data": "Hello, World!"
}
```
