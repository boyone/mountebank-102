# Mountebank

## Start Mountebank HTTP

    ```sh
    mb start --configfile hello.json
    ```

### Stub HTTP Port: 3000

    - call stub

    ```sh
    curl --location --request GET 'http://localhost:3000'
    ```

### Mountebank HTTP Port: 2525

    - show stub configuration

    ```sh
    curl --location --request GET 'http://localhost:2525/imposters/3000'
    ```

    - call stub via mountebank

    ```sh
    curl --location --request POST 'http://localhost:2525/imposters/3000/_requests' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "request": {
            "method": "GET",
            "path": "/",
            "query": {},
            "headers": {},
            "form": {},
            "body": ""
        }
    }'
    ```

## Start Mountebank TCP

    ```sh
    mb start --configfile tcp.json --allowInjection
    ```

### Stub TCP Port: 3000

    - call stub

    ```sh
    curl --location --request GET 'http://localhost:3000'
    ```

### Mountebank TCP Port: 2525

    - show stub configuration

    ```sh
    curl --location --request GET 'http://localhost:2525/imposters/3000'
    ```

    - call stub via mountebank

    ```sh
    curl --location --request POST 'http://localhost:2525/imposters/3000/_requests' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "request": {
            "data": "World!"
        }
    }'
    ```

    - call stub via nc

    ```sh
    echo World! | nc localhost 3000
    ```
