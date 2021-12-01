import Phaser from 'phaser'
import { button } from '~/ui/Button'
import { text } from '~/ui/Text'
import { Constants } from '~/util/constants'

export default class GameOver extends Phaser.Scene {
  private score = 0

  constructor() {
    super('gameover')
  }

  init(data): void {
    this.score = data.score
  }

  create(): void {
    this.cameras.main.fadeIn(2000, 1, 1, 1)

    const bg = this.add.image(
      Constants.GAME_WIDTH / 2,
      Constants.GAME_HEIGHT / 2,
      'gameover'
    )

    bg.setScale(Constants.SPRITE_SCALE)

    const domElementsContainer = this.add.container(0, 0)

    const gameOverText = text('GAME OVER', {
      fontSize: '40px',
      color: 'red',
      fontWeight: 'bolder',
      '-webkit-text-stroke-width': '2px',
      '-webkit-text-stroke-color': 'black',
    }) as HTMLElement

    const scoreText = text(`Your score: ${this.score}`, {
      fontSize: '20px',
      color: 'red',
      fontWeight: 'bolder',
      '-webkit-text-stroke-width': '2px',
      '-webkit-text-stroke-color': 'black',
    }) as HTMLElement

    const gameOverTextDom = this.add
      .dom(this.scale.width / 2, this.scale.height / 5, gameOverText)
      .setOrigin(0.5)

    const scoreTextDom = this.add
      .dom(this.scale.width / 2, this.scale.height / 5 + 64, scoreText)
      .setOrigin(0.5)

    const restartButton = button('Play Again', {
      fontSize: '12px',
      color: 'black',
      fontFamily: 'Daydream',
      width: 150,
      height: 40,
    }) as HTMLElement

    const restartButtonDom = this.add
      .dom(this.scale.width / 2, this.scale.height / 2 + 30, restartButton)
      .setOrigin(0.5)
      .addListener('click')
      .on('click', () => {
        const gameScene = this.scene.get('game')
        gameScene.registry.destroy()
        gameScene.scene.restart()
        gameScene.sound.removeAll()
        this.scene.start('game', { shouldSkipTutorial: true })
      })

    domElementsContainer.add(gameOverTextDom)
    domElementsContainer.add(scoreTextDom)
    domElementsContainer.add(restartButtonDom)
    domElementsContainer.setAlpha(0)
    this.time.delayedCall(2000, () => {
      this.tweens.add({
        targets: domElementsContainer,
        alpha: { value: 1, duration: 1000 },
      })
    })
  }
}
