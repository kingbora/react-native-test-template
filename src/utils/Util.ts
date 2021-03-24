
export default class Util {
  static validateMobile(phone: string) {
    return /^1[3456789]\d{9}$/.test(phone);
  }
}