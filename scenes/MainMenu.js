export default class MainMenu extends Phaser.Scene {
   constructor() {
      super('MainMenu')
   }
   preload() {
      this.load.image('playButton', '../assets/playButtonWhite.png')
      this.load.image('gearButton', '../assets/gear.png')

      this.load.image('mainBG1', '../assets/bg/Frame1.png')
      this.load.image('mainBG2', '../assets/bg/Frame2.png')

      this.load.audio('bgmusic', '../sounds/bgmusic.mp3')
      this.load.audio('button', '../sounds/rotate.mp3')
   }

   create() {
      const inGameSound = this.sound.add('bgmusic', {volume: 0.2})
      const buttonSound = this.sound.add('button')

      inGameSound.loop = true
      
      inGameSound.resume()

      inGameSound.play()

      this.anims.create({
         key: 'glowing',
         frames: [
            { key: 'mainBG1' },
            { key: 'mainBG2' }
         ],
         frameRate: 1,
         repeat: -1
      })

      this.BG = this.add.sprite(512, 384, 'mainBG1')
         .play('glowing')


      this.playButton = this.add.image(512, 420, 'playButton')
         .setInteractive({ cursor: 'pointer' })

      this.gearButton = this.add.image(75, 693, 'gearButton')
         .setInteractive({ cursor: 'pointer' })

      const buttons = [this.gearButton, this.playButton]

      for (let i = 0; i < 2; i++) {
         buttons[i].on('pointerover', (e) => {
            buttons[i].setScale(1.05)
         })
         buttons[i].on('pointerout', (e) => {
            buttons[i].setScale(1)
         })
      }

      

      this.playButton.on('pointerup', (e) => {
         buttonSound.play()
         this.time.addEvent({
            callback: () => this.fadeSome(),
            callbackScope: this,
            delay: 0,
            loop: false
         })

         // запуск сцены после меню
         this.time.addEvent({
            callback: () => this.scene.start('PackageScene'),
            callbackScope: this,
            delay: 1000,
            loop: false
         })

      })

      
   }
   fadeSome() {
      this.tweens.add({
         targets: [this.playButton, this.BG],
         alpha: { from: 1, to: 0 },
         ease: 'Linear',
         duration: 1000,
         repeat: 0,
         yoyo: false
      })
   }

   update() {

   }
}