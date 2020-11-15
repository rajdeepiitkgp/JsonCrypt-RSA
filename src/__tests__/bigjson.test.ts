import { CreateCryptDecryptObject, GetFileJson } from './ObjectCreater';

test('Test A Very Big JSON Data', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const inputObj = JSON.parse(GetFileJson()) as object;
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson<object>(encryptedObject);
  expect(inputObj).toMatchObject(outputObject);
  expect(outputObject).toMatchObject(inputObj);
});
