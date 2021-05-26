var express = require('express');
var router = express.Router();
var dateUtils = require('../utils/date.js');

var todos = [
  { id: 1, title: 'Frontend developer', description: 'Frontend test', date: new Date(), status: false },
  { id: 2, title: 'Backend developer', description: 'Backend test', date: new Date(), status: false },
  { id: 3, title: 'Backend developer', description: 'Backend test', date: new Date(), status: true },
];

router.get('/statistics', function(req, res, next) {
  let active = 0, finished = 0;
  for(let i = 0; i < todos.length; i++) {
    if(todos[i].status === true) active++;
    else finished++;
  }
  res.send([
    {
      status: 'active',
      count: active
    },
    {
      status: 'finished',
      count: finished
    }
  ])
})

router.get('/', function(req, res, next) {
  res.send(todos);
});


router.post('/', function(req, res, next) {
  const { title, description } = req.body;
  const id = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  const todo = { id, title, description, date: dateUtils.generateRandomDate() }
  todos.push(todo);
  res.send(todo);
})

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  const todo = todos.find(t => t.id == id);
  if(todo) {
    todos = todos.filter(t => t.id != id);
    res.send(todo);  
  } else {
    res.status(404).send();
  }
});

router.put('/:id', function(req, res, next) {
  const id = req.params.id;
  todos = todos.map(t => {
    if(t.id == id) {
      return {
        ...t,
        status: !t.status
      }
    }
    return t;
  });
  const todo = todos.find(t => t.id == id);
  if(todo) {
    res.send(todo);  
  } else {
    res.status(404).send();
  }
});

module.exports = router;
