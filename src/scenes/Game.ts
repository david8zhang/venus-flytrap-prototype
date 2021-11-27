import Phaser from 'phaser'
import { Player } from '~/lib/Player'
import { Score } from '~/lib/Score'
import { Spawner } from '~/lib/Spawner'
import { Constants } from '~/util/constants'

export default class Game extends Phaser.Scene {
  public player!: Player
  private spawners: Spawner[] = []
  // private score!: Score

  constructor() {
    super('game')
  }

  create(): void {
    const bg = this.add.image(
      Constants.GAME_WIDTH / 2,
      Constants.GAME_HEIGHT / 2,
      'bg'
    )
    bg.setScale(Constants.SPRITE_SCALE)

    this.cameras.main.setBackgroundColor('#99CCFF')
    this.spawners.push(new Spawner(this))
    this.player = new Player(this)
    new Score(this, this.player, this.spawners)
  }

  getEnemyGroups(): Phaser.GameObjects.Group[] {
    return this.spawners.map((spawner) => {
      return spawner.enemies
    })
  }

  update(): void {
    this.spawners.forEach((spawner) => {
      spawner.update()
    })
  }
}
