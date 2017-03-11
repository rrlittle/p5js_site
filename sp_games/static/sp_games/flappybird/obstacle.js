function Obstacle(cnv, hole, botheight, width){
	this.cnv = cnv;
	this.hole = hole;
	this.botheight = botheight;
	this.width = width;
	this.x = cnv.width;

	this.update = function(spd){
		this.x -= spd;
	}

	this.draw = function(){
		this.cnv.rect(this.x, 0, 
			this.width, 
			this.cnv.height - this.botheight - this.hole
		);
		this.cnv.rect(this.x, this.cnv.height - this.botheight, 
			this.width,
			this.botheight
		);
	}
}