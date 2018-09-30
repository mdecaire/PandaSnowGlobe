/*
   This file draws the bear most of this code 
   is my own.
   Several of the bear's surfaces are reflective
   Functions are named in such a way that it is
    obvious what it does
   Class: CMSC 405 6380 Computer Graphics
   * Project Title: THREEjs 3D graphics 
   * @author MichelleDecaire 
   * DueDate: 9/30/2018 
   */

  //main function to put all parts 
  //of the bear together
  function drawBear() {

    var bear = drawOuterOval();//bears main belly

    var oval1 = drawInnerOval(); //inner part of belly
    oval1.position.x = 1;
    oval1.position.z = .25;

    var rLeg = drawLeg();
    rLeg.rotation.set(10, 10, 90);
    rLeg.position.x = 2.75;
    rLeg.position.y = -2.45;

    var lLeg = rLeg.clone();
    lLeg.rotation.set(10, 10, 90);
    lLeg.position.x = .65;
    lLeg.position.y = -2.45;
    lLeg.position.z = 2.75;

    var head = drawHead()
    head.position.y = 3.9;
    head.rotation.y = .1;

    var cone = drawIceCream();
    cone.position.set(3.05, 0, 1.5);

    var rArm = drawArm();
    rArm.position.set(3.1, .5, 0);
    rArm.rotation.set(90, -10.2, 10);

    var rHand = drawHand();
    rHand.position.set(3.35, -.5, 1.25);

    var lArm = drawArm()
    lArm.position.set(-1.3, 3.25, 2.7);
    lArm.rotation.set(0, 0, 0);

    var lHand = drawHand();
    lHand.scale.set(.6, .8, .6);
    lHand.position.set(-1.2, 5, 3.0);

    balloon = drawBalloon();
    balloon.position.set(-.95, 9.65, 2.7);

    bear.add(oval1);
    bear.add(rArm);
    bear.add(lArm);
    bear.add(rHand);
    bear.add(lHand);
    bear.add(rLeg);
    bear.add(lLeg);
    bear.add(head);
    bear.add(cone);
    bear.add(balloon);

    return bear;

}

//draws balloon
function drawBalloon() {
    var balloon = new THREE.Mesh(
        new THREE.SphereGeometry(1, 100, 100, 0, 2 * Math.PI, 0, Math.PI / 2),
        new THREE.MeshPhongMaterial({
            color: 0xFF0000,
            specular: 0x8B7D7B,
            shininess: 4,
            flatShading: true
        })

    )
    var bBottom = new THREE.Mesh(
        new THREE.CylinderGeometry(.998, .5, 1.25, 100, 100),
        new THREE.MeshPhongMaterial({
            color: 0xFF0000,
            specular: 0x8B7D7B,
            shininess: 4,
            flatShading: true
        })
    )

    var ballBottom = new THREE.Mesh(
        new THREE.SphereGeometry(.55, 100, 100),
        new THREE.MeshPhongMaterial({
            color: 0xFF0000,
            specular: 0x8B7D7B,
            shininess: 4,
            flatShading: true
        })
    )

    var end = new THREE.Mesh(
        new THREE.CylinderGeometry(.05, .1, .1, 64, 10),
        new THREE.MeshPhongMaterial({
            color: 0xFF0000,
            specular: 0x8B7D7B,
            shininess: 4,
            flatShading: true
        })
    )
    //begin code to build string this code was taken from
    //textbook chapter 5.3
    var curveGeom = new THREE.Geometry();
    var cosine = new THREE.Curve();
    cosine.getPoint = function(t) {
        t = (t - 0.5) * 7 * Math.PI;
        return new THREE.Vector2(3 + 2 * Math.cos(t), t);
    }
    var points = cosine.getPoints(128);
    var curveGeom = new THREE.Geometry();
    for (var i = 0; i < points.length; i++) {

        curveGeom.vertices.push(new THREE.Vector3(points[i].x, points[i].y, 0));
    }
    var string = new THREE.Line(curveGeom,
        new THREE.LineBasicMaterial({
            color: "blue",
            linewidth: 2
        }));

    string.position.set(-.5, -2.75, 0)
    string.scale.set(.15, .15, 1);
    end.position.y = -1.6;
    end.position.x = 0;
    end.position.z = 0;
    ballBottom.position.y = -1;
    bBottom.position.y = -.61;
    balloon.add(bBottom);
    balloon.add(ballBottom);
    balloon.add(end);
    balloon.add(string);
    return balloon;

}

function drawArm() {
    var arm = new THREE.Mesh(
        new THREE.SphereGeometry(2, 100, 100),
        new THREE.MeshLambertMaterial({
            color: "black"
        })
    );
    arm.scale.set(.25, 1, .25)
    return arm;

}

function drawHand() {
    var hand = new THREE.Mesh(
        new THREE.SphereGeometry(.75, 100, 100),
        new THREE.MeshLambertMaterial({
            color: "black"
        })
    );
    hand.scale.set(1, .8, 1);
    return hand;

}

function drawHead() {
    var head = new THREE.Mesh(
        new THREE.SphereGeometry(2, 100, 100),
        new THREE.MeshLambertMaterial({
            color: "white"
        })
    );

    var lEar = drawEar();
    lEar.position.set(-1, 1.75, .75);
    lEar.rotation.set(-15, 0, 0);

    var rEar = drawEar();
    rEar.position.set(.6, 1.75, -1);
    rEar.rotation.set(15, 0, 0);

    var rEye = drawEye();
    rEye.scale.set(.7, .8, .1);
    rEye.position.set(1.9, .75, .4);
    rEye.rotation.y = -5.3;
    rEye.rotation.z = 1;
    rEye.rotation.x = -.5;

    var lEye = drawEye();
    lEye.scale.set(.7, .8, .1);
    lEye.position.set(.6, .75, 1.9);
    lEye.rotation.z = -.5;
    lEye.rotation.y = .7;
    lEye.rotation.x = -.3;

    var nose = drawNose();
    nose.position.set(1.38, .25, 1.4);

    var mouth = drawMouth();
    mouth.position.set(1.2, -.55, 1.2);

    head.add(lEye);
    head.add(rEye);
    head.add(lEar);
    head.add(rEar);
    head.add(nose);
    head.add(mouth);
    return head;
}

function drawMouth() {
    var mouth = new THREE.Mesh(
        new THREE.SphereGeometry(.35, 100, 50),
        new THREE.MeshPhongMaterial({
            color: "crimson",
            specular: 0x8B7D7B,
            shininess: 4,
        })
    );
    mouth.scale.set(.8, 1, .8);
    return mouth;
}

function drawEar() {
    var ear = new THREE.Mesh(
        new THREE.SphereGeometry(.54, 100, 50),
        new THREE.MeshPhongMaterial({

            color: "black",
            specular: 0x8B7D7B,
            shininess: 5,
        })

    );
    ear.scale.set(1, .75, 1);
    return ear;

}

function drawNose() {
    var nose = new THREE.Mesh(
        new THREE.SphereGeometry(.25, 100, 50),
        new THREE.MeshPhongMaterial({
            color: "black",
            specular: 0x8B7D7B,
            shininess: 4,
        })

    );
    nose.scale.set(1, .8, 1);
    return nose;
}

function drawEye() {

    var eye = new THREE.Mesh(
        new THREE.SphereGeometry(.60, 100, 50),
        new THREE.MeshPhongMaterial({
            color: "black",
            specular: 0x8B7D7B,
            shininess: 3,
        })
    );

    var white = new THREE.Mesh(
        new THREE.SphereGeometry(.35, 100, 50),
        new THREE.MeshPhongMaterial({
            color: "white",
            specular: 0x8B7D7B,
            shininess: 3,
        })
    );

    var pupil = new THREE.Mesh(
        new THREE.SphereGeometry(.15, 100, 50),
        new THREE.MeshLambertMaterial({
            color: 0x3104E8B
        })
    );

    white.position.set(0, 0, .4);
    pupil.position.set(0, 0, .4);
    white.add(pupil);
    eye.scale.set(.75, 1, .75);
    eye.add(white);

    return eye;
}

function drawIceCream() {
    var cone = new THREE.Mesh(
        new THREE.CylinderGeometry(.75, .15, 2.5, 64, 10),
        new THREE.MeshLambertMaterial({
            color: 0xCD853F
        })
    );


    var scoop = new THREE.Mesh(
        new THREE.SphereGeometry(.75, 100, 50, 0, 2 * Math.PI, 0, Math.PI / 2),
        new THREE.MeshLambertMaterial({
            color: 0xEE7AE9
        })
    )
    scoop.position.y = 1.25;
    cone.add(scoop);
    return cone;
}


function drawLeg() {
    var leg = new THREE.Mesh(
        new THREE.CylinderGeometry(.9, 0, 3, 64, 10),
        new THREE.MeshLambertMaterial({
            color: 'black'
        })
    );

    var bottom = new THREE.Mesh(
        new THREE.CylinderGeometry(.65, .25, .1, 64, 10),
        new THREE.MeshLambertMaterial({
            color: 0xFFFAFA
        })
    );
    bottom.position.y = 1.5;
    leg.add(bottom.clone());
    return leg;
}

//outer part of the bear
function drawOuterOval() {
    var oval = new THREE.Mesh(
        new THREE.SphereGeometry(3.25, 100, 50),

        new THREE.MeshPhongMaterial({
            color: "black",

            specular: 0x8B7D7B,

            shininess: 1,
        })
    );
    return oval;
}

//middle of the belly
function drawInnerOval() {
    var oval = new THREE.Mesh(
        new THREE.SphereGeometry(3, 100, 50),
        new THREE.MeshLambertMaterial({
            color: 0xFFFAFA
        })
    )
    oval.scale.set(.75, .9, 1);
    return oval
}