export class Constants {
  public static GAME_WIDTH = 800
  public static GAME_HEIGHT = 600
  public static SPRITE_SCALE = 2
  public static SPAWN_THRESHOLD = {
    upper: 50,
    lower: Constants.GAME_HEIGHT / 2,
  }

  public static getFlySpawnFromScore(score: number): number {
    if (score == 0) {
      return 1
    }
    return Math.max(1, Math.floor(Math.log2(score)))
  }
}
