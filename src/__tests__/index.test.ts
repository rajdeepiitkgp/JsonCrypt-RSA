import { CreateCryptDecryptObject } from './ObjectCreater';

test('All Strings', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const inputObj = { Name: 'Rahul', Email: 'rahul@gmail.com' };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson(encryptedObject);
  expect(inputObj).toMatchObject(outputObject);
  expect(outputObject).toMatchObject(inputObj);
});

test('Mix Strings Numbers', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const inputObj = { Name: 'Puja', Email: 'puja@gmail.com', Age: 28 };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson(encryptedObject);
  expect(inputObj).toMatchObject(outputObject);
  expect(outputObject).toMatchObject(inputObj);
});

test('Mix Strings Numbers Boolean', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const inputObj = { Name: 'Suraj', Email: 'suraj@gmail.com', Age: 28, Student: false };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson(encryptedObject);
  expect(inputObj).toMatchObject(outputObject);
  expect(outputObject).toMatchObject(inputObj);
});

test('Mix Strings Numbers Boolean Null', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const inputObj = { Name: 'Bimal', Email: 'bimal@gmail.com', Age: 25, Student: false, working: null };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson(encryptedObject);
  expect(inputObj).toMatchObject(outputObject);
  expect(outputObject).toMatchObject(inputObj);
});

test('Mix Strings Numbers Boolean Null', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const inputObj = { Name: 'Subir', Email: 'subir@gmail.com', Age: 26, Student: false, working: null };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson(encryptedObject);
  expect(inputObj).toMatchObject(outputObject);
  expect(outputObject).toMatchObject(inputObj);
});

test('Insert Via Veriables', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const Name = 'Nilabh';
  const Email = 'nilabh@gmail.com';
  const Age = 27;
  const Student = false;
  const working = 'yes';
  const inputObj = { Name, Email, Age, Student, working };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson(encryptedObject);
  expect(inputObj).toMatchObject(outputObject);
  expect(outputObject).toMatchObject(inputObj);
});
