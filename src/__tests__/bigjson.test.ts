import { CreateCryptDecryptObject } from './ObjectCreater';
import fs from 'fs';

test('Test A Very Big JSON Data', () => {
    const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
    const inputObj = JSON.parse(fs.readFileSync('./bigjson.json','utf-8')) as object ;
    const encryptedObject = objCrypter.EncryptJson(inputObj);
    const outputObject = objDecrypter.DecryptJson<object>(encryptedObject);
    expect(inputObj).toMatchObject(outputObject);
    expect(outputObject).toMatchObject(inputObj);
  });