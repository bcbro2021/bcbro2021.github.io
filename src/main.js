import * as THREE from 'https://unpkg.com/three@0.125.2/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );


function createCube(size,clr) {
    const geometry = new THREE.BoxGeometry( size[0], size[1], size[2] );
    const material = new THREE.MeshStandardMaterial( {color: clr});
    const cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true;
    cube.recieveShadow = true;
    scene.add( cube );

    return cube;

}

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
// floor
const floor = createCube((1,1,1),0x808080);
floor.position.y = -1;
floor.position.z = -20
floor.scale.x = 10
floor.scale.z = 50

// obstacle
var cubes = []
const cube_pos_ops = [-4,0,4]
const cube_start_pos = -60;
for(let i=0;i < 2;i++) {
    const cube = createCube((1,1,1),0xFF6464);
    cube.position.z = cube_start_pos;
    cubes.push(cube);
}


// score dis
const score_dis = document.getElementById("score");
var score = 0
var add_score = false

// animation
function animate() {
    // camera following player
    camera.position.x = player.position.x;

    for (let i = 0;i < cubes.length;i++) {
        cubes[i].position.z += 0.5;
        if (cubes[i].position.z > 4.5) {
            cubes[i].position.x = cube_pos_ops[Math.round(randomRange(0,2))]
            cubes[i].position.z = cube_start_pos;
            add_score = true
        }
    }

    // score
    if (add_score == true) {
        score += 1;
        add_score = false;
    }
    score_dis.innerHTML = String(score)

	renderer.render( scene, camera );

}


// rendering
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap


// movement
renderer.domElement.addEventListener("click", (ev) => {
    if (ev.clientX <= window.innerWidth/2) {
        if (player.position.x > -4) {
            player.position.x -= 4
        }
    }
    else if (ev.clientX > window.innerWidth/2) {
        if (player.position.x < 4) {
            player.position.x += 4
        }
    }
})