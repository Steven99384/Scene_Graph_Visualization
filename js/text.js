import * as THREE from './build/three.module.js';

const midpointX = -150
const midpointZ = -150

export default function Text(offset) {
    
    // // Center line of scene graph, offset added
    // this.midpointX = -150;
    // this.midpointZ = -150;

    const scene = this;

    var loader = new THREE.FontLoader();

    this.matPhong = new THREE.MeshPhongMaterial({ color: 0xff6347});
    this.matBright = new THREE.MeshPhongMaterial({ color: 0xfffff00 });

    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {        
        /* Creating and positioning each line of text */
        scene.geoClaws = new THREE.TextGeometry('Claws', {
            font: font,
            size: 10,
            height: 1,
            curveSegments: 20,
            bevelEnabled: false,    
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
        });
        scene.geoClaws.center()
        scene.clawsText = new THREE.Mesh(scene.geoClaws, scene.matPhong);
        scene.clawsText.position.set(midpointX + offset, 60, midpointZ);
        scene.add(scene.clawsText);

        scene.geoUpperArm = new THREE.TextGeometry('UpperArm', {
            font: font,
            size: 10,
            height: 1,
            curveSegments: 20,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
        });
        scene.geoUpperArm.center()
        scene.upperArmText = new THREE.Mesh(scene.geoUpperArm, scene.matPhong);
        scene.upperArmText.position.set(midpointX + offset, 40, midpointZ);
        scene.add(scene.upperArmText);

        scene.geoLowerArm = new THREE.TextGeometry('Lower Arm', {
            font: font,
            size: 10,
            height: 1,
            curveSegments: 20,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
        });
        scene.geoLowerArm.center()
        scene.lowerArmText = new THREE.Mesh(scene.geoLowerArm, scene.matPhong);
        scene.lowerArmText.position.set(midpointX + offset, 20, midpointZ);
        scene.add(scene.lowerArmText);

        scene.geoBase = new THREE.TextGeometry('Body', {
            font: font,
            size: 10,
            height: 1,
            curveSegments: 20,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
        });
        scene.geoBase.center()
        scene.BaseText = new THREE.Mesh(scene.geoBase, scene.matPhong);
        scene.BaseText.position.set(midpointX, 0, midpointZ);
        scene.add(scene.BaseText);

        // Constructing brighter text to be flashed when corresponding body is activated
        scene.BaseFlashText = new THREE.Mesh(scene.geoBase, scene.matBright);
        scene.BaseFlashText.position.set(midpointX, 0, midpointZ);
        scene.add(scene.BaseFlashText);
        scene.BaseFlashText.visible = false;

        scene.LAFlashText = new THREE.Mesh(scene.geoLowerArm, scene.matBright);
        scene.LAFlashText.position.set(midpointX + offset, 20, midpointZ);
        scene.add(scene.LAFlashText);
        scene.LAFlashText.visible = false;

        scene.UAFlashText = new THREE.Mesh(scene.geoUpperArm, scene.matBright);
        scene.UAFlashText.position.set(midpointX + offset, 40, midpointZ);
        scene.add(scene.UAFlashText);
        scene.UAFlashText.visible = false;

        scene.ClawsFlashText = new THREE.Mesh(scene.geoClaws, scene.matBright);
        scene.ClawsFlashText.position.set(midpointX + offset, 60, midpointZ);
        scene.add(scene.ClawsFlashText);
        scene.ClawsFlashText.visible = false;
    });


    

}

Text.prototype = new THREE.Object3D();

Text.prototype.animate = function() {
}

Text.prototype.BaseFlash = function() {
    this.BaseText.visible = false;
    this.BaseFlashText.visible = true;
}

Text.prototype.BaseStop = function() {
    this.BaseFlashText.visible = false;
    this.BaseText.visible = true;
}

Text.prototype.LowerArmFlash = function() {
    this.lowerArmText.visible = false;
    this.LAFlashText.visible = true;
}

Text.prototype.LowerArmStop = function() {
    this.LAFlashText.visible = false;
    this.lowerArmText.visible = true;
}

Text.prototype.UpperArmFlash = function() {
    this.upperArmText.visible = false;
    this.UAFlashText.visible = true;
}

Text.prototype.UpperArmStop = function() {
    this.UAFlashText.visible = false;
    this.upperArmText.visible = true;
}

Text.prototype.PincersFlash = function() {
    this.clawsText.visible = false;
    this.ClawsFlashText.visible = true;
}

Text.prototype.PincersStop = function() {
    this.ClawsFlashText.visible = false;
    this.clawsText.visible = true;
}

