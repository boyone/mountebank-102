# Create Your Own Plugin

## Define Protocol

1. Create a protocol configuration file call `protocol.json`

   ```json
   {
     "http": {
       "createCommand": "node http.js",
       "testRequest": {
         "method": "GET",
         "path": "/",
         "query": {},
         "headers": {},
         "form": {},
         "body": ""
       },
       "testProxyResponse": {
         "statusCode": 200,
         "headers": {},
         "body": ""
       }
     },
     "foo": {
       "createCommand": "java foo"
     }
   }
   ```

2. Start plugin with `--protofile` options

   ```sh
   mb --protofile protocols.json
   ```

   The most important field is the `createCommand`, which tells mountebank the command line information needed to start a new instance of the protocol.

   The other two fields are `optional` and used for `validation`. When a new imposter is created, `mountebank performs a dry run of the creation, testing all predicates and responses to make sure none of them return an error`. The `testRequest` and `testProxyResponse` fields should model the protocol-specific request and response format, which will be used during the dry run. Adding them makes that validation more robust.

3. Create `imposter.json` file, then start `mb`

   ```json
   {
     "port": 4545,
     "protocol": "foo"
   }
   ```

   ```sh
   mb --protofile protocols.json --configfile imposter.json
   ```
