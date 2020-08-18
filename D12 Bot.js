function updateStat(curr,hp,orb){
	hpVar = [5,-500,-25,0];
	orbVar = [-5,0,1,0];

	return [hp+hpVar[curr-1], orb+orbVar[curr-1]];
}

function updateMap(fieldX,x,y){
	field = []
	for(var i=0;i<3;i++){
		field.push(Array.from(fieldX[i]));
	}
	for (var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(i==y && j==x) continue;
			field[i][j] = field[i][j]<4 ? field[i][j]+1 : 1;
		}
	}
	return Array.from(field);
}

function executeMap(field,hp,moves){

	x=1;
	y=1;
	orb=0;

	for(var j=0;j<3;j++){
		tempMap = Array.from(field[j]);
		if(y==j) {
			tempMap[x]=0;
		}
		console.log(tempMap);
	}

	for (var i=0;i<moves.length;i++){
		if ("left"==moves[i]) x-=1;
		if ("right"==moves[i]) x+=1;
		if ("up"==moves[i]) y-=1;
		if ("down"==moves[i]) y+=1;
		field=updateMap(field,x,y);
		orb=updateStat(field[y][x],hp,orb)[1];
		orb = orb<0 ? 0 : orb;
		hp-=30;
		hp=updateStat(field[y][x],hp,orb)[0];
		console.log(hp);
		console.log(orb);
		for(var j=0;j<3;j++){
			tempMap = Array.from(field[j]);
			if(y==j) {
				tempMap[x]=0;
			}
			console.log(tempMap);
		}
	}
}

var answer = [];
var recursionCount = 0;

function doDungeon(field,hp,orb,x,y,tempAnswer){
	// if(recursionCount>100000) return;
	if (x<0 || y<0 || x>2 || y>2) return;
	if ((hp/55 + orb) < 10) return;
	if (tempAnswer.length>answer.length && answer.length!=0) return;
	hp-=30;
	if (hp<=0) return;
	
	updateStatResult = updateStat(field[y][x],hp,orb);
	hp = updateStatResult[0];
	orb = updateStatResult[1];
	if (orb>10) orb = 10;
	if (orb<0) orb = 0;

	if (orb==10 && field[y][x]==4){
		if (answer.length == 0 || tempAnswer.length<answer.length){
			answer = Array.from(tempAnswer)
		}
	}
	recursionCount+=1;

	doDungeon(Array.from(updateMap(Array.from(field),x-1,y)),hp,orb,x-1,y,tempAnswer.concat(["left"]));
	doDungeon(Array.from(updateMap(Array.from(field),x+1,y)),hp,orb,x+1,y,tempAnswer.concat(["right"]));
	doDungeon(Array.from(updateMap(Array.from(field),x,y-1)),hp,orb,x,y-1,tempAnswer.concat(["up"]));
	doDungeon(Array.from(updateMap(Array.from(field),x,y+1)),hp,orb,x,y+1,tempAnswer.concat(["down"]));
}

// var map = [[2,1,3],[1,4,4],[2,2,1]];

// doDungeon([[2,1,3],[1,4,4],[2,2,1]],1000,0,1,1,[],[]);
// executeMap(map,1000,answer)

function getAnswer(){
	//get map
	map = []
	for(var i=0;i<3;i++){
		tempMap = []
		for(var j=0;j<3;j++) tempMap.push(parseInt(document.getElementById(String(i)+"-"+String(j)).value));
		map.push(tempMap)
	}
	//get hp
	hp=parseInt(document.getElementById("HP").value);
	console.log(hp);
	console.log(map);
	//do dungeon
	doDungeon(map,hp,0,1,1,[]);
	// document.getElementById("answer").innerText=answer;
	//print result
	for(var i=0;i<answer.length;i++) document.getElementById("answer").innerText+=answer[i]+", "
}


