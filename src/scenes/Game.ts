import Phaser from 'phaser'
import { Fly } from '~/lib/Fly'
import { Player } from '~/lib/Player'

export default class Game extends Phaser.Scene {
  private player!: Player
  public static GAME_WIDTH = 800
  public static GAME_HEIGHT = 600

  constructor() {
    super('game')
  }

  create() {
    this.player = new Player(this)
    const fly = new Fly(this, 100, 100)
    this.cameras.main.setBackgroundColor('#99CCFF')
  }
}
