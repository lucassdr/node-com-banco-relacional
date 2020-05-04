const { pool } = require('../config/database')

const listarCursos = (request, response) => {
    pool.query('SELECT * FROM cursos ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const cursoPorID = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM cursos WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const cadastrarCurso = (request, response) => {
    const { nome } = request.body
    console.log('==>', request.body)
    pool.query(
        'INSERT INTO cursos (nome) VALUES ($1, $2)',
        [nome],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Curso cadastrado`)
        }
    )
}

const atualizarCurso = (request, response) => {
    const id = parseInt(request.params.id)
    const { nome } = request.body

    pool.query(
        'UPDATE cursos SET nome = $1 = $2 WHERE id = $3',
        [nome, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Curso com ID: ${id} foi alterado`)
        }
    )
}

const removerCurso = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM cursos WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Curso com ID ${id} foi removido`)
    })
}

module.exports = {
    listarCursos,
    cursoPorID,
    cadastrarCurso,
    atualizarCurso,
    removerCurso,
}
