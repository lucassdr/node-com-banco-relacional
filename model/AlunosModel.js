const { pool } = require('../config/database')

const listarAlunos = (request, response) => {
    pool.query(
        'SELECT alunos.id as aluno_id, alunos.nome as aluno_nome, cursos.nome as cursos_nome FROM alunos, cursos WHERE alunos.fk_cursos_id = cursos.id ORDER BY alunos.id ASC',
        (error, results) => {
            if (error) {
                return console.log('listarAlunos ==>', error)
            }
            response.status(200).json(results.rows)
        }
    )
}

const listarSomenteAlunos = (request, response) => {
    pool.query('SELECT * FROM alunos ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log('listarSomenteAlunos ==>', error)
        }
        response.status(200).json(results.rows)
    })
}

const alunoPorID = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM alunos WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log('alunoPorID ==>', error)
        }
        response.status(200).json(results.rows)
    })
}

const cadastrarAluno = (request, response) => {
    const { nome, fk_cursos_id } = request.body
    pool.query(
        'INSERT INTO alunos (nome, fk_cursos_id) VALUES ($1, $2)',
        [nome, fk_cursos_id],
        (error, result) => {
            if (error) {
                return console.log('cadastrarAluno ==>', error.message)
            }
            response.status(201).json({ response: `Aluno cadastrado` })
        }
    )
}

const atualizarAluno = (request, response) => {
    const id = parseInt(request.params.id)
    const { nome } = request.body

    pool.query(
        'UPDATE alunos SET nome = $1 WHERE id = $2',
        [nome, id],
        (error, results) => {
            if (error) {
                return console.log('atualizarAluno ==>', error)
            }
            response
                .status(200)
                .json({ response: `Aluno com ID ${id} foi modificado` })
        }
    )
}

const removerAluno = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM alunos WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log('removerAluno ==>', error)
        }
        response.status(200).json({ response: `Aluno com ID ${id} foi removido` })
    })
}

module.exports = {
    listarAlunos,
    alunoPorID,
    listarSomenteAlunos,
    cadastrarAluno,
    atualizarAluno,
    removerAluno,
}
