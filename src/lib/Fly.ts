import Game from '~/scenes/Game'

export class Fly {
  private scene: Game
  private sprite: Phaser.Physics.Arcade.Sprite
  constructor(scene: Game, x: number, y: number) {
    this.scene = scene
    this.sprite = this.scene.physics.add.sprite(x, y, 'fly')
    this.sprite.setScale(0.025)
  }
}
