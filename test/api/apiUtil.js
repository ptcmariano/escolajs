
exports.criarJsonPost = function(url, dataToSend, statusExpected, resCallback) {
    return request(express).post(url)
        .send(dataToSend)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(statusExpected);        
};

exports.verificaErroCampo = function(nomeCampo) {
    return function(res) {
        expect(res.body)
            .to.be.an('object')
            .to.contain.all.keys(['nome', 'erros'])
            .and.to.contains.property('erros')
            .that.is.an('array')
            .with.deep.property('[0]')
            .that.contains.property('campo')
            .that.is.equal(nomeCampo);           
    }
}

exports.verificarErroApi = function(nomeErro, qtdErros) {
    return function(res) {
        expect(res.body)
            .to.be.an('object')
            .to.contain.all.keys(['nome', 'erros'])
            .and.to.have.property('nome')
            .that.is.equals(nomeErro);

        if (qtdErros === undefined) {
            expect(res.body.erros)
                .to.be.an('array')
                .and.to.have.length.above(0);
        } else {
            expect(res.body.erros)
                .to.be.an('array')
                .and.to.have.length(qtdErros);
        }
    }
};