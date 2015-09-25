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

    Instancia.prototype.get = function(campo) {
        return this.dbInstancia.get(campo);
    };

    Instancia.prototype.set = function(campo, valor) {
        return this.dbInstancia.set(campo, valor);
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

    Modelo.estenderInstancia = function(nome, metodo) {
        Instancia.prototype[nome] = metodo;
    };

    return Modelo;
};