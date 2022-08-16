import phaserJuice from "../plugins/phaser3-juice-plugin/dist/phaserJuice.js"

export default class ColoringSceneCpu extends Phaser.Scene {

   juice = new phaserJuice(this)

   constructor() {
      super('ColoringSceneCpu')

      this.isWin = false

      this.pickedColor = 0xDA2E2E
      this.colorArray = [0x3E6B88, 0x3E3E3E, 0xC0C0C0, 0x2B9677, 0xDA2E2E, 0xFFD600]

      this.details = []
   }
   preload() {
      this.load.image('ColoringBG', '../assets/bg/tableBGGreen.png')

      this.load.image('CpuBG', '../assets/coloring/CpuBG.png')
      this.load.image('CpuBGColor', '../assets/coloring/CpuBGColor.png')
      this.load.image('CpuPlateColor', '../assets/coloring/CpuPlateColor.png')
      this.load.image('triangleCpu', '../assets/coloring/triangleCpu.png')

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

      this.cpuBG = this.add.image(512, 384, 'CpuBG').setScale(1.5)
      this.cpuBGColor = this.add.image(512, 384, 'CpuBGColor').setScale(1.5).setInteractive({ cursor: 'pointer' })
      this.cpuPlate = this.add.image(512, 384, 'CpuPlateColor').setScale(1.3).setInteractive({ cursor: 'pointer' })
      this.triangleCpu = this.add.image(620, 490, 'triangleCpu').setScale(1.4).setInteractive({ cursor: 'pointer' })

      this.cpuBGColor.on('pointerdown', (e) => {
         if (!this.isWin) {
            this.cpuBGColor.setTint(this.pickedColor)
            if (!this.details.includes('cpu')) {
               this.details.push('cpu')
            }
            this.checkColor()
         }
      })
      this.cpuPlate.on('pointerdown', (e) => {
         if (!this.isWin) {
            this.cpuPlate.setTint(this.pickedColor)
            if (!this.details.includes('cpuPlate')) {
               this.details.push('cpuPlate')
            }
            this.checkColor()
         }
      })
      this.triangleCpu.on('pointerdown', (e) => {
         if (!this.isWin) {
            this.triangleCpu.setTint(this.pickedColor)
            if (!this.details.includes('triangleCpu')) {
               this.details.push('triangleCpu')
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

      this.textHah = this.add.text(512, 75, 'Раскрась процессор', {
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
   }

   checkColor() {
      if (this.details.length === 3) {
         this.isWin = true
         this.textHah.text = 'Молодец!'
         this.juice.pulse(this.textHah, { repeat: 1 })

         this.time.addEvent({
            delay: 4000,
            callback: () => this.scene.start('ColoringSceneGpu'),
            callbackScope: this,
            loop: true
         });
         this.moveObjs([this.cpuBG, this.cpuBGColor, this.cpuPlate, this.triangleCpu])
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
         x: -200
      })
   }

   update() {

   }
}