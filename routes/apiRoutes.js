// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const path = require("path");
const db = require("../db/db.json");
const { v4: uuidv4 } = require('uuid');
const { notStrictEqual } = require("assert");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    res.json(db);
  });

  app.post("/api/notes", function(req, res) {
    const newNoteTitle = req.body.title;
    const newNoteBody = req.body.text;

    db.push({ id: uuidv4(), title: newNoteTitle, text: newNoteBody});
    
    res.json(db);
    
  })

  app.delete("/api/notes/:id", function(req, res) {
    db.forEach(function(note, index){

      if (note.id === req.params.id) {
        db.splice(index);
        
        res.json(db);
      };
    });
  });
};
