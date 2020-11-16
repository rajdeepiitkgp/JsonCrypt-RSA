# JsonCrypt-RSA
[![npm version](https://img.shields.io/npm/v/jsoncrypt-rsa.svg?color=limegreen)](https://www.npmjs.com/package/jsoncrypt-rsa) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  [![Build Status](https://travis-ci.com/rajdeepiitkgp/JsonCrypt-RSA.svg?branch=main)](https://travis-ci.com/rajdeepiitkgp/JsonCrypt-RSA) 


JsonCrypt-RSA is a opensource library for Encrypting the JSON Payload that is supposed to be trasmitted over HTTP (POST, PUT, DELETE) from **Sender**(Frontend) and Decrypt the Payload at **Receiver**(Backend) and retrive the Information.

The Encryption and Decryption is based on RSA Algorithm i.e the Payload will be Encrypted using RSA Public Key at Sender and the Payload will be Decrypted using RSA Private Key at the Receiver.

The Encryption and Decryption Logic is implemented by using [Node RSA](https://github.com/rzcoder/node-rsa)


## Workfolw
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
    "username": "Rajdeep Biswas",
    "sessionid": "8796589ad89effaaed345",
    "accountno": 25698751225221,
    "isdemataccount": false,
    "transactionammount": 60000
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

>No Matter the Size or Depth of the JSON Payload, The Encrpted Payload will always have Exactly One Key and Exactly One Value

## Installing
```shell
npm install jsoncrypt-rsa
```
> <sub>Requires nodejs >= 8.11.1</sub>
## Usage
### JavaScript
How to use JsonCrypt-RSA at Sender to Encrypt the JSON Paylod
```javascript
// ***Encryption of JSON Payload***
// Create new Instance Object of JsonCrypt
// Load RSA PublicKey from File
// Set RSA PublicKey in JsonCrypt Instance **Important**
// Get/Create your input Object
// Apply EncryptJson on inputObj and get cryptObject
// Transmit this cryptObject over HTTP
const { JsonCrypt } = require("jsoncrypt-rsa");
const fs = require("fs");

const crypt = new JsonCrypt();
const publicKeyString = fs.readFileSync("./keys/public.pem", "utf-8");
crypt.SetRsaPublicKey(publicKeyString); 
const inputObj = {
  username: "Rajdeep Biswas",
  sessionid: "8796589ad89effaaed345",
  accountno: 25698751225221,
  isdemataccount: false,
  transactionammount: 60000,
};

const cryptObject = crypt.EncryptJson(inputObj);
console.log(cryptObject); 
```

How to use JsonCrypt-RSA at Receiver to Decrypt the Encypted JSON Paylod

```javascript
// ***Decryption of a Encrypted JSON Payload***
// Create new Instance Object of JsonCrypt
// Load RSA PrivateKey from File
// Set RSA PrivateKey in JsonCrypt Instance **Important**
// Get your Encrypted Object cryptObject i.e body of Request Received
// Apply DecryptJson on cryptObject and get DecryptedObject
// Use this DecryptedObject for your furthur use

const { JsonCrypt } = require("jsoncrypt-rsa");
const fs = require("fs");

const deCrypt = new JsonCrypt();
const privateKeyString = fs.readFileSync("./keys/private.pem", "utf-8");
deCrypt.SetRsaPrivateKey(privateKeyString); 
const cryptObject = /*Your Encrypted JSON Received From Body of HTTP Request*/;

const DecryptedObject = deCrypt.DecryptJson(cryptObject)
console.log(DecryptedObject); 
```
