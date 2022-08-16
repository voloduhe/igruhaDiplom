export default class GamesMenu extends Phaser.Scene {
   constructor() {
      super('GamesMenu')
   }
   preload() {
      this.load.image('cloud', '../assets/Enemies/cloud.png')
      this.load.image('spike', '../assets/Enemies/spikeBall1.png')
      this.load.image('window', '../assets/myAssets/haha.png')
      this.load.image('close', '../assets/myAssets/closeButton.png')
   }

   create() {
      const window = this.add.image(320, 240, 'window')
         .setScale(.8)
      const cloud = this.add.image(220, 240, 'cloud')
         .setScale(.5)
         .setInteractive({ cursor: 'pointer' })

      const spike = this.add.image(420, 240, 'spike')
         .setScale(.5)
         .setInteractive({ cursor: 'pointer' })

      const close = this.add.image(505, 125, 'close')
         .setScale(.85)
         .setInteractive({ cursor: 'pointer' })


      // контейнер всех объектов что будут в окне
      const windowContainer = this.add.container(
         0,
         0,
         [window, cloud, spike, close]
      )

      const iconsGroup = this.add.group()
      iconsGroup.add(cloud)
      iconsGroup.add(spike)

      windowContainer
         .setInteractive(new Phaser.Geom.Rectangle(
            125,
            115,
            390,
            40
         ), Phaser.Geom.Rectangle.Contains)


      // this.input.enableDebug(windowContainer);

      this.input.setDraggable(windowContainer)
      this.input.on('drag', (pointer, gameObj, x, y) => {
         gameObj.x = x;
         gameObj.y = y;
      })


      for (let i = 0; i < iconsGroup.getLength(); i++) {
         iconsGroup.getChildren()[i].on('pointerover', pointer => {
            iconsGroup.getChildren()[i].setAlpha(.7)
         })
         iconsGroup.getChildren()[i].on('pointerout', pointer => {
            iconsGroup.getChildren()[i].clearAlpha()
         })
      }

      close.on('pointerup', () => {
         this.scene.remove('GamesMenu')
         console.log('закрыта сцена')
      })
   }

   update() {

   }
}