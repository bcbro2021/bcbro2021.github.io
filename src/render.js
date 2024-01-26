console.log("Render.js Initialized!");

const randomRange = (min, max) => {
    return min + Math.random() * (max - min);
};

class Particle {
    constructor(x, y, xDirection, yDirection, speed, lifespan, color) {
        this.x = x;
        this.y = y;
        this.xDirection = xDirection;
        this.yDirection = yDirection;
        this.speed = speed;
        this.lifespan = lifespan;
        this.age = 0;
        this.isAlive = true;
        this.color = color;
    }

    update() {
        if (this.isAlive) {
            // Move the particle in the specified directions
            this.x += this.xDirection * this.speed;
            this.y += this.yDirection * this.speed;

            // Increase the age of the particle
            this.age++;

            // Check if the particle's lifespan is over
            if (this.age >= this.lifespan) {
                this.isAlive = false;
            }
        }
    }

    draw(ctx) {
        if (this.isAlive) {
            // Draw the particle (you can customize the drawing logic)
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x,this.y,5,5);
        }
    }
}

class ParticleManager {
    constructor() {
        this.particles = [];
    }

    addParticle(x, y, xDirection, yDirection, speed, lifespan,color) {
        const particle = new Particle(x, y, xDirection, yDirection, speed, lifespan,color);
        this.particles.push(particle);
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update();

            // Remove dead particles
            if (!particle.isAlive) {
                this.particles.splice(i, 1);
            }
        }
    }

    drawParticles(ctx) {
        this.particles.forEach(particle => {
            particle.draw(ctx);
        });
    }
}