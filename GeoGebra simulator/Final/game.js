var pointX = [], pointY = [];
var length = 0;
var end = false;
var numberOfWalls = 0;
var angle = 0;
var centerY = 0, centerX = 0;
var colorFinishedShape="lightgreen";
var markedColor="red";
var gridColor="grey";
var drawLineColor="black";
var apearAverige=false ,pointWight=5,avrSquareColor="blue";
var speedMoved=3.0;
MrMistJX
function PitagorTeory(Ax,Bx,Ay,By){
    return Math.sqrt((Bx - Ax) * (Bx - Ax)) + Math.sqrt()
}

function update() {
	for(var i = 0; i < length; i++){
		if(numberOfWalls % 2 == 1){
			if(isKeyPressed[65]){
				pointX[i] -= speedMoved;
			}
			if(isKeyPressed[68]){
				pointX[i] += speedMoved;
			}
			if(isKeyPressed[87]){
				pointY[i] -= speedMoved;
			}
			if(isKeyPressed[83]){
				pointY[i] += speedMoved;
			}
			if(isKeyPressed[81]){
				angle += 1/180*Math.PI;
				if(angle >= 360){
				angle = 0;
				}
			}
		}
	}
	if(end){
		for(var i = 0; i < length - 1; i++){
			centerX += pointX[i];
			centerY += pointY[i];
            apearAverige=true;
		}
		centerX = centerX / length;
		centerY = centerY / length;
	}
}
function draw() {
	context.beginPath();
	for(var i = 0; i < 100; i++){
		context.fillStyle = gridColor;
		context.fillRect(i*50,0,1,653);
		context.fillRect(0,i*50,1366,1);
	}
	for(var i = 0; i < length; i++){
		context
		if((pointX[i] - pointX[0]) * (pointX[i] - pointX[0]) + (pointY[i] - pointY[0]) * (pointY[i] - pointY[0]) <= 20 * 20 && i >= 1){		
			if(numberOfWalls % 2 == 1 && numberOfWalls != 0){
				context.strokeStyle = markedColor;
			}
			else{
				context.strokeStyle = drawLineColor;
			}
			context.lineTo(pointX[0], pointY[0]);
			end = true;
			context.fillStyle = colorFinishedShape;
			context.fill();
		}
		else{ 
			if(isKeyPressed[81]){
				context.lineTo(centerX + Math.cos(angle / 180.0 * Math.PI) * 5,centerY + Math.sin(angle / 180.0 * Math.PI) * 5)
			}
			else{
				context.lineTo(pointX[i],pointY[i])
			}
		}
		context.lineWidth = 2;
		context.stroke();
	}
	context.closePath();
	if(!end){
		context.beginPath();
		context.moveTo(pointX[length - 1], pointY[length - 1]);
		context.lineTo(mouseX, mouseY);
		context.closePath();
		context.strokeStyle = drawLineColor;
		context.stroke();
	}
	context.fillStyle = avrSquareColor;
    if(apearAverige==true){
	   context.fillRect(centerX-pointWight/2, centerY-pointWight/2, pointWight,pointWight);
    }
	
}

function keyup(key) {
	console.log("Pressed", key)
}
    
function mouseup() {
	numberOfWalls = 0;
	console.log("Mouse clicked at", mouseX, mouseY);
    
    
	if(!end){
		pointX[length] = mouseX;
		pointY[length] = mouseY;
		length++;
	}else{
		for(var i = 0; i < length;i++){
			if(pointY[i] > pointY[i - 1]){
				if(mouseY < pointY[i] && mouseY > pointY[i - 1]){	
					if(((pointX[i] + mouseX) * (pointY[i] - mouseY)) + (mouseX + pointX[i - 1]) * (mouseY - pointY[i - 1]) + (pointX[i - 1] + pointX[i]) * (pointY[i - 1] - pointY[i]) < 0){
						numberOfWalls++;
					}
				}
			}else{
                
				if(mouseY > pointY[i] && mouseY < pointY[i - 1]){
					if((pointX[i - 1] + mouseX) * (pointY[i - 1] - mouseY) + (mouseX + pointX[i]) * (mouseY - pointY[i]) + (pointX[i] + pointX[i - 1]) * (pointY[i] - pointY[i - 1]) < 0){
						numberOfWalls++;
					}
				}
			}
		}
	}
}