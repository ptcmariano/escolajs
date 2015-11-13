var sequelize = require('../../config/sequelize').getSequelize(),
    Professor = sequelize.model('Professor');

function criarObjetoProfessor() {
    return {
        prontuario: '12345-0',
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

describe('API Professores', function () {

    beforeEach(function (done) {
        Professor.destroy({truncate: true})
            .finally(done);
    });

    describe('Métodos CRUD', function () {
        it('Novo Professor', function (done) {
            request(express)
                .post('/api/professores')
                .send(criarObjetoProfessor())
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(verificarProfessorValido)
                .end(done);
        });

        it('Exibir Professor', function (done) {
            Professor.create(criarObjetoProfessor())
                .then(function (professor) {
                    request(express)
                        .get('/api/professores/' + professor.get('id'))
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(verificarProfessorValido)
                        .end(done)
                })
                .catch(done);
        });

        it('Editar Professor', function (done) {
            Professor.create(criarObjetoProfessor())
                .then(function (professor) {
                    request(express)
                        .put('/api/professores/' + professor.get('id'))
                        .send({email: 'outro@foo.bar'})
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(verificarProfessorValido)
                        .expect(function (res) {
                            expect(res.body.email)
                                .to.be.equal('outro@foo.bar');
                        })
                        .end(done)
                })
                .catch(done);
        });

        it('Excluir Professor', function (done) {
            Professor.create(criarObjetoProfessor())
                .then(function (professor) {
                    request(express)
                        .delete('/api/professores/' + professor.get('id'))
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(function (res) {
                            expect(res.body)
                                .to.be.true;
                        })
                        .end(done)
                })
                .catch(done);
        });

        it('Listar Professores', function (done) {
            Professor.create(criarObjetoProfessor())
                .then(function (professor) {
                    request(express)
                        .get('/api/professores')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(function (res) {
                            expect(res.body)
                                .to.be.an('array')
                                .and.have.length(1);
                        })
                        .end(done)
                })
                .catch(done);
        });
    });

    describe('Validação', function () {
        it('Retornar erro de validação quando o prontuário possuir um formato incorreto.',
            function (done) {
                var dadosProfessor = criarObjetoProfessor();
                dadosProfessor.prontuario = '12345678';

                apiUtil.criarJsonPost('/api/professores', dadosProfessor, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao'))
                    .end(done);
            }
        );

        it('Retornar erro de chave quando o prontuário for duplicado.',
            function (done) {
                var dadosProfessor = criarObjetoProfessor();
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
                var dadosProfessor = criarObjetoProfessor();
                dadosProfessor.nome = 'Jo';
                dadosProfessor.sobrenome = 'da';

                apiUtil.criarJsonPost('/api/professores', dadosProfessor, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao', 2))
                    .end(done);
            }
        );

        it('Retornar erro de validação quando o e-mail possuir um formato incorreto.',
            function (done) {
                var dadosProfessor = criarObjetoProfessor();
                dadosProfessor.email = 'joaodasilva@foo';

                apiUtil.criarJsonPost('/api/professores', dadosProfessor, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao', 1))
                    .end(done);
            }
        );
    });

});