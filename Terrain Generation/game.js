"use strict";
var grid=[];
var grid2=[];
var gridSizeX=129;
var gridSizeY=129;
var cellSize=4,gap=0;
var buffs=10 ,buffs2=40;
var startDepth=80;
var doPolish=false;
var timer=0,polishUpdateTimer=1;
var myX,myY;
var editRad=20/cellSize;
var editVariant=-1;
for(var x=0;x<gridSizeX;x++){
    grid[x]=[];
    grid2[x]=[];
    for(var y=0;y<gridSizeY;y++){
        grid[x][y]=-1;
        grid2[x][y]-1;
    }   
}
start();
function start(){
    //ISLAND
    
    grid[0][0]=0;
    grid[0][gridSizeY-1]=0;
    grid[gridSizeX-1][0]=0;
    grid[gridSizeX-1][gridSizeY-1]=0;
    grid[(gridSizeX-1)/2][0]=0;
    grid[0][(gridSizeY-1)/2]=0;
    grid[(gridSizeX-1)/2][gridSizeY-1]=0;
    grid[gridSizeX-1][(gridSizeY-1)/2]=0;
    grid[(gridSizeX-1)/2][(gridSizeY-1)/2]=256;
    grid[(gridSizeX-1)/2][(gridSizeY-1)/2];
    /*grid[0][0]=240;
    grid[gridSizeX-1][0]=240;
    grid[0][gridSizeY-1]=240;
    grid[(gridSizeX-1)/2][(gridSizeY-1)/2]=0;
    grid[gridSizeX-1][gridSizeY-1]=240*/
    /*
    grid[0][0]=Math.random()*256
    grid[0][gridSizeY-1]=Math.random()*256
    grid[gridSizeX-1][0]=Math.random()*256
    grid[gridSizeX-1][gridSizeY-1]=Math.random()*256
    */
    generate(0,0,gridSizeX-1,gridSizeY-1,startDepth)
    
}
function polish(){
    for(var x=0;x<gridSizeX;x++){
        for(var y=0;y<gridSizeY;y++){
            if(x==0){
                if(y==0){
                    grid2[x][y]=(grid[x][y]+grid[x][y+1]+grid[x+1][y]+grid[x+1][y+1])/4;
                }else{
                    if(y==gridSizeY-1){
                        grid2[x][y]=(grid[x][y]+grid[x][y-1]+grid[x+1][y]+grid[x+1][y-1])/4;
                    }else{
                        grid2[x][y]=(grid[x][y-1]+grid[x][y]+grid[x][y+1]+
                                     grid[x+1][y-1]+grid[x+1][y]+grid[x+1][y+1])/6;
                    }
                }
            }else{
                if(x==gridSizeX-1){
                    if(y==0){
                        grid2[x][y]=(grid[x][y]+grid[x][y+1]+grid[x-1][y]+grid[x-1][y+1])/4;
                    }else{
                        if(y==gridSizeY-1){
                            grid2[x][y]=(grid[x][y]+grid[x][y-1]+grid[x-1][y]+grid[x-1][y-1])/4;
                        }else{
                            grid2[x][y]=(grid[x][y-1]+grid[x][y]+grid[x][y+1]+
                                        grid[x-1][y-1]+grid[x-1][y]+grid[x-1][y+1])/6;
                        }
                    }
                }else{
                    if(y==0){
                        grid2[x][y]=(grid[x-1][y]+grid[x-1][y+1]+grid[x][y]
                                     +grid[x][y+1]+grid[x+1][y]+grid[x+1][y+1])/6;
                    }else{
                        if(y==gridSizeY-1){
                            grid2[x][y]=(grid[x-1][y]+grid[x-1][y-1]+grid[x][y]
                                     +grid[x][y-1]+grid[x+1][y]+grid[x+1][y-1])/6;
                        }else{
                            grid2[x][y]=(grid[x-1][y-1]+grid[x-1][y]+grid[x-1][y+1]+
                                        grid[x][y-1]+grid[x][y]+grid[x][y+1]+
                                        grid[x+1][y-1]+grid[x+1][y]+grid[x+1][y+1])/9;
                        }
                    }
                }
            }
        }
    }
    for(var x=0;x<gridSizeX;x++){
        for(y=0;y<gridSizeY;y++){
            grid[x][y]=grid2[x][y];
        }
    }
}
function generate( fromX,fromY,toX,toY,depht){
    if(toX-fromX<2){
        return;
    }
    buffs=depht*1.2;
    buffs2=depht;
    depht*=0.8;
    //buffs=0;
    //buffs2=0;
    var centerX=(toX+fromX)/2;
    var centerY=(toY+fromY)/2;
    if(grid[centerX][centerY]==-1){
        grid[centerX][centerY]=(grid[fromX][fromY]+grid[fromX][toY]+grid[toX][fromY]+grid[toX][toY])/4
        +Math.random()*buffs2-buffs2/2;
    }
    
    if(grid[centerX][fromY]==-1){
        grid[centerX][fromY]= (grid[fromX][fromY]  +grid[toX][fromY]   +grid[centerX][centerY])/3+Math.random()*buffs-buffs/2;
    }
    if(grid[centerX][toY]==-1){
        grid[centerX][toY]=   (grid[fromX][toY]    +grid[toX][toY]     +grid[centerX][centerY])/3+Math.random()*buffs-buffs/2;
    }
    if(grid[fromX][centerY]==-1){
        grid[fromX][centerY]= (grid[fromX][fromY]  +grid[fromX][toY]   +grid[centerX][centerY])/3+Math.random()*buffs-buffs/2;
    }
    if(grid[toX][centerY]==-1){
        grid[toX][centerY]=   (grid[toX][fromY]    +grid[toX][toY]     +grid[centerX][centerY])/3+Math.random()*buffs-buffs/2;
    }
    
    generate(fromX,fromY,centerX,centerY,depht);
    generate(centerX,fromY,toX,centerY,depht);
    generate(fromX,centerY,centerX,toY,depht);
    generate(centerX,centerY,toX,toY,depht);
}
function update() {
    if(doPolish==true){
        timer++;
        if(timer>=polishUpdateTimer){
            polish();
            timer=0;
        }
    }else{
        timer=0;
    }
};
function draw() {
    for(var x=0;x<gridSizeX;x++){
        for(var y=0;y<gridSizeY;y++){
            //var v=Math.floor(grid   [x][y])
            var v=grid[x][y];
            var str="rgb(" + v + "," + v + "," + v + ")";
            if(v<=0){
                v=1;
            }
            if(v<30){
                context.fillStyle="darkblue";
            }
            if(v>=30 && v<55){
                context.fillStyle="blue";
            }
            if(v>=55 && v<60){
                context.fillStyle="yellow";
            }
            if(v>=60 && v<80){
                context.fillStyle="#66ff66";
            }
            if(v>=80 && v<100){
                context.fillStyle="#00cc00";
            }
            if(v>=100 && v<140){
                context.fillStyle="green";
            }
            if(v>=140 && v<180){
                context.fillStyle="darkgreen";
            }
            if(v>=180 && v<210){
                context.fillStyle="brown";
            }
            if(v>=210 && v<230){
                context.fillStyle="#663300";
            }
            if(v>=220){
                context.fillStyle="#ffffff";
            }
           //context.fillStyle=str;
            context.fillRect(x*cellSize ,y*cellSize ,cellSize-gap ,cellSize-gap);
        }
    }
};
function keyup(key) {
    console.log("Pressed", key);
    if(key==80){
        doPolish=!doPolish;console.log(doPolish);
    }
    if(key==69){
        if(editVariant<=0){
            console.log("up");
        }else{
            console.log("down");
        }
        editVariant=-editVariant
    }
    if(key==77){
        editRad=editRad+1;
        console.log("edit radius",editRad);
    }
    if(key==78){
        editRad=editRad-1;
        console.log("edit raius",editRad);
    }
    //polish();
}
function mouseup() {
    for(var x = 0;x < gridSizeX;x ++) {
		for(var y = 0;y < gridSizeY;y ++) {
			var dist = Math.sqrt((mouseX-x*cellSize)*(mouseX-x*cellSize) + (mouseY-y*cellSize)*(mouseY-y*cellSize));
			if(dist <= editRad) {
				grid[x][y] = grid[x][y]+editVariant;
			}
		}
	}
    //console.log("Mouse clicked at", mouseX, mouseY);
};
