# emailParser

//Function emailBodyParser() can be expand for diffrent mimeTypes and be decoded base on them
//In this example I found html version with Quoted-Printable encoding
//that data can be decoded and body of email can be represented as regular html page
//Same can be done with base64 encoding and so on

Possible future improvements:
//Next step would be increase amount of possible encoding and handle them depend on your needs
//Also a big part of that application have to be looking for inside MIME nodes
//As well as count them to preven memory leaking and crash
