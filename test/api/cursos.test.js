var Curso = require('../../models/Curso'),
    Area = require('../../models/Area');

describe('/api/cursos', function() {
    var area;

    before(function(done) {
        return Area.truncar()
            .then(function() {
                return Area.novaInstancia({area: 'Área Teste'});
            })
            .then(function(areaInserida) {
                area = areaInserida;
            })
            .finally(done);
    });

    beforeEach(function(done) {
        Curso.truncar()
            .finally(done)
    });

    context('Novo Curso', function() {
        var novoCurso;

        beforeEach(function() {
            novoCurso = {
                sigla: 'SGL',
                curso: 'Curso Teste',
                areaId: area.get('id')
            };
        });

        it('Salvar novo curso e retornar instância salva.', function(done) {
            apiUtil.criarJsonPost('/api/cursos', novoCurso, 200)
                .expect(function(res) {
                    console.log(res.body);
                    var cursoInserido = res.body;
                    expect(cursoInserido)
                        .to.be.an('object');
                    expect(cursoInserido)
                        .to.have.all.keys(['id','sigla','curso','areaId','createdAt','updatedAt']);
                    expect(cursoInserido.sigla).to.be.equal(novoCurso.sigla);
                    expect(cursoInserido.curso).to.be.equal(novoCurso.curso);
                    expect(cursoInserido.areaId).to.be.equal(novoCurso.areaId);
                })
                .end(done);
        });

    });

});