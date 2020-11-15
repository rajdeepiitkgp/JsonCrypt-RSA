import { CreateCryptDecryptObject } from './ObjectCreater';

interface Person {
  Name?: string;
  Age?: number;
  Email?: string;
  PhoneNo?: number;
  Student?: boolean;
  Houses?: House[];
}

interface House {
  HouseNumber?: number;
  HouseName?: string;
}

test('All Root Level Only', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const inputObj: Person = {
    Name: 'Rahul',
    Email: 'rahul@gmail.com',
    Age: 28,
    PhoneNo: 982126987,
    Student: false,
  };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson<Person>(encryptedObject);

  expect(inputObj).toMatchObject(outputObject);
  expect(outputObject).toMatchObject(inputObj);
});

test('All Levels', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const inputObj: Person = {
    Name: 'Rahul',
    Email: 'rahul@gmail.com',
    Age: 28,
    PhoneNo: 982126987,
    Student: false,
    Houses: [
      {
        HouseName: 'Birla',
        HouseNumber: 256,
      },
      {
        HouseName: 'Ajanta',
        HouseNumber: 516,
      },
    ],
  };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson<Person>(encryptedObject);

  expect(inputObj).toMatchObject(outputObject);
  expect(outputObject).toMatchObject(inputObj);
});

test('Some Missing Fields', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const inputObj: Person = {
    Name: 'Rajdeep',
    Email: 'rajdeep@gmail.com',
    PhoneNo: 892531453,
    Student: true,
    Houses: [
      {
        HouseNumber: 965,
      },
      {
        HouseName: 'Ajanta',
      },
    ],
  };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson<Person>(encryptedObject);

  expect(inputObj).toMatchObject(outputObject);
  expect(outputObject).toMatchObject(inputObj);
});

test('Some Null', () => {
  const { objCrypter, objDecrypter } = CreateCryptDecryptObject();
  const inputObj: Person = {
    Name: 'Priya',
    Email: 'priya@gmail.com',
    Age: 24,
    PhoneNo: 58632156,
    Student: false,
    Houses: [
      {
        HouseName: 'Sivalaya',
        HouseNumber: null,
      },
      {
        HouseName: null,
        HouseNumber: 816,
      },
    ],
  };
  const encryptedObject = objCrypter.EncryptJson(inputObj);
  const outputObject = objDecrypter.DecryptJson<Person>(encryptedObject);

  expect(inputObj).toMatchObject(outputObject);
  expect(outputObject).toMatchObject(inputObj);
});
