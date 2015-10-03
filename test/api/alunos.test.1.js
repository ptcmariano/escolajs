var Aluno = require('../../models/Aluno');

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
        Aluno.truncar()
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
            Aluno.novaInstancia(criarObjetoAluno())
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
            Aluno.novaInstancia(criarObjetoAluno())
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
            Aluno.novaInstancia(criarObjetoAluno())
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
            Aluno.novaInstancia(criarObjetoAluno())
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

});