import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload() {
    // Fly
    this.load.spritesheet('fly', 'fly/fly-Sheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    })

    // Player
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

    // BG
    this.load.image('bg', 'bg/bg.png')
    this.load.image('splash', 'bg/splash.png')

    // Pie
    this.load.spritesheet('pie', 'pie/pie-Sheet.png', {
      frameWidth: 64,
      frameHeight: 64,
    })

    // Particle
    this.load.image('particle_fly1', 'particle/particle-fly1.png')
    this.load.image('particle_fly2', 'particle/particle-fly2.png')
  }
  create() {
    this.scene.start('start')
  }
}
