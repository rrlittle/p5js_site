$(document).ready(function () {
	$('.flappybird_canvas').each(function(i, cnv){
		cnv.id = 'flappybird_canvas' + i;
		new p5(flappybird_game, 'flappybird_canvas' + i);
	});
});


function flappybird_game(p){
	var userNode = p._userNode;
	var b;
	var gravity = .6;
	var flapforce = -10;
	var scrollspeed = 2;
	var obstacles;
	var space = 0;
	p.setup = function(){
		var cnvNodeW = p.floor($('#'+userNode).width());
		var cnvNodeH = p.floor($('#'+userNode).height());
		console.log('screen size is', cnvNodeW, cnvNodeH);
		p.createCanvas(cnvNodeW, cnvNodeH);
		p.background(51);
		b = new Bird(p, 50, 10);
		obstacles = [];
	};
	
	p.windowResized = function(){
		var cnvNodeW = $('#'+userNode).width();
		var cnvNodeH = $('#'+userNode).height();
		console.log('screen size is', cnvNodeW, cnvNodeH);
		p.resizeCanvas(cnvNodeW, cnvNodeH);
		p.background(51);
	};

	p.draw = function(){
		p.addObstacleOrNot();
		p.background(51);
		b.addForce(gravity);
		for (var i = obstacles.length - 1; i >= 0; i--) {
			obstacles[i].update(scrollspeed);
			obstacles[i].draw();
			if (obstacles[i].x < -obstacles[i].width){
				obstacles.splice(i,1);
			}
		}
		
		b.update();
		b.draw();
	}

	document.addEventListener('keydown',function(){
		b.addForce(flapforce);
	});

	p.addObstacleOrNot = function(){
		console.log()
		if (space < 0){
			space = p.addObstacle() + p.random(50,800);
		}
		else{
			space -= scrollspeed;
		}
	}

	p.addObstacle = function(){
		var hole = p.random(30, p.height/2);
		var botheight = p.random(0, p.height - hole);
		var width = p.random(10,75);
		obstacles.push(new Obstacle(p, hole, botheight, width));
		return width;
	}

}