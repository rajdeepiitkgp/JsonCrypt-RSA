import NodeRsa from 'node-rsa';
export class JsonCrypt {
  private RsaPublicKey: NodeRsa;
  private RsaPrivateKey: NodeRsa;

  public SetRsaPublicKey = (key: string) => {
    this.RsaPublicKey = new NodeRsa();
    this.RsaPublicKey.importKey(key);
  };
  public SetRsaPrivateKey = (key: string) => {
    this.RsaPrivateKey = new NodeRsa();
    this.RsaPrivateKey.importKey(key);
  };

  // Value Will be Converted to String Before Encryption
  private EncryptValue = (t: any) => this.RsaPublicKey.encrypt(t + '', 'base64');
  // Value will be Retrived as String
  private DecryptValue = (t: any) => this.RsaPrivateKey.decrypt(t + '', 'utf8');

  public EncryptJson = (JsonObject: object) => {
    if (!this.RsaPublicKey) throw new Error("RsaPublicKey Can't Be Null");
    const EncryptedObject: object = {};
    const value = JSON.stringify(JsonObject);
    // Before Encrypt The ObjStructure will be { value : JSONStringifiedString }
    Object.keys({ value }).forEach(
      (key) => (EncryptedObject[this.EncryptValue(key)] = this.EncryptValue(JsonObject[key])),
    );
    // After Encrypt The ObjStructure will be { ENC ('value') : ENC ('JSONStringifiedString') }
    return EncryptedObject;
  };

  public DecryptJson = (JsonObject: object) => {
    if (!this.RsaPrivateKey) throw new Error("RsaPrivateKey Can't Be Null");
    const DecryptedObject: object = {};
    // Before Decrypt The ObjStructure will be { ENC ('value') : ENC ('JSONStringifiedString') }
    Object.keys(JsonObject).forEach(
      (key) => (DecryptedObject[this.DecryptValue(key)] = this.DecryptValue(JsonObject[key])),
    );
    // After Decrypt The ObjStructure will be { value : JSONStringifiedString }
    const field = 'value';
    return JSON.parse(DecryptedObject[field]) as object;
  };
}
