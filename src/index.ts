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
    const FinalJsonObject = { value };
    // Before Encrypt The ObjStructure will be { value : JSONStringifiedString }
    Object.keys(FinalJsonObject).forEach(
      (key) => (EncryptedObject[this.EncryptValue(key)] = this.EncryptValue(FinalJsonObject[key])),
    );
    // After Encrypt The ObjStructure will be { ENC ('value') : ENC ('JSONStringifiedString') }
    return EncryptedObject;
  };

  public DecryptJson = <T = object>(JsonObject: object) => {
    if (!this.RsaPrivateKey) throw new Error("RsaPrivateKey Can't Be Null");
    const DecryptedObject: { value: string } = { value: null };
    // Before Decrypt The ObjStructure will be { ENC ('value') : ENC ('JSONStringifiedString') }
    Object.keys(JsonObject).forEach(
      (key) => (DecryptedObject[this.DecryptValue(key)] = this.DecryptValue(JsonObject[key])),
    );
    // After Decrypt The ObjStructure will be { value : JSONStringifiedString }
    return JSON.parse(DecryptedObject.value) as T;
  };
}
