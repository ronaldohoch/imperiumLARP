module.exports = function(app){
	var controller = app.controllers.index;
	app.get("/index",controller.index);
	app.get("/",controller.index);
}