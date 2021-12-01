import { Constants } from '~/util/constants'
import GameScene from '../scenes/Game'
import { Fly } from './Fly'

export class Particles {
  private fly1: Phaser.GameObjects.Particles.ParticleEmitter
  private fly2: Phaser.GameObjects.Particles.ParticleEmitter
  private scene: GameScene

  constructor(scene: GameScene) {
    this.scene = scene
    const flyParticles1 = scene.add.particles('particle_fly1')
    const flyParticles2 = scene.add.particles('particle_fly2')

    this.fly1 = flyParticles1.createEmitter({
      speed: 200,
      gravityY: 1000,
      angle: { min: -180, max: 0 },
      rotate: { min: -180, max: 180 },
      lifespan: { min: 100, max: 1000 },
      quantity: 10,
      frequency: -1,
      scale: Constants.SPRITE_SCALE,
    })

    this.fly2 = flyParticles2.createEmitter({
      speed: 100,
      gravityY: 0,
      angle: { min: -180, max: 0 },
      rotate: { min: -180, max: 180 },
      lifespan: { min: 100, max: 1000 },
      quantity: 2,
      frequency: -1,
      scale: Constants.SPRITE_SCALE,
    })

    this.setupHealthEvents()
  }

  setupHealthEvents(): void {
    const spawners = this.scene.getSpawners()
    spawners.forEach((spawner) => {
      spawner.enemies.children.entries.forEach((child) => {
        const fly: Fly = child.getData('ref') as Fly
        fly.onDestroyed.push(this.emitFlyParticles.bind(this))
      })

      spawner.onNewEnemy.push((fly) =>
        fly.onDestroyed.push(this.emitFlyParticles.bind(this))
      )
    })
  }

  emitFlyParticles(x: number, y: number): void {
    this.fly1.explode(10, x, y)
    this.fly2.explode(10, x, y)
  }
}
