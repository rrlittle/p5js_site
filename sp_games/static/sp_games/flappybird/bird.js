function Bird(cnv, x, size){
	this.x = x;
	this.y = cnv.height/2;
	this.cnv = cnv;
	this.size = size;
	this.vel = 0;
	this.acc = 0;

	this.addForce = function(f){
		this.acc += f;
	}
	this.update = function(){
		// console.log(this.acc);
		this.y += this.vel;
		this.vel += this.acc;
		this.acc = 0;
		if (this.y > this.cnv.height){
			this.y = this.cnv.height;
			this.vl = 0;
		}
		if (this.y < 0){ 
			this.y = 0;
			this.vel = 0;
		}
	}
	this.draw = function(){
		this.cnv.ellipse(this.x,this.y, this.size, this.size);
	}

}