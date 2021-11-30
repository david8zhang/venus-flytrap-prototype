import { Scene } from 'phaser'
import { Constants } from '~/util/constants'
import { Healthbar } from './Healthbar'

export class Pie {
  private sprite: Phaser.GameObjects.Sprite
  private healthbar: Healthbar

  constructor(scene: Scene, healthbar: Healthbar) {
    this.healthbar = healthbar
    this.sprite = scene.add.sprite(706, 362, 'pie')
    this.sprite.setScale(Constants.SPRITE_SCALE)
    this.healthbar.onHealthDecreased.push(() =>
      this.playHurtEffect(scene.cameras.main)
    )

    this.createAnimations(scene)
  }

  playHurtEffect(camera: Phaser.Cameras.Scene2D.Camera): void {
    this.playHurtAnim()
    this.sprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.playIdleAnim()
    })
    this.sprite.setTintFill(0xff5555)
    setTimeout(() => {
      this.sprite.clearTint()
    }, 100)
    camera.shake(100, 0.002)
  }

  playIdleAnim(): void {
    if (this.healthbar.currHealth > (Healthbar.MAX_HEALTH / 3) * 2)
      this.sprite.play('pie1')
    else if (this.healthbar.currHealth > Healthbar.MAX_HEALTH / 3)
      this.sprite.play('pie2')
    else this.sprite.play('pie3')
  }

  playHurtAnim(): void {
    if (this.healthbar.currHealth > (Healthbar.MAX_HEALTH / 3) * 2)
      this.sprite.play('pie1-hurt')
    else if (this.healthbar.currHealth > Healthbar.MAX_HEALTH / 3)
      this.sprite.play('pie2-hurt')
    else this.sprite.play('pie3-hurt')
  }

  createAnimations(scene: Scene): void {
    scene.anims.create({
      key: 'pie1',
      frames: scene.anims.generateFrameNumbers('pie', { frames: [0] }),
    })

    scene.anims.create({
      key: 'pie1-hurt',
      frames: scene.anims.generateFrameNumbers('pie', {
        frames: [1, 2, 1, 2, 1, 2],
      }),
      frameRate: 16,
    })

    scene.anims.create({
      key: 'pie2',
      frames: scene.anims.generateFrameNumbers('pie', { frames: [3] }),
    })

    scene.anims.create({
      key: 'pie2-hurt',
      frames: scene.anims.generateFrameNumbers('pie', {
        frames: [4, 5, 4, 5, 4, 5],
      }),
      frameRate: 16,
    })

    scene.anims.create({
      key: 'pie3',
      frames: scene.anims.generateFrameNumbers('pie', { frames: [6] }),
    })

    scene.anims.create({
      key: 'pie3-hurt',
      frames: scene.anims.generateFrameNumbers('pie', {
        frames: [7, 8, 7, 8, 7, 8],
      }),
      frameRate: 16,
    })
  }
}
