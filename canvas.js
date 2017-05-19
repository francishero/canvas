

var canvas=document.querySelector('canvas');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

//get the context
var c=canvas.getContext('2d');

// c.fillStyle="rgba(255,0,0,0.5";

// //rectangle x,y,width,height
// c.fillRect(100,100,100,100)

// //line
// c.beginPath();
// //where on the canvas the path to start
// c.moveTo(50,300);
// //create a line to a new point

// c.lineTo(300,100);
// c.lineTo(400,100);
// //add color to the line
// c.strokeStyle="blue";
// //call the stroke method to see a line
// c.stroke();

// // //creating an arch
// // c.beginPath();
// // c.arc(300,300,30,0,Math.PI*2,false)
// // c.strokeStyle="red";

// // //fill the arch
// // c.stroke()

// for(var i=0;i<10;i++)
// {
// 	var x=Math.random()*window.innerWidth;
// 	var y=Math.random()*window.innerHeight();
// 	c.beginPath();
// 	c.arc(x,y,30,0,Math.PI*2,false);
// 	c.strokeStyle="red";
// 	c.stroke();
// }
var maxRadius=40;
var minRadius=2;
var mouse={
	x:undefined,
	y:undefined
}

var colorArray=[
	"red",
	"blue",
	"yellow"
]
window.addEventListener('mousemove',function(event)
{
	mouse.x=event.x;
	mouse.y=event.y;

})
function Circle(x,y,dx,dy,radius)
{
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.radius=radius;
	this.color=colorArray[Math.floor(Math.random()*colorArray.length-1)];

	//method
	this.draw=function()
	{
		c.beginPath();
	 	c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		//c.strokeStyle="red";
		c.fillStyle=this.color;
		c.stroke();
		c.fill();
	}
	this.update=function()
	{
		if(this.x+this.radius > window.innerWidth || this.x-this.radius <0)
		{
			this.dx=-this.dx;
		}

		if(this.y+this.radius > window.innerHeight || this.y-this.radius<0)
		{
			this.dy=-this.dy;
		}

		this.x+=this.dx;//increase the velocity
		this.y+=this.dy;

		//interacitivity
		if(mouse.x -this.x<50 && mouse.x-this.x >-50 &&
			mouse.y-this.y <50 && mouse.y-this.y >-50)
		{
			if(this.radius <maxRadius)
			this.radius+=1;
		}
		else if(this.radius >minRadius)
		{
			this.radius-=1;
		}
		this.draw();//draw the circle first
			}
}






var circleArray=[];
for(var i=0;i<100;i++)
{
	var radius=30;
	var x=Math.random()*(window.innerWidth- radius*2)+radius; //-diameter to prevent the circles from being caught 
	var y=Math.random()*(window.innerHeight-radius*2)+radius;
	var dx=(Math.random()-0.5)*8;
	var dy=(Math.random()-0.5)*8;
	
	

	//push a new circle onto the array
	circleArray.push(new Circle(x,y,dx,dy,radius))
}
console.log(circleArray);
function animate()
{

	requestAnimationFrame(animate);
	c.clearRect(0,0,window.innerWidth,window.innerHeight);//clears the Rect every Frame

	for(var i=0;i<circleArray.length;i++)
	{
		//draw all the circles in the array
		circleArray[i].update();
	}
	


}
animate();
