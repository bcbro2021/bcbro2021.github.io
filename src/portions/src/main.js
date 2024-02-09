function fetchMarkdownFile(filePath) {
    return fetch(filePath)
        .then(response => response.text())
        .catch(error => {
            console.error('Error fetching Markdown file:', error);
        });
}

// Function to convert Markdown to HTML and display
function convertAndDisplayMarkdown(div,filePath) {
    fetchMarkdownFile(filePath)
        .then(markdownContent => {
            // Convert Markdown to HTML
            var htmlContent = MarkdownToHtml.parse(markdownContent);
            // Display the HTML content
            document.getElementById(div).innerHTML = htmlContent;
        });
}

// Call the function with the path to your Markdown file
convertAndDisplayMarkdown("board",'/portions/src/timetableboards.md');
convertAndDisplayMarkdown("mal",'/portions/src/mal.md');
convertAndDisplayMarkdown("eng",'/portions/src/eng.md');
convertAndDisplayMarkdown("ss",'/portions/src/ss.md');
convertAndDisplayMarkdown("math",'/portions/src/maths.md');
convertAndDisplayMarkdown("sci",'/portions/src/sci.md');

// rendering particles
const canvas = document.getElementById("pdis");
const ctx = canvas.getContext("2d");

const particleMan = new ParticleManager();

function addParticle() {
    particleMan.addParticle(
        -5,
        randomRange(0,canvas.height),
        randomRange(5,6),
        randomRange(-0.5,0.5),
        1,
        300,
        "#f0832b"
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