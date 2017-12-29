module.exports = function(){
	var controller = {};
	controller.texts = function(req,res){
		res.status(200).json(req.body);
	};
	return controller;
}