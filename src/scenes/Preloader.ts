import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload() {
    this.load.image('pirahna-plant', 'pirahna-plant.png')
    this.load.spritesheet('fly', 'fly/fly-Sheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('plant', 'plant/plant-head-Sheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.atlas(
      'plant-bite',
      'plant/anims/plant-bite.png',
      'plant/anims/plant-bite.json'
    )
    this.load.image('stem', 'plant/plant-stem-bite.png')
  }
  create() {
    this.scene.start('game')
  }
}
