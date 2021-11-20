import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload() {
    this.load.image('pirahna-plant', 'pirahna-plant.png')
    this.load.spritesheet('fly', 'fly-Sheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
  }
  create() {
    this.scene.start('game')
  }
}
