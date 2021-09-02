class Ball{

    constructor(x , y ,rad , vel , dir, hex1 , hex2){
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.vel = vel;
        this.dir = dir;   
        this.hex1 = hex1;
        this.hex2 = hex2;
        this.dragging = false;
    }

}

const canvas = document.getElementById("balls-canvas");
const more = document.getElementById("more");
var body = document.querySelector("body");
setCanvasDimensions(500,500)

var c = canvas.getContext("2d");
c.translate(0,canvas.height);
c.scale(1,-1);

var balls = [] ;

var darkmode = true;
var valentine = true;
var autumn = false;
var marine = false;

window.addEventListener("resize",()=>{
    canvas.width = body.offsetWidth;
    canvas.height = body.offsetHeight;

    c = canvas.getContext("2d");
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.translate(0,canvas.height);
    c.scale(1,-1);

    initialize()
})

function isChecked(x){
    if(x) return "checked";
}

function randomHex(a,b){
    var hexArray = [0 , 1, 2, 3, 4, 5, 6, 7, 8, 9, "a" , "b" , "c" , "d" ,"e" , "f"]

    return hexArray[a + Math.floor(Math.random() * (b - a + 1))]
}

function animate(){

    c.clearRect(0,0,canvas.width,canvas.height);

    if(darkmode){     
        c.fillStyle = "#000000"
        c.fillRect(0,0,canvas.width,canvas.height)
    }else if(!darkmode){
        c.fillStyle = "#ffffff"
        c.fillRect(0,0,canvas.width,canvas.height)
    }

    c.fillStyle = "#00ff00";


    for(let i = 0 ; i < balls.length ; i++){
        b = balls[i]
        
        b.x += Math.cos(b.dir) * b.vel
        b.y += Math.sin(b.dir) * b.vel

        if(b.x > canvas.width - b.rad){
            b.dir = Math.PI-b.dir
            b.x = canvas.width-b.rad
        }
        if(b.x < 0 + b.rad){
            b.dir = Math.PI-b.dir 
            b.x = 0+b.rad
        }
        if(b.y > canvas.height - b.rad){
            b.dir = 0-b.dir
            b.y = canvas.height-b.rad
        }
        if(b.y < 0 + b.rad){
            b.dir = 0-b.dir
            b.y = 0+b.rad
        }

        for(let j = i + 1 ; j<balls.length ; j++){
            let distance = Math.sqrt(  (balls[j].x - balls[i].x) ** 2 + (balls[j].y - balls[i].y) ** 2 )
            if(distance <= balls[i].rad + balls[j].rad){

                let cAngle = Math.atan2((balls[j].y - balls[i].y) , (balls[j].x - balls[i].x));
                let rCAngle = Math.PI - cAngle;

                balls[i].dir = rCAngle;
                balls[j].dir = Math.PI - rCAngle;

            }

        }

    }

    balls.forEach((b)=>{
        if(valentine){
            c.fillStyle = `#${b.hex1}f00${b.hex2}f`;
        }else if(autumn){
            c.fillStyle = `#${b.hex1}f${b.hex2}f00`;
        }else if(marine){
            c.fillStyle = `#0000${b.hex1}${b.hex2}`;
        }
        c.beginPath()
        c.arc(b.x , b.y , b.rad, 0 , Math.PI*2)
        c.fill()
    })

    window.requestAnimationFrame(animate)
}

//Canvas interaction functions

function setTheme(theme){
    switch(theme){
    
    case 0 :{
        valentine = true;
        autumn = false;
        marine = false;        
    }break;
    case 1 :{
        valentine = false;
        autumn = true;
        marine = false;  
    }break;
    case 2 :{
        valentine = false;
        autumn = false;
        marine = true;  
    }break;
    default : throw "Choose a valid theme 0-2!"
    }   
}

function setCanvasDimensions(width,height){
    canvas.height = height;
    canvas.width = width;
}

function setDarkMode(input){
        if(typeof(input) != "boolean"){
             throw('Parameter is not a boolean')
    }
    darkmode = input
}


//--------------------------------

function initialize(){

    balls = []
    for(i = 0 ; i < canvas.height * canvas.width /20000 ; i++){
        balls.push(new Ball(Math.random() * canvas.width , Math.random() * canvas.height , Math.random()*Math.min(canvas.height,canvas.width)/40 + 20 , 1 , Math.random() * Math.PI * 2 , randomHex(5,12), randomHex(5,12) ));
    }
}

initialize()

animate()

