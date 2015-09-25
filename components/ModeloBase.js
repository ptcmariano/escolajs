module.exports = function(DbModel) {
    var camposAtualizaveis = [];

    function Instancia(dbInstancia) {
        this.dbInstancia = dbInstancia;
    }

    Instancia.prototype.salvarAlteracoes = function(alteracoes) {
        return this.dbInstancia.updateAttributes(alteracoes);
    };

    Instancia.prototype.excluirInstancia = function() {
        return this.dbInstancia.destroy();
    };

    Instancia.prototype.toJSON = function() {
        return this.dbInstancia.toJSON();
    };

    var Modelo = {};

    Modelo.criarInstancia = function(dbInstancia) {
        return new Instancia(dbInstancia);
    };

    Modelo.obterPorId = function(id) {
        return DbModel.findById(id)
            .then(Modelo.criarInstancia);
    };

    Modelo.definirCamposAtualizaveis = function(campos) {
        camposAtualizaveis = campos;
    };

    Modelo.novaInstancia = function(dados) {
        return DbModel.create(dados,
            {
                fields: camposAtualizaveis
            })
            .then(Modelo.criarInstancia);
    };

    Modelo.listarInstancias = function() {
        return DbModel.findAll()
            .then(function(instancias) {
                return instancias.map(Modelo.criarInstancia);
            });
    };

    Modelo.truncar = function() {
        return DbModel.destroy({truncate: true});
    };

    return Modelo;
};