import phaserJuice from "../plugins/phaser3-juice-plugin/dist/phaserJuice.js"

export default class PackageScene extends Phaser.Scene {

   isCursorShown = false

   juice = new phaserJuice(this)

   constructor() {
      super('PackageScene')
   }
   preload() {
      this.load.image('tableBG', '../assets/bg/tableBGGreen.png')

      this.load.image('boxOpened', '../assets/boxOpened.png')
      this.load.image('boxClosed', '../assets/boxClosed.png')

      this.load.image('cursor', '../assets/cursor.png')

      this.load.image('gpu', '../assets/gpu.png')
      this.load.image('cpu', '../assets/cpu.png')
      this.load.image('hdd', '../assets/hdd.png')
      this.load.image('powerBox', '../assets/powerBox.png')
      this.load.image('ram', '../assets/ram.png')
      this.load.image('computer', '../assets/computer.png')


      this.load.image('star1', '../assets/Star1.png')

      this.load.audio('dropThings', '../sounds/dropThings.mp3')
      this.load.audio('wave', '../sounds/wave.mp3')
      this.load.audio('done', '../sounds/done.mp3')
      this.load.audio('siren', '../sounds/siren.mp3')
      this.load.audio('check', '../sounds/check.mp3')
   }

   create() {
      this.add.image(512, 384, 'tableBG')

      this.dropThings = this.sound.add('dropThings')
      this.wave = this.sound.add('wave', { volume: 0.75 })
      this.done = this.sound.add('done')
      this.siren = this.sound.add('siren', { volume: 0.1 })
      this.check = this.sound.add('check', { volume: 0.3 })

      this.Box = this.add.sprite(-200, 384, 'boxClosed')
         .setInteractive({ cursor: 'pointer' })

      this.cursor = this.add.sprite(512, 700, 'cursor')
         .setAlpha(0)

      this.pulseTimer = this.time.addEvent({
         callback: () => this.juice.pulse(this.cursor),
         callbackScope: this,
         delay: 5000,
         loop: true
      })
      this.computer = this.add.sprite(512, 384, 'computer')
         .setScale(.1)
         .setAlpha(0)

      this.groupOfComponents = this.add.group();
      this.groupOfComponents.add(this.add.sprite(250, 384, 'gpu').setAlpha(0).setScale(.5))
      this.groupOfComponents.add(this.add.sprite(250, 384, 'cpu').setAlpha(0).setScale(.5))
      this.groupOfComponents.add(this.add.sprite(250, 384, 'hdd').setAlpha(0).setScale(.5))
      this.groupOfComponents.add(this.add.sprite(250, 384, 'powerBox').setAlpha(0).setScale(.5))
      this.groupOfComponents.add(this.add.sprite(250, 384, 'ram').setAlpha(0).setScale(.5))


      this.howToText = this.add.text(512, 384, 'Попробуй теперь ты', {
         fontSize: 72,
         fontFamily: 'sans-serif',
         color: '#00ffff',
         fontStyle: 'bold',
         stroke: '#0000ff',
         strokeThickness: 6,
         align: 'center'
      })
         .setOrigin(.5)
         .setAlpha(0)

      // выезд подсказки
      this.showHelp()
      this.boxMouseEvents()
      this.moveBox()

   }
   boxMouseEvents() {
      this.Box.on('pointerup', (e) => {
         // прячем курсор
         this.cursorTween.stop()
         this.sirenTimer.paused = true;
         this.cursor.setAlpha(0)
         this.isCursorShown = false
         this.cursor.x = 512
         this.cursor.y = 700
         this.pulseTimer.paused = true;

         this.Box.setTexture('boxOpened')

         // выброс товаров
         this.moveComponents(this.groupOfComponents, 0, 600, 300)
         this.moveComponents(this.groupOfComponents, 1, 730, 300)
         this.moveComponents(this.groupOfComponents, 2, 860, 300)
         this.moveComponents(this.groupOfComponents, 3, 600, 450)
         this.moveComponents(this.groupOfComponents, 4, 730, 450)

         this.moveCock()
      })
   }

   showText(object) {
      this.tweens.add({
         targets: [object],
         ease: 'Linear',
         duration: 2000,
         repeat: 0,
         yoyo: false,
         alpha: { from: 0, to: 1 },
         scale: 1.1,
      })
      this.tweens.add({
         targets: [object],
         ease: 'Linear',
         delay: 2000,
         duration: 1000,
         repeat: 0,
         yoyo: false,
         alpha: { from: 1, to: 0 },
         scale: 1.4,
      })
   }

   moveBox() {
      this.wave.play()
      this.tweens.add({
         targets: [this.Box],
         alpha: { from: 0.4, to: 1 },
         ease: 'Back.easeOut',
         duration: 1000,
         repeat: 0,
         yoyo: false,
         x: 250,
         y: 384
      })
   }

   moveComponents(group, i, x, y) {
      this.dropThings.play()
      this.tweens.add({
         targets: [group.getChildren()[i]],
         alpha: { from: 0.4, to: 1 },
         ease: 'Back.easeOut',
         duration: 1000,
         repeat: 0,
         yoyo: false,
         x: x,
         y: y
      })
      this.tweens.add({
         targets: [this.Box],
         ease: 'Back.easeInOut',
         duration: 2000,
         repeat: 0,
         delay: 2000,
         yoyo: false,
         x: -384,
         y: 384
      })


      this.time.addEvent({
         callback: () => this.wave.play(),
         callbackScope: this,
         delay: 2500,
         loop: false
      })


   }
   moveCock() {
      this.tweens.add({
         targets: [...this.groupOfComponents.getChildren()],
         ease: 'Back.easeInOut',
         duration: 2000,
         repeat: 0,
         delay: 2000,
         yoyo: false,
         x: 512,
         y: 384
      })
      this.tweens.add({
         targets: [...this.groupOfComponents.getChildren()],
         ease: 'linear',
         duration: 1000,
         repeat: 0,
         delay: 3000,
         yoyo: false,
         scale: 0
      })
      this.tweens.add({
         targets: [this.computer],
         ease: 'Linear',
         alpha: { from: 0, to: 1 },
         duration: 1000,
         repeat: 0,
         delay: 4000,
         yoyo: false,
         scale: 0.5
      })
      //this.check
      this.time.addEvent({
         callback: () => this.check.play(),
         callbackScope: this,
         delay: 5000,
         loop: false
      })

      this.time.addEvent({
         callback: () => this.showText(this.howToText),
         callbackScope: this,
         delay: 6000,
         loop: false
      })
      this.time.addEvent({
         callback: () => this.done.play(),
         callbackScope: this,
         delay: 6000,
         loop: false
      })
      this.time.addEvent({
         delay: 9500, // ms
         callback: () => {
            this.scene.start('PCBuildScene');
         },
         callbackScope: this,
         loop: false
      })
   }


   showHelp() {
      this.isCursorShown = true
      this.cursorTween = this.tweens.add({
         targets: [this.cursor],
         alpha: { from: 0, to: 1 },
         ease: 'Linear',
         duration: 1000,
         delay: 4000,
         repeat: 0,
         yoyo: false,
         x: 340,
         y: 500
      })
      this.sirenTimer = this.time.addEvent({
         callback: () => this.siren.play(),
         callbackScope: this,
         delay: 4000,
         loop: false
      })
   }

   update() {

   }
}