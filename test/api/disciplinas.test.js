var sequelize = require('../../config/sequelize').getSequelize(),
    Disciplina = sequelize.model('Disciplina');

function criarObjetoDisciplina() {
    return {
    	disciplina: 'Desenvolvimento WEB II',
        sigla: 'DW2'
    };
}

function verificarDisciplinaValida(res) {
		expect(res.body)
        .to.be.an('object')
        .and.to.contain.all.keys(['id','disciplina', 'sigla', 'createdAt', 'updatedAt']);
		
		
}	

describe('API Disciplinas', function () {

    beforeEach(function (done) {
        Disciplina.destroy({truncate: true})
            .finally(done);
    });

    describe('Métodos CRUD', function() {
        it('Nova Disciplina', function(done) {
            request(express)
                .post('/api/disciplinas')
                .send(criarObjetoDisciplina())
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(verificarDisciplinaValida)
                .end(done);
        });

        it('Exibir Disciplina', function(done) {
            Disciplina.create(criarObjetoDisciplina())
                .then(function(disciplina) {
                    request(express)
                        .get('/api/disciplinas/' + disciplina.get('id'))
                        .set('Accept', 'application/json')
                       .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(verificarDisciplinaValida)
                        .end(done)
                })
                .catch(done);
        });

        it('Editar Disciplina', function(done) {
            Disciplina.create(criarObjetoDisciplina())
                .then(function(disciplina) {
                   request(express)
                        .put('/api/disciplinas/' + disciplina.get('id'))
                       .send({sigla: 'DW-2'})
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                       .expect(verificarDisciplinaValida)
                        .expect(function(res) {
                         expect(res.body.sigla)
                                .to.be.equal('DW-2');
                        })
                       .end(done)
                })
               .catch(done);
        });

       it('Excluir Disciplina', function(done) {
            Disciplina.create(criarObjetoDisciplina())
                .then(function(disciplina) {
                    request(express)
                        .delete('/api/disciplinas/' + disciplina.get('id'))
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

        it('Listar Disciplinas', function(done) {
        	Disciplina.create(criarObjetoDisciplina())
               .then(function(disciplina) {
                    request(express)
                        .get('/api/disciplinas')
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

        it('Retornar erro de validação quando os campos não nulos não forem enviados.',
            function (done) {
                var disciplinaEmBranco = {};

                apiUtil.criarJsonPost('/api/disciplinas', disciplinaEmBranco, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao', 2))
                    .end(done);
            }
        );

        it('Retornar erro de validação quando a disciplina ou sigla for muito pequeno.',
            function (done) {
                var dadosDisciplina = criarObjetoDisciplina();
                dadosDisciplina.disciplina = 'To';
                dadosDisciplina.sigla = 'Do';

                apiUtil.criarJsonPost('/api/disciplinas', dadosDisciplina, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao', 2))
                    .end(done);
            }
        );

    });

}); 