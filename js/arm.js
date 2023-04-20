import * as THREE from './build/three.module.js';

export default function Arm() {

  const scene = this;

  var textureLoader = new THREE.TextureLoader();

  // Face textures construction
  var armSide = textureLoader.load( './textures/arm/armSide.png' );
  var armTop = textureLoader.load('./textures/arm/armTop.png');
  var armImages = [
    new THREE.MeshBasicMaterial( { map: armSide } ),
    new THREE.MeshBasicMaterial( { map: armSide } ),
    new THREE.MeshBasicMaterial( { map: armSide } ),
    new THREE.MeshBasicMaterial( { map: armSide } ),
    new THREE.MeshBasicMaterial( { map: armSide } ),
    new THREE.MeshBasicMaterial( { map: armSide } )
   ];
  var armMaterial = new THREE.MeshFaceMaterial( armImages );
  
/* Geometries, materials, and objects creation */
  var geo = new THREE.BoxGeometry(10, 48, 10);
  var mat = new THREE.MeshPhongMaterial({ color: 0x4a4a4a });
  var lowerArmMesh = new THREE.Mesh(geo, armMaterial);
  this.lowerArm = new THREE.Object3D(lowerArmMesh);
  this.lowerArm.add(lowerArmMesh);

  var geo = new THREE.BoxGeometry(10, 48, 10);
  var mat = new THREE.MeshPhongMaterial({ color: 0x4a4a4a });
  var upperArmMesh = new THREE.Mesh(geo, armMaterial);
  this.upperArm = new THREE.Object3D(upperArmMesh);
  this.upperArm.add(upperArmMesh);

  var geo = new THREE.BoxGeometry(4, 15, 12);
  var mat = new THREE.MeshPhongMaterial({ color: 0x4a4a4a });
  var leftClawMesh = new THREE.Mesh(geo, mat);
  this.leftClaw = new THREE.Object3D(leftClawMesh);
  this.leftClaw.add(leftClawMesh);

  var geo = new THREE.BoxGeometry(4, 15, 12);
  var mat = new THREE.MeshPhongMaterial({ color: 0x4a4a4a });
  var rightClawMesh = new THREE.Mesh(geo, mat);
  this.rightClaw = new THREE.Object3D(rightClawMesh);
  this.rightClaw.add(rightClawMesh);

  /* Bounding boxes creation */
  var lowerArmBBox = new THREE.Box3().setFromObject(lowerArmMesh);
  this.lowerArmSize = new THREE.Vector3();
  this.lowerArmSize = lowerArmBBox.getSize(this.lowerArmSize);

  var upperArmBBox = new THREE.Box3().setFromObject(upperArmMesh);
  this.upperArmSize = new THREE.Vector3();
  this.upperArmSize = upperArmBBox.getSize(this.upperArmSize);

  var leftClawBBox = new THREE.Box3().setFromObject(leftClawMesh);
  this.clawSize = new THREE.Vector3();
  this.clawSize = leftClawBBox.getSize(this.clawSize);

  /* Positioning */
  this.lowerArm.position.set(0, 0.5 * (this.lowerArmSize.y), 0);
  this.upperArm.position.set(0, this.lowerArmSize.y, 0);
  this.rightClaw.position.set(0.5 * this.upperArmSize.x, 0.5 * (this.upperArmSize.y + this.clawSize.y), 0);
  this.leftClaw.position.set(-(0.5 * this.upperArmSize.x), 0.5 * (this.upperArmSize.y + this.clawSize.y), 0);

  this.Arm = new THREE.Object3D();

  /* Building heirarchy corresponding to scene graph */
  this.upperArm.add(this.leftClaw, this.rightClaw);
  this.lowerArm.add(this.upperArm);
  this.Arm.add(this.lowerArm);

  this.upperArm.translateY(-(0.5 * this.upperArmSize.y));
  this.upperArm.rotateZ(-1);
  this.upperArm.translateY((0.5 * this.upperArmSize.y));

  /* Setting claw boundary*/
  this.leftBound = this.leftClaw.position.x;

  scene.add(this.Arm);
}

Arm.prototype = new THREE.Object3D();

Arm.prototype.animate = function () {
}

Arm.prototype.rotateUpperArm = function () {
  /* Translates about point via translate rotate translate */
  if(this.upperArm.rotation.z.toFixed(2) != 1.4){ // Rotation boundary
    this.upperArm.translateY(-(0.5 * this.upperArmSize.y));
    this.upperArm.rotateZ(.05);
    this.upperArm.translateY((0.5 * this.upperArmSize.y));
  }
}

Arm.prototype.rotateUpperArmBack = function () {
  if(this.upperArm.rotation.z.toFixed(2) != -1.4){
    this.upperArm.translateY(-(0.5 * this.upperArmSize.y));
    this.upperArm.rotateZ(-.05);
    this.upperArm.translateY((0.5 * this.upperArmSize.y));
  }
}

Arm.prototype.rotateLowerArm = function () {
  if(this.lowerArm.rotation.z.toFixed(2) != 1.20){
    this.lowerArm.translateY(-(0.5 * this.lowerArmSize.y));
    this.lowerArm.rotateZ(.05);
    this.lowerArm.translateY((0.5 * this.lowerArmSize.y));
  }
}

Arm.prototype.rotateLowerArmBack = function () {
  if(this.lowerArm.rotation.z.toFixed(2) != -1.20){
    this.lowerArm.translateY(-(0.5 * this.upperArmSize.y));
    this.lowerArm.rotateZ(-.05);
    this.lowerArm.translateY((0.5 * this.upperArmSize.y));
  }
}

Arm.prototype.pincerClose = function () {
  if(Math.trunc(this.leftClaw.position.x + (this.clawSize.x *0.5) - 1) != Math.trunc(this.rightClaw.position.x - (this.clawSize.x * 0.5) + 1)) {
    this.leftClaw.position.x += 0.3;
    this.rightClaw.position.x -= 0.3;
  }
}

Arm.prototype.pincerOpen = function () {
  if(Math.trunc(this.leftClaw.position.x) != Math.trunc(this.leftBound)) { // Claw 
    this.leftClaw.position.x -= 0.3;
    this.rightClaw.position.x += 0.3;
  }     
}
