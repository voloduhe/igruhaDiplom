export default class CableProblemAnimation extends Phaser.Scene {
   constructor() {
      super('CableProblemAnimation')
   }
   preload() {
      this.load.image('cableBG', '../assets/bg/cableBG.png')
      this.load.image('cableBox', '../assets/cableBox.png')
      this.load.image('coverBox', '../assets/cover.png')

      this.load.image('info', '../assets/infoSign.png')

      this.load.audio('signal', '../sounds/noElectricity.mp3')
      this.load.audio('chpok', '../sounds/chpok.mp3')
      this.load.audio('wrong', '../sounds/wrong.mp3')
   }

   create() {
      this.add.image(512, 384, 'cableBG')
      this.cable = this.add.image(-190, 450, 'cableBox')
      this.add.image(537, 334, 'coverBox')

      this.info = this.add.sprite(512, 334, 'info').setScale(0.15).setAlpha(0)

      this.siren = this.sound.add('signal', { volume: 0.3 })
      this.chpok = this.sound.add('chpok', { volume: 0.5 })
      this.wrong = this.sound.add('wrong', { volume: 0.1 })

      this.goCable()

      this.time.addEvent({
         callback: () => this.goInfo(),
         delay: 2000, // ms
         callbackScope: this,
         loop: false
      })
      this.time.addEvent({
         callback: () => this.scene.start('WiresBlueScene'),
         delay: 5000, // ms
         callbackScope: this,
         loop: false
      })
      this.time.addEvent({
         callback: () => {
            this.siren.play()
         },
         delay: 2000, // ms
         callbackScope: this,
         loop: false
      })
   }
   goInfo() {
      this.tweens.add({
         targets: [this.info],
         ease: 'Back.easeIn',
         alpha: { from: 0, to: 1 },
         duration: 500,
         repeat: 0,
         yoyo: false,
      })

   }

   goCable() {
      this.tweens.add({
         targets: [this.cable],
         ease: 'Back.easeIn',
         duration: 1000,
         repeat: 0,
         yoyo: false,
         x: 100,
         y: 450
      })

      this.time.addEvent({
         callback: () => this.chpok.play(),
         delay: 800, // ms
         callbackScope: this,
         loop: false
      })
      this.time.addEvent({
         callback: () => {
            this.wrong.play()
         },
         delay: 1150, // ms
         callbackScope: this,
         loop: false
      })
   }

   update() {

   }
}
