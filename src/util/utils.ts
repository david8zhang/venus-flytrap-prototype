export class Utils {
  static getRandomNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
  }
}
