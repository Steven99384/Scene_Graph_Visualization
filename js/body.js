import * as THREE from './build/three.module.js';

export default function Body() {

  var textureLoader = new THREE.TextureLoader();

  // Face textures construction
  var faceFace = textureLoader.load( './textures/head/faceFace.png' );
  var faceSide = textureLoader.load('./textures/head/faceSide.png');
  var faceImages = [
      new THREE.MeshBasicMaterial( { map: faceSide } ),
      new THREE.MeshBasicMaterial( { map: faceSide } ),
      new THREE.MeshBasicMaterial( { map: faceSide } ),
      new THREE.MeshBasicMaterial( { map: faceSide } ),
      new THREE.MeshBasicMaterial( { map: faceFace } ),
      new THREE.MeshBasicMaterial( { map: faceSide } )
     ];
  var faceMaterial = new THREE.MeshFaceMaterial( faceImages );

  // Booster textures construction
  var boosterSide = textureLoader.load( './textures/booster/booster.png' );
  var boosterTop = textureLoader.load('./textures/booster/boosterTop.png')
  var boosterBottom = textureLoader.load('./textures/booster/boosterBottom.png')
  var boosterImages = [
      new THREE.MeshBasicMaterial( { map: boosterSide } ),
      new THREE.MeshBasicMaterial( { map: boosterSide } ),
      new THREE.MeshBasicMaterial( { map: boosterTop } ),
      new THREE.MeshBasicMaterial( { map: boosterBottom } ),
      new THREE.MeshBasicMaterial( { map: boosterSide } ),
      new THREE.MeshBasicMaterial( { map: boosterSide } )
     ];
  var boosterTexture = new THREE.MeshFaceMaterial( boosterImages );

  // Body textures construction
  var bodySide = textureLoader.load( './textures/body/bodySide.png' );
  var bodyTop = textureLoader.load('./textures/body/bodyTop.png')
  var bodyFront = textureLoader.load('./textures/body/bodyFront.png')
  var bodyImages = [
      new THREE.MeshBasicMaterial( { map: bodySide } ),
      new THREE.MeshBasicMaterial( { map: bodySide } ),
      new THREE.MeshBasicMaterial( { map: bodyTop } ),
      new THREE.MeshBasicMaterial( { map: bodyTop } ),
      new THREE.MeshBasicMaterial( { map: bodyFront } ),
      new THREE.MeshBasicMaterial( { map: bodySide } )
     ];
  var bodyTexture = new THREE.MeshFaceMaterial( bodyImages );

  /* Geometries, materials, and objects creation */
  var geo = new THREE.BoxGeometry(39, 39, 39);
  var mat = new THREE.MeshPhongMaterial({ color: 0x4a4a4a });
  var headMesh = new THREE.Mesh(geo, faceMaterial);
  this.Head = new THREE.Object3D();
  this.Head.add(headMesh);

  var geo = new THREE.BoxGeometry(5, 10, 5);
  var mat = new THREE.MeshPhongMaterial({ color: 0x4a4a4a });
  var neckMesh = new THREE.Mesh(geo, mat);
  this.Neck = new THREE.Object3D();
  this.Neck.add(neckMesh);

  var geo = new THREE.BoxGeometry(35, 70, 35);
  var mat = new THREE.MeshPhongMaterial({ color: 0x4a4a4a });
  var bodyMesh = new THREE.Mesh(geo, bodyTexture);
  this.Body = new THREE.Object3D();
  this.Body.add(bodyMesh);

  var geo = new THREE.BoxGeometry(60, 30, 60);
  var mat = new THREE.MeshPhongMaterial({ color: 0x4a4a4a });
  var boosterMesh = new THREE.Mesh(geo, boosterTexture);
  this.Booster = new THREE.Object3D();
  this.Booster.add(boosterMesh);

  // Bounding box creation
  var bodyBBox = new THREE.Box3().setFromObject(bodyMesh);
  this.bodySize = new THREE.Vector3();
  this.bodySize = bodyBBox.getSize(this.bodySize);

  var neckBBox = new THREE.Box3().setFromObject(neckMesh);
  this.neckSize = new THREE.Vector3();
  this.neckSize = neckBBox.getSize(this.neckSize);

  var headBBox = new THREE.Box3().setFromObject(headMesh);
  this.headSize = new THREE.Vector3();
  this.headSize = headBBox.getSize(this.headSize);
  
  var boosterBBox = new THREE.Box3().setFromObject(boosterMesh);
  this.boosterSize = new THREE.Vector3();
  this.boosterSize = boosterBBox.getSize(this.boosterSize);

  this.Booster.position.set(0, -0.5 * (this.bodySize.y + this.boosterSize.y), 0)
  this.Neck.position.set(0, this.bodySize.y * 0.5, 0);
  this.Head.position.set(0, (this.headSize.y + this.bodySize.y + this.neckSize.y) * 0.5, 0);

  this.add(this.Body, this.Neck, this.Head, this.Booster)
}

Body.prototype = new THREE.Object3D();

Body.prototype.animate = function () {
}