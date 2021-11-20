import Game from '~/scenes/Game'
import { Utils } from '~/util/utils'
import { Fly } from './Fly'

export class Spawner {
  private scene: Game
  public enemies: Phaser.GameObjects.Group
  public numEnemiesOnScreen: number = 5

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

  spawnEnemies() {
    for (let i = 0; i < this.numEnemiesOnScreen; i++) {
      this.spawnEnemy()
    }
  }

  spawnEnemy() {
    const randY = Utils.getRandomNum(0, Game.GAME_HEIGHT / 2)
    const randSpeed = Utils.getRandomNum(100, 200)
    this.enemies.add(new Fly(this.scene, 0, randY, randSpeed).sprite)
  }

  update() {
    this.enemies.children.entries.forEach((child) => {
      const fly: Fly = child.getData('ref') as Fly
      fly.update()
    })
  }
}
