
import MainMenu from '../scenes/MainMenu.js'
import PackageScene from '../scenes/PackageScene.js'
import PCBuildScene from '../scenes/PCBuildScene.js'
import WiresBlueScene from '../scenes/WiresBlueScene.js'
import WiresPinkScene from '../scenes/WiresPinkScene.js'
import WiresOrangeScene from '../scenes/WiresOrangeScene.js'
import CableProblemAnimation from '../scenes/CableProblemAnimation.js'
import ColoringSceneCpu from '../scenes/ColoringSceneCpu.js'
import ColoringSceneGpu from '../scenes/ColoringSceneGpu.js'
import ColoringSceneRam from '../scenes/ColoringSceneRam.js'
import CableOnAnimation from '../scenes/CableOnAnimation.js'

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  pixelArt: false,
  backgroundColor: '0x74d845',
  scene: [
    MainMenu,
    PackageScene,
    PCBuildScene,
    CableProblemAnimation,
    WiresBlueScene,
    WiresPinkScene,
    WiresOrangeScene,
    CableOnAnimation,
    ColoringSceneCpu,
    ColoringSceneGpu,
    ColoringSceneRam
  ],
})
