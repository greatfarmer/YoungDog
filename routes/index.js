// routes/index.js

//TODO 1.전체 결과 조회하기 [done!]
//     2.검색 결과 HTML로 출력하기 [done!]

module.exports = function(app, Movie, fs) {
  // VIEW SETTING
  app.get('/', function(req, res) {
    res.render('index', {
      title: "YoungDog"
    });
  });

  // GET ALL MOVIES
  app.get('/movies', function(req, res) {
    Movie.find(function(err, movies) {
      if (err) return res.status(500).send({error: 'database failure'});
      // res.json(movies);
      res.render('movieList', {title: "List", content: movies});
    });
  });

  // SEARCH MOVIES
  // TODO 코드 간소화 방법
  // TODO: 1.title 중복 시 처리 방법 2.공란일 때 처리 방법
  app.get('/movies/search', function(req, res) {
    if (req.query.type == "writer") {
      Movie.find({writer: req.query.search}, function(err, movies) {
        if (err) return res.status(500).json({error: err});
        if (!movies) return res.status(404).json({error: 'movie not found'});
        res.render('movieList', {title: "List", content: movies});
      });
    };
    if (req.query.type == "title") {
      Movie.find({title: req.query.search}, function(err, movies) {
        if (err) return res.status(500).json({error: err});
        if (!movies) return res.status(404).json({error: 'movie not found'});
        res.render('movieList', {title: "List", content: movies});
      });
    };
    if (req.query.type == "director") {
      Movie.find({director: req.query.search}, function(err, movies) {
        if (err) return res.status(500).json({error: err});
        if (!movies) return res.status(404).json({error: 'movie not found'});
        res.render('movieList', {title: "List", content: movies});
      });
    };
  });

  // [!] findOne은 content.length가 생성되지 않는다. undefine으로 나온다.

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
      //res.json({result: "정상적으로 등록되었습니다."});
      // TODO res.json과 res.write의 차이 공부

      // TODO 메시지와 함께 redirection 하는 법 공부
      // res.flash("3초후에 메인홈페이지로 갑니다.")
      // setTimeout(function() { res.redirect('/'); }, 3000);
    });

    //res.send()는 res.end()를 부르기 때문에 여러줄 사용하지 못함
    //res.write()를 쓰고 마지막에 res.end()를 해주면 됨.

    //TODO 아래 한글출력 시 깨지는 것 해결하기
    // res.write('작성자: ' + req.body.writer + '\n');
    // res.write('감상일시: ' + req.body.date + '\n');
    // res.write('제목: ' + req.body.title + '\n');
    // res.write('감독: ' + req.body.director + '\n');
    // res.write('감상평: ' + req.body.comments + '\n');
    // res.end("정상적으로 입력되었습니다.");
  });

  // UPDATE MOVIE
  app.put('/movies/title/:title', function(req, res) {
    Movie.find({title: req.params.title}, function(err, movie) {
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
