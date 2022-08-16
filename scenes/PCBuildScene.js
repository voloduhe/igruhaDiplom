import phaserJuice from '../plugins/phaser3-juice-plugin/dist/phaserJuice.js'

export default class PCBuildScene extends Phaser.Scene {
  juice = new phaserJuice(this)

  constructor() {
    super('PCBuildScene')

    this.counter = 0

    this.functionRunCounter = 0
  }

  preload() {
    this.load.image('gpu', '../assets/gpu.png')
    this.load.image('cpu', '../assets/cpu.png')
    this.load.image('hdd', '../assets/hdd.png')
    this.load.image('powerBox', '../assets/powerBox.png')
    this.load.image('ram', '../assets/ram.png')
    this.load.image('cables', '../assets/cables.png')

    this.load.image('cover', '../assets/cover.png')

    this.load.image('DndBG', '../assets/bg/DndBGGreen.png')

    this.load.image('cursor', '../assets/cursor.png')

    this.load.audio('bubbles', '../sounds/bubbles.mp3')
    this.load.audio('siren', '../sounds/siren.mp3')
    this.load.audio('chpok', '../sounds/chpok.mp3')
    this.load.audio('win', '../sounds/win.mp3')
    this.load.audio('wrong', '../sounds/wrong.mp3')
    this.load.audio('acceptSound', '../sounds/check.mp3')
  }
  create() {
    this.add.image(512, 384, 'DndBG')
    this.add.image(620, 480, 'cables').setScale(0.2, 0.1)

    this.bubbles = this.sound.add('bubbles')
    this.chpok = this.sound.add('chpok')
    this.siren = this.sound.add('siren', { volume: 0.1 })
    this.winSound = this.sound.add('win')
    this.wrong = this.sound.add('wrong', { volume: 0.1 })
    this.acceptSound = this.sound.add('acceptSound', { volume: 0.3 })


    this.time.addEvent({
      callback: () => this.bubbles.play(),
      callbackScope: this,
      delay: 2000,
      loop: false
    })

    const gpu = this.add
      .image(115, 200, 'gpu')
      .setInteractive({ cursor: 'pointer' })
      .setScale(0.7)
    this.input.setDraggable(gpu)
    const hdd = this.add
      .image(75, 360, 'hdd')
      .setInteractive({ cursor: 'pointer' })
      .setScale(0.45)
    this.input.setDraggable(hdd)
    const cpu = this.add
      .image(210, 520, 'cpu')
      .setInteractive({ cursor: 'pointer' })
      .setScale(0.35)
    this.input.setDraggable(cpu)
    const ram = this.add
      .image(185, 360, 'ram')
      .setInteractive({ cursor: 'pointer' })
      .setScale(0.5)
    this.input.setDraggable(ram)
    const powerBox = this.add
      .image(90, 520, 'powerBox')
      .setInteractive({ cursor: 'pointer' })
      .setScale(0.5)
    this.input.setDraggable(powerBox)

    const zoneGpu = this.add
      .image(394, 490, 'gpu')
      .setInteractive()
      .setTintFill(0x2f2f2f)
      .setScale(0.7)
    const zoneHdd = this.add
      .image(680, 455, 'hdd')
      .setInteractive()
      .setTintFill(0x2f2f2f)
      .setScale(0.45)
    const zoneCpu = this.add
      .image(458, 302, 'cpu')
      .setInteractive()
      .setTintFill(0x2f2f2f)
      .setScale(0.35)
    const zoneRam = this.add
      .image(580, 302, 'ram')
      .setInteractive()
      .setTintFill(0x2f2f2f)
      .setScale(0.5)
    const zonePowerBox = this.add
      .image(344, 191, 'powerBox')
      .setInteractive()
      .setTintFill(0x2f2f2f)
      .setScale(0.5)

    zoneGpu.input.dropZone = true
    zoneHdd.input.dropZone = true
    zoneCpu.input.dropZone = true
    zoneRam.input.dropZone = true
    zonePowerBox.input.dropZone = true

    this.input.on(
      'dragstart',
      (pointer, gameObject) => {
        this.children.bringToTop(gameObject)

        this.cursorTween.stop()
        this.cursorTween2.stop()
        this.fakeTween.stop()
        this.fakeTween2.stop()
        this.sirenTimer.paused = true;

        this.cursor.setAlpha(0)
        this.fakeCpu.setAlpha(0)

        this.cursor.x = 512
        this.cursor.y = 700
      },
      this,
    )

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX
      gameObject.y = dragY
    })

    this.input.on('dragenter', (pointer, gameObject, dropZone) => {
      dropZone.setTintFill(0x86ff05)
    })
    this.input.on('dragleave', (pointer, gameObject, dropZone) => {
      dropZone.setTintFill(0x2f2f2f)
    })

    this.input.on('drop', (pointer, gameObject, dropZone) => {
      if (dropZone.texture.key === gameObject.texture.key) {
        gameObject.x = dropZone.x
        gameObject.y = dropZone.y

        gameObject.input.enabled = false

        dropZone.setTintFill(0x2f2f2f)

        this.chpok.play()
        this.time.addEvent({
          callback: () => this.acceptSound.play(),
          callbackScope: this,
          delay: 500,
          loop: false
        })

        this.counter += 1
        this.checkCounter()
      } else {
        this.goBackAnimation(
          gameObject,
          gameObject.input.dragStartX,
          gameObject.input.dragStartY,
        )
        this.wrong.play()
        dropZone.setTintFill(0x2f2f2f)
      }
    })

    this.input.on('dragend', (pointer, gameObject, dropped) => {
      if (!dropped) {
        // gameObject.x = gameObject.input.dragStartX
        // gameObject.y = gameObject.input.dragStartY

        this.goBackAnimation(
          gameObject,
          gameObject.input.dragStartX,
          gameObject.input.dragStartY,
        )
      }
    })

    this.group = this.add.group()
    this.group.add(gpu)
    this.group.add(cpu)
    this.group.add(hdd)
    this.group.add(ram)
    this.group.add(powerBox)

    for (let i = 0; i < 5; i++) {
      this.juice.pulse(this.group.getChildren()[i], { repeat: 1, delay: 2000 })

      this.group.getChildren()[i].on('pointerover', () => {
        this.group.getChildren()[i].setTint(0xcfcfcf)
      })
      this.group.getChildren()[i].on('pointerout', () => {
        this.group.getChildren()[i].clearTint()
      })
    }

    // КУРСОР ПОМОГАТОР

    this.fakeCpu = this.add.image(210, 520, 'cpu').setScale(0.35).setAlpha(0)

    this.cursor = this.add.sprite(512, 700, 'cursor').setAlpha(0)

    this.title = this.add
      .text(512, 384, 'Собери компьютер!', {
        fontSize: 72,
        fontFamily: 'sans-serif',
        color: '#00ffff',
        fontStyle: 'bold',
        stroke: '#0000ff',
        strokeThickness: 6,
      })
      .setOrigin(0.5)
      .setAlpha(0)

    this.winTitle = this.add
      .text(512, 384, 'Молодец!', {
        fontSize: 72,
        fontFamily: 'sans-serif',
        color: '#00ffff',
        fontStyle: 'bold',
        stroke: '#0000ff',
        strokeThickness: 6,
      })
      .setOrigin(0.5)
      .setAlpha(0)

    this.scoreText = this.add
      .text(512, 45, `${this.counter} / 5`, {
        fontSize: 42,
        fontFamily: 'sans-serif',
        color: '#FF6400',
        // fontStyle: 'bold',
        stroke: '#8a3600',
        strokeThickness: 3,
      })
      .setAlpha(0)
      .setOrigin(0.5)

    this.cover = this.add.image(1350, 334, 'cover')

    this.showHelp()
    this.showText(this.title, true)
  }

  showHelp() {
    this.cursorTween = this.tweens.add({
      targets: [this.cursor],
      alpha: { from: 0, to: 1 },
      ease: 'Linear',
      duration: 1000,
      delay: 7000,
      repeat: 0,
      yoyo: false,
      x: 225,
      y: 610,
    })

    this.sirenTimer = this.time.addEvent({
      callback: () => this.siren.play(),
      callbackScope: this,
      delay: 7000,
      loop: false
    })

    this.fakeTween = this.tweens.add({
      targets: [this.fakeCpu],
      alpha: { from: 0, to: 0.5 },
      ease: 'Linear',
      duration: 1000,
      delay: 7000,
      repeat: 0,
      yoyo: false,
    })
    this.fakeTween2 = this.tweens.add({
      targets: [this.fakeCpu],
      ease: 'Linear',
      duration: 3000,
      delay: 9000,
      repeat: -1,
      yoyo: false,
      x: 458,
      y: 302,
    })

    this.cursorTween2 = this.tweens.add({
      targets: [this.cursor],
      ease: 'Linear',
      duration: 3000,
      repeat: -1,
      delay: 9000,
      yoyo: false,
      x: 478,
      y: 392,
    })
  }

  showText(object, dop) {
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
    if (dop) {
      this.tweens.add({
        targets: [this.scoreText],
        ease: 'Back.easeOut',
        delay: 3000,
        duration: 1000,
        repeat: 0,
        yoyo: false,
        alpha: { from: 0, to: 1 },
      })
    }
  }

  coverPc() {
    //537, 334
    this.children.bringToTop(this.cover)
    this.tweens.add({
      targets: [this.cover],
      ease: 'Linear',
      duration: 1500,
      delay: 3000,
      repeat: 0,
      yoyo: false,
      x: 537,
    })
    this.time.addEvent({
      callback: () => this.scene.start('CableProblemAnimation'),
      callbackScope: this,
      delay: 5500,
      loop: false
    })
  }

  goBackAnimation(obj, x, y) {
    this.tweens.add({
      targets: [obj],
      ease: 'Back.easeOut',
      duration: 500,
      repeat: 0,
      yoyo: false,
      x: x,
      y: y,
    })
  }

  fillTintAnimation(obj) {
    this.tweens.add({
      targets: [obj],
      ease: 'Back.easeOut',
      duration: 500,
      repeat: 0,
      yoyo: false,
    })
  }

  checkCounter() {
    if (this.counter === 5 && this.functionRunCounter === 0) {
      this.functionRunCounter += 1
      this.children.bringToTop(this.winTitle)
      this.showText(this.winTitle, false)
      this.coverPc()

      this.winSound.play()
    }
    this.scoreText.text = `${this.counter} / 5`
  }

  update() {

  }
}
