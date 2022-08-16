export default class CableOnAnimation extends Phaser.Scene {
   constructor() {
      super('CableOnAnimation')
   }
   preload() {
      this.load.image('cableBG', '../assets/bg/cableBG.png')
      this.load.image('aWire', '../assets/aWire.png')
      this.load.image('coverBox', '../assets/cover.png')
      this.load.image('accept', '../assets/accept.png')

      this.load.audio('acceptSound', '../sounds/check.mp3')
      this.load.audio('electro', '../sounds/electricSound.mp3')
   }
   // 07FFF0 FF07AB  FF6107
   create() {
      this.add.image(512, 384, 'cableBG')
      this.cable1 = this.add.image(170, 450, 'aWire').setScale(1, 0.75)
      this.cable2 = this.add.image(170, 470, 'aWire').setScale(1, 0.75)
      this.cable3 = this.add.image(170, 490, 'aWire').setScale(1, 0.75)
      this.add.image(537, 334, 'coverBox')

      this.accept = this.add.image(537, 334, 'accept').setScale(0.01)
      this.acceptSound = this.sound.add('acceptSound', { volume: 0.6 })

      this.electro = this.sound.add('electro', { volume: 0.08 })

      this.onCable()
   }

   onCable() {
      this.tweens.addCounter({
         from: 255,
         to: 0,
         duration: 500,
         delay: 500,
         onUpdate: (tween) => {
            const value = Math.floor(tween.getValue());

            this.cable1.setTint(Phaser.Display.Color.GetColor(255, 255, value));
         }
      });
      this.tweens.addCounter({
         from: 255,
         to: 0,
         duration: 500,
         delay: 1100,
         onUpdate: (tween) => {
            const value = Math.floor(tween.getValue());

            this.cable2.setTint(Phaser.Display.Color.GetColor(255, value, 255));
         }
      });
      this.tweens.addCounter({
         from: 255,
         to: 0,
         duration: 500,
         delay: 1600,
         onUpdate: (tween) => {
            const value = Math.floor(tween.getValue());

            this.cable3.setTint(Phaser.Display.Color.GetColor(value, 255, 255));
         }
      });

      this.tweens.add({
         targets: [this.accept],
         ease: 'Back.easeOut',
         duration: 1000,
         delay: 2600,
         repeat: 0,
         yoyo: false,
         scale: 1
      })

      this.time.addEvent({
         callback: () => this.acceptSound.play(),
         delay: 2600, // ms
         callbackScope: this,
         loop: false
      })
      this.time.addEvent({
         callback: () => this.electro.play(),
         delay: 500, // ms
         callbackScope: this,
         repeat: 2,
         loop: false
      })

      this.time.addEvent({
         callback: () => this.scene.start('ColoringSceneCpu'),
         delay: 4500, // ms
         callbackScope: this,
         loop: false
      })
   }

   update() {

   }
}
