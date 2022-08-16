import GamesMenu from "./GamesMenu.js"

export default class Dnd extends Phaser.Scene {
   constructor() {
      super('Dnd')
   }
   preload() {
      this.load.image('panel', '../assets/myAssets/panel.png')
      this.load.image('buttonStart', '../assets/myAssets/startButton.png')
   }

   create() {
      this.add.image(320, 452, 'panel')

      const buttonStart = this.add.image(50, 452, 'buttonStart')
         .setInteractive({ cursor: 'pointer' })

      buttonStart.on('pointerup', () => this.createWindow(GamesMenu))
   }

   createWindow(scene) {
      this.scene.add('GamesMenu', new scene('GamesMenu'), true)
   }

   update() {

   }
}