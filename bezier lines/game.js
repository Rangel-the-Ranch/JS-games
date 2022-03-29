var drawDots=100;
var constDots=11;
var MaxDots=constDots+drawDots;
var perSave=0;
var unvisibleDotsRad=0;
var curveRad=1;
var oldX,oldY;
var changeX=0,changeY=0;
var conect23=false;
var connect1234=false;
class Dot {
    constructor (X, Y, Radius ,Hide){
        this.X = X;
        this.Y = Y;
        this.Radius = Radius;
        this.Hide= Hide;
    }
    
    Draw(DotNumber){
        context.beginPath();
        context.arc(this.X, this.Y, this.Radius, 0, 2 * Math.PI, true);
        context.fill();
		if(DotNumber<=constDots){
			context.font = "20px Georgia";
			context.fillText(DotNumber, this.X - this.Radius + 3, this.Y - this.Radius - 5);
		}
    }
    
    DrawStroke(EndDotX, EndDotY){
        context.beginPath();
        context.moveTo(this.X, this.Y);
        context.lineTo(EndDotX, EndDotY);
        context.stroke();
    }
    //Trail()
    LineMove(StartDotX, StartDotY, EndDotX, EndDotY, UsedPercentage){
        this.X = StartDotX + (EndDotX - StartDotX) * UsedPercentage;
        this.Y = StartDotY + (EndDotY - StartDotY) * UsedPercentage;
    }
    QuadraticMove(StartDotX, StartDotY, EndDotX, EndDotY, UsedPercentage){
        this.X = StartDotX + (EndDotX - StartDotX) * UsedPercentage;
        this.Y = StartDotY + (EndDotY - StartDotY) * UsedPercentage;
    }
    CubicMove(StartDotX, StartDotY, EndDotX, EndDotY, UsedPercentage){
        this.X = StartDotX + (EndDotX - StartDotX) * UsedPercentage;
        this.Y = StartDotY + (EndDotY - StartDotY) * UsedPercentage;
    }
    Move(){
		oldX=this.X;
		oldY=this.Y;
        this.X = mouseX;
        this.Y = mouseY;
		changeX=this.X-oldX;
		changeY=this.Y-oldY;
		
    }
	
}
var AllDots = [], Percentage = 0.01, TakenDot = -1, WhichLine = 1;
start();
function start(){
    //Y=X^0
    AllDots[1]  = new Dot(50,  150,  6.5, 1);
    AllDots[2]  = new Dot(150, 50,  6.5, 1);
    AllDots[3]  = new Dot(200, 300, 6.5, 1);
    AllDots[4]  = new Dot(350, 200, 6.5, 1);
    //Y=X^1
    AllDots[5]  = new Dot(0, 350, unvisibleDotsRad, 0);
    AllDots[6]  = new Dot(0, 400, unvisibleDotsRad, 0);    
    AllDots[7]  = new Dot(0,   0,   unvisibleDotsRad, 0);
    AllDots[8]  = new Dot(0,   0,   unvisibleDotsRad, 0);
    //Y+X^2
    AllDots[9]  = new Dot(0,   0,   unvisibleDotsRad, 0);
    AllDots[10] = new Dot(0,   0,   unvisibleDotsRad, 0);
    //Y=X^3
    AllDots[11] = new Dot(0,   0,   6.5, 0);
    
   for(var i=constDots+1;i<=MaxDots;i++){
       AllDots[i] = new Dot(0,   0,   curveRad, 1);
   }
}
function update() {
    if(TakenDot !== -1){
		AllDots[TakenDot].Move();
		if(conect23==true){
			if(TakenDot==2){
				AllDots[3].X=AllDots[3].X-changeX;
				AllDots[3].Y=AllDots[3].Y-changeY;
			}
			if(TakenDot==3){
				AllDots[2].X=AllDots[2].X-changeX;
				AllDots[2].Y=AllDots[2].Y-changeY;
			}
			changeX=0;
			changeY=0;
		}
		if(connect1234==true){
			if(TakenDot==1 || TakenDot==4){
				AllDots[2].X=Math.abs((AllDots[1].X-AllDots[4].X)/2)
				//AllDots[2].Y
				AllDots[3].X=Math.abs((AllDots[1].X-AllDots[4].X)/2);
				//AllDots[3].Y
			}
		}
    }
    AllDots[5].LineMove     (AllDots[1].X, AllDots[1].Y, AllDots[2].X, AllDots[2].Y, Percentage);
    AllDots[6].LineMove     (AllDots[2].X, AllDots[2].Y, AllDots[4].X, AllDots[4].Y, Percentage);
    AllDots[7].LineMove     (AllDots[2].X, AllDots[2].Y, AllDots[3].X, AllDots[3].Y, Percentage);
    AllDots[8].LineMove     (AllDots[3].X, AllDots[3].Y, AllDots[2].X, AllDots[2].Y, Percentage);
    AllDots[9].QuadraticMove     (AllDots[5].X, AllDots[5].Y, AllDots[7].X, AllDots[7].Y, Percentage);
    AllDots[10].QuadraticMove    (AllDots[8].X, AllDots[8].Y, AllDots[6].X, AllDots[6].Y, Percentage);
    AllDots[11].CubicMove    (AllDots[9].X, AllDots[9].Y, AllDots[10].X, AllDots[10].Y, Percentage);
    for(var i=constDots+1;i<MaxDots;i++){
		AllDots[5].LineMove     (AllDots[1].X, AllDots[1].Y, AllDots[2].X, AllDots[2].Y, (i-constDots)/drawDots);
		AllDots[6].LineMove     (AllDots[2].X, AllDots[2].Y, AllDots[4].X, AllDots[4].Y, (i-constDots)/drawDots);
		AllDots[7].LineMove     (AllDots[2].X, AllDots[2].Y, AllDots[3].X, AllDots[3].Y, (i-constDots)/drawDots);
		AllDots[8].LineMove     (AllDots[3].X, AllDots[3].Y, AllDots[2].X, AllDots[2].Y, (i-constDots)/drawDots);
		AllDots[9].QuadraticMove     (AllDots[5].X, AllDots[5].Y, AllDots[7].X, AllDots[7].Y, (i-constDots)/drawDots);
		AllDots[10].QuadraticMove    (AllDots[8].X, AllDots[8].Y, AllDots[6].X, AllDots[6].Y, (i-constDots)/drawDots);
		
        AllDots[i].CubicMove  (AllDots[9].X, AllDots[9].Y, AllDots[10].X, AllDots[10].Y, (i-constDots)/drawDots);
    }
    if(Percentage < 1){
        Percentage = Percentage + 0.01;  
    }else{
        Percentage = 0.01;
    }
}
function draw() {
    for(var Counter = 1; Counter <= MaxDots; Counter++){
        if(AllDots[Counter].Hide==1){
            AllDots[Counter].Draw(Counter);
        }
    }
}
function mousedown(){
    for(var Counter = 1; Counter <=constDots; Counter++){
        if(mouseX <= AllDots[Counter].X + AllDots[Counter].Radius && 
           mouseX >= AllDots[Counter].X - AllDots[Counter].Radius && 
           mouseY <= AllDots[Counter].Y + AllDots[Counter].Radius && 
           mouseY >= AllDots[Counter].Y - AllDots[Counter].Radius){
           TakenDot = Counter;  
        }
    }
}
function mouseup(){
    TakenDot = -1;
}