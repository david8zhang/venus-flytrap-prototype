import Phaser from 'phaser'
import RingToTileXYArray from 'phaser3-rex-plugins/plugins/board/board/ring/RingToTileXYArray'
import { Fly } from '~/lib/Fly'
import { Player } from '~/lib/Player'
import { Spawner } from '~/lib/Spawner'

export default class Game extends Phaser.Scene {
  public player!: Player
  public static GAME_WIDTH = 800
  public static GAME_HEIGHT = 600
  private spawners: Spawner[] = []

  private score = 0
  private scoreText

  constructor() {
    super('game')
  }

  create() {
    this.cameras.main.setBackgroundColor('#99CCFF')
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
    })
    this.spawners.push(new Spawner(this))
    this.player = new Player(this)
    this.player.onScored.push((points) => {
      this.score += points
      this.scoreText.setText('Score: ' + this.score)
    })
  }

  getEnemyGroups(): Phaser.GameObjects.Group[] {
    return this.spawners.map((spawner) => {
      return spawner.enemies
    })
  }

  update() {
    this.spawners.forEach((spawner) => {
      spawner.update()
    })
  }
}
