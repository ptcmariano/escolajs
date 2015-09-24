exports.sequelizeError = function(err, req, res, next) {
	var error = {};
	if (err.name === "SequelizeUniqueConstraintError") 
		error.nome = "ErroChaveUnica";
	else if (err.name === "SequelizeValidationError") 
		error.nome = "ErroValidacao";
	else return res.json(err);
			
	var erros = [];	
	err.errors.forEach(function(erro) {
		erros.push({
			campo: erro.path,
			tipo: erro.type,
			valor: erro.value
		})
	})	
	error.erros = erros;
	res.json(error);		
}