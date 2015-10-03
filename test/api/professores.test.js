var Professor = require('../../models/Professor');

function criarObjetoProfessor() {
    return {
        prontuario: '12345-0',
        nome: 'Alfredo',
        sobrenome: 'da Cunha',
        email: 'alfredocunha@foo.bar'
    };
}

function verificarProfessorValido(res) {
    expect(res.body)
        .to.be.an('object')
        .and.to.have.all.keys(['id', 'prontuario', 'nome', 'sobrenome', 'email', 'createdAt', 'updatedAt']);
}

describe('API Professores', function () {
    
    beforeEach(function (done) {
        Professor.truncar()
            .finally(done);
    });
    
    
    
    describe('Métodos CRUD', function() {
        it('Novo Professor', function(done) {
            request(express)
                .post('/api/professores')
                .send(criarObjetoProfessor())
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(verificarProfessorValido)
                .end(done);
        });

        it('Exibir Professor', function(done) {
            Professor.novaInstancia(criarObjetoProfessor())
                .then(function(professor) {
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

        it('Editar Professor', function(done) {
             Professor.novaInstancia(criarObjetoProfessor())
                .then(function(professor) {
                    request(express)
                        .put('/api/professores/' + professor.get('id'))
                        .send({email: 'outro@foo.bar'})
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(verificarProfessorValido)
                        .expect(function(res) {
                            expect(res.body.email)
                                .to.be.equal('outro@foo.bar');
                        })
                        .end(done)
                })
                .catch(done);
        });

        it('Excluir Professor', function(done) {
            Professor.novaInstancia(criarObjetoProfessor())
                .then(function(professor) {
                    request(express)
                        .delete('/api/professores/' + professor.get('id'))
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

        it('Listar Professores', function(done) {
            Professor.novaInstancia(criarObjetoProfessor())
                .then(function(professor) {
                    request(express)
                        .get('/api/professores')
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