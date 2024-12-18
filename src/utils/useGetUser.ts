import { getCookie } from "#/library/cookies/cookie";
import CryptoJS from "crypto-js";

export function getDecryptedUser() {
  const userCookie = getCookie("sdsd_admin_user") || "";
  const bytes = CryptoJS.AES.decrypt(
    userCookie,
    import.meta.env.VITE_AUTH_SESSION_SECRET_KEY
  );

  const decrypted =
    bytes?.words?.length !== 0
      ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      : {};

  return {};
}
