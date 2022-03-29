class point{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	draw(){
		context.beginPath();
		context.arc(this.x,this.y,2,0,2*Math.PI);
		context.stroke();
	}
}
class segment{
	constructor(begin,end){
	   this.dist = Math.sqrt((end.x - begin.x)*(end.x - begin.x) + (end.y - begin.y)*(end.y - begin.y));
    	this.dx = (end.x-begin.x)/this.dist;
		this. dy = (end.y-begin.y)/this.dist;
		this.end=end;
		this.begin=begin;
	}
	move(pos){
		if(pos==1){
			this.begin.x+=this.dx;1
			this.end.x+=this.dx;
			this.begin.y+=this.dy;
			this.end.y+=this.dy;
		}else{
			this.begin.x-=this.dx;
			this.end.x-=this.dx;
			this.begin.y-=this.dy;
			this.end.y-=this.dy;
		}
	}
	draw(){
		this.end.draw()
		this.begin.draw()
		context.beginPath();
		context.moveTo(this.begin.x,this.begin.y);
		context.lineTo(this.end.x,this.end.y);
		context.stroke();
	}
	delta(){
		this.dist = Math.sqrt((this.end.x - this.begin.x)*(this.end.x - this.begin.x) + (this.end.y - this.begin.y)*(this.end.y - this.begin.y));
    	this.dx = (this.end.x-this.begin.x)/this.dist;
		this.dy = (this.end.y-this.begin.y)/this.dist;
		return new point(this.end.x-this.begin.x,this.end.y-this.begin.y)

	}
	scale(n){
		this.bx*=n;
		this.ex*=n;
		this.by*=n;
		this.ey*=n;
	}
}
class Body{
    constructor(segment){
        this.segment = segment;
    }
    draw(){
        for(var i = 0; i < this.segment; i++){
            this.segment[i].draw();
        }
    }
    intersectWithSegments(seg2){
        var res = [];
        for(var i = 0; i < this.segment.lenght; i++){
            var P = this.segment[i].intersectWithSegments(segment2);
            if(P!=undefined){
                res.push(P);
            }else{
                return res;
            }
        }  
    }
}

function ints(A,B){
    
	var a=(B.begin.y*A.delta().x+A.begin.x*A.delta().y-A.delta().y*B.begin.x-A.begin.y*A.delta().x)/(A.delta().y*B.delta().x-B.delta().y*A.delta().x);
	var b=(B.begin.x+B.delta().x*a-A.begin.x)/A.delta().x;
	console.log(a,b);
	if(a>0 && b>0 && a<1 && b<1){
		var a = new point(A.begin.x+A.delta().x*b,A.begin.y+A.delta().y*b);
		return a;
	}else{return new point(-100,-100);}
}
var seg=new segment(new point(20,20),new point(200,200));
var seg2=new segment(new point(20,200),new point(200,20));
function update(){
    seg.end.y=mouseY;
	seg.end.x=mouseX;
}
function draw(){
	seg.draw();
	seg2.draw();
	context.fillRect(ints(seg,seg2).x-5,ints(seg,seg2).y-5,10,10)
}
function mouseup(){
	//seg.end.y=mouseY;
	//seg.end.x=mouseX;
}