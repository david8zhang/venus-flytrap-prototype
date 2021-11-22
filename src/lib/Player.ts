import { Constants } from '~/util/constants'
import Game from '../scenes/Game'
import GameScene from '../scenes/Game'
import { Fly } from './Fly'

export class Player {
  private scene: GameScene
  // private headSprite: Phaser.Physics.Arcade.Sprite

  private playerGroup!: Phaser.Physics.Arcade.Group
  private sprites: Phaser.Physics.Arcade.Sprite[] = []
  public isMovingSprites: boolean[] = []

  public isMoving = false

  // On scored event; points system listens to it
  public onScored: Array<(points: number) => void> = []

  constructor(scene: GameScene) {
    this.scene = scene
    this.createAnims()
    this.addSprites()
    this.configureKeyPresses()
  }

  createAnims(): void {
    this.scene.anims.create({
      key: 'plant-bite',
      frames: this.scene.anims.generateFrameNames('plant-bite', {
        start: 0,
        end: 2,
        suffix: '.png',
      }),
      frameRate: 8,
    })
  }

  addSprites(): void {
    this.playerGroup = this.scene.physics.add.group()
    const xSpread = Constants.GAME_WIDTH / 4

    for (let i = 1; i <= 3; i++) {
      const sprite = this.scene.physics.add.sprite(
        i * xSpread,
        Constants.GAME_HEIGHT - 32,
        'plant',
        0
      )
      sprite.setScale(2)
      this.playerGroup.add(sprite)
      this.sprites.push(sprite)
    }
    this.scene.getEnemyGroups().forEach((group: Phaser.GameObjects.Group) => {
      this.scene.physics.add.overlap(this.playerGroup, group, (obj1, obj2) => {
        const fly = obj1.getData('ref') as Fly
        fly.destroy()
        this.onScored.forEach((handler) => handler(1))
      })
    })
    this.isMovingSprites = new Array(3).fill(false)
  }

  configureKeyPresses(): void {
    const keyCodeMapping = ['KeyQ', 'KeyW', 'KeyE']
    this.scene.input.keyboard.on('keydown', (keyCode: any) => {
      const spriteToMoveIndex = keyCodeMapping.indexOf(keyCode.code)
      if (
        spriteToMoveIndex !== -1 &&
        !this.isMovingSprites[spriteToMoveIndex]
      ) {
        this.isMovingSprites[spriteToMoveIndex] = true
        const spriteToMove = this.sprites[spriteToMoveIndex]
        this.moveSprite(this.sprites[spriteToMoveIndex], () => {
          this.isMovingSprites[spriteToMoveIndex] = false
        })
      }
    })
  }

  moveSprite(sprite: Phaser.Physics.Arcade.Sprite, onComplete: Function): void {
    const yDiff = sprite.y - Constants.SPAWN_THRESHOLD.upper - 20
    const timeline = this.scene.tweens.createTimeline()
    sprite.setDepth(1)
    const stem = this.scene.physics.add
      .sprite(sprite.x, sprite.y + 5, 'stem')
      .setScale(2)
      .setDepth(0)

    const timeline2 = this.scene.tweens.createTimeline()
    timeline2.add({
      targets: stem,
      scaleY: '+=32',
    })
    timeline2.add({
      targets: stem,
      scaleY: '-=32',
      delay: 1000,
    })

    timeline.add({
      targets: sprite,
      y: `-=${yDiff}`,
      onComplete: () => {
        sprite.anims.play({ key: 'plant-bite', repeat: 0 })
        sprite.body.enable = false
      },
    })
    timeline.add({
      targets: sprite,
      delay: 1000,
      y: `+=${yDiff}`,
      onComplete: () => {
        this.scene.time.delayedCall(1000, () => {
          stem.destroy()
          sprite.body.enable = true
          sprite.setTexture('plant', 0)
          onComplete()
        })
      },
    })
    timeline2.play()
    timeline.play()
  }
}
