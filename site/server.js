var http = require("http"),
	app = require("./server/config/express")();

http.createServer(app).listen(app.get("port"),function(){
	console.log("ImperiumLARP em: "+app.get("port"));
});