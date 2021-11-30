import { Player } from './Player'
import Game from '~/scenes/Game'

export class Score {
  private scene: Game

  private score = 0
  private scoreText: Phaser.GameObjects.Text

  constructor(scene: Game, player: Player) {
    this.scene = scene

    this.scoreText = this.scene.add.text(16, 10, 'Score: 0', {
      fontSize: '24px',
    })
    player.onScored.push(this.increaseScore.bind(this))
  }

  increaseScore(points: number): void {
    this.score += points
    this.scoreText.setText('Score: ' + this.score)
  }
}
