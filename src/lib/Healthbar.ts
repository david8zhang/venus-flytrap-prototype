import Game from '~/scenes/Game'
import { Constants } from '~/util/constants'
import { Fly } from './Fly'

export class Healthbar {
  private scene: Game

  public static LENGTH = 200
  public static WIDTH = 24
  public static MAX_HEALTH = 20
  public static Y_POS = 10
  public static X_POS =
    Constants.GAME_WIDTH - (Healthbar.LENGTH + Healthbar.Y_POS)

  public currHealth: number
  private bar: Phaser.GameObjects.Graphics
  public onHealthDecreased: Array<() => void> = []

  constructor(scene: Game) {
    this.scene = scene
    this.currHealth = Healthbar.MAX_HEALTH
    this.bar = new Phaser.GameObjects.Graphics(this.scene)
    this.bar.setDepth(1000)
    this.scene.add.existing(this.bar)
    this.setupHealthEvents()
    this.draw()
    console.log('Went here!')

    this.scene.add
      .text(Healthbar.X_POS - 65, Healthbar.Y_POS, 'HP: ', {
        fontSize: '24px',
      })
      .setOrigin(0)
  }

  setupHealthEvents(): void {
    const spawners = this.scene.getSpawners()
    spawners.forEach((spawner) => {
      spawner.enemies.children.entries.forEach((child) => {
        const fly: Fly = child.getData('ref') as Fly
        fly.onReachedRightEdge.push(this.decreaseHealth.bind(this))
      })

      spawner.onNewEnemy.push((fly) =>
        fly.onReachedRightEdge.push(this.decreaseHealth.bind(this))
      )
    })
  }

  decreaseHealth(): void {
    this.currHealth -= 1
    this.onHealthDecreased.forEach((handler) => handler())
    this.draw()
  }

  draw(): void {
    const percentage = this.currHealth / Healthbar.MAX_HEALTH
    const length = Math.floor(percentage * Healthbar.LENGTH)
    this.bar.fillStyle(0x000000)

    // Draw a black rectangle for healthbar BG
    this.bar.fillRect(
      Healthbar.X_POS,
      Healthbar.Y_POS,
      Healthbar.LENGTH,
      Healthbar.WIDTH
    )

    console.log(length)

    // Draw a colored rectangle to represent health
    this.bar.fillStyle(0x2ecc71)
    this.bar.fillRect(Healthbar.X_POS, Healthbar.Y_POS, length, Healthbar.WIDTH)
  }
}
