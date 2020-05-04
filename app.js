const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const alunosDB = require('./model/AlunosModel')
const cursosDB = require('./model/CursosModel')
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.status(200).json({
        info: 'Sua API está no AR. Voa moleque - Santos Dumont',
    })
})

app.get('/alunos', alunosDB.listarAlunos)
app.get('/alunosonly', alunosDB.listarSomenteAlunos)
app.get('/alunos/:id', alunosDB.alunoPorID)
app.post('/alunos', alunosDB.cadastrarAluno)
app.put('/alunos/:id', alunosDB.atualizarAluno)
app.delete('/alunos/:id', alunosDB.removerAluno)

app.get('/cursos', cursosDB.listarCursos)
app.get('/cursos/:id', cursosDB.cursoPorID)
app.post('/cursos', cursosDB.cadastrarCurso)
app.put('/cursos', cursosDB.atualizarCurso)
app.delete('/cursos', cursosDB.removerCurso)

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))
