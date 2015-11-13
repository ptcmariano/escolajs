var sequelize = require('../../config/sequelize').getSequelize(),
    Oferta = sequelize.model('DisciplinaOfertada'),
    Turma = sequelize.model('Turma'),
    Disciplina = sequelize.model('Disciplina');


describe('API DisciplinaOfertada', function () {

    var disciplinaId, turmaId;

    beforeEach(function (done) {
        Oferta.destroy({truncate: true})
            .then(function() {
                Turma.destroy({truncate: true});
            })
            .then(function() {
                Disciplina.destroy({truncate: true});
            })
            .then(function () {
                return Disciplina.create({
                    disciplina: 'Desenvolvimento Web II',
                    sigla: 'DW2'
                })
            })
            .then(function (disciplina) {
                disciplinaId = disciplina.id;
                return Turma.create({
                    sigla: 'ADS-5-2015-2',
                    ano: '2015',
                    semestre: '2'
                });
            })
            .then(function (turma) {
                turmaId = turma.id;
            })
            .finally(done);
    });


    function criarObjetoOferta() {
        return {
            turmaId: turmaId,
            disciplinaId: disciplinaId,
            dataInicio: '2015-01-01 00:00:00',
            dataEncerramento: '2015-12-31 23:59:59'
        };
    }

    function verificarOfertaValida(res) {
        expect(res.body)
            .to.be.an('object')
            .and.to.contain.all.keys(['id', 'turmaId', 'disciplinaId', 'dataInicio', 'dataEncerramento',
            'createdAt', 'updatedAt']);

        expect(res.body.turmaId).to.be.equal(turmaId);
        expect(res.body.disciplinaId).to.be.equal(disciplinaId);
    }

    describe('Métodos CRUD', function () {
        it('Nova Oferta', function (done) {
            request(express)
                .post('/api/disciplinaOfertada')
                .send(criarObjetoOferta())
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(verificarOfertaValida)
                .end(done);
        });

    });

}); 
