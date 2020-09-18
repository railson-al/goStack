const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

server.use((req, res, next) => {
  console.count('Requisições feitas');

  next();
  
});

function checkIdExist (req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
 
  if(!project) {

    return res.status(400).json({error: "Task doesn't exit"});

  }
  
  return next();
}

//Cria um nova Tarefa
server.post('/projects/', (req, res) => {
  const { id, tittle, tasks } = req.body;

  const project = {
    id,
    tittle,
    tasks: []
  };
  
  projects.push(project);

  
  return res.json(projects);

})

//Lista todas as Tarefa
server.get('/projects', (req, res) => {
  return res.json(projects);
})

//Lista uma só Tarefa
server.get('/projects/:id', checkIdExist, (req, res) => {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  return res.json(project);
})

//Altera o titulo de uma tarefa
server.put('/projects/:id', checkIdExist, (req, res) => {
  const { id } = req.params;
  const { newTittle } = req.body;

  const project = projects.find(p => p.id == id);

  project.tittle = newTittle;
  

  return res.json(project);
})

//Deleta uma tarefa
server.delete('/projects/:id', checkIdExist,(req, res) => {
  const { id } = req.params;

  const project = projects.findIndex(p => p.id == id);

  projects.splice(project, 1);

  return res.json(projects);
})

//Adciona uma task a Tarefa
server.post('/projects/:id/tasks', checkIdExist, (req, res) => {
  const { id } = req.params;
  const {tittle} = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(tittle);

  return res.json(project);
})

server.listen(4000);
