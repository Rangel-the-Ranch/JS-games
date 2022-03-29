"use strict";
var grid=[];
var sizeX=50,sizeY=50;
var blockSize=10,gaps=0;
var myX=0,myY=0;
var direction;
var amIout=false;
var goRight=[],goDown=[];
var enemySpeed=1;
var point=0,goal=0;
var totalPoints;
var end=false;
for(var x=0;x<sizeX;x=x+1){
    grid[x]=[];
    for(var y=0;y<sizeY;y=y+1){
        grid[x][y]=0;
    }
}
var enemyX=[],enemyY=[];
var numberOfEnemy=0;

start();
function start(){
    myX=0;
    myY=0;
    end=false;
    totalPoints=0;
    point=0;
    totalPoints=0;
    goal=((sizeX-2)*(sizeY-2))/2*10;
    numberOfEnemy=1;
    for(var i=0;i<numberOfEnemy;i=i+1){
        enemyX[i]=Math.floor(Math.random()*(sizeX-2)+1);
        enemyY[i]=Math.floor(Math.random()*(sizeY-2)+1);
        goRight[i]=Math.floor(Math.random()*2);
        goDown[i]=Math.floor(Math.random()*2);
        if(goDown[i]==1){
            goDown[i]=enemySpeed;
        }
        if(goRight[i]==1){
            goRight[i]=enemySpeed;
        }
        if(goDown[i]==0){
            goDown[i]=-enemySpeed;
        }
        if(goRight[i]==0){
            goRight[i]=-enemySpeed;
        }
    }
    for(var x=0;x<sizeX;x=x+1){
        for(var y=0;y<sizeY;y=y+1){
            grid[x][y]=0;
            if(x==0 || x==sizeX-1){
                grid[x][y]=1;
            }
            if(y==0 || y==sizeY-1){
                grid[x][y]=1;
            }
        }
    }
}
function update() {
    for(var i=0;i<numberOfEnemy;i=i+1){
        if(grid[enemyX[i]-1][enemyY[i]]==1){
            goRight[i]=enemySpeed;
        }
        if(grid[enemyX[i]+1][enemyY[i]]==1){
            goRight[i]=-enemySpeed;
        }
        if(grid[enemyX[i]][enemyY[i]+1]==1){
            goDown[i]=-enemySpeed;
        }
        if(grid[enemyX[i]][enemyY[i]-1]==1){
            goDown[i]=enemySpeed;
        }
        enemyX[i]=enemyX[i]+goRight[i];
        enemyY[i]=enemyY[i]+goDown[i];
        if(myX==enemyX[i] && myY==enemyY[i]){
            console.log("dead");
            dead();
        }
        if(grid[enemyX[i]][enemyY[i]]==2){
            console.log("dead")
            dead();
        }
    }
    if(end==false){
        if(isKeyPressed[37] || isKeyPressed[65]){
            direction=0;
            //myX=myX-1;
            if(myX-1<0){
                myX=0;
                direction=-1;
            }
        }
        if(isKeyPressed[38] || isKeyPressed[87]){
            direction=1;
            //myY=myY-1;
            if(myY-1<0){
                myY=0;
                direction=-1;
            }
        }
        if(isKeyPressed[39] || isKeyPressed[68]){
            direction=2;
            //myX=myX+1;
            if(myX+1>sizeX-1){
                myX=sizeX-1;
                direction=-1;
            }
        }
        if(isKeyPressed[40] || isKeyPressed[83]){
            direction=3
            //myY=myY+1;
            if(myY+1>sizeY-1){
                myY=sizeY-1;
                direction=-1;
            }
        }
        if(direction==0){
            myX=myX-1;
        }
        if(direction==1){
            myY=myY-1;
        }
        if(direction==2){
            myX=myX+1;
        }
        if(direction==3){
            myY=myY+1;
        }
        direction=-1;
    }
    if(grid[myX][myY]!=1){
        amIout=true;
        grid[myX][myY]=2;
    }
    if(amIout==true && grid[myX][myY]==1){
        amIout=false;
        for(var x=0;x<sizeX;x=x+1){
            for(var y=0;y<sizeY;y=y+1){
                if(grid[x][y]==2){
                    grid[x][y]=1;
                    point=point+10;
                }
            }
        }
        for(var i=0;i<numberOfEnemy;i=i+1){
            bfs(enemyX[i],enemyY[i]);
        }
        for(var x=0;x<sizeX;x=x+1){
            for(var y=0;y<sizeY;y=y+1){
                if(grid[x][y]==0){
                    grid[x][y]=1;
                    point=point+10;
                }
            }
        }
        for(var x=0;x<sizeX;x=x+1){
            for(var y=0;y<sizeY;y=y+1){
                if(grid[x][y]==3){
                    grid[x][y]=0;
                }
            }
        }
    }
    if(point>=goal){
        nextLvl();
    }
};
function dead(){
    totalPoints=totalPoints+point;
    goal=100000;
    end=true;
    for(var x=0;x<sizeX;x=x+1){
        for(var y=0;y<sizeY;y=y+1){
            if(grid[x][y]==2){
                grid[x][y]=0;
            }
        }
    }
    for(var i=0;i<numberOfEnemy;i=i+1){
        goDown[i]=0;
        goRight[i]=0;
    }
    
}
function nextLvl(){
    myX=0;
    myY=0;
    totalPoints=totalPoints+1;
    point=0;
    numberOfEnemy=numberOfEnemy+1;
    for(var i=0;i<numberOfEnemy;i=i+1){
        enemyX[i]=Math.floor(Math.random()*(sizeX-2)+1);
        enemyY[i]=Math.floor(Math.random()*(sizeY-2)+1);
        goRight[i]=Math.floor(Math.random()*2);
        goDown[i]=Math.floor(Math.random()*2);
        if(goDown[i]==1){
            goDown[i]=enemySpeed;
        }
        if(goRight[i]==1){
            goRight[i]=enemySpeed;
        }
        if(goDown[i]==0){
            goDown[i]=-enemySpeed;
        }
        if(goRight[i]==0){
            goRight[i]=-enemySpeed;
        }
    }
    for(var x=0;x<sizeX;x=x+1){
        for(var y=0;y<sizeY;y=y+1){
            grid[x][y]=0;
            if(x==0 || x==sizeX-1){
                grid[x][y]=1;
            }
            if(y==0 || y==sizeY-1){
                grid[x][y]=1;
            }
        }
    }
}
function bfs(n,m){
    grid[n][m]=3;
    if(grid[n-1][m]==0){
        grid[n-1][m]=3;
        bfs(n-1,m);
    }
    if(grid[n][m-1]==0){
        grid[n][m-1]=3;
        bfs(n,m-1);
    }
    if(grid[n+1][m]==0){
        grid[n+1][m]=3;
        bfs(n+1,m);
    }
    if(grid[n][m+1]==0){
        grid[n][m+1]=3;
        bfs(n,m+1);
    }
}
function draw() {
    for(x=0;x<sizeX;x=x+1){
        for(y=0;y<sizeY;y=y+1){
            if(grid[x][y]==0){
                context.fillStyle="black";
            }
            if(grid[x][y]==1){
                context.fillStyle="blue";
            }
            if(grid[x][y]==2){
                context.fillStyle="lightblue";
            }
            if(grid[x][y]==3){
                context.fillStyle="lightgreen";
            }
            context.fillRect(x*blockSize,y*blockSize,blockSize-gaps,blockSize-gaps);
        }
    }
    context.fillStyle="lightgreen";
    context.fillRect(myX*blockSize,myY*blockSize,blockSize-gaps,blockSize-gaps);
    for(var i=0;i<numberOfEnemy;i=i+1){
        context.fillStyle="red";
        context.fillRect(enemyX[i]*blockSize,enemyY[i]*blockSize,blockSize-gaps,blockSize-gaps);
    }
    if(end==true){
        context.fillStyle="red";
        context.font="200px Geogia";
        context.fillText("Game Over",0,300)
        context.font="50px Geogia";
        context.fillText("total:"+totalPoints+" points",300,400)
        context.fillText("press R to restart",300,450)
    }
};
function keydown(key) {
    //console.log("Pressed", key);
    if(key==82){
        start();
    }

};
function mouseup() {
    //console.log("Mouse clicked at", mouseX, mouseY);
};
