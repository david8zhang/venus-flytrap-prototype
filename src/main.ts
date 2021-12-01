import Phaser from 'phaser'

import Game from './scenes/Game'
import Preloader from './scenes/Preloader'
import { StartMenu } from './scenes/StartMenu'

const config: any = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'phaser',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      // debug: true,
    },
  },
  pixelArt: true,
  dom: {
    createContainer: true,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Preloader, StartMenu, Game],
}

export default new Phaser.Game(config)
