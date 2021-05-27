***Settings***
Library           Rammbock

***Test Cases***
Hello World
    Start TCP client    name=ExampleClient    protocol=GTPV2	
    connect    localhost    3000    name=ExampleClient
    Client sends binary    World!
    ${message}=    Server receives binary
    Should be equal    ${message}    Hello, World!