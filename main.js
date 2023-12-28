(() => {

    const particleTypes = {
        white: "rgba(255, 255, 255, 0.4)",
        red: "rgba(255, 0, 0, 0.4)",
        green: "rgba(0, 255, 0, 0.4)",
        blue: "rgba(0, 0, 255, 0.4)",
    }

    const config = {
        particleMinRadius: 1 ,
        particleMaxRadius: 3,
        massValueCoef: 0.006,
        particleColor: particleTypes.white,
        friction: 0.94,
        particleDetectRadius: 80,

        //ДЛЯ БЕЛЫХ
        mWtoW: 20,
        mWtoR: 0,
        mWtoG: 100,
        mWtoB: 0,

        //ДЛЯ КРАСНЫХ
        mRtoW: 0,
        mRtoR: 0,
        mRtoG: 0,
        mRtoB: 0,

        //ДЛЯ ЗЕЛЁНЫХ
        mGtoW: 100,
        mGtoR: 0,
        mGtoG: 100,
        mGtoB: 0,

        //ДЛЯ СИНИХ
        mBtoW: 0,
        mBtoR: 0,
        mBtoG: 0,
        mBtoB: 0,

    }

    const TWO_PI = 2 * Math.PI;
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const randBtn = document.querySelector('.btnRand');
    const randRulesBtn = document.querySelector('.btnRandRules');
    const spawnCountText = document.querySelector('.spawnCountText');
    const spawnCount = document.querySelector('.spawnCount');

    const whiteBtn = document.querySelector('.white');
    const redBtn = document.querySelector('.red');
    const greenBtn = document.querySelector('.green');
    const blueBtn = document.querySelector('.blue');

    let w, h, mouse, particles, selectedParticleType;

    let allParticleSpawnCount = 100;

    class Particle{
        constructor(rand = false){
            if(!rand){
                this.pos = {x: mouse.x, y: mouse.y}
            }
            else{
                this.pos = {x: random(0,w), y: random(0,h)}
            }
            this.velocity = {x: 0, y: 0}
            this.radius = random(config.particleMinRadius, config.particleMaxRadius);
            this.mass = this.radius * config.massValueCoef;
            this.type = selectedParticleType;
            this.color = this.type;
        }

        draw(){
            this.pos.x += this.velocity.x;
            this.pos.y += this.velocity.y;
            createCircle(this.pos.x, this.pos.y, this.radius, true, this.color);
            createCircle(this.pos.x, this.pos.y, this.radius, false, this.color);
        }
    }

    function findParticlePattern(aType, bType){
        switch (aType) {
            //ДЛЯ БЕЛЫХ
            case particleTypes.white:
                switch (bType) {
                    case particleTypes.white:
                        return config.mWtoW;
                    case particleTypes.red:
                        return config.mWtoR;
                    case particleTypes.green:
                        return config.mWtoG;
                    case particleTypes.blue:
                        return config.mWtoB;
                    default:
                        return 0;
                }
            //ДЛЯ КРАСНЫХ
            case particleTypes.red:
                switch (bType) {
                    case particleTypes.white:
                        return config.mRtoW;
                    case particleTypes.red:
                        return config.mRtoR;
                    case particleTypes.green:
                        return config.mRtoG;
                    case particleTypes.blue:
                        return config.mRtoB;
                    default:
                        return 0;
                }
            //ДЛЯ ЗЕЛЁНЫХ
            case particleTypes.green:
                switch (bType) {
                    case particleTypes.white:
                        return config.mGtoW;
                    case particleTypes.red:
                        return config.mGtoR;
                    case particleTypes.green:
                        return config.mGtoG;
                    case particleTypes.blue:
                        return config.mGtoB;
                    default:
                        return 0;
                }
            //ДЛЯ СИНИХ
            case particleTypes.blue:
                switch (bType) {
                    case particleTypes.white:
                        return config.mBtoW;
                    case particleTypes.red:
                        return config.mBtoR;
                    case particleTypes.green:
                        return config.mBtoG;
                    case particleTypes.blue:
                        return config.mBtoB;
                    default:
                        return 0;
                }
            default:
                return 0;
        }
    }

    function randSpawnParticles(){
        particles = []
        // console.log(allParticleSpawnCount);
        let a = true

        let whiteCount = allParticleSpawnCount;
        let redCount = allParticleSpawnCount;
        let greenCount = allParticleSpawnCount;
        let blueCount = allParticleSpawnCount;

        selectedParticleType = particleTypes.white;
        for (let white = 0; white < whiteCount; white++) {
            particles.push(new Particle(true));
            if(a){console.log("White");}
        }

        selectedParticleType = particleTypes.red;
        for (let red = 0; red < redCount; red++) {
            particles.push(new Particle(true));
            if(a){console.log("Red");}
        }

        selectedParticleType = particleTypes.green;
        for (let green = 0; green < greenCount; green++) {
            particles.push(new Particle(true));
            if(a){console.log("Green");}
        }
        
        selectedParticleType = particleTypes.blue;
        for (let blue = 0; blue < blueCount; blue++) {
            particles.push(new Particle(true));
            if(a){console.log("Blue");}
        }
    }
    function randParticleRules(){
        let minVal = -500;
        let maxVal = 500;

        let detectRadMaxVal = 500;

        config.particleDetectRadius = random(10, detectRadMaxVal)

        //БЕЛАЯ
        config.mWtoW = random(minVal, maxVal);
        config.mWtoR = random(minVal, maxVal);
        config.mWtoG = random(minVal, maxVal);
        config.mWtoB = random(minVal, maxVal);
        //КРАСНАЯ
        config.mRtoW = random(minVal, maxVal);
        config.mRtoR = random(minVal, maxVal);
        config.mRtoG = random(minVal, maxVal);
        config.mRtoB = random(minVal, maxVal);
        //ЗЕЛЁНАЯ
        config.mGtoW = random(minVal, maxVal);
        config.mGtoR = random(minVal, maxVal);
        config.mGtoG = random(minVal, maxVal);
        config.mGtoB = random(minVal, maxVal);
        //СИНЯЯ
        config.mBtoW = random(minVal, maxVal);
        config.mBtoR = random(minVal, maxVal);
        config.mBtoG = random(minVal, maxVal);
        config.mBtoB = random(minVal, maxVal);
        randSpawnParticles();
    }

    function particlesPhysics(){
        for (let i = 0; i < particles.length; i++) {
            let acc = {x: 0, y: 0};
            for (let j = 0; j < particles.length; j++) {
                if(i == j) continue;
                let [a, b] = [particles[i], particles[j]];

                let magnetic;

                // aType = checkParticleType(a.type);
                // bType = checkParticleType(b.type);
                
                magnetic = findParticlePattern(a.type, b.type);

                // console.log(magnetic);

                let m1;
                if(magnetic > 0){
                    m1 = 1
                }
                else{
                    m1 = 1
                }

                let delta = {x: b.pos.x - a.pos.x, y: b.pos.y - a.pos.y}
                let dist = Math.sqrt( delta.x * delta.x + delta.y * delta.y) || 1;
                let force = (dist - magnetic) / dist * b.mass;
                
                // force = b.mass;

                if(dist > 0 && dist < config.particleDetectRadius){
                    acc.x += delta.x * force * m1;
                    acc.y += delta.y * force * m1;
                }
            }
            
            particles[i].velocity.x = particles[i].velocity.x * config.friction + acc.x * particles[i].mass;
            particles[i].velocity.y = particles[i].velocity.y * config.friction + acc.y * particles[i].mass;

            if (particles[i].pos.x < 0 || particles[i].pos.x > w){
                particles[i].velocity.x *= -1
            }
            if (particles[i].pos.y < 0 || particles[i].pos.y > h){
                particles[i].velocity.y *= -1
            }
        }
    }

    function createCircle(xPos, yPos, radius, filled, color){
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(xPos, yPos, radius, 0, TWO_PI);
        ctx.closePath();
        if(filled){
            ctx.fill();
        }
        else{
            ctx.stroke();
        }
    }

    function random(minVal, maxVal){
        return Math.random() * (maxVal - minVal) + minVal;
    }

    function init(){
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;

        mouse = {x: w/2, y: h/2, down: false}
        console.log(mouse);
        particles = [];
        console.log("Start");
        selectedParticleType = particleTypes.white;
    }

    function loop(){
        ctx.clearRect(0, 0, w, h);
        // console.log(1);

        particlesPhysics();

        if( mouse.down ) { particles.push(new Particle());}

        particles.map(e => e.draw());
        
        window.requestAnimationFrame(loop);
    }

    //ТОЧКА ВХОДА
    init();
    loop();

    function setPos(e){
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }

    function isDown(){
        mouse.down = !mouse.down;
    }

    function keyDown(e){
        switch (e.key) {
            case '1':
                selectedParticleType = particleTypes.white;
                break;
            case '2':
                selectedParticleType = particleTypes.red;
                break;
            case '3':
                selectedParticleType = particleTypes.green;
                break;
            case '4':
                selectedParticleType = particleTypes.blue;
                break;
            default:
                break;
        }
    }

    function setTouchPos(event){
        // e.preventDefaul();
        // console.log(event.changedTouches[0].clientX);
        mouse.x = event.changedTouches[0].clientX;
        mouse.y = event.changedTouches[0].clientY;
        mouse.down = true;
    }

    function endTouch(){
        mouse.down = false;
    }

    function setColorW(){
        selectedParticleType = particleTypes.white;
    }
    function setColorR(){
        selectedParticleType = particleTypes.red;
    }
    function setColorG(){
        selectedParticleType = particleTypes.green;
    }
    function setColorB(){
        selectedParticleType = particleTypes.blue;
    }

    canvas.addEventListener('mousemove', setPos);
    canvas.addEventListener('touchmove', setTouchPos);
    canvas.addEventListener('touchend', endTouch);
    window.addEventListener('mousedown', isDown);
    window.addEventListener('mouseup', isDown);
    window.addEventListener('keydown', keyDown);
    randBtn.addEventListener('click', randSpawnParticles);
    randRulesBtn.addEventListener('click', randParticleRules);

    whiteBtn.addEventListener('click',setColorW);
    redBtn.addEventListener('click',setColorR);
    greenBtn.addEventListener('click',setColorG);
    blueBtn.addEventListener('click',setColorB);

    spawnCount.addEventListener('input', function(){
        allParticleSpawnCount = this.value;
        spawnCountText.innerHTML = this.value;
    })
})();