import Game from '~/scenes/Game'
import { Constants } from '~/util/constants'
import { Utils } from '~/util/utils'
import { Fly } from './Fly'

export class Spawner {
  private scene: Game
  public enemies: Phaser.GameObjects.Group
  public numEnemiesOnScreen = 5
  public onNewEnemy: Array<(enemy: Fly) => void> = []

  constructor(scene: Game) {
    this.scene = scene
    this.enemies = scene.add.group({ classType: Fly })
    this.spawnEnemies()
    setInterval(() => {
      if (this.enemies.children.entries.length < this.numEnemiesOnScreen) {
        for (
          let i = 0;
          i < this.numEnemiesOnScreen - this.enemies.children.entries.length;
          i++
        ) {
          this.spawnEnemy()
        }
      }
    }, 1000)
  }

  spawnEnemies(): void {
    for (let i = 0; i < this.numEnemiesOnScreen; i++) {
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
