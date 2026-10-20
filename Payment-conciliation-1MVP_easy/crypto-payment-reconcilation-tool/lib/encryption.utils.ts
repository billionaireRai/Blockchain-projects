
'use server'
import CryptoJS from "crypto-js" ;
import BcryptJS from 'bcryptjs' ;

const EncryptionKey = process.env.ENCRYPTION_KEY! ;
const SaltRound = process.env.HASHING_SALT_ROUND! ; 

// encryption on going from server...
export function functionEncrypt(text: string) {
  return CryptoJS.AES.encrypt(text, EncryptionKey).toString();
}

// decryption on coming to server...
export function functionDecrypt(ciphertext: string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, EncryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function CreateBcryptHash(password:string) : string {
  const salt = BcryptJS.genSaltSync(parseInt(SaltRound)); // generating salt for hashing...
  return BcryptJS.hashSync(password.trim(), salt); // hashed password...
}

export function CompareBcryptHash(password:string,hash:string) : boolean {
  return BcryptJS.compareSync(password, hash); // return true OR false...
}