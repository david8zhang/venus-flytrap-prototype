import Phaser from 'phaser'
import { Healthbar } from '~/lib/Healthbar'
import { Particles } from '~/lib/Particles'
import { Pie } from '~/lib/Pie'
import { Player } from '~/lib/Player'
import { Score } from '~/lib/Score'
import { Spawner } from '~/lib/Spawner'
import { Constants } from '~/util/constants'

export default class Game extends Phaser.Scene {
  public player!: Player
  public score!: Score
  private pie!: Pie
  private healthbar!: Healthbar
  private spawners: Spawner[] = []

  constructor() {
    super('game')
  }

  getSpawners(): Spawner[] {
    return this.spawners
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
    this.score = new Score(this, this.player)
    this.spawners.forEach((spawner) => {
      spawner.configurePlayer(this.player)
    })

    this.healthbar = new Healthbar(this)
    this.pie = new Pie(this, this.healthbar)
    new Particles(this)
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
