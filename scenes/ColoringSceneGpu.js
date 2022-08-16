import phaserJuice from "../plugins/phaser3-juice-plugin/dist/phaserJuice.js"

export default class ColoringSceneGpu extends Phaser.Scene {

   juice = new phaserJuice(this)

   constructor() {
      super('ColoringSceneGpu')

      this.isWin = false

      this.pickedColor = 0xDA2E2E
      this.colorArray = [0x3E6B88, 0x3E3E3E, 0xC0C0C0, 0x2B9677, 0xDA2E2E, 0xFFD600]

      this.details = []
   }
   preload() {
      this.load.image('ColoringBG', '../assets/bg/tableBGGreen.png')

      this.load.image('GpuBG', '../assets/coloring/GpuBG.png')
      this.load.image('GpuBGColor', '../assets/coloring/GpuBGColor.png')
      this.load.image('GpuFan', '../assets/coloring/GpuFan.png')

      this.load.image('palette', '../assets/coloring/palette/palette.png')
      this.load.image('blue', '../assets/coloring/palette/blue.png')
      this.load.image('darkGray', '../assets/coloring/palette/darkGray.png')
      this.load.image('gray', '../assets/coloring/palette/gray.png')
      this.load.image('green', '../assets/coloring/palette/green.png')
      this.load.image('red', '../assets/coloring/palette/red.png')
      this.load.image('yellow', '../assets/coloring/palette/yellow.png')

      this.load.image('colorStick', '../assets/coloring/palette/colorStick.png')
      this.load.image('colorPick', '../assets/coloring/palette/colorPick.png')

   }
   create() {
      this.add.image(512, 384, 'ColoringBG')


      this.GpuBGColor = this.add.image(526 + 1000, 365, 'GpuBGColor').setScale(1.5).setInteractive({ cursor: 'pointer' })
      this.GpuBG = this.add.image(512 + 1000, 384, 'GpuBG').setScale(1.5)
      this.GpuFan = this.add.image(620 + 1000, 365, 'GpuFan').setScale(1.5).setInteractive({ cursor: 'pointer' })
      this.GpuFan2 = this.add.image(431 + 1000, 365, 'GpuFan').setScale(1.5).setInteractive({ cursor: 'pointer' })

      this.GpuBGColor.on('pointerdown', (e) => {
         if (!this.isWin) {
            this.GpuBGColor.setTint(this.pickedColor)
            if (!this.details.includes('gpu')) {
               this.details.push('gpu')
            }
            this.checkColor()
         }
      })
      this.GpuFan.on('pointerdown', (e) => {
         if (!this.isWin) {
            this.GpuFan.setTint(this.pickedColor)
            if (!this.details.includes('fan')) {
               this.details.push('fan')
            }
            this.checkColor()
         }
      })
      this.GpuFan2.on('pointerdown', (e) => {
         if (!this.isWin) {
            this.GpuFan2.setTint(this.pickedColor)
            if (!this.details.includes('fan2')) {
               this.details.push('fan2')
            }
            this.checkColor()
         }
      })


      this.add.image(170, 600, 'palette').setScale(.5)

      this.blue = this.add.image(70, 650, 'blue').setScale(.5).setInteractive({ cursor: 'pointer' })
      this.darkGray = this.add.image(50, 560, 'darkGray').setScale(.5).setInteractive({ cursor: 'pointer' })
      this.gray = this.add.image(110, 500, 'gray').setScale(.5).setInteractive({ cursor: 'pointer' })
      this.green = this.add.image(190, 520, 'green').setScale(.5).setInteractive({ cursor: 'pointer' })
      this.red = this.add.image(150, 600, 'red').setScale(.5).setInteractive({ cursor: 'pointer' })
      this.yellow = this.add.image(240, 600, 'yellow').setScale(.5).setInteractive({ cursor: 'pointer' })

      this.add.image(250, 800, 'colorStick').setScale(.3).setAngle(20)
      this.colorPick = this.add.image(315, 630, 'colorPick').setScale(.3).setAngle(20).setTint(this.pickedColor)

      this.textHah = this.add.text(512, 75, 'Раскрась видеокарту', {
         fontSize: 72,
         fontFamily: 'sans-serif',
         color: '#FFD600',
         fontStyle: 'bold',
         stroke: '#836E00',
         strokeThickness: 6,
         align: 'center'
      }).setOrigin(.5)

      this.colorGroup = this.add.group()

      this.colorGroup.add(this.blue)
      this.colorGroup.add(this.darkGray)
      this.colorGroup.add(this.gray)
      this.colorGroup.add(this.green)
      this.colorGroup.add(this.red)
      this.colorGroup.add(this.yellow)


      for (let i = 0; i < 6; i++) {
         this.colorGroup.getChildren()[i].on('pointerover', (e) => {
            this.colorGroup.getChildren()[i].setScale(.55)
         })
         this.colorGroup.getChildren()[i].on('pointerout', (e) => {
            this.colorGroup.getChildren()[i].setScale(.5)
         })
         this.colorGroup.getChildren()[i].on('pointerup', (e) => {
            this.pickedColor = this.colorArray[i]
            this.colorPick.setTint(this.colorArray[i])
         })
      }
      this.showObjs()
   }

   checkColor() {
      if (this.details.length === 3) {
         this.isWin = true
         this.textHah.text = 'Молодец!'
         this.juice.pulse(this.textHah, { repeat: 1 })

         this.time.addEvent({
            delay: 4000,
            callback: () => this.scene.start('ColoringSceneRam'),
            callbackScope: this,
            loop: true
         });
         this.moveObjs([this.GpuBG, this.GpuBGColor, this.GpuFan, this.GpuFan2])
      }
   }

   moveObjs(arr) {
      this.tweens.add({
         targets: [...arr],
         ease: 'Back.easeInOut',
         duration: 1000,
         delay: 3000,
         repeat: 0,
         yoyo: false,
         x: -300
      })
   }

   showObjs() {
      this.tweens.add({
         targets: [this.GpuBG],
         ease: 'Back.easeOut',
         duration: 1000,
         repeat: 0,
         yoyo: false,
         x: 512,
         y: 384
      })
      this.tweens.add({
         targets: [this.GpuBGColor],
         ease: 'Back.easeOut',
         duration: 1000,
         repeat: 0,
         yoyo: false,
         x: 526,
         y: 365
      })
      this.tweens.add({
         targets: [this.GpuFan],
         ease: 'Back.easeOut',
         duration: 1000,
         repeat: 0,
         yoyo: false,
         x: 620,
         y: 365
      })
      this.tweens.add({
         targets: [this.GpuFan2],
         ease: 'Back.easeOut',
         duration: 1000,
         repeat: 0,
         yoyo: false,
         x: 431,
         y: 365
      })
   }
   update() {

   }
}