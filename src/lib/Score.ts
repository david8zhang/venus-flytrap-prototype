import { Player } from './Player'
import Game from '~/scenes/Game'
import { Fly } from './Fly'
import { Spawner } from './Spawner'

export const MAX_HEALTH = 20
export class Score {
  private scene: Game

  private score = 0
  private scoreText: Phaser.GameObjects.Text

  public health = MAX_HEALTH
  private healthText: Phaser.GameObjects.Text

  public onHealthDecreased: Array<() => void> = []

  constructor(scene: Game, player: Player, spawners: Spawner[]) {
    this.scene = scene

    this.scoreText = this.scene.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
    })
    this.healthText = this.scene.add.text(16, 64, `Health: ${MAX_HEALTH}`, {
      fontSize: '32px',
    })

    player.onScored.push(this.increaseScore.bind(this))

    spawners.forEach((spawner: Spawner) => {
      spawner.enemies.children.entries.forEach((child) => {
        const fly: Fly = child.getData('ref') as Fly
        fly.onReachedRightEdge.push(this.decreaseHealth.bind(this))
      })

      spawner.onNewEnemy.push((fly) =>
        fly.onReachedRightEdge.push(this.decreaseHealth.bind(this))
      )
    })
  }

  increaseScore(points: number): void {
    this.score += points
    this.scoreText.setText('Score: ' + this.score)
  }

  decreaseHealth(): void {
    this.health -= 1
    this.healthText.setText('Health: ' + this.health)
    this.onHealthDecreased.forEach((handler) => handler())
  }
}
