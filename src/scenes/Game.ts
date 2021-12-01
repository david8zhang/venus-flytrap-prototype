import Phaser from 'phaser'
import { Healthbar } from '~/lib/Healthbar'
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
  private spawners!: Spawner[]
  public shouldSkipTutorial = false

  constructor() {
    super('game')
  }

  init(data): void {
    this.shouldSkipTutorial = data.shouldSkipTutorial
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
    this.add.text(16, Constants.GAME_HEIGHT - 16, 'BGM by Waterflame', {
      fontSize: '12px',
    })

    this.cameras.main.setBackgroundColor('#99CCFF')
    this.spawners = [new Spawner(this)]
    this.player = new Player(this)
    this.score = new Score(this, this.player)
    this.spawners.forEach((spawner) => {
      spawner.configurePlayer(this.player)
    })
    this.healthbar = new Healthbar(this)
    this.pie = new Pie(this, this.healthbar)
    this.setupSound()
  }

  setupSound(): void {
    this.sound.play('background-music', { loop: true })
    this.player.onScored.push(() => {
      this.sound.play('chomp')
    })
    this.healthbar.onHealthDecreased.push(() => {
      this.sound.play('hurt')
    })
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
