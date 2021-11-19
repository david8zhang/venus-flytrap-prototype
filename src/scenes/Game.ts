import Phaser from 'phaser'
import RingToTileXYArray from 'phaser3-rex-plugins/plugins/board/board/ring/RingToTileXYArray'
import { Fly } from '~/lib/Fly'
import { Player } from '~/lib/Player'

export default class Game extends Phaser.Scene {
  private player!: Player
  public flies!: Phaser.GameObjects.Group
  public static GAME_WIDTH = 800
  public static GAME_HEIGHT = 600

  private score = 0
  private scoreText

  constructor() {
    super('game')
  }

  create() {
    this.flies = this.physics.add.group({
      classType: Fly,
    })
    this.flies.add(new Fly(this, 100, 100).sprite)
    this.flies.add(new Fly(this, 100, 100).sprite)
    this.flies.add(new Fly(this, 100, 100).sprite)
    this.flies.add(new Fly(this, 100, 100).sprite)
    this.player = new Player(this)
    this.cameras.main.setBackgroundColor('#99CCFF')
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
    })
    this.player.onScored.push((points) => {
      this.score += points
      this.scoreText.setText('Score: ' + this.score)
    })
  }

  update() {
    this.flies.children.entries.forEach((child) => {
      const fly: Fly = child.getData('ref') as Fly
      fly.update()
    })
  }
}
