import phaserJuice from '../plugins/phaser3-juice-plugin/dist/phaserJuice.js'

export default class WiresPinkScene extends Phaser.Scene {

  juice = new phaserJuice(this)

  constructor() {
    super('WiresPinkScene')

    this.isWin = false
  }

  preload() {
    this.load.image('BGPink', '../assets/bg/puzzlePinkBG.png')

    this.load.image('coverBIG', '../assets/coverPuzzle.png')

    // ELEMENTS
    this.load.image('cornerP', '../assets/puzzleElems/cornerPink.png')
    this.load.image('lineP', '../assets/puzzleElems/linePink.png')

    this.load.image('cursor', '../assets/cursor.png')

    this.load.audio('win', '../sounds/win.mp3')
    this.load.audio('rotate', '../sounds/rotate.mp3')

  }
  create() {
    this.winSound = this.sound.add('win')
    this.rotateSound = this.sound.add('rotate', { volume: 0.3 })

    this.add.image(512, 384, 'BGPink')

    // ELEMENTS 358, 164
    this.first = this.add.sprite(358, 164, 'cornerP').setInteractive({ cursor: 'pointer' })
    this.first.angle = 90
    this.second = this.add.sprite(513, 164, 'cornerP').setInteractive({ cursor: 'pointer' })
    this.second.angle = -90
    this.third = this.add.sprite(513, 319, 'lineP').setInteractive({ cursor: 'pointer' })
    this.third.angle = 0
    this.fourth = this.add.sprite(513, 474, 'cornerP').setInteractive({ cursor: 'pointer' })
    this.fourth.angle = -90
    this.fifth = this.add.sprite(358, 474, 'cornerP').setInteractive({ cursor: 'pointer' })
    this.fifth.angle = -90
    this.sixth = this.add.sprite(358, 319, 'cornerP').setInteractive({ cursor: 'pointer' })
    this.sixth.angle = 0


    this.groupOfElems = this.add.group()

    this.groupOfElems.add(this.first)
    this.groupOfElems.add(this.second)
    this.groupOfElems.add(this.third)
    this.groupOfElems.add(this.fourth)
    this.groupOfElems.add(this.fifth)
    this.groupOfElems.add(this.sixth)


    for (let i = 0; i < 6; i++) {
      this.groupOfElems.getChildren()[i].on('pointerup', (e) => {
        if (!this.isWin) {
          this.groupOfElems.getChildren()[i].angle += 90

          this.checkRotation()
          this.rotateSound.play()
        }

      })
      this.groupOfElems.getChildren()[i].on('pointerover', (e) => {
        this.groupOfElems.getChildren()[i].setTint(0xcfcfcf)
      })
      this.groupOfElems.getChildren()[i].on('pointerout', (e) => {
        this.groupOfElems.getChildren()[i].clearTint()
      })
    }

    this.cover = this.add.sprite(533, 189, 'coverBIG')


    this.winTitle = this.add.text(512, 300, 'Молодец!', {
      fontSize: 72,
      fontFamily: 'sans-serif',
      color: '#00ffff',
      fontStyle: 'bold',
      stroke: '#0000ff',
      strokeThickness: 6,
    })
      .setOrigin(0.5)
      .setAlpha(0)

    // 512, 700
    this.cursor = this.add.sprite(512, 700, 'cursor').setAlpha(0)


    this.moveCoverIn("open")
  }

  moveCoverIn(params) {
    if (params === 'open') {
      this.tweens.add({
        targets: [this.cover],
        ease: 'Linear',
        duration: 1000,
        repeat: 0,
        yoyo: false,
        x: 533,
        y: -1000,
      })
    } else {
      this.tweens.add({
        targets: [this.cover],
        ease: 'Linear',
        duration: 1000,
        delay: 3000,
        repeat: 0,
        yoyo: false,
        x: 533,
        y: 189,
      })
    }
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

  checkRotation() {
    if (!this.isWin) {
      if (
        (this.first.angle === -180)
        &&
        (this.second.angle === 0)
        &&
        (this.third.angle === 90 || this.third.angle === -90)
        &&
        (this.fourth.angle === 90)
        &&
        (this.fifth.angle === -180)
        &&
        (this.sixth.angle === 0)
      ) {
        this.winSound.play()
        this.isWin = true
        this.showText(this.winTitle)
        this.moveCoverIn("close")
        this.time.addEvent({
          callback: () => this.scene.start('WiresOrangeScene'),
          callbackScope: this,
          delay: 5000,
          loop: false
        })
      }
    }

  }

  update() {

  }
}
