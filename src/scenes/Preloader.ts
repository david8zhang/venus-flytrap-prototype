import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload() {
    this.load.image('fly', 'fly.png')
    this.load.image('pirahna-plant', 'pirahna-plant.png')
  }
  create() {
    this.scene.start('game')
  }
}
