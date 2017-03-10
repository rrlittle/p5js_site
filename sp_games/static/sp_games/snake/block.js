function Block(cnv, x, y, size, food){
	this.cnv = cnv;
	this.x = x;
	this.y = y;
	this.size = size;
	this.food = food;
	if (food){ 	this.c = cnv.color(240,20,40)}
	else { 		this.c = cnv.color(20,240,40)}

	this.draw = function(){
		this.cnv.fill(this.c);
		this.cnv.rect(this.x, this.y, this.size, this.size);
	}

	this.contains = function(x, y){
		return (x == this.x && y == this.y);
	}
}