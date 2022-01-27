export class Validator {
  static validateName = (str: string) => {
    return /^[A-Z]\w*/.test(str);
  }
  static validatePhone = (str: string) => {
    return /^\+?\d{10,15}/.test(str)
  }
}