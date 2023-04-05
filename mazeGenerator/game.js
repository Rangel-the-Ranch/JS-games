var grid=[];
var maxDuljina=25 ,maxShurina=35;
for(var i=-10;i<=maxDuljina;i++){
	grid[i]=[];
}
for(var i=0;i<maxDuljina;i++){
	for(var j=0;j<maxShurina;j++){
		grid[i][j]="red";
	}
}
var speed=10;
var skorostX=0,skorostY=0;;
var chovekX=400,chovekY=300;
var cameraX=0,cameraY=0;
var kolkoKletkiKletki=0;
var neshtaX=[],neshtaY=[];
var otKudePochvam=1;
var razmerNaKletka=25;
var raztoqnieMejduKletki=0.5;
var daImaLiVreme=true;
var kudeEchovekaX,kudeEchovekaY,poletoE;

//
const spawnDelay = 5;
//

function dfs(a,b){
	grid[a][b]="blue";
	neshtaX[neshtaX.length]=a;
	neshtaY[neshtaY.length]=b;
	kolkoKletkiKletki++;
	var rand=Math.floor(Math.random()*4);
    if(rand==0){
			if(grid[a][b+1]!="blue" ){
				if(a>=0 && b<maxShurina && b>=0 && a<maxDuljina){
					if(grid[a][b+2]!="blue" && grid[a+1][b+1]!="blue" && grid[a-1][b+1]!="blue"){
						dfs(a,b+1);
					}
				}
			}
			if(grid[a][b-1]!="blue"){
				if(a>=0 && b<maxShurina+1 && b>=1 && a<maxDuljina){
					if(grid[a-1][b-1]!="blue" && grid[a+1][b-1]!="blue" && grid[a][b-2]!="blue"){
						dfs(a,b-1);
					}
				}
			}
			if(grid[a+1][b]!="blue") {
				if(a>=0 && b<maxShurina+1 && b>=0 && a<maxDuljina-1){	
					if(grid[a+2][b]!="blue" && grid[a+1][b+1]!="blue" && grid[a+1][b-1]!="blue"){
						dfs(a+1,b);
					}
				}
			}
			if(grid[a-1][b]!="blue"){
				if(a>=1 && b<maxShurina+1 && b>=0 && a<maxDuljina){		
					if(grid[a-2][b]!="blue" && grid[a-1][b+1]!="blue" && grid[a-1][b-1]!="blue"){
						dfs(a-1,b);	
					}
				}
			}
		}
    if(rand==1){
			if(grid[a+1][b]!="blue") {
				if(a>=0 && b<maxShurina+1 && b>=0 && a<maxDuljina-1){	
					if(grid[a+2][b]!="blue" && grid[a+1][b+1]!="blue" && grid[a+1][b-1]!="blue"){
						dfs(a+1,b);
					}
				}
			}
			if(grid[a-1][b]!="blue"){
				if(a>=1 && b<maxShurina+1 && b>=0 && a<maxDuljina){		
					if(grid[a-2][b]!="blue" && grid[a-1][b+1]!="blue" && grid[a-1][b-1]!="blue"){
						dfs(a-1,b);	
					}
				}
			}

			if(grid[a][b-1]!="blue"){
				if(a>=0 && b<maxShurina+1 && b>=1 && a<maxDuljina){
					if(grid[a-1][b-1]!="blue" && grid[a+1][b-1]!="blue" && grid[a][b-2]!="blue"){
						dfs(a,b-1);
					}
				}
			}
			if(grid[a][b+1]!="blue"){
				if(a>=0 && b<maxShurina && b>=0 && a<maxDuljina){
					if(grid[a][b+2]!="blue" && grid[a+1][b+1]!="blue" && grid[a-1][b+1]!="blue"){
						dfs(a,b+1);
					}
				}
			}
		}
    if(rand==2){
			if(grid[a-1][b]!="blue"){
				if(a>=1 && b<maxShurina+1 && b>=0 && a<maxDuljina){		
					if(grid[a-2][b]!="blue" && grid[a-1][b+1]!="blue" && grid[a-1][b-1]!="blue"){
						dfs(a-1,b);	
					}
				}
			}
			if(grid[a][b+1]!="blue"){
				if(a>=0 && b<maxShurina && b>=0 && a<maxDuljina){
					if(grid[a][b+2]!="blue" && grid[a+1][b+1]!="blue" && grid[a-1][b+1]!="blue"){
						dfs(a,b+1);
					}
				}
			}

			if(grid[a+1][b]!="blue") {
				if(a>=0 && b<maxShurina+1 && b>=0 && a<maxDuljina-1){	
					if(grid[a+2][b]!="blue" && grid[a+1][b+1]!="blue" && grid[a+1][b-1]!="blue"){
						dfs(a+1,b);
					}
				}
			}
			if(grid[a][b-1]!="blue"){
				if(a>=0 && b<maxShurina+1 && b>=1 && a<maxDuljina){
					if(grid[a-1][b-1]!="blue" && grid[a+1][b-1]!="blue" && grid[a][b-2]!="blue"){
						dfs(a,b-1);
					}
				}
			}
		}
    if(rand==3){
			if(grid[a][b+1]!="blue"){
				if(a>=0 && b<maxShurina && b>=0 && a<maxDuljina){
					if(grid[a][b+2]!="blue" && grid[a+1][b+1]!="blue" && grid[a-1][b+1]!="blue"){
						dfs(a,b+1);
					}
				}
			}
			if(grid[a-1][b]!="blue"){
				if(a>=1 && b<maxShurina+1 && b>=0 && a<maxDuljina){		
					if(grid[a-2][b]!="blue" && grid[a-1][b+1]!="blue" && grid[a-1][b-1]!="blue"){
						dfs(a-1,b);	
					}
				}
			}
			if(grid[a][b-1]!="blue"){
				if(a>=0 && b<maxShurina+1 && b>=1 && a<maxDuljina){
					if(grid[a-1][b-1]!="blue" && grid[a+1][b-1]!="blue" && grid[a][b-2]!="blue"){
						dfs(a,b-1);
					}
				}
			}
			if(grid[a+1][b]!="blue") {
				if(a>=0 && b<maxShurina+1 && b>=0 && a<maxDuljina-1){	
					if(grid[a+2][b]!="blue" && grid[a+1][b+1]!="blue" && grid[a+1][b-1]!="blue"){
						dfs(a+1,b);
					}
				}
			}
		}	
}
dfs(0,0);
//console.log(kolkoKletkiKletki);
var spawned=[];
for(var i=0;i<maxShurina*maxDuljina;i++){
	spawned[i]=false;
}
var kolkoKletkiKletkispawn=0;
var time=0;
function update(){
    kudeEchovekaX=Math.floor((cameraX+chovekX)/razmerNaKletka);
    kudeEchovekaY=Math.floor((cameraY+chovekY)/razmerNaKletka);
    
    poletoE=grid[kudeEchovekaX][kudeEchovekaY];
    //console.log(kudeEchovekaX,kudeEchovekaY,poletoE,grid[kudeEchovekaX][kudeEchovekaY]);
	time=time+1;
	//console.log(kolkoKletkiKletki);
	if(time%spawnDelay==0){
		spawned[kolkoKletkiKletkispawn]=true;
		kolkoKletkiKletkispawn++;
	}
    cameraX=cameraX+skorostX;
    cameraY=cameraY+skorostY;
}
function draw(){
    //context.fillStyle="black";
    //context.fillRect(-100,-100,10000,10000);
	for(var i=0;i<neshtaX.length;i++){
        if(daImaLiVreme==true){
            if(spawned[i]){
                context.fillStyle="black";
			     context.fillRect(neshtaY[i]*(razmerNaKletka+raztoqnieMejduKletki)+otKudePochvam-cameraX
                                  ,neshtaX[i]*(razmerNaKletka+raztoqnieMejduKletki)+otKudePochvam-cameraY
                                  ,razmerNaKletka
                                  ,razmerNaKletka);
		  }
        }else{
            context.fillStyle="black";
            context.fillRect(neshtaY[i]*(razmerNaKletka+raztoqnieMejduKletki)+otKudePochvam-cameraX
                            ,neshtaX[i]*(razmerNaKletka+raztoqnieMejduKletki)+otKudePochvam-cameraY
                            ,razmerNaKletka
                            ,razmerNaKletka);
        }
	}
    //context.fillStyle="red";
    //context.fillRect(chovekX,chovekY,razmerNaKletka/10,razmerNaKletka/10);
}
function keydown(key){
    if(key==38 || key==87){
        skorostY=-speed;
        for(var x=0;x<maxDuljina;x=x+1){
            for(var y=0;y<maxShurina;y=y+1){
                if(poletoE=='blue'){
                    skorostY=-speed;
                }
            }
        }
    }
    if(key==40 || key==83){
        skorostY=speed;
    }
    if(key==37 || key==65){
        skorostX=-speed;
    }
    if(key==39 || key==68){
        skorostX=speed;
    }
}
function keyup(key){
    if(key==38 || key==87){
        skorostY=0;
    }
    if(key==40 || key==83){
        skorostY=0;
    }
    if(key==37 || key==65){
        skorostX=0;
    }
    if(key==39 || key==68){
        skorostX=0;
    }
    
}