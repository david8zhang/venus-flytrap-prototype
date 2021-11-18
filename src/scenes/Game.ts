import Phaser from 'phaser'
import { Fly } from '~/lib/Fly'
import { Player } from '~/lib/Player'

export default class Game extends Phaser.Scene {
  private player!: Player
  public flies!: Phaser.GameObjects.Group
  public static GAME_WIDTH = 800
  public static GAME_HEIGHT = 600

  constructor() {
    super('game')
  }

  create() {
    this.flies = this.physics.add.group({
      classType: Fly,
    })
    this.flies.add(new Fly(this, 100, 100).sprite)
    this.player = new Player(this)
    this.cameras.main.setBackgroundColor('#99CCFF')
  }

  update() {
    this.flies.children.entries.forEach((child) => {
      const fly: Fly = child.getData('ref') as Fly
      fly.update()
    })
  }
}
