import CryptoJS from "crypto-js";

const encryptionKey = process.env.ENCRYPTION_KEY!;

// encryption on going from server...
export function functionEncrypt(text: string) {
  return CryptoJS.AES.encrypt(text, encryptionKey).toString();
}

// decryption on coming to server...
export function functionDecrypt(ciphertext: string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}