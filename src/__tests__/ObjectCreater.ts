import NodeRsa from 'node-rsa';
import { JsonCrypt } from '../index';
import fs from 'fs';

const CreateCryptObject = (key: NodeRsa) => {
  const publicKey = key.exportKey('public');
  const objCrypter = new JsonCrypt();
  objCrypter.SetRsaPublicKey(publicKey);
  return objCrypter;
};

const CreateDecryptObject = (key: NodeRsa) => {
  const privateKey = key.exportKey('private');
  const objDecrypter = new JsonCrypt();
  objDecrypter.SetRsaPrivateKey(privateKey);
  return objDecrypter;
};

export const CreateCryptDecryptObject = () => {
  const key = new NodeRsa().generateKeyPair();
  const objCrypter = CreateCryptObject(key);
  const objDecrypter = CreateDecryptObject(key);

  return { objCrypter, objDecrypter };
};

export const GetFileJson = () => fs.readFileSync('./src/__tests__/bigjson.json', 'utf-8');

test('Sample Test', () => expect(1).toBe(1));
