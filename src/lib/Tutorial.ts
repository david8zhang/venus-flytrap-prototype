import { Constants } from '~/util/constants'
import GameScene from '../scenes/Game'

export class Tutorial {
  constructor(scene: GameScene, x: number, y: number, key: string) {
    const tutorialKey = `tutorial_${key}`
    const sprite = scene.physics.add.sprite(x, y, tutorialKey)
    scene.anims.create({
      key: tutorialKey,
      frames: scene.anims.generateFrameNumbers(tutorialKey, {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
    })
    sprite.play({ key: tutorialKey, repeat: -1 })
    sprite.setScale(Constants.SPRITE_SCALE)

    scene.input.keyboard.on('keydown', (keyCode: any) => {
      if (keyCode.code === `Key${key}`) {
        sprite.setVisible(false)
      }
    })
  }
}
