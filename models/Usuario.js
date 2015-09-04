var usuarios = [
    {
        id: 1,
        usuario: 'admin',
        senha: '1234'
    },
    {
        id: 2,
        usuario: 'usuario',
        senha: 'abcd'
    },
];

exports.obterPorId = function(id, callback) {
    for (var i = 0; i < usuarios.length; i++) {
        if (id === usuarios[i].id) {
            callback(null, usuarios[i]);
            return;
        }
    }
    callback(null, null);
};

exports.autenticar = function(usuario, senha, callback) {
    for (var i = 0; i < usuarios.length; i++) {
        if (usuario === usuarios[i].usuario && senha === usuarios[i].senha) {
            callback(null, usuarios[i]);
            return;
        }
    }
    callback(null, null);
};