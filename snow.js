/*
This file draws and controls the animation from the snow.
This code was modified from the text book
chapter 5.1 points cloud demo.
I could not get the sphere of clouds to animate so
I created a second point cloud in order to animate it

 Class: CMSC 405 6380 Computer Graphics
 * Project Title: THREEjs 3D graphics 
 * @author MichelleDecaire 
 * DueDate: 9/30/2018 
*/


var points0;
var points1;
var points2;

//adds points to a point cloud to looks like confetti
function drawSnow() {
    points0 = getPoints();
    points1 = getPoints();
    points2 = getPoints();

    var pointMaterial = new THREE.PointCloudMaterial({
        color: "blue",
        size: 2,
        sizeAttenuation: false
    });

    var pointMaterial1 = new THREE.PointCloudMaterial({
        color: "red",
        size: 2,
        sizeAttenuation: false
    });

    var pointMaterial2 = new THREE.PointCloudMaterial({
        color: "green",
        size: 2,
        sizeAttenuation: false
    });
    var sphereOfPoints = new THREE.PointCloud(points0, pointMaterial);
    var sphereOfPoints1 = new THREE.PointCloud(points1, pointMaterial1);
    var sphereOfPoints2 = new THREE.PointCloud(points2, pointMaterial2);
    sphereOfPoints.add(sphereOfPoints1);
    sphereOfPoints.add(sphereOfPoints2);

    return sphereOfPoints;
}

//modified  from the textbook to add color
//builds the separate arrays for different colors
function getPoints() {
    var i = 0;
    var points = new THREE.Geometry();

    while (points.vertices.length < 500) {
        var x = 2 * Math.random() - 1; // (between -1 and 1)
        var y = 2 * Math.random() - 1;
        var z = 2 * Math.random() - 1;
        if (x * x + y * y + z * z < 1) { // use vector only if length is less than 1

            var pt = new THREE.Vector3(x, y, z);
            points.vertices.push(pt);
        }
        i++;
    }
    return points;
}

//this methods builds a cloud of snow that can be animated
var driftPoints;
var driftSpeeds;
var geometry;
var pointCloud;

function drawDriftSnow() {
    driftPoints = new Array(1500);
    driftSpeeds = new Array(1500);
    var i = 0;
    while (i < 1500) {
        var x = 2 * Math.random() - 1;
        var y = 2 * Math.random() - 1;
        var z = 2 * Math.random() - 1;
        if (x * x + y * y + z * z < 1) {
            driftSpeeds[i] = randomVelocity();
            driftPoints[i] = new THREE.Vector3(x, y, z);
            i++;
        }
    }
    geometry = new THREE.Geometry();
    for (i = 0; i < 1000; i++) {
        geometry.vertices.push(driftPoints[i]);
    }
    var material = new THREE.PointCloudMaterial({
        color: 0x800080,
        size: 2,
        sizeAttenuation: false
    });
    pointCloud = new THREE.PointCloud(geometry, material);
    pointCloud.scale.set(10.9, 10.9, 10.9);
    globe.add(pointCloud);
}

//method to animate snow
var snCount = 0;

function updateForDrift() {
    if (snCount == 0) {
        drawDriftSnow();
        snCount++;
    }
    for (var i = 0; i < geometry.vertices.length; i++) {
        var v = driftPoints[i];
        v.add(driftSpeeds[i]);
        if (v.length() > 1) {

            driftSpeeds[i] = randomVelocity();
            v.multiplyScalar(0.9997);
        } else if (Math.random() < 0.001) {
            // change to a new random velocity, with a small probability
            driftSpeeds[i] = randomVelocity();
        }
    }
    geometry.verticesNeedUpdate = true;
}

//method to update velocity
function randomVelocity() {
    var dx = 0.001 + 0.003 * Math.random();
    var dy = 0.001 + 0.003 * Math.random();
    var dz = 0.001 + 0.003 * Math.random();
    if (Math.random() < 0.5) {
        dx = -dx;
    }
    if (Math.random() < 0.5) {
        dy = -dy;
    }
    if (Math.random() < 0.5) {
        dz = -dz;
    }
    return new THREE.Vector3(dx, dy, dz);
}
