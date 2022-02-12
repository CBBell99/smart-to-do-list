/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
//pg stuff
const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM widgets`;
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

  router.post('/item', (req, res) => {

    console.log('hello item', req.body)
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
