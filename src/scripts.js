/////// imports
let tapper = document.getElementById("tapper");
let font = new FontFace("Smoothie", "url(SmoothieSans.otf)");
font.load().then(function(font){

    // with canvas, if this is ommited won't work
    document.fonts.add(font);
    console.log('Font loaded');
  
});

/// image imports
let img = loadImage("test","assets/katana.png");

// particle settings
const textParticleMan = new TextParticleManager();
var textspeed = 0.6;
var textlifespan = 30;

function addScorePart() {
    textParticleMan.addParticle(
        randomRange(0,tapper.width),
        randomRange(0,tapper.height),
        randomRange(-0.5,0.5),
        randomRange(-0.5,0.5),
        textspeed,
        textlifespan,
        '#96FF96'
    );
}

///// katana
var katanaY = -999;
var katanaConst = 4;
var katanaChance = 10;
var summonKatana = false;
var katanaSpeed = 30;


////// tapping mechanic

//localStorage.removeItem("taps")
let taps = Number(localStorage.getItem("taps"))

// setTaps function for saving progress
function setTaps() {
    localStorage.setItem("taps",String(taps))
    taps = Number(localStorage.getItem("taps"))
}

tapper.addEventListener("click",() => {
    if (summonKatana == false) {
        taps += 1
        addScorePart();
        setTaps()

        var katanaChan = Math.round(randomRange(0,katanaChance))
        console.log(katanaChan)
        if (katanaChan == katanaConst) {
            summonKatana = true
        }
    }
});


////// rendering
let ctx = tapper.getContext("2d");

function katanaAnim(){
    if (summonKatana == true){
        katanaY += katanaSpeed;
        if (katanaY > tapper.height) {
            taps -= 10;
            setTaps();
            summonKatana = false;
        }
    }
}

function draw() {

    // particles
    tapper.width = window.innerWidth;
    tapper.height = window.innerHeight;

    // Clear the canvas
    ctx.clearRect(0, 0, tapper.width, tapper.height);

    // update and draw text particles
    textParticleMan.updateParticles();
    textParticleMan.drawParticles(ctx,"+1","40px Smoothie");

    // text
    ctx.font = "50px Smoothie";
    ctx.fillStyle = "white";
    ctx.fillText(taps,tapper.width/2 - ctx.measureText(String(taps)).width/2,tapper.height/2);

    // katana
    if (summonKatana == false) {
        katanaY = -roundtonear(tapper.width/2,64)
    }
    katanaAnim();
    ctx.drawImage(img, (tapper.width/2)-roundtonear(tapper.width/2,64)/2, katanaY, roundtonear(tapper.width/2,64), (roundtonear(tapper.width/2,64)));
    


    // Request the next animation frame
    requestAnimationFrame(draw);
};

// Start drawing
draw();