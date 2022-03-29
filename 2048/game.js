var gridSizeX=4,gridSizeY=4;
var grid=[];
var cellSize=100,gaps=1;
var oneDirectionX=0,oneDirectionY=0;
var moves=false;
var emptySpace=0,genNumber;
var emptyX=[],emptyY=[];
for(var x=0;x<=gridSizeX+1;x++){
	grid[x]=[];
	for(var y=0;y<=gridSizeY+1;y++){
		grid[x][y]=0;
	}
}
start();
function start(){
	for(x=0;x<=gridSizeX+1;x++){
		for(y=0;y<=gridSizeY+1;y++){
			if(x==0){
				grid[x][y]=-1;
			}
			if(y==0){
				grid[x][y]=-1;
			}
			if(x==gridSizeX+1){
				grid[x][y]=-1;
			}
			if(y==gridSizeY+1){
				grid[x][y]=-1;
			}
			
		}
	}
	generate();
	generate();
	
}
function generate(){
	//console.log("genrate");
	emptySpace=0;
	for(var x=1;x<=gridSizeX;x++){
		for(var y=1;y<=gridSizeY;y++){
			if(grid[x][y]==0){
				emptyX[emptySpace]=x;
				emptyY[emptySpace]=y;
				emptySpace=emptySpace+1;
			}
		}
	}

	if(emptySpace>=1){
		genNumber=Math.floor(Math.random()*emptySpace);
		grid[emptyX[genNumber]][emptyY[genNumber]]=2+Math.floor(Math.random()*2)*2
		//grid[emptyX[genNumber]][emptyY[genNumber]]=2
	}
	moves=false
}
function move(cellX,cellY){
	if(grid[cellX+oneDirectionX][cellY+oneDirectionY]==0){
		grid[cellX+oneDirectionX][cellY+oneDirectionY]=grid[cellX][cellY];
		if(grid[cellX][cellY]>0){
			moves=true
		}
		grid[cellX][cellY]=0;
		move(cellX+oneDirectionX,cellY+oneDirectionY);
		
	}
	if(grid[cellX+oneDirectionX][cellY+oneDirectionY]>0){
		if(grid[cellX+oneDirectionX][cellY+oneDirectionY]==grid[cellX][cellY]){
			grid[cellX+oneDirectionX][cellY+oneDirectionY]=grid[cellX+oneDirectionX][cellY+oneDirectionY]*2;
			grid[cellX][cellY]=0;
			moves=true;
		}
	}
}
function update() {
}
function draw() {
	for(var x=0;x<=gridSizeX+1;x++){
		for(var y=0;y<=gridSizeY+1;y++){
			if(grid[x][y]==-1){
				context.fillStyle="white";
			}
			if(grid[x][y]==0){
				context.fillStyle="lightgrey";
			}
			if(grid[x][y]==2){
				context.fillStyle="darkgrey";
			}
			if(grid[x][y]==4){
				context.fillStyle="grey";
			}
			if(grid[x][y]==8){
				context.fillStyle="orange";
			}
			if(grid[x][y]==16){
				context.fillStyle="darkorange";
			}
			if(grid[x][y]==32){
				context.fillStyle="red";
			}
			if(grid[x][y]==64){
				context.fillStyle="#cc0000";
			}
			if(grid[x][y]==128){
				context.fillStyle="#ffff99";
			}
			if(grid[x][y]==256){
				context.fillStyle="#ffff66";
			}
			if(grid[x][y]==512){
				context.fillStyle="#ffff00";
			}
            if(grid[x][y]==512){
				context.fillStyle="#ffff00";
			}
            if(grid[x][y]==1024){
				context.fillStyle="#33ccff";
			}
            if(grid[x][y]==2048){
				context.fillStyle="#3399ff";
			}
            if(grid[x][y]==4096){
				context.fillStyle="#0066ff";
			}
            if(grid[x][y]==8192){
				context.fillStyle="#0033cc";
			}
			context.fillRect(x*cellSize,y*cellSize,cellSize-gaps,cellSize-gaps);
			if(grid[x][y]>0){
				context.fillStyle="black"
                context.font="100px Geogia";
                if(grid[x][y]>100){
				    context.font="60px Geogia";
                }
                if(grid[x][y]>1000){
                    context.font="30px Geogia";
                }
				context.fillText(grid[x][y] ,x*cellSize,y*cellSize+cellSize);
			}
		}
	}
}
function keyup(key) {
	//console.log(key)
	moves=false
	if(key==87 || key==38){
		for(var x=1;x<=gridSizeX;x++){
			for(var y=1;y<=gridSizeY;y++){
				oneDirectionX=0;
				oneDirectionY=-1;
				move(x,y);
			}
		}
	}
	if(key==65 || key==37){
		for(var x=1;x<=gridSizeX;x++){
			for(var y=1;y<=gridSizeY;y++){
				oneDirectionX=-1;
				oneDirectionY=0;
				move(x,y);
			}
		}
	}
	if(key==83 || key==40){
		for(var x=gridSizeX;x>=1;x--){
			for(var y=gridSizeY;y>=1;y--){
				oneDirectionX=0;
				oneDirectionY=1;
				move(x,y);
			}
		}
	}
	if(key==68 || key==39){
		for(var x=gridSizeX;x>=1;x--){
			for(var y=gridSizeY;y>=1;y--){
				oneDirectionX=1;
				oneDirectionY=0;
				move(x,y);
			}
		}
	}
	if(moves==true){
		generate();
	}
	moves=false
	//console.log(oneDirectionX,oneDirectionY);
}
function mouseup() {

};
