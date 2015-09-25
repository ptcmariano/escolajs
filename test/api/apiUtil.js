
exports.criarJsonPost = function(url, dataToSend, statusExpected) {
    return request(express).post(url)
        .send(dataToSend)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(statusExpected);
};

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