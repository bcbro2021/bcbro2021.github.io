import * as THREE from 'https://unpkg.com/three@0.125.2/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

function createCube(size=(1,1,1),color = {color: 0xffffff}) {
    const geometry = new THREE.BoxGeometry( size[0], size[1], size[2] );
    const material = new THREE.MeshBasicMaterial(color);
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    return cube;

}

const player = createCube();

// obstacle
var cubes = []
for(let i=0;i < 2;i++) {
    const cube = createCube();
    cube.position.z = -20;
    cubes.push(cube);
}


const cube_pos_ops = [-4,0,4]

camera.position.z = 6;
camera.position.y = 2;

function animate() {
    // camera following player
    camera.position.x = player.position.x;

    for (let i = 0;i < cubes.length;i++) {
        cubes[i].position.z += 0.2;
        if (cubes[i].position.z > 4.5) {
            cubes[i].position.x = cube_pos_ops[Math.round(randomRange(0,2))]
            cubes[i].position.z = -20
        }
    }
    

	renderer.render( scene, camera );

}

renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


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