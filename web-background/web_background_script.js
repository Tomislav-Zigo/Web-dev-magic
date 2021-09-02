class Point{

    constructor(x , y , vel , dir){
        this.x = x;
        this.y = y;
        this.vel = vel;
        this.dir = dir;   
        this.dragging = false;
    }

}

const webBackgroundCanvas = document.getElementById("web-background-canvas");
const more = document.getElementById("more");
var body = document.querySelector("body");
setCanvasDimensions(body.offsetWidth,body.offsetHeight)

var c = webBackgroundCanvas.getContext("2d");
c.translate(0,webBackgroundCanvas.height);
c.scale(1,-1);

var points = [] ;

var darkmode = true;

window.addEventListener("resize",()=>{
    webBackgroundCanvas.width = body.offsetWidth;
    webBackgroundCanvas.height = body.offsetHeight;

    c = webBackgroundCanvas.getContext("2d");
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.translate(0,webBackgroundCanvas.height);
    c.scale(1,-1);
})

function animate(){

    c.clearRect(0,0,webBackgroundCanvas.width,webBackgroundCanvas.height);

    if(darkmode){     
        c.fillStyle = "#000000"
        c.fillRect(0,0,webBackgroundCanvas.width,webBackgroundCanvas.height)
    }else if(!darkmode){
        c.fillStyle = "#ffffff"
        c.fillRect(0,0,webBackgroundCanvas.width,webBackgroundCanvas.height)
    }

    c.fillStyle = "#00ff00";


    for(let i = 0 ; i < points.length ; i++){
        b = points[i]
        
        b.x += Math.cos(b.dir) * b.vel
        b.y += Math.sin(b.dir) * b.vel

        if(b.x > webBackgroundCanvas.width){
            b.dir = Math.PI-b.dir
            b.x = webBackgroundCanvas.width
        }
        if(b.x < 0){
            b.dir = Math.PI-b.dir 
            b.x = 0
        }
        if(b.y > webBackgroundCanvas.height){
            b.dir = 0-b.dir
            b.y = webBackgroundCanvas.height
        }
        if(b.y < 0){
            b.dir = 0-b.dir
            b.y = 0
        }

        for(let j = i + 1 ; j<points.length ; j++){
            let distance = Math.sqrt(  (points[j].x - points[i].x) ** 2 + (points[j].y - points[i].y) ** 2 )

            if(distance <= 300){
                c.globalAlpha = -(distance/300)+1;
                darkmode ? c.strokeStyle = `#ffffff` : c.strokeStyle = `#000000`;
                c.lineWidth = 5;
                c.beginPath()
                c.moveTo(points[j].x , points[j].y)
                c.lineTo(points[i].x , points[i]. y)
                c.stroke();
                c.globalAlpha = 1
            }

        }

    }

    window.requestAnimationFrame(animate)
}

function initialize(){
    points = []
    for(i = 0 ; i < webBackgroundCanvas.width*webBackgroundCanvas.height / 25000  ; i++){
        points.push(new Point( Math.random() * webBackgroundCanvas.width , Math.random() * webBackgroundCanvas.height , 1 , Math.random() * Math.PI * 2 ));
    }
}

//canvas interaction functions

function setDarkMode(input){
    if(typeof(input) != "boolean"){
         throw('Parameter is not a boolean')
    }
    darkmode = input
}

function setCanvasDimensions(width,height){
    webBackgroundCanvas.height = height;
    webBackgroundCanvas.width = width;
    initialize()
}



initialize() 

animate()
