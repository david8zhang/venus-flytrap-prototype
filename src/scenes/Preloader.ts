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

    // Audio
    this.load.audio('background-music', 'music/glorious-morning.mp3')
    this.load.audio('chomp', 'music/chomp.mp3')
    this.load.audio('hurt', 'music/hurt.wav')

    // tutorials
    this.load.spritesheet('tutorial_Q', 'tutorial/tutorial_q-Sheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('tutorial_W', 'tutorial/tutorial_w-Sheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('tutorial_E', 'tutorial/tutorial_e-Sheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    })

    // Game Over
    this.load.image('gameover', 'gameover/gameover.png')
  }

  create() {
    this.scene.start('start')
  }
}
