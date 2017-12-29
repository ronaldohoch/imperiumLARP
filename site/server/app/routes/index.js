module.exports = function(app){
	var controller = app.controllers.index;
	var text = app.controllers.texts;
	app.get('/index',controller.index);
	app.get('/',controller.index);
	app.post('/texts',text.texts);
}