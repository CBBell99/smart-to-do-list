/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
//pg stuff
const express = require('express');
const router = express.Router();
const pool = require('pg')

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM tasks`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  //post route when submit clicked.  Send 400 error on empty field
  //converts text
  router.post('/item', (req, res) => {
    console.log('new task:', req.body)
    let newTask = req.body.text;
    db.query(
      `INSERT INTO tasks (category, description) VALUES
      ('Buy',$1) RETURNING *`, [newTask]
    );

    console.log('buy', newTask)



  });


  // router.get("./dogs", (req, res) => {
  //   const result = {
  //     name: 'doggy name',
  //     breed: 'doggy name'
  //   };
  //   res.json(result);
  // });

  // router.post("/dog", (req, res) => {
  //   const body = req.body;
  //   const result = {
  //     name: 'doggy name',
  //     breed: 'doggy name'
  //   };
  //   res.json(body);
  // });


  //do not delete
  return router;
};
