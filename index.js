const express = require('express') // importando modo http
const app = express()

app.use(express.json())

let notes = [
    {
        "id": 1,
        "content": "Tengo que esudiar más",
        "date": "17/08/2021",
        "important": true
    },
    {
        "id": 2,
        "content": "Tengo que aguantar Andrea",
        "date": "17/08/2021",
        "important": true
    },
    {
        "id": 3,
        "content": "Tengo que hacer test",
        "date": "17/08/2021",
        "important": true
    },
    {
        "id": 4,
        "content": "Tengo que jugar a futbol",
        "date": "17/08/2021",
        "important": true
    }
]
//creando un sevidor y pasando parametros - callback
// const app=http.createServer((request, response) => { 
// response.writeHead(200, {'Content-Type':'text/plain'})
// response.end('Hello World')
// })

//PORt a ser executado(hay que esta libre)
app.get('/',(request, response)=>{response.send('<h1>Hello World</h1>')})

app.get('/api/notes',(request, response)=>{
    response.json(notes)
})

app.get('/api/notes/:id', (request, response)=>{
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if(note) {
        response.json(note)
    } else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response)=>{
    const id = Number(request.params.id)
    const note = notes.filter(note => note.id != id)

    if(note) {
        response.json(note)
    } else{
        response.status(204).end()
    }
    })

app.post('/api/notes', (request, response)=>{
    const note = request.body

    if(!note || !note.content){
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)
    
    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important != 'undefined' ? note.important : false,
        date: new Date(). toISOString()

    }

    notes = notes.concat(newNote)

    response.status(201).json(newNote)
})

const PORT=3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

