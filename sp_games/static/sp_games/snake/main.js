$(document).ready(function () {
	$('.snake_canvas').each(function(i, cnv){
			cnv.id = 'snake_canvas' + i;
			new p5(snake_game, 'snake_canvas' + i);
		});
});


function snake_game(p){
	var size = 20;
	var userNode = p._userNode;
	var player;
	var foods;
	var key_queue = []

	p.setup = function(){
		var cnvNodeW = (p.floor($('#'+userNode).width()/size)-1) * size;
		var cnvNodeH = (p.floor($('#'+userNode).height()/size)-1) * size;
		console.log('screen size is', cnvNodeW, cnvNodeH);
		p.createCanvas(cnvNodeW, cnvNodeH);
		p.background(0);
		p.restart();
		p.frameRate(10);
	};
	
	p.windowResized = function(){
		var cnvNodeW = (p.floor($('#'+userNode).width()/size)-1) * size;
		var cnvNodeH = (p.floor($('#'+userNode).height()/size)-1) * size;
		console.log('screen size is', cnvNodeW, cnvNodeH);
		p.resizeCanvas(cnvNodeW, cnvNodeH);
		p.background(0);
	};

	p.draw = function(){
		p.background(0);
		p.fill(0)

		if(foods.length < 2){
			p.addFood()
			p.addFood()
			p.addFood()
		}

		for (fi in foods){
			var f = foods[fi]; 
			f.draw();
		}
		try{
			player.update(foods, key_queue.splice(0,1));
		} catch(e){
			p.textSize(32);
			p.fill(255);
			p.text("Game Over", p.width/2, p.height/2)
			p.noLoop();
			setTimeout(function(){
				p.restart();
				p.loop();
			}, 3000);
		}
		player.draw();
	}

	p.restart = function(){
		
		var x = p.floor((p.width/2)/size);
		var y = p.floor((p.height/2)/size);
		var d = p.floor(p.random(1,5)); // 1 = down, 2 = right, 3 = up, 4 = left
		x = x * size;
		y = y * size;
		player = new Player(p, x,y,size, d);

		foods = [];
		p.addFood();
		p.addFood();
		p.addFood();
	}

	p.addFood = function(){
		while (true){
			var x = p.floor(p.random(0, p.width/size));
			var y = p.floor(p.random(0, p.height/size));
			x = x * size;
			y = y * size;
			foods.push(new Block(p,x,y, size, true)); 
			break;
		}
	}

	p.keyPressed = function(){
		key_queue.push(p.key);
	}

}
		


