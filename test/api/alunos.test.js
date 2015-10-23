var sequelize = require('../../config/sequelize').getSequelize(),
    Aluno = sequelize.model('Aluno');

function criarObjetoAluno() {
    return {
        prontuario: '123456-0',
        nome: 'João',
        sobrenome: 'da Silva',
        email: 'joaodasilva@foo.bar'
    };
}

function verificarAlunoValido(res) {
    expect(res.body)
        .to.be.an('object')
        .and.to.have.all.keys(['id', 'prontuario', 'nome', 'sobrenome', 'email', 'createdAt', 'updatedAt']);
}

describe('API Alunos', function () {
    var dadosAluno;

    beforeEach(function (done) {
        Aluno.destroy({truncate: true})
            .finally(done);
    });

    describe('Métodos CRUD', function() {
        it('Novo Aluno', function(done) {
            request(express)
                .post('/api/alunos')
                .send(criarObjetoAluno())
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(verificarAlunoValido)
                .end(done);
        });

        it('Exibir Aluno', function(done) {
            Aluno.create(criarObjetoAluno())
                .then(function(aluno) {
                    request(express)
                        .get('/api/alunos/' + aluno.get('id'))
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(verificarAlunoValido)
                        .end(done)
                })
                .catch(done);
        });

        it('Editar Aluno', function(done) {
            Aluno.create(criarObjetoAluno())
                .then(function(aluno) {
                    request(express)
                        .put('/api/alunos/' + aluno.get('id'))
                        .send({email: 'outro@foo.bar'})
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(verificarAlunoValido)
                        .expect(function(res) {
                            expect(res.body.email)
                                .to.be.equal('outro@foo.bar');
                        })
                        .end(done)
                })
                .catch(done);
        });

        it('Excluir Aluno', function(done) {
            Aluno.create(criarObjetoAluno())
                .then(function(aluno) {
                    request(express)
                        .delete('/api/alunos/' + aluno.get('id'))
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(function(res) {
                            expect(res.body)
                                .to.be.true;
                        })
                        .end(done)
                })
                .catch(done);
        });

        it('Listar Alunos', function(done) {
            Aluno.create(criarObjetoAluno())
                .then(function(aluno) {
                    request(express)
                        .get('/api/alunos')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(function(res) {
                            expect(res.body)
                                .to.be.an('array')
                                .and.have.length(1);
                        })
                        .end(done)
                })
                .catch(done);
        });
    });
    
    describe('Validação', function() {
        it('Retornar erro de validação quando o prontuário possuir um formato incorreto.',
            function(done) {
                var dadosAluno = criarObjetoAluno();
                dadosAluno.prontuario = '4651234';
                
                apiUtil.criarJsonPost('/api/alunos', dadosAluno, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao'))
                    .end(done);
            }
        );
        
        it('Retornar erro de chave quando o prontuário for duplicado.',
            function (done) {
                var dadosAluno = criarObjetoAluno();
                apiUtil.criarJsonPost('/api/alunos', dadosAluno, 200)
                    .end(function (err, res) {
                        expect(err).to.be.equals(null);
                        apiUtil.criarJsonPost('/api/alunos', dadosAluno, 400)
                            .expect(apiUtil.verificarErroApi('ErroChaveUnica'))
                            .end(done);
                    });
            }
        );
        
        it('Retornar erro de validação quando os campos não nulos não forem enviados.',
            function (done) {
                var alunoEmBranco = {};

                apiUtil.criarJsonPost('/api/alunos', alunoEmBranco, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao', 4))
                    .end(done);
            }
        );
        
        it('Retornar erro de validação quando o nome ou sobrenome forem muito pequenos.',
            function (done) {
                var dadosAluno = criarObjetoAluno();
                dadosAluno.nome = 'Jo';
                dadosAluno.sobrenome = 'da';

                apiUtil.criarJsonPost('/api/alunos', dadosAluno, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao', 2))
                    .end(done);
            }
        );
        
        it('Retornar erro de validação quando o e-mail possuir um formato incorreto.',
            function (done) {
                var dadosAluno = criarObjetoAluno();
                dadosAluno.email = 'joaodasilva@foo';

                apiUtil.criarJsonPost('/api/alunos', dadosAluno, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao', 1))
                    .end(done);
            }
        );
    })

});