import GameScene from '../scenes/Game'
import { Fly } from './Fly'

export class Player {
  private scene: GameScene
  private headSprite: Phaser.Physics.Arcade.Sprite

  // Default position
  private defaultX: number = GameScene.GAME_WIDTH / 2
  private defaultY: number = GameScene.GAME_HEIGHT - 50

  public isMoving: boolean = false

  constructor(scene: GameScene) {
    this.scene = scene

    this.headSprite = scene.physics.add.sprite(0, 0, 'pirahna-plant')
    this.headSprite.setScale(0.25)
    this.headSprite.setPosition(this.defaultX, this.defaultY)
    this.scene.physics.world.enableBody(this.headSprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    this.scene.input.on(
      'pointerup',
      (pointer) => {
        if (!this.isMoving) {
          this.isMoving = true
          const clickedX = pointer.x
          const clickedY = pointer.y
          this.scene.time.delayedCall(500, () => {
            this.headSprite.setPosition(clickedX, clickedY)
            this.scene.time.delayedCall(500, () => {
              this.headSprite.setPosition(this.defaultX, this.defaultY)
              this.isMoving = false
            })
          })
        }
      },
      this
    )

    const collider = this.scene.physics.add.overlap(
      this.headSprite,
      this.scene.flies,
      (obj1, obj2) => {
        const fly = obj2.getData('ref') as Fly
        fly.destroy()
      }
    )
  }
}
