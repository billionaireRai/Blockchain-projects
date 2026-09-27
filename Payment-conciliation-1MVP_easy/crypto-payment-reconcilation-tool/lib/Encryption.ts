import CryptoJS from "crypto-js";

const encryptionKey = process.env.ENCRYPTION_KEY!;

export function functionEncrypt(text: string) {
  return CryptoJS.AES.encrypt(text, encryptionKey).toString();
}

export function functionDecrypt(ciphertext: string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}