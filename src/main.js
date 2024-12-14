import * as THREE from 'https://unpkg.com/three@0.125.2/build/three.module.js';

// libs
function createCube(size,clr) {
    const geometry = new THREE.BoxGeometry( size[0], size[1], size[2] );
    const material = new THREE.MeshStandardMaterial( {color: clr});
    const cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true;
    cube.recieveShadow = true;
    scene.add( cube );

    return cube;

}

function checkTouching(a, d) {
    let b1 = a.position.y - a.geometry.parameters.height / 2;
    let t1 = a.position.y + a.geometry.parameters.height / 2;
    let r1 = a.position.x + a.geometry.parameters.width / 2;
    let l1 = a.position.x - a.geometry.parameters.width / 2;
    let f1 = a.position.z - a.geometry.parameters.depth / 2;
    let B1 = a.position.z + a.geometry.parameters.depth / 2;
    let b2 = d.position.y - d.geometry.parameters.height / 2;
    let t2 = d.position.y + d.geometry.parameters.height / 2;
    let r2 = d.position.x + d.geometry.parameters.width / 2;
    let l2 = d.position.x - d.geometry.parameters.width / 2;
    let f2 = d.position.z - d.geometry.parameters.depth / 2;
    let B2 = d.position.z + d.geometry.parameters.depth / 2;
    if (t1 < b2 || r1 < l2 || b1 > t2 || l1 > r2 || f1 > B2 || B1 < f2) {
      return false;
    }
    return true;
}

function death(){
    dead = true;
    var deathdis = document.getElementById("deathdis");
    deathdis.style.display = "block";

    if (score > hiscore) {
        localStorage.setItem("score", String(score));
    }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

// rendering
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// lights
const light = new THREE.SpotLight()
light.position.set(0, 3, 6)
// for shadow
light.castShadow = true
light.shadow.mapSize.width = 1024
light.shadow.mapSize.height = 1024
light.shadow.camera.near = 0.5
light.shadow.camera.far = 100
scene.add(light)


camera.position.z = 6;
camera.position.y = 2;

// player
const player = createCube((1,1,1),0xffffff);
var dead = false;
var target_pos = 0;
var moveLeft = false;
var moveRight = false;
var moveSpacingX = 4;
const pspeed = 0.7;

var pjumpspeed = 0.4;
var pgravspeed = 0.3;
var jumpHeight = 3;
var jumping = false;
var onFloor = true;

// floor
const floor = createCube((1,1,1),0x808080);
floor.position.y = -1;
floor.position.z = -30
floor.scale.x = 10
floor.scale.z = 100

// obstacle
var cubes = []
const cube_pos_ops = [-moveSpacingX,0,moveSpacingX]
const cubeStartMin = 60;
const cubeStartMax = 100;
const cubeSpeed = 0.7;
const cubeMinSpacing = 10;
for(let i=0;i < 5;i++) {
    const cube = createCube((1,1,1),0xFF6464);
    cube.position.x = cube_pos_ops[Math.round(randomRange(0,2))]
    cube.position.z = -Math.round(randomRange(cubeStartMin,cubeStartMax)/cubeMinSpacing)*cubeMinSpacing;
    cubes.push(cube);
}


// score dis
const score_dis = document.getElementById("score");
var score = 0
var add_score = false

const hiscore_dis = document.getElementById("hiscore");
var hiscore = Number(localStorage.getItem("score"))
hiscore_dis.innerHTML = hiscore


// animation
function animate() {
    if (dead == false){
        // camera following player
        camera.position.x = player.position.x;
        camera.position.y = player.position.y + 2;

        for (let i = 0;i < cubes.length;i++) {
            cubes[i].position.z += cubeSpeed;
            if (cubes[i].position.z > 4.5) {
                cubes[i].position.x = cube_pos_ops[Math.round(randomRange(0,2))]
                cubes[i].position.z = -Math.round(randomRange(cubeStartMin,cubeStartMax)/cubeMinSpacing)*cubeMinSpacing;
                add_score = true
            }

            if (checkTouching(player,cubes[i])) {
                death()
            }
        }

        // score
        if (add_score == true) {
            score += 1;
            add_score = false;
        }
        score_dis.innerHTML = String(score)

        // movement
        if (moveRight == true) {
            if (player.position.x > target_pos) {
                player.position.x -= pspeed
            } else {
                player.position.x = target_pos
                moveRight = false;
                target_pos = 0;
            }
        } else if (moveLeft == true) {
            if (player.position.x < target_pos) {
                player.position.x += pspeed
            } else {
                player.position.x = target_pos
                moveLeft = false;
                target_pos = 0;
            }
        }

        // gravity and jumping
        if (jumping) {
            player.position.y += pjumpspeed;
            if (player.position.y >= jumpHeight) {
                jumping = false;
            }
        } else {
            player.position.y -= pgravspeed;
            if (player.position.y <= 0) {
                player.position.y = 0;
                onFloor = true;
            }
        }
        

        renderer.render( scene, camera );
    }

}

// input
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) { // right swipe
            if (player.position.x == 0) {
                target_pos = -moveSpacingX;
            }
            else if (player.position.x == -moveSpacingX) {
                target_pos = 0;
            }

            moveRight = true;

        } else { // left swipe
            if (player.position.x == 0) {
                target_pos = moveSpacingX;
            } 
            else if (player.position.x == moveSpacingX) {
                target_pos = 0;
            }

            moveLeft = true;
        }                       
    } else {
        if ( yDiff > 0 ) {
            if (onFloor == true) {
                jumping = true;
                onFloor = false;
            }
            
        } else { 
            
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

document.getElementById("restart").addEventListener("click",(ev)=> {
    location.reload();
})