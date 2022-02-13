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
    // console.log(query);
    db.query(query)
      .then(data => {
        const tasks = data.rows;
        res.json({ tasks });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  //post route when submit clicked.  Send 400 error on empty field
  //text becomes a database entry.



  router.post('/item', (req, res) => {
    // let newTask = req.body.text
    const newTask = req.body
    db.query(
      `INSERT INTO tasks (user_id, category, description) VALUES
      (1, 'Buy', $1) RETURNING *`, [newTask.text])

      .then(data => {
        const task = data.rows[0]
        // console.log(task.description)
        res.json({ task });

      })
      .catch(err => {
        console.log(err);
        res.status(500)

          .json({ error: err.message })
      })
  })

  // router.put('/item:i', (req, res) => {
  //   console.log(req.params)
  // })








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
