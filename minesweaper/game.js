"use strict";
var grid=[];
var sizeX=10,sizeY=10,cellSize=30,gap=1;
var shell=[];
var numbeOfBomb=10;
var bombX=[],bombY=[];
var area=[];
var tracked=[];
var clickX,clickY;
var gOver=false;
var timer=0;
var firstclick=false;
for(var x=0;x<=sizeX+1;x++){
	grid[x]=[];
	shell[x]=[];
	area[x]=[];
	tracked[x]=[];
	for(var y=0;y<=sizeY+1;y++){
		shell[x][y]=true;
		grid[x][y]=0;
		area[x][y]=0;
		tracked[x][y]=false;
	}
}
start();
function start(){
    for(var i=0;i<numbeOfBomb;i++){
		bombX[i]=Math.floor(Math.random()*sizeX+1)
		bombY[i]=Math.floor(Math.random()*sizeY+1)
		grid[bombX[i]][bombY[i]]=1;
	}
	var broqch=0;
	for(var x=1;x<sizeX+1;x++){
		for(var y=1;y<sizeY+1;y++){
			broqch=grid[x-1][y-1]+grid[x-1][y]+grid[x-1][y+1]
					+grid[x][y-1]+grid[x][y+1]
					+grid[x+1][y-1]+grid[x+1][y]+grid[x+1][y+1];
			area[x][y]=broqch;
		}
	}
}
function mine(mineX,mineY){
    shell[mineX][mineY]=false;
    tracked[mineX][mineY]=true;
    if(grid[mineX][mineY]==1){
        dead();
    }
    if(area[mineX][mineY]==0 ){
        if(tracked[mineX-1][mineY]==false && mineX>1){
            mine(mineX-1,mineY);
        }
        if(tracked[mineX+1][mineY]==false && mineX<sizeX){
            mine(mineX+1,mineY);
        }
        if(tracked[mineX][mineY-1]==false && mineY>1){
            mine(mineX,mineY-1);
        }
        if(tracked[mineX][mineY+1]==false && mineY<sizeY){
            mine(mineX,mineY+1);
        }
    }
    timer=timer+1;
}
function dead(){
	for(x=1;x<=sizeX;x++){
		for(y=1;y<=sizeY;y++){
			shell[x][y]=0
		}
	}
	gOver=true;
}

function update() {
    
};
function draw() {
    for(var x=1;x<=sizeX;x++){
		for(var y=1;y<=sizeY;y++){
			if(shell[x][y]==1){
				context.fillStyle="black";
			}else{
				if(grid[x][y]==1){
					context.fillStyle="red";
				}else{
					context.fillStyle="white";
				}
			}
			context.fillRect(x*cellSize,y*cellSize,cellSize-gap,cellSize-gap);
			if(shell[x][y]==0 && grid[x][y]==0){
				context.fillStyle="black"
				context.font="30px Geogia";
				context.fillText(area[x][y],(x)*cellSize,(y+1)*cellSize);
			}
		}
	}
	if(gOver==true){
		context.fillStyle="darkred"
		context.font="120px Geogia";
		context.fillText("GAME OVER" ,0,500);
	}
};
function keyup(key) {

}
function mousedown() {
	clickX=Math.floor(mouseX/cellSize);
	clickY=Math.floor(mouseY/cellSize);
	shell[clickX][clickY]=false;
	mine(clickX,clickY);
};

