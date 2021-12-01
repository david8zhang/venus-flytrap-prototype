import Game from '~/scenes/Game'
import { Constants } from '~/util/constants'
import { Fly } from './Fly'

export class Healthbar {
  private scene: Game

  public static LENGTH = 200
  public static WIDTH = 20
  public static MAX_HEALTH = 6
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

    this.scene.add
      .text(Healthbar.X_POS - 50, Healthbar.Y_POS, 'HP:', {
        fontSize: '16px',
        fontFamily: 'Daydream',
      })
      .setOrigin(0)
  }

  setupHealthEvents(): void {
    const spawners = this.scene.getSpawners()
    console.log(spawners)
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
    if (this.currHealth == 0) {
      this.scene.cameras.main.fadeOut(2000, 0, 0, 0)
      this.scene.cameras.main.once(
        Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
        () => {
          this.scene.scene.start('gameover', {
            score: this.scene.score.getScore(),
          })
        }
      )
    }
  }

  draw(): void {
    const percentage = this.currHealth / Healthbar.MAX_HEALTH
    const length = Math.max(0, Math.floor(percentage * Healthbar.LENGTH))
    this.bar.fillStyle(0x000000)

    // Draw a black rectangle for healthbar BG
    this.bar.fillRect(
      Healthbar.X_POS,
      Healthbar.Y_POS,
      Healthbar.LENGTH,
      Healthbar.WIDTH
    )

    if (percentage <= 0.33) {
      this.bar.fillStyle(0xff0000)
    } else if (percentage <= 0.67) {
      this.bar.fillStyle(0xf1c40f)
    } else {
      this.bar.fillStyle(0x2ecc71)
    }

    // Draw a colored rectangle to represent health
    this.bar.fillRect(Healthbar.X_POS, Healthbar.Y_POS, length, Healthbar.WIDTH)
  }
}
