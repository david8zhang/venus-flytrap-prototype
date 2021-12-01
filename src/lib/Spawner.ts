import Game from '~/scenes/Game'
import { Constants } from '~/util/constants'
import { Utils } from '~/util/utils'
import { Fly } from './Fly'
import { Player } from './Player'

export class Spawner {
  private scene: Game
  public enemies: Phaser.GameObjects.Group
  public maxEnemiesOnScreen = 1
  public onNewEnemy: Array<(enemy: Fly) => void> = []

  constructor(scene: Game) {
    this.scene = scene
    this.enemies = scene.add.group({ classType: Fly })
    this.spawnEnemies()
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.enemies.children.entries.length < this.maxEnemiesOnScreen) {
          for (
            let i = 0;
            i < this.maxEnemiesOnScreen - this.enemies.children.entries.length;
            i++
          ) {
            this.spawnEnemy()
          }
        }
      },
      loop: true,
    })
  }

  configurePlayer(player: Player): void {
    player.onScored.push(this.setSpawnRate.bind(this))
  }

  setSpawnRate(): void {
    const score = this.scene.score.getScore()
    this.maxEnemiesOnScreen = Constants.getFlySpawnFromScore(score)
  }

  spawnEnemies(): void {
    for (let i = 0; i < this.maxEnemiesOnScreen; i++) {
      this.spawnEnemy()
    }
  }

  spawnEnemy(): void {
    const randY = Utils.getRandomNum(
      Constants.SPAWN_THRESHOLD.upper,
      Constants.SPAWN_THRESHOLD.lower
    )
    const randSpeed = Utils.getRandomNum(50, 100)
    const fly = new Fly(this.scene, 0, randY, randSpeed)
    this.enemies.add(fly.sprite)
    this.onNewEnemy.forEach((handler) => handler(fly))
  }

  update(): void {
    this.enemies.children.entries.forEach((child) => {
      const fly: Fly = child.getData('ref') as Fly
      fly.update()
    })
  }
}
