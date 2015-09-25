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

describe('/api/alunos', function () {
    var dadosAluno;

    beforeEach(function (done) {
        dadosAluno = criarObjetoAluno();
        Aluno.truncar()
            .then(function () {
                done();
            }).catch(done);
    });

    context('Novo Aluno', function () {
        it('Salvar aluno e retornar instância salva.',
            function (done) {
                apiUtil.criarJsonPost('/api/alunos', dadosAluno, 200)
                    .expect(verificarAlunoValido)
                    .end(done);
            }
        );

        it('Retornar erro de validação quando o prontuário possuir um formato incorreto.',
            function (done) {
                dadosAluno.prontuario = '12345678';

                apiUtil.criarJsonPost('/api/alunos', dadosAluno, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao'))
                    .end(done);
            }
        );

        it('Retornar erro de chave quando o prontuário for duplicado.',
            function (done) {

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
                dadosAluno.nome = 'Jo';
                dadosAluno.sobrenome = 'da';

                apiUtil.criarJsonPost('/api/alunos', dadosAluno, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao', 2))
                    .end(done);
            }
        );

        it('Retornar erro de validação quando o e-mail possuir um formato incorreto.',
            function (done) {
                dadosAluno.email = 'joaodasilva@foo';

                apiUtil.criarJsonPost('/api/alunos', dadosAluno, 400)
                    .expect(apiUtil.verificarErroApi('ErroValidacao', 1))
                    .end(done);
            }
        );

    });


});