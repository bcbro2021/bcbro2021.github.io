const canvas = document.getElementById("pdis");
const ctx = canvas.getContext("2d");
const projects = document.getElementById("projects");
const aboutme = document.getElementById("aboutme");

const particleMan = new ParticleManager();

function addParticle() {
    particleMan.addParticle(
        -5,
        randomRange(0,canvas.height),
        randomRange(5,6),
        randomRange(-0.5,0.5),
        1,
        300,
        '#1d1c1c'
    );
};

function drawParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (particleMan.particles.length < 300) {
        addParticle();
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particleMan.updateParticles();
    particleMan.drawParticles(ctx);

    // Request the next animation frame
    requestAnimationFrame(drawParticles);
};

  // Start drawing particles
drawParticles();

// markdown support
var element = document.getElementById("aboutme");
element.innerHTML = MarkdownToHtml.parse(element.innerHTML);

// button click functions
function displayAboutMe() {
    projects.style.display = "none";
    aboutme.style.display = "block";
}


document.getElementById('aboutmebtn').addEventListener('click', displayAboutMe);

function displayProjects() {
    aboutme.style.display = "none";
    projects.style.display = "block";
}


document.getElementById('projectsbtn').addEventListener('click', displayProjects);

function redirboards() {
    window.location.href = "/portions/boards.html";
}

document.getElementById('boards').addEventListener('click', redirboards);

// music
const sound = new Howl({
    src: ['src/assets/bgm1.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.1,
  });

// styling
const body_inner = document.getElementById("inner");

function updateStyling() {
    body_inner.style.left = (window.innerWidth / 2) - body_inner.clientWidth/2;
    requestAnimationFrame(updateStyling);
}
updateStyling();

console.log("init main!");
