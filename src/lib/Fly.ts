import Game from '~/scenes/Game'
import { SPRITE_SCALE } from '~/util/constants'
import { Utils } from '~/util/utils'

enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export class Fly {
  private scene: Game
  public sprite: Phaser.Physics.Arcade.Sprite
  private currDirection: Direction = Direction.RIGHT
  private speed: number

  constructor(scene: Game, x: number, y: number, speed?: number) {
    this.scene = scene
    this.sprite = this.scene.physics.add.sprite(x, y, 'fly')
    this.scene.anims.create({
      key: 'default',
      frames: this.scene.anims.generateFrameNumbers('fly', {
        start: 0,
        end: 3,
      }),
      frameRate: 24,
    })
    this.sprite.play({ key: 'default', repeat: -1 })
    this.sprite.setScale(SPRITE_SCALE)
    this.sprite.setData('ref', this)
    this.speed = speed ? speed : 100

    this.scene.physics.world.enableBody(
      this.sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    )

    setInterval(() => {
      const directions = [
        Direction.UP,
        Direction.DOWN,
        Direction.LEFT,
        Direction.RIGHT,
      ]
      this.currDirection =
        directions[Math.floor(Math.random() * directions.length)]
    }, 1000)
  }

  update() {
    this.sprite.setVelocity(this.speed, 0)
    if (this.sprite.x > Game.GAME_WIDTH) {
      this.sprite.x = 0
      this.sprite.y = Utils.getRandomNum(0, Game.GAME_HEIGHT / 2)
    }
  }

  destroy() {
    this.sprite.destroy()
  }
}
