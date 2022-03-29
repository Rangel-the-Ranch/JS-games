"use strict";
var grid=[];
var sizeX=[],sizeY=[],numberOfLvL=11;
var whichLvl=0;
var blockSize=50, gaps=1;
var myX=1,myY=1;
//var mySizeX,mySizeY;
var offX=0,offY=0;
var speed=10;
var distanseFromBorderX=0,distanseFromBorderY=0;
var moving=false;
var NportalX=[],NportalY=[];
var MportalX=[],MportalY=[];
var moveX=0,moveY=0;
var numberOfPortals=[];
var maxPortals=0;
var lvlEditor=false;
var selectedBlock=1;
var spawnedPortals=0;
var portalBreak=0;
var editX,editY;
for(var i=0;i<numberOfLvL;i=i+1){
        sizeX[i]=12;
        sizeY[i]=12;
}
start();
function start(){
    for(var z=0;z<=numberOfLvL;z=z+1){
        grid[z]=[];
        for(var x=0;x<sizeX[z];x=x+1){
            grid[z][x]=[];
            for(var y=0;y<sizeY[z];y=y+1){
                grid[z][x][y]=0;
            }
        }
    }
    for(var z=0;z<numberOfLvL;z=z+1){
        MportalX[z]=[];
        MportalY[z]=[];
        NportalX[z]=[];
        NportalY[z]=[];
    }
    for(var i=0;i<numberOfLvL;i=i+1){
        numberOfPortals[i]=0;
    }
    levels();
    respawn();
}
function levels(){
    sizeX[0]=12;
    sizeY[0]=12;
    numberOfPortals[0]=0;
    grid[0][1][6]=1;
    grid[0][7][5]=1;
    grid[0][8][3]=1;
    grid[0][7][5]=1;
    grid[0][9][1]=1;
    grid[0][5][4]=2;
    grid[0][6][10]=1;
    grid[0][2][7]=1;
    grid[0][1][9]=1;
    grid[0][4][1]=1;
    grid[0][9][8]=1;
    grid[0][1][1]=4;
    
    sizeX[1]=12;
    sizeY[1]=12;
    numberOfPortals[1]=2;
    grid[1][1][8]=1;
    grid[1][3][5]=1;
    grid[1][4][7]=1;
    grid[1][4][10]=4;
    grid[1][7][6]=1;
    grid[1][8][8]=1;
    grid[1][9][5]=2;
    NportalX[1][0]=2;
    NportalY[1][0]=10;
    MportalX[1][0]=7;
    MportalY[1][0]=3;
    NportalX[1][1]=7;
    NportalY[1][1]=7;
    MportalX[1][1]=3;
    MportalY[1][1]=4;
    grid[1] [NportalX[1][0]] [NportalY[1][0]]=3;
    grid[1] [MportalX[1][0]] [MportalY[1][0]]=3;
    grid[1] [NportalX[1][1]] [NportalY[1][1]]=3;
    grid[1] [MportalX[1][1]] [MportalY[1][1]]=3;
    
    sizeX[2]=12;
    sizeY[2]=12;
    numberOfPortals[2]=2;
    grid[2][2][1]=1;
    grid[2][2][8]=1;
    grid[2][4][7]=2;
    grid[2][5][9]=4;
    grid[2][6][5]=1;
    grid[2][7][4]=1;
    grid[2][8][2]=1;
    grid[2][8][9]=1;
    grid[2][9][6]=1;
    grid[2][9][9]=1;
    grid[2][5][7]=1;
    NportalX[2][0]=7;
    NportalY[2][0]=6;
    MportalX[2][0]=2;
    MportalY[2][0]=6;
    NportalX[2][1]=3;
    NportalY[2][1]=3;
    MportalX[2][1]=10;
    MportalY[2][1]=2;
    grid[2] [NportalX[2][0]] [NportalY[2][0]]=3;
    grid[2] [MportalX[2][0]] [MportalY[2][0]]=3;
    grid[2] [NportalX[2][1]] [NportalY[2][1]]=3;
    grid[2] [MportalX[2][1]] [MportalY[2][1]]=3;
    
    sizeX[3]=12;
    sizeY[3]=12;
    numberOfPortals[3]=4;
    grid[3][1][3]=1;
    grid[3][2][1]=1;
    grid[3][5][2]=2;
    grid[3][6][2]=1;
    grid[3][9][10]=4;
    NportalX[3][0]=2;
    NportalY[3][0]=10;
    MportalX[3][0]=9;
    MportalY[3][0]=9;
    grid[3] [NportalX[3][0]] [NportalY[3][0]]=3;
    grid[3] [MportalX[3][0]] [MportalY[3][0]]=3;
    NportalX[3][1]=2;
    NportalY[3][1]=9;
    MportalX[3][1]=9;
    MportalY[3][1]=7;
    grid[3] [NportalX[3][1]] [NportalY[3][1]]=3;
    grid[3] [MportalX[3][1]] [MportalY[3][1]]=3;
    NportalX[3][2]=2;
    NportalY[3][2]=7;
    MportalX[3][2]=9;
    MportalY[3][2]=5;
    grid[3] [NportalX[3][2]] [NportalY[3][2]]=3;
    grid[3] [MportalX[3][2]] [MportalY[3][2]]=3;
    NportalX[3][3]=2;NportalY[3][3]=5;
    MportalX[3][3]=9;
    MportalY[3][3]=3;
    grid[3] [NportalX[3][3]] [NportalY[3][3]]=3;
    grid[3] [MportalX[3][3]] [MportalY[3][3]]=3;
    
    sizeX[4]=12;
    sizeY[4]=12;
    numberOfPortals[4]=1;
    grid[4][1][7]=1;
    grid[4][2][4]=1;
    grid[4][2][5]=1;
    grid[4][3][8]=1;
    grid[4][5][3]=1;
    grid[4][5][7]=1;
    grid[4][5][9]=4;
    grid[4][8][5]=1;
    grid[4][8][9]=1;
    grid[4][9][5]=1;
    grid[4][9][8]=1;
    grid[4][10][6]=2;
    grid[4][6][6]=1
    grid[4][11][7]=1;
    NportalX[4][0]=8;
    NportalY[4][0]=6;
    MportalX[4][0]=5;
    MportalY[4][0]=6;
    grid[4][NportalX[4][0]] [NportalY[4][0]]=3
    grid[4][MportalX[4][0]] [MportalY[4][0]]=3
    
    sizeX[5]=12;
    sizeY[5]=12;
    numberOfPortals[5]=1;
    grid[5][2][3]=4;
    grid[5][5][6]=1;
    grid[5][6][3]=1;
    grid[5][6][9]=2;
    NportalX[5][0]=7;
    NportalY[5][0]=5;
    MportalX[5][0]=2;
    MportalY[5][0]=7;
    grid[5] [NportalX[5][0]] [NportalY[5][0]]=3;
    grid[5] [MportalX[5][0]] [MportalY[5][0]]=3;
    
    sizeX[6]=12;
    sizeY[6]=12;
    numberOfPortals[6]=2;
    grid[6][1][5]=1;
    grid[6][2][1]=1;
    grid[6][2][6]=2;
    grid[6][2][7]=1;
    grid[6][2][8]=4;
    grid[6][7][1]=1;
    grid[6][7][2]=1;
    grid[6][7][8]=1;
    grid[6][8][10]=1;
    grid[6][9][5]=1;
    grid[6][10][9]=1;
    NportalX[6][0]=6;
    NportalY[6][0]=5;
    MportalX[6][0]=2;
    MportalY[6][0]=4;
    grid[6] [NportalX[6][0]] [NportalY[6][0]]=3;
    grid[6] [MportalX[6][0]] [MportalY[6][0]]=3;
    NportalX[6][1]=6;
    NportalY[6][1]=4;
    MportalX[6][1]=8;
    MportalY[6][1]=6;
    grid[6] [NportalX[6][1]] [NportalY[6][1]]=3;
    grid[6] [MportalX[6][1]] [MportalY[6][1]]=3;
    
    sizeX[7]=12;sizeY[7]=12;
    numberOfPortals[7]=3;
    grid[7][1][1]=4;
    grid[7][1][6]=2;
    grid[7][1][9]=1;
    grid[7][2][2]=1;
    grid[7][3][7]=1;
    grid[7][4][4]=1;
    grid[7][5][4]=1;
    grid[7][6][5]=1;
    grid[7][7][8]=1;
    grid[7][8][3]=1;
    grid[7][9][10]=1;
    grid[7][10][1]=1;
    grid[7][1][3]=1;
    NportalX[7][0]=5;
    NportalY[7][0]=5;
    MportalX[7][0]=1;
    MportalY[7][0]=8;
    grid[7] [NportalX[7][0]] [NportalY[7][0]]=3;
    grid[7] [MportalX[7][0]] [MportalY[7][0]]=3;
    NportalX[7][1]=10;
    NportalY[7][1]=9;
    MportalX[7][1]=1;
    MportalY[7][1]=10;
    grid[7] [NportalX[7][1]] [NportalY[7][1]]=3;
    grid[7] [MportalX[7][1]] [MportalY[7][1]]=3;
    NportalX[7][2]=6;
    NportalY[7][2]=2;
    MportalX[7][2]=2;
    MportalY[7][2]=5;
    grid[7] [NportalX[7][2]] [NportalY[7][2]]=3;
    grid[7] [MportalX[7][2]] [MportalY[7][2]]=3;
    
    sizeX[8]=12;
    sizeY[8]=12;
    numberOfPortals[8]=0;
    grid[8][1][1]=4;
    grid[8][1][2]=5;grid[8][1][3]=5;grid[8][1][4]=5;grid[8][1][5]=5;grid[8][1][6]=5;grid[8][1][7]=5;grid[8][1][8]=5;grid[8][1][9]=5;grid[8][1][10]=5;grid[8][2][1]=5;grid[8][2][2]=5;grid[8][2][3]=5;grid[8][2][4]=5;grid[8][2][5]=5;grid[8][2][6]=5;grid[8][2][7]=5;grid[8][2][8]=5;grid[8][2][9]=5;grid[8][2][10]=5;grid[8][3][1]=5;grid[8][3][2]=5;grid[8][3][3]=5;grid[8][3][4]=5;grid[8][3][5]=5;grid[8][3][6]=5;grid[8][3][7]=5;grid[8][3][8]=5;grid[8][3][9]=5;grid[8][3][10]=5;grid[8][4][1]=5;grid[8][4][2]=5;grid[8][4][3]=5;grid[8][4][4]=5;grid[8][4][5]=5;grid[8][4][6]=5;grid[8][4][7]=5;grid[8][4][8]=5;grid[8][4][9]=5;grid[8][4][10]=5;grid[8][5][1]=5;grid[8][5][2]=5;grid[8][5][3]=5;grid[8][5][4]=5;grid[8][5][5]=5;grid[8][5][6]=5;grid[8][5][7]=5;grid[8][5][8]=5;grid[8][5][9]=5;grid[8][5][10]=5;grid[8][6][1]=5;grid[8][6][2]=5;grid[8][6][3]=5;grid[8][6][4]=5;grid[8][6][5]=5;grid[8][6][6]=5;grid[8][6][7]=5;grid[8][6][8]=5;grid[8][6][9]=5;grid[8][6][10]=5;grid[8][7][1]=5;grid[8][7][2]=5;grid[8][7][3]=5;grid[8][7][4]=5;grid[8][7][5]=5;grid[8][7][6]=5;grid[8][7][7]=5;grid[8][7][8]=5;grid[8][7][9]=5;grid[8][7][10]=5;grid[8][8][1]=5;grid[8][8][2]=5;grid[8][8][3]=5;grid[8][8][4]=5;grid[8][8][5]=5;grid[8][8][6]=5;grid[8][8][7]=5;grid[8][8][8]=5;grid[8][8][9]=5;grid[8][8][10]=5;grid[8][9][1]=5;grid[8][9][2]=5;grid[8][9][3]=5;grid[8][9][4]=5;grid[8][9][5]=5;grid[8][9][6]=5;grid[8][9][7]=5;grid[8][9][8]=5;grid[8][9][10]=5;grid[8][10][1]=5;grid[8][10][2]=5;grid[8][10][3]=5;grid[8][10][4]=5;grid[8][10][5]=5;grid[8][10][6]=5;grid[8][10][7]=5;grid[8][10][8]=5;grid[8][10][9]=5;grid[8][10][10]=5;
    grid[8][9][9]=2;
    
    sizeX[9]=12;sizeY[9]=12;numberOfPortals[9]=2;grid[9][1][1]=2;grid[9][2][7]=1;grid[9][3][1]=5;grid[9][3][4]=5;grid[9][5][1]=5;grid[9][6][10]=1;grid[9][8][5]=1;grid[9][8][8]=1;grid[9][9][2]=1;grid[9][9][8]=1;grid[9][9][9]=1;grid[9][10][6]=1;grid[9][10][10]=4;NportalX[9][0]=6;NportalY[9][0]=5;MportalX[9][0]=2;MportalY[9][0]=10;grid[9] [NportalX[9][0]] [NportalY[9][0]]=3;grid[9] [MportalX[9][0]] [MportalY[9][0]]=3;NportalX[9][1]=1;NportalY[9][1]=4;MportalX[9][1]=10;MportalY[9][1]=1;grid[9] [NportalX[9][1]] [NportalY[9][1]]=3;grid[9] [MportalX[9][1]] [MportalY[9][1]]=3;
    
    //sizeX[9]=13;
    //sizeY[9]=13;
    
    //{
    //add your levels here
    //}
}
function update(){
    portalBreak=portalBreak-1;
    if(myX+moveX+distanseFromBorderX<distanseFromBorderX || 
       myX+moveX+distanseFromBorderX>=sizeX[whichLvl]+distanseFromBorderX || 
       myY+moveY+distanseFromBorderY<distanseFromBorderX || 
       myY+moveY+distanseFromBorderY>=sizeY[whichLvl]+distanseFromBorderY){
        moving=false;
        dead();
    }
    if(grid[whichLvl][myX+moveX][myY+moveY]==1){
        moveX=0;
        moveY=0;
        moving=false;
    }
    if(grid[whichLvl][myX+moveX][myY+moveY]==2){
        if(lvlEditor==true){
            myX=myX+moveX;
            myY=myY+moveY;
        }else{
            finish();
        }
        moveX=0;
        moveY=0;
        moving=false;
    }
    if(grid[whichLvl][myX+moveX][myY+moveY]==3){
        for(var i=0;i<numberOfPortals[whichLvl];i=i+1){
            if(myX+moveX==NportalX[whichLvl][i] && myY+moveY==NportalY[whichLvl][i]){
                if(portalBreak<=0){
                    myX=MportalX[whichLvl][i];
                    myY=MportalY[whichLvl][i];
                    //console.log("izlizam M")
                    portalBreak=blockSize/speed+3;
                }
            }
            if(myX + moveX === MportalX[whichLvl][i] && myY + moveY === MportalY[whichLvl][i]){
                if(portalBreak<=0){
                    //console.log(NportalX[whichLvl][i], NportalY[whichLvl][i])
                    myX=NportalX[whichLvl][i];
                    myY=NportalY[whichLvl][i];
                    //console.log("izlizam N")
                    //console.log(myX,myY)
                    portalBreak=blockSize/speed+3;
                }
            }
        }
    }
    if(grid[whichLvl][myX+moveX][myY+moveY]==5){
        grid[whichLvl][myX+moveX][myY+moveY]=0;
        moveX=0;
        moveY=0;
        moving=false;
        
    }
    if(lvlEditor==true){
        gaps=2;
    }else{
        selectedBlock=-1;
        gaps=0;
    }
    offX=offX+speed*moveX;
    offY=offY+speed*moveY;
    if(offX>=blockSize){
        myX=myX+1;
        offX=0;
    }if(offX<=-blockSize){
        myX=myX-1;
        offX=0;
    }
    if(offY>=blockSize){
        myY=myY+1;
        offY=0;
    }
    if(offY<=-blockSize){
        myY=myY-1;
        offY=0;
    }
}
function finish(){
    console.log("good");
    whichLvl=whichLvl+1;
    if(whichLvl==numberOfLvL){
        whichLvl=0;
    }
    for(var x=0;x<sizeX[whichLvl];x=x+1){
        for(var y=0;y<sizeY[whichLvl];y=y+1){
            if(grid[whichLvl][x][y]==4){
                myX=x;
                myY=y;
            }
        }
    }
    offX=0;
    offY=0;
}
function draw() {
    if(lvlEditor==true){
        context.fillStyle="yellow";
        context.fillRect(-1000,-1000,10000,10000)
    }
    for(var x=1;x<sizeX[whichLvl]-1;x=x+1){
        for(var y=1;y<sizeY[whichLvl]-1;y=y+1){
            if(grid[whichLvl][x][y]==0){
                context.fillStyle="lightgrey";
            }
            if(grid[whichLvl][x][y]==1){
                context.fillStyle="black";
            }
            if(grid[whichLvl][x][y]==2){
                context.fillStyle="green";
            }
            if(grid[whichLvl][x][y]==3){
                context.fillStyle="blue";
            }
            if(grid[whichLvl][x][y]==4){
                context.fillStyle="lightgreen";
            }
            if(grid[whichLvl][x][y]==5){
                context.fillStyle="grey";
            }
            context.fillRect(x*blockSize+distanseFromBorderX,y*blockSize+distanseFromBorderY,blockSize-gaps,blockSize-gaps);
        }
    }
    for(i=0;i<numberOfPortals[whichLvl];i=i+1){
        context.font="80px Georgia";
        context.fillStyle="black";
        //context.textAlign="center";
        context.fillText(i+1,
                         (NportalX[whichLvl][i])*blockSize+distanseFromBorderX,
                         (NportalY[whichLvl][i]+1)*blockSize+distanseFromBorderY);
        context.fillText(i+1,
                         (MportalX[whichLvl][i])*blockSize+distanseFromBorderX,
                         (MportalY[whichLvl][i]+1)*blockSize+distanseFromBorderY);
    }
    context.fillStyle="red";
    context.fillRect(myX*blockSize+offX+distanseFromBorderX,myY*blockSize+offY+distanseFromBorderY,blockSize-gaps,blockSize-gaps);
    if(lvlEditor==true){
        context.fillStyle='yellow';
    }else{
        context.fillStyle='white';
    }
    context.fillRect(0+distanseFromBorderX,0+distanseFromBorderY,sizeX[whichLvl]*blockSize,blockSize);
    context.fillRect(0+distanseFromBorderX,0+distanseFromBorderY,blockSize,sizeX[whichLvl]*blockSize);
    context.fillRect(blockSize*(sizeY[whichLvl]-1)+distanseFromBorderX,0+distanseFromBorderY,blockSize,sizeX[whichLvl]*blockSize);
    context.fillRect(0+distanseFromBorderX,blockSize*(sizeY[whichLvl]-1)+distanseFromBorderY,blockSize*sizeY[whichLvl],blockSize);
    if(whichLvl==0){
        context.fillStyle="black";
        context.font="40px Geogia";
        context.fillText("Use W,A,S,D or arrows to move",0,blockSize-10)
        context.font="20px Geogia";
        context.fillText("press R if you want to respawn",blockSize*sizeX[whichLvl],blockSize*2)
        context.fillText("Try to get to the green block",blockSize*sizeX[whichLvl],blockSize*2-20)
    }
    if(whichLvl==1){
        context.fillStyle="black";
        context.font="40px Geogia";
        context.fillText("Blue blocks are portals",0,blockSize-10)
    }
    if(whichLvl==2){
        context.fillStyle="black";
        context.font="40px Geogia";
        context.fillText("Use portals from diferent direction",0,blockSize-10)
    }
    if(whichLvl==3){
        context.fillStyle="black";
        context.font="40px Geogia";
        context.fillText("Simple!",0,blockSize-10)
    }
    if(whichLvl==4){
        context.fillStyle="black";
        context.font="40px Geogia";
        context.fillText("Just Follow the path",0,blockSize-10)
    }
    if(whichLvl==5){
        context.fillStyle="black";
        context.font="40px Geogia";
        context.fillText("          THIS LEVEL IS IMPOSIBLE",0,blockSize-10)
        context.font="20px Geogia";
        context.fillText("If you press E you will open level editor",blockSize*sizeX[whichLvl],blockSize*2-20)
        context.fillText("use 0-4 for diferent block",blockSize*sizeX[whichLvl],blockSize*2)
        context.fillText("0-empty block",blockSize*sizeX[whichLvl],blockSize*2+20)
        context.fillText("1-fill block",blockSize*sizeX[whichLvl],blockSize*2+40)
        context.fillText("2-finish block",blockSize*sizeX[whichLvl],blockSize*2+60)
        context.fillText("3-portal block   (put only even number of portals)",blockSize*sizeX[whichLvl],blockSize*2+80)
        context.fillText("4-portal block",blockSize*sizeX[whichLvl],blockSize*2+100)
        context.fillText("5-temporal block",blockSize*sizeX[whichLvl],blockSize*2+120)
        context.fillText("You cant finish the level while level editor is open",blockSize*sizeX[whichLvl],blockSize*2+140)
        //context.fillText("Hint ")
    }
    if(whichLvl==8){
        context.fillStyle="black";
        context.font="40px Geogia";
        context.fillText("Grey blocks will disapear if hit them",0,blockSize-10)
    }
    if(whichLvl==numberOfLvL-1){
        context.fillStyle="black";
        context.font="40px Geogia";
        context.fillText("Create your own level",0,blockSize-10)
        context.font="20px Geogia";
        context.fillText("use the level editor and create your idea",blockSize*(sizeX[whichLvl]-1),blockSize*2)
        context.fillText("press (F12) then by pressing Q you can see your level ",blockSize*(sizeX[whichLvl]-1),blockSize*2+20)
        context.fillText("There are few steps if you want to add level into the game ",blockSize*(sizeX[whichLvl]-1),blockSize*2+40)
        context.fillText("1)copy the level",blockSize*(sizeX[whichLvl]-1),blockSize*2+60)
        context.fillText("2) openthe game.js file ",blockSize*(sizeX[whichLvl]-1),blockSize*2+80)
        context.fillText("3) paste the lvl at the end of function levels",blockSize*(sizeX[whichLvl]-1),blockSize*2+100)
        context.fillText("4)increase number of lever (numberOfLvL - line 3) by one",blockSize*(sizeX[whichLvl]-1),blockSize*2+120)
        context.fillText("if the level are 6 numerOfLvl must be 7",blockSize*(sizeX[whichLvl]-1),blockSize*2+140)
    }
};
function keyup(key) {
    //console.log("Pressed", key);
    if(key==82){
        respawn();
    }
    if(moving==false){
        if(key==39 || key==68){
            moveX=1;
            moving=true;
        }
        if(key==40 || key==83){
            moveY=1
            moving=true;
        }
        if(key==37 || key==65){
            moveX=-1;
            moving=true;
        }
        if(key==38 || key==87){
            moveY=-1;
            moving=true;
        }
    }
    if(key==69){
        lvlEditor=!lvlEditor;
        //console.log("lvl editor-",lvlEditor);
    }
    if(key==81){
        res(whichLvl);
    }
    if(lvlEditor==true){
        if(key==48){
            selectedBlock=0;
            console.log("empty block")
        }
        if(key==49){
            selectedBlock=1;
            console.log("full block")
        }
        if(key==50){
            selectedBlock=2;
            console.log("finish block")
        }
        if(key==51){
            selectedBlock=3;
            console.log("portal block")
        }
        if(key==52){
            selectedBlock=4;
            console.log("start block");
        }
        if(key==53){
            selectedBlock=5;
            console.log("temporary block");
        }
    }
    
};
function dead(){
    console.log("you died");
    offX=offX+speed*moveX;
    offY=offY+speed*moveY;
    moveX=0;
    moveY=0;
    console.log("respawn");
    respawn();
    
}
function respawn(){
    var rx,ry;
    for(var x=0;x<sizeX[whichLvl];x=x+1){
        for(var y=0;y<sizeY[whichLvl];y=y+1){
            if(grid[whichLvl][x][y]==4){
                myX=x;
                myY=y;
            }
        }
    }
    //myX=ry;
    //myY=rx;
    offX=0;
    offY=0;
    levels();
}
function res(lvl){
    var res = '';
    res +='sizeX['+lvl+']='+sizeX[lvl]+';';
    res +='sizeY['+lvl+']='+sizeX[lvl]+';';
    res +='numberOfPortals['+whichLvl+']='+numberOfPortals[whichLvl]+';';
    for(var i = 0; i < sizeX[whichLvl]; ++i) {
        for(var j = 0; j < sizeY[whichLvl]; ++j) {
            if(grid[lvl][i][j] != 0 && grid[lvl][i][j]!=3 ) {
                res+='grid['+lvl+'][' + i + '][' + j + ']=' + grid[lvl][i][j] + ';';
            }
        }
    }
    for(var i = 0; i < NportalX[whichLvl].length; ++i) {
        res += 'NportalX['+lvl+'][' + i + ']=' + NportalX[lvl][i] + ';';
        res += 'NportalY['+lvl+'][' + i + ']=' + NportalY[lvl][i] + ';';
        res += 'MportalX['+lvl+'][' + i + ']=' + MportalX[lvl][i] + ';';
        res += 'MportalY['+lvl+'][' + i + ']=' + MportalY[lvl][i] + ';';
        res += 'grid['+lvl+'] [NportalX['+lvl+'][' + i + ']] [NportalY['+lvl+']['+i+']]=3;';
        res += 'grid['+lvl+'] [MportalX['+lvl+'][' + i + ']] [MportalY['+lvl+']['+i+']]=3;';
    }
    console.log(res);
}
function mouseup() {
    //console.log("Mouse clicked at", mouseX, mouseY);
    editX=Math.floor((mouseX-distanseFromBorderX)/blockSize);
    editY=Math.floor((mouseY-distanseFromBorderY)/blockSize);
    if(editX<sizeX[whichLvl] && 
       editX>=0 && 
       editY<sizeY[whichLvl] && 
       editY>=0){
        //console.log(editX,editY);
        if(selectedBlock==3){
            spawnedPortals=spawnedPortals+1;
            if(spawnedPortals==1){
                numberOfPortals[whichLvl]=numberOfPortals[whichLvl]+1;
                NportalX[whichLvl][numberOfPortals[whichLvl]-1]=editX;
                NportalY[whichLvl][numberOfPortals[whichLvl]-1]=editY;
                //console.log("put N")
            }else{
                MportalX[whichLvl][numberOfPortals[whichLvl]-1]=editX;
                MportalY[whichLvl][numberOfPortals[whichLvl]-1]=editY;
                //console.log("put M and again")
                spawnedPortals=0;
            }
        }
        if(grid[whichLvl][editX][editY]==3){
            for(var i=0;i<numberOfPortals[whichLvl];i=i+1){
                if(NportalX[whichLvl][i]==editX && NportalY[whichLvl][i]==editY){
                    grid[whichLvl] [MportalX [whichLvl] [i] ] [MportalY [whichLvl] [i] ]=0;
                    MportalX[whichLvl][i]=0;
                    MportalY[whichLvl][i]=0;
                    NportalX[whichLvl][i]=0;
                    NportalY[whichLvl][i]=0;
                }
                if(MportalX[whichLvl][i]==editX && MportalY[whichLvl][i]==editY){
                    grid[whichLvl] [NportalX [whichLvl] [i] ] [NportalY [whichLvl] [i] ]=0;
                    NportalX[whichLvl][i]=0;
                    NportalY[whichLvl][i]=0;
                    MportalX[whichLvl][i]=0;
                    MportalY[whichLvl][i]=0;
                }
            }
        }
        grid[whichLvl][editX][editY]=selectedBlock;
        respawn();
    }
};
