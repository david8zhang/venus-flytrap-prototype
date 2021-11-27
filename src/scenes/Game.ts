import Phaser from 'phaser'
import { Player } from '~/lib/Player'
import { Score } from '~/lib/Score'
import { Spawner } from '~/lib/Spawner'

export default class Game extends Phaser.Scene {
  public player!: Player
  private spawners: Spawner[] = []
  // private score!: Score

  constructor() {
    super('game')
  }

  create(): void {
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
