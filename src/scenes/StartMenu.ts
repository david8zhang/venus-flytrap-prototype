import { button } from '~/ui/Button'
import { text } from '~/ui/Text'
import { Constants } from '~/util/constants'

export class StartMenu extends Phaser.Scene {
  public domElementsContainer!: Phaser.GameObjects.Container

  constructor() {
    super('start')
  }

  preload(): void {
    this.domElementsContainer = this.add.container(0, 0)

    const titleScreenText = text('Venus Pie Trap', {
      fontSize: '40px',
      color: 'white',
      fontWeight: 'bolder',
      '-webkit-text-stroke-width': '2px',
      '-webkit-text-stroke-color': 'black',
    }) as HTMLElement

    const startButton = button('Start', {
      fontSize: '12px',
      color: 'black',
      fontFamily: 'Daydream',
      width: 150,
      height: 40,
    }) as HTMLElement

    const titleScreenDom = this.add
      .dom(this.scale.width / 3, this.scale.height / 3, titleScreenText)
      .setOrigin(0.5)

    const startButtonDom = this.add
      .dom(this.scale.width / 2, this.scale.height / 2 + 30, startButton)
      .setOrigin(0.5)
      .addListener('click')
      .on('click', () => {
        this.scene.start('game')
      })

    this.domElementsContainer.add(titleScreenDom)
    this.domElementsContainer.add(startButtonDom)
  }

  create(): void {
    const bg = this.add.image(
      Constants.GAME_WIDTH / 2,
      Constants.GAME_HEIGHT / 2,
      'splash'
    )
    bg.setScale(Constants.SPRITE_SCALE)
    this.cameras.main.setBackgroundColor('#99CCFF')
  }
}
