let tapper = document.getElementById("tapper");

// tapping mechanic
//localStorage.removeItem("taps")
taps = Number( localStorage.getItem("taps"))

tapper.addEventListener("click",() => {
    taps += 1
    localStorage.setItem("taps",String(taps))
    console.log(localStorage.getItem("taps"))

});


// rendering
let ctx = tapper.getContext("2d");
const particleMan = new ParticleManager();

// particle settings
var count = 100;
var speed = 0.4;
var lifespan = 400;
var time_delay = 10;

function addParticle() {
    particleMan.addParticle(
        randomRange(0,tapper.width),
        -5,
        randomRange(-0.5,0.5),
        randomRange(5,6),
        speed,
        lifespan,
        '#ffffff'
    );
};

let particle_timer = time_delay;
function draw() {
    //text
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Hello World",100,80);


    // particles
    tapper.width = window.innerWidth;
    tapper.height = window.innerHeight;

    particle_timer -= 1;
    if (particle_timer <= 0) {
        if (particleMan.particles.length < count) {
            addParticle();
            particle_timer = time_delay;
        }
    }
    

    // Clear the canvas
    ctx.clearRect(0, 0, tapper.width, tapper.height);

    // Update and draw particles
    particleMan.updateParticles();
    particleMan.drawParticles(ctx);

    // Request the next animation frame
    requestAnimationFrame(draw);
};

  // Start drawing
draw();