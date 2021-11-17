import GameScene from '../scenes/Game'

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
  }
}
