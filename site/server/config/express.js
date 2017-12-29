var express = require("express"),
	swig = require("swig"),
	path = require("path"),
	bodyParser = require('body-parser'),
	load = require("express-load");

module.exports = function(){
	var app = express();

	//configura a porta do servidor
	app.set("port",process.env.PORT || 3100);
	//middleware para arquivos estáticos
	app.use(express.static("public"));
	//to support JSON-encoded bodies
	app.use( bodyParser.json() );
	app.use(function (req, res, next) {
		next();
	})
	//Aqui é onde o Swig faz as magias negras!
	app.engine("html",swig.renderFile);
	app.set("view engine","html");
	app.set("views",path.join(__dirname + "/../app/views"));
	//Desabilita o cache do express
	app.set("view cache",false);
	//E habilita o cache do swig(PRD)
	// swig.setDefaults({cache:'memory'});
	swig.setDefaults({cache:false});
	//cwd:Substitui a pasta padrão que é a "." para "./app"
	load("models",{cwd:"server/app"})
		.then("controllers")
		.then("routes")
		.into(app);

	return app;
}