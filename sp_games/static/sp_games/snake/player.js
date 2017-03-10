function Player (cnv, x, y, size, dir){
	this.cnv = cnv;
	this.body = [];
	this.body.push(new Block(cnv, x, y, size, false));
	this.head = this.body[0];
	this.dir = dir; // 1=down, 2 = right, 3 = up, 4 = left 
	this.size = size;

	this.draw = function(){
		for (bi in this.body){
			var b = this.body[bi];
			b.draw();
		}
	}

	this.update = function(foods, keypress){
		var x = this.head.x;
		var y = this.head.y;
		
		// update the x/y pos of the head
		if (this.dir == 1){ y += this.head.size;}
		if (this.dir == 2){ x += this.head.size;}
		if (this.dir == 3){ y -= this.head.size;}
		if (this.dir == 4){ x -= this.head.size;}

		// detect body collisions
		if (this.contains(this.head.x, this.head.y, false)){
			console.log('body collision');
			throw 'end of game'
		}
		// detect edge issues raises 'end of game' if out of bounds
		if(x < 0){
			console.log('out of bounds', x,y);
			throw 'end of game'
		}
		if(x >= this.cnv.width){
			console.log('out of bounds', x,y);
			throw 'end of game'
		}
		if(y < 0){
			console.log('out of bounds', x,y);
			throw 'end of game'
		}
		if(y >= this.cnv.height){
			console.log('out of bounds', x,y);
			throw 'end of game'
		}

		console.log('found screen to be ', this.cnv.width, this.cnv.height);
		// place a new head at the updated head coords
		this.body.push(new Block(this.cnv, x, y, this.size, false));
		this.head = this.body[this.body.length-1]; // get the last body segment 
		// console.log(this.head);
		// i.e. the most recently created one

		// check if eaten food
		var eaten = false;
		for (fi in foods){
			var f = foods[fi];
			if (this.head.contains(f.x, f.y)){
				foods.splice(fi,1);
				eaten = true;
				break;
			}
		}

		if(!eaten){this.body.splice(0,1);}


		// update direction
		if ((keypress == 'D' || keypress == this.cnv.RIGHT) && this.dir != 4){ 
			this.dir = 2;
		}
		if ((keypress == 'S' || keypress == this.cnv.UP) && this.dir != 3){ 
			this.dir = 1;
		}
		if ((keypress == 'W' || keypress == this.cnv.DOWN) && this.dir != 1){ 
			this.dir = 3;
		}
		if ((keypress == 'A' || keypress == this.cnv.LEFT) && this.dir != 2){ 
			this.dir = 4;
		}
	}

	this.contains = function(x, y, includeHead){
		for (bi in this.body){
			var b = this.body[bi];
			if(b.contains(x,y)){  // if we have found a collision
				if(!includeHead){ // if we don't want to include the head
					// return true if it's not the head colliding
					if(bi != this.body.length-1){return true;} 
				}
				else{ // if we do want to include the head return true 
					//regardless of what body segment it is 
					return true;
				}
			}
		}
		// if no collisions found return false
		return false;
	}
}