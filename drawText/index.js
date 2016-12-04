/**
 * Created by Islam on 04.12.2016.
 */

module.exports = function drawText(canvas, text, x, y, params){
	params = params || {};
	var ctx = canvas.getContext('2d');
	ctx.save();

	ctx.fillStyle = params.color || 'white';
	ctx.shadowBlur = params.shadowBlur == 0 ? 0 : (params.shadowBlur || 5);
	ctx.shadowColor = params.shadowColor || 'black';
	ctx.globalAlpha = params.alpha || 1;
	params.size = params.size || 15;

	do{
		ctx.font = (params.italic ? 'italic ' : '') + (params.bold ? 'bold ' : '') + params.size + 'px ' + (params.fontFamily || 'Ubuntu, sans-serif');
		params.size -= 1;
	}while(params.size > 1 && params.maxWidth && ctx.measureText(text).width > params.maxWidth);
	params.size++;

	var w = ctx.measureText(text).width;

	if(params.centered){
		x = x - w/2;
	}
	if(params.halign == 'right'){
		x = canvas.width - w - x;
	}
	if(params.valign == 'bottom'){
		y = canvas.height - y;
	}

	if(!params.onlyMeasure)
		ctx.fillText(text, x, y);

	var textParams = {
		width: ctx.measureText(text).width,
		fontSize: params.size
	};
	ctx.restore();
	return textParams;
};