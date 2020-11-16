# JsonCrypt-RSA
[![npm version](https://img.shields.io/npm/v/jsoncrypt-rsa.svg?color=limegreen)](https://www.npmjs.com/package/jsoncrypt-rsa) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  [![Build Status](https://travis-ci.com/rajdeepiitkgp/JsonCrypt-RSA.svg?branch=main)](https://travis-ci.com/rajdeepiitkgp/JsonCrypt-RSA) 


JsonCrypt-RSA is a open source library for Encrypting the JSON Payload that is supposed to be transmitted over HTTP (POST, PUT, DELETE) from **Sender**(Frontend) and Decrypt the Payload at **Receiver**(Backend) and retrieve the Information.

The Encryption and Decryption is based on RSA Algorithm i.e the Payload will be Encrypted using RSA Public Key at Sender and the Payload will be Decrypted using RSA Private Key at the Receiver.

The Encryption and Decryption Logic is implemented by using [Node RSA](https://github.com/rzcoder/node-rsa)


## Workflow
To understand how this library works, lets take two Examples

### Example 1
A JSON Payload you want to send via HTTP POST Request For SignUp a User
```JSON
{
    "username": "raja786",
    "password": "Test5698"
}
```

### Example 2
A JSON Payload you want to send via HTTP POST Request for Transaction
```JSON
{
    "username": "raja786",
    "sessionId": "8796589ad89effaaed345",
    "accountNo": 25698751225221,
    "isDematAccount": false,
    "transactionAmount": 60000
}
```
Even though the network may be HTTPS/SSL so that outside attacker can't see the payload but sometimes you may want even the user shouldn't see the payload from the *Network tab of Browser Dev Tools*, or you don't have the SSL for your Web. So at that time **JsonCrypt-RSA** comes in.

After Encrypting using **JsonCrypt-RSA** with a RSA Public Key at Sender this two payload will look like below
```JSON
{
    "U1/Qrx1CQWhyK+2QkTwsl/U5oi4/Yl5siWSHe9r9qLaQJ1f29tGj+7/Yvf+5Rf3sDdKu8PgcKX0IpANDIkBdIICNY8nDliuJiA5fVc49Y+h4uID9XtjxQJomR7fLmHH/Axe+/01TwxzTLjmYfmWNDHfCCmGsFFHBuUcrogRc4cmBkuObo2DZG1GmnfYrMET0VdnBAvIqKdJ1ED4+C3T2vqDxOYAJkxDXA3kFfZ0ddh/czCU+AWinN+azFNDtyzBrMIehUB8SfvKeJlotpmiJ26MIOnmghJ2jEhJ3RnYnjEfXF5X1SxC8AFQoLQMDe6pPW4hfXyJ0wpWi3nUqRoAwbw==": "RxeEl0VcwoOI8YizzLARvdWcdc2YAb4Xv3kUofTYEmk50/X2LrX050dAqfntDkAuajGLq+a3tLrrhsKRNPshMlssv+MAaG0qc80Xi6GOC26kFd6aRVfbXjs1sHaz2hKx5kB/KV2A1FNpHpNLdbaKKBeyxHZRHpUMzjIzb7oqrBYF0b89rLd3aF5dNgJ8GCS6OIYQiPvvxBl9I3Qzy2GnUGLGvC4LbfVT2mPPgGG1791UxNpw4R5naASyXYTD0OTlYrDtFhS/hLwO7Q0l67y7dmzN78nuBkMgmhKUF6/TAuXGtKu+2fCa/qGTW/gpR67EkcrXVRGYBhFweeQxOJDDgw=="
}
```
And this will be transmitted over HTTP, which will be Decrypted at Receiver using **JsonCrypt-RSA** or its equivalent with a RSA Private Key

>No Matter the Size or Depth of the JSON Payload, The Encrypted Payload will always have Exactly One Key and Exactly One Value

## Installing
```shell
npm install jsoncrypt-rsa
```
> <sub>Requires nodejs >= 8.11.1</sub>
## Usage
### JavaScript
How to use JsonCrypt-RSA at Sender to Encrypt the JSON Payload
```javascript
// ***Encryption of JSON Payload***
// Create new Instance Object of JsonCrypt
// Load RSA PublicKey from File
// Set RSA PublicKey in JsonCrypt Instance **Important**
// Get/Create your input Object
// Apply EncryptJson on inputObj and get cryptObject
// Transmit this cryptObject over HTTP
const { JsonCrypt } = require('jsoncrypt-rsa');
const fs = require('fs');

const crypt = new JsonCrypt();
const publicKeyString = fs.readFileSync('./keys/public.pem', 'utf-8');
crypt.SetRsaPublicKey(publicKeyString); 
const inputObj = {
  username: "raja786",
  sessionId: "8796589ad89effaaed345",
  accountNo: 25698751225221,
  isDematAccount: false,
  transactionAmount: 60000,
};

const cryptObject = crypt.EncryptJson(inputObj);
console.log(cryptObject); 
```

How to use JsonCrypt-RSA at Receiver to Decrypt the Encrypted JSON Payload

```javascript
// ***Decryption of a Encrypted JSON Payload***
// Create new Instance Object of JsonCrypt
// Load RSA PrivateKey from File
// Set RSA PrivateKey in JsonCrypt Instance **Important**
// Get your Encrypted Object cryptObject i.e body of Request Received
// Apply DecryptJson on cryptObject and get DecryptedObject
// Use this DecryptedObject for your furthur use

const { JsonCrypt } = require('jsoncrypt-rsa');
const fs = require('fs');

const deCrypt = new JsonCrypt();
const privateKeyString = fs.readFileSync('./keys/private.pem', 'utf-8');
deCrypt.SetRsaPrivateKey(privateKeyString); 
const cryptObject = /*Your Encrypted JSON Received From Body of HTTP Request*/;

const DecryptedObject = deCrypt.DecryptJson(cryptObject)
console.log(DecryptedObject); 
```
### TypeScript
For TypeScript the import statement will be 
```typescript
import { JsonCrypt } from 'jsoncrypt-rsa';
```
The Encryption Code Logic will be same as JavaScript.

For Decryption Function You can Put an ReturnObject type as Follows
```typescript
const DecryptedObject = deCrypt.DecryptJson(cryptObject)
// or
const DecryptedObject = deCrypt.DecryptJson<T>(cryptObject)
// Where T is the object Type Default Value object
```
## Properties
### `SetRsaPublicKey : (key: string) => void`
Sets the RSA Public Key of the `JsonCrypt` instance. 
### `SetRsaPrivateKey: (key: string) => void`
Sets the RSA Private Key of the `JsonCrypt` instance.
### `EncryptJson: (JsonObject: object) => object`
Encrypt a Object using RSA Public Key
>**Important:** Please Set Rsa Public Key using `SetRsaPublicKey(key)` before invoking `EncryptJson(JsonObject)`
### `DecryptJson: <T = object>(JsonObject: object) => T`
Decrypt an Encrypted object using RSA Private Key. Default Return type is `object`
>**Important:** Please Set Rsa Private Key using `SetRsaPrivateKey(key)` before invoking `DecryptJson(JsonObject)`
## Contributing
Questions, comments, bug reports, and pull requests are all welcome.

## License
Copyright (c) 2020 Rajdeep Biswas

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## Licensing for Code Used from node-rsa

Copyright (c) 2014  rzcoder

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.