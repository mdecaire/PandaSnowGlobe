/*
 This file draws and controls the globe and lighting
 within the code. This was my own creation except for the 
 hemisphere lighting which includes a link.

 Class: CMSC 405 6380 Computer Graphics
 * Project Title: THREEjs 3D graphics 
 * @author MichelleDecaire 
 * DueDate: 9/30/2018 
 */

    //lights up the globe taken from 
     //https://github.com/mrdoob/three.js/blob/master/examples/webgl_lights_hemisphere.html
 function drawGlobe() {
     hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.8);
     hemiLight.color.setHSL(0.6, 1, 0.6);
     hemiLight.groundColor.setHSL(0.095, 1, 0.75);
     hemiLight.position.set(0, 50, 0);

     var globe = new THREE.Mesh(
         new THREE.SphereGeometry(11.5, 100, 50),
         new THREE.MeshPhongMaterial({
             color: "white",
             specular: 0x202020,
             transparent: true,
             shininess: 5,
             opacity: 0.2,
         })
     );

     globe.position.y = 1;
     var base = new THREE.Mesh(
         new THREE.CylinderGeometry(8, 10, 3.5, 64, 10),
         new THREE.MeshPhongMaterial({
             color: 0x5E2612, // reflectivity for diffuse light
             specular: 0xA0522D, // reflectivity for specular light
             shininess: 5 // controls size of specular highlights
         })
     );

     base.position.y = -10;
     globe.add(base.clone());
     var snowLayer = new THREE.Mesh(
         new THREE.CylinderGeometry(8, 8, .1, 50, 10),
         new THREE.MeshLambertMaterial({
             color: 0xFFFaFa
         })
     );
     
     snowLayer.position.y = -8.2;
     globe.add(snowLayer.clone());
     globe.add(hemiLight);
     return globe;
 }