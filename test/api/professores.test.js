var Professor = require('../../models/Professor');

function criarObjetoProfessor() {
    return {
        prontuario: '123456-0',
        nome: 'João',
        sobrenome: 'da Silva',
        email: 'joaodasilva@foo.bar'
    };
}

function verificarProfessorValido(res) {
    expect(res.body)
        .to.be.an('object')
        .and.to.have.all.keys(['id', 'prontuario', 'nome', 'sobrenome', 'email', 'createdAt', 'updatedAt']);
}

describe('/api/professores', function () {
    var dadosProfessor;

    beforeEach(function (done) {
        dadosProfessor = criarObjetoProfessor();
        Professor.truncar()
            .then(function () {
                done();
            }).catch(done);
    });

    context('Novo Professor', function () {
        it('Salvar professor e retornar instância salva.',
            function (done) {
                apiUtil.criarJsonPost('/api/professores', dadosProfessor, 200)
                    .expect(verificarProfessorValido)
                    .end(done);
            }
        );

        it('Retornar erro de validação quando o prontuário possuir um formato incorreto.',
            function (done) {
                dadosProfessor.prontuario = '12345678';

                apiUtil.criarJsonPost('/api/professores', dadosProfessor, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao'))
                    .end(done);
            }
        );

        it('Retornar erro de chave quando o prontuário for duplicado.',
            function (done) {

                apiUtil.criarJsonPost('/api/professores', dadosProfessor, 200)
                    .end(function (err, res) {
                    expect(err).to.be.equals(null);
                    apiUtil.criarJsonPost('/api/professores', dadosProfessor, 400)
                        .expect(apiUtil.verificarErroApi('ErroChaveUnica'))
                        .end(done);
                });
            }
        );

        it('Retornar erro de validação quando os campos não nulos não forem enviados.',
            function (done) {
                var professorEmBranco = {};

                apiUtil.criarJsonPost('/api/professores', professorEmBranco, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao', 4))
                    .end(done);
            }
        );

        it('Retornar erro de validação quando o nome ou sobrenome forem muito pequenos.',
            function (done) {
                dadosProfessor.nome = 'Jo';
                dadosProfessor.sobrenome = 'da';

                apiUtil.criarJsonPost('/api/professores', dadosProfessor, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao', 2))
                    .end(done);
            }
        );

        it('Retornar erro de validação quando o e-mail possuir um formato incorreto.',
            function (done) {
                dadosProfessor.email = 'joaodasilva@foo';

                apiUtil.criarJsonPost('/api/professores', dadosProfessor, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao', 1))
                    .end(done);
            }
        );

    });


});