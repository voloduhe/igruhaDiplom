import phaserJuice from '../plugins/phaser3-juice-plugin/dist/phaserJuice.js'

export default class WiresBlueScene extends Phaser.Scene {

  juice = new phaserJuice(this)

  constructor() {
    super('WiresBlueScene')

    this.isWin = false
  }

  preload() {
    this.load.image('BGBlue', '../assets/bg/puzzleBlueBG.png')

    this.load.image('coverBIG', '../assets/coverPuzzle.png')

    // ELEMENTS
    this.load.image('cornerB', '../assets/puzzleElems/cornerBlue.png')
    this.load.image('lineB', '../assets/puzzleElems/lineBlue.png')
    this.load.image('electricityB', '../assets/puzzleElems/electricityB.png')

    this.load.image('cursor', '../assets/cursor.png')


    this.load.audio('win', '../sounds/win.mp3')
    this.load.audio('done', '../sounds/done.mp3')
    this.load.audio('siren', '../sounds/siren.mp3')
    this.load.audio('rotate', '../sounds/rotate.mp3')
  }
  create() {
    this.winSound = this.sound.add('win')
    this.done = this.sound.add('done')
    this.siren = this.sound.add('siren', { volume: 0.1 })
    this.rotateSound = this.sound.add('rotate', { volume: 0.3 })

    this.done.play()

    this.add.image(512, 384, 'BGBlue')

    // ELEMENTS 358, 164
    this.first = this.add.sprite(358, 164, 'lineB').setInteractive({ cursor: 'pointer' })
    this.first.angle = 90
    this.second = this.add.sprite(513, 164, 'cornerB').setInteractive({ cursor: 'pointer' })
    this.second.angle = -180
    this.third = this.add.sprite(513, 319, 'lineB').setInteractive({ cursor: 'pointer' })
    this.third.angle = 90
    this.fourth = this.add.sprite(513, 474, 'cornerB').setInteractive({ cursor: 'pointer' })
    this.fourth.angle = 0
    this.fifth = this.add.sprite(668, 474, 'lineB').setInteractive({ cursor: 'pointer' })

    this.groupOfElems = this.add.group()

    this.groupOfElems.add(this.first)
    this.groupOfElems.add(this.second)
    this.groupOfElems.add(this.third)
    this.groupOfElems.add(this.fourth)
    this.groupOfElems.add(this.fifth)

    for (let i = 0; i < 5; i++) {
      this.groupOfElems.getChildren()[i].on('pointerup', (e) => {
        if (!this.isWin) {
          this.groupOfElems.getChildren()[i].angle += 90


          this.cursorTween.stop()

          this.timerOfCursor.paused = true
          this.sirenTimer.paused = true


          this.cursor.x = 512
          this.cursor.y = 700
          this.cursor.setAlpha(0)

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


    this.title = this.add.text(512, 300, 'Почини провода!', {
      fontSize: 72,
      fontFamily: 'sans-serif',
      color: '#00ffff',
      fontStyle: 'bold',
      stroke: '#0000ff',
      strokeThickness: 6,
    })
      .setOrigin(0.5)
      .setAlpha(0)


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
    this.showHelp()
    this.showText(this.title)
  }

  moveCoverIn(params) {
    if (params === 'open') {
      this.tweens.add({
        targets: [this.cover],
        ease: 'Linear',
        duration: 1000,
        delay: 3000,
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
    this.children.bringToTop(object)
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

  rotate() {
    this.rotateTimer = this.time.addEvent({
      callback: () => {
        if (this.timerOfCursor.paused === false) {
          this.fifth.angle += 90
        }
      },
      callbackScope: this,
      delay: 1000,
      loop: true
    })
  }

  showHelp() {
    this.juice.pulse(this.cursor, { repeat: -1 })

    this.cursorTween = this.tweens.add({
      targets: [this.cursor],
      alpha: { from: 0, to: 1 },
      ease: 'Linear',
      duration: 1000,
      delay: 9000,
      repeat: 0,
      yoyo: false,
      x: 690,
      y: 550
    })
    this.timerOfCursor = this.time.addEvent({
      callback: () => this.rotate(),
      callbackScope: this,
      delay: 9100,
      loop: false
    })
    this.sirenTimer = this.time.addEvent({
      callback: () => this.siren.play(),
      callbackScope: this,
      delay: 9000,
      loop: false
    })
  }

  checkRotation() {
    if (
      (this.first.angle === 0 || this.first.angle === -180)
      &&
      (this.second.angle === 0)
      &&
      (this.third.angle === 90 || this.third.angle === -90)
      &&
      (this.fourth.angle === -180)
      &&
      (this.fifth.angle === 0 || this.fifth.angle === -180)
    ) {
      if (!this.isWin) {
        this.winSound.play()
        this.isWin = true
        this.showText(this.winTitle)
        this.children.bringToTop(this.cover)
        this.moveCoverIn("close")
        this.time.addEvent({
          callback: () => this.scene.start('WiresPinkScene'),
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
