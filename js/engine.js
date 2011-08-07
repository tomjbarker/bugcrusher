var engine = function(){
	bugList = [];
	cols = 10;
	boxWidth = 10;
	boxHeight = 10;
	openColor = "rgb(150,0,0)";
	closedColor = "rgb(0,150,0)";
	pendingColor = "rgb(255,165,0)";
	bugTxtDiv = document.getElementById("bugInfo");
	grid_canvas = document.getElementById("screen");
	if (grid_canvas.getContext){
		grid = grid_canvas.getContext("2d");		
	}else{
		alert("canvas is not supported");
	}
	
return {
		
	bugRoll:function(e){
		xCoord = e.clientX;
		yCoord = e.clientY;
		for(x=0;x<this.bugList.length;x++){
			if((xCoord >= this.bugList[x].x) && (xCoord < this.bugList[x].x + 12) && (yCoord >= this.bugList[x].y+10) && (yCoord < this.bugList[x].y + 22)){
				floatTxt = this.bugList[x].id +": " +this.bugList[x].description + "<br/><strong>assigned to: " + this.bugList[x].assignedTo +"</strong>"
				bugTxtDiv.innerHTML = floatTxt;
			}
		}
	},
	
	drawGrid:function(data){
		this.bugList = data.bugList;
		var xOff = 0;
		var yOff = 0;
		var currentBoxColor = closedColor;
		for(x=0;x<this.bugList.length;x++){
			currentBoxColor = this.determineBoxColor(this.bugList[x]);
			this.drawSquare(xOff,yOff, boxWidth, boxHeight, currentBoxColor);
			this.bugList[x].x = xOff;
			this.bugList[x].y = yOff;
			xOff += boxWidth + 2;
			if((x != 0) && (x % cols) == 0){
				yOff += boxHeight + 2;
				xOff = 0;
			}
		}
	},
	
	determineBoxColor:function(currentBug){
		if((currentBug.status == "Open") || (currentBug.status == "Re-Opened")){
			retColor = openColor;
		}else if ((currentBug.status == "Fixed") || (currentBug.status == "Pending Retest") || (currentBug.status == "Pending Reject")){
			retColor = pendingColor;
		}else{
			retColor = closedColor;
		}
	return retColor;
	},
	
	drawSquare:function(x,y,w,h,color){
		grid.fillStyle = color;
		grid.fillRect(x,y,w,h);
	}
}
}();