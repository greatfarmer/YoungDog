// routes/index.js

module.exports = function(app, Movie) {
  // GET ALL MOVIES
  app.get('/movies', function(req, res) {
    Movie.find(function(err, movies) {
      if (err) return res.status(500).send({error: 'database failure'});
      res.json(movies);
    });
  });

  // GET MOVIES BY TITLE
  // TODO: 1.title 중복 시 처리 방법 2.공란일 때 처리 방법
  app.get('/movies/title/:title', function(req, res) {
    Movie.findOne({title: req.params.title}, function(err, movies) {
      if (err) return res.status(500).json({error: err});
      // if (movies.length === 0) return res.status(404).json({error: 'movie not found'});
      if (!movies) return res.status(404).json({error: 'movie not found'});
      res.json(movies);
    });
  });

  // GET MOVIES BY WRITER
  app.get('/movies/writer/:writer', function(req, res) {
    Movie.findOne({writer: req.params.writer}, function(err, movies) {
      if (err) return res.status(500).json({error: err});
      // if (movies.length === 0) return res.status(404).json({error: 'movie not found'});
      if (!movies) return res.status(404).json({error: 'movie not found'});
      res.json(movies);
    });
  });

  // GET MOVIES BY DIRECTOR
  app.get('/movies/director/:director', function(req, res) {
    Movie.findOne({director: req.params.director}, function(err, movies) {
      if (err) return res.status(500).json({error: err});
      // if (movies.length === 0) return res.status(404).json({error: 'movie not found'});
      if (!movies) return res.status(404).json({error: 'movie not found'});
      res.json(movies);
    });
  });

  // CREATE MOVIE
  app.post('/movies', function(req, res) {
    var movie = new Movie();
    movie.writer = req.body.writer;
    movie.date = req.body.date;
    movie.title = req.body.title;
    movie.director = req.body.director;
    movie.comments = req.body.comments;

    movie.save(function(err) {
      if (err) {
        console.error(err);
        res.json({result: 0});
        return;
      }
      res.json({result: 1});
    });
  });

  // UPDATE MOVIE
  app.put('/movies/title/:title', function(req, res) {
    Movie.findOne({title: req.params.title}, function(err, movie) {
      if (err) return res.status(500).json({error: 'database failure'});
      if (!movie) return res.status(404).json({error: 'movie not found'});

      if (req.body.writer) movie.writer = req.body.writer;
      if (req.body.date) movie.date = req.body.date;
      if (req.body.title) movie.title = req.body.title;
      if (req.body.director) movie.director = req.body.director;
      if (req.body.comments) movie.comments = req.body.comments;

      movie.save(function(err) {
        if (err) res.status(500).json({error: 'failed to update'});
        res.json({message: 'movie updated'});
      });
    });
  });

  // DELETE MOVIE
  app.delete('/movies/title/:title', function(req, res) {
    Movie.remove({title: req.params.title}, function(err, output) {
      if(err) return res.status(500).json({error: 'database failure'});
      res.json({message: "movie deleted"});
    });
  });
}
