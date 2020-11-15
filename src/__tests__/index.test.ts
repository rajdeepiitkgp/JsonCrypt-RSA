import { CreateCryptDecryptObject } from './ObjectCreater';

test('All Strings', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const inputObj = { Name: 'Rahul', Email: 'rahul@gmail.com' };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson(encryptedObject);
  Object.keys(inputObj).forEach((key) => expect(inputObj[key]).toBe(outputObject[key]));
  Object.keys(outputObject).forEach((key) => expect(outputObject[key]).toBe(inputObj[key]));
});

test('Mix Strings Numbers', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const inputObj = { Name: 'Rahul', Email: 'rahul@gmail.com', Age: 28 };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson(encryptedObject);
  // Need to Convert to String to Compare
  Object.keys(inputObj).forEach((key) => expect(inputObj[key] + '').toBe(outputObject[key]));
  Object.keys(outputObject).forEach((key) => expect(outputObject[key]).toBe(inputObj[key] + ''));
});

test('Mix Strings Numbers Boolean', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const inputObj = { Name: 'Rahul', Email: 'rahul@gmail.com', Age: 28, Student: false };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson(encryptedObject);
  // Need to Convert to String to Compare
  Object.keys(inputObj).forEach((key) => expect(inputObj[key] + '').toBe(outputObject[key]));
  Object.keys(outputObject).forEach((key) => expect(outputObject[key]).toBe(inputObj[key] + ''));
});

test('Mix Strings Numbers Boolean Null', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const inputObj = { Name: 'Rahul', Email: 'rahul@gmail.com', Age: 28, Student: false, working: null };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson(encryptedObject);
  // Need to Convert to String to Compare
  Object.keys(inputObj).forEach((key) => expect(inputObj[key] + '').toBe(outputObject[key]));
  Object.keys(outputObject).forEach((key) => expect(outputObject[key]).toBe(inputObj[key] + ''));
});

test('Mix Strings Numbers Boolean Null', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const inputObj = { Name: 'Rahul', Email: 'rahul@gmail.com', Age: 28, Student: false, working: null };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson(encryptedObject);
  // Need to Convert to String to Compare
  Object.keys(inputObj).forEach((key) => expect(inputObj[key] + '').toBe(outputObject[key]));
  Object.keys(outputObject).forEach((key) => expect(outputObject[key]).toBe(inputObj[key] + ''));
});

test('Insert Via Veriables', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const Name = 'Rahul';
  const Email = 'rahul@gmail.com';
  const Age = 28;
  const Student = false;
  const working = null;
  const inputObj = { Name, Email, Age, Student, working };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson(encryptedObject);
  // Need to Convert to String to Compare
  Object.keys(inputObj).forEach((key) => expect(inputObj[key] + '').toBe(outputObject[key]));
  Object.keys(outputObject).forEach((key) => expect(outputObject[key]).toBe(inputObj[key] + ''));
});
