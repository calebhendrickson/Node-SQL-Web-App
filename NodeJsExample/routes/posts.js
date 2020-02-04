var express = require("express");
var sql = require("mssql/msnodesqlv8");
var router = express.Router();

module.exports = params => {
  // dependency injection
  const { postsService } = params;

  /* GET posts listing. */
  router.get("/", function(req, res, next) {
    if (req.session.loggedin) {
      console.log("Welcome back, " + req.session.username + "!");

      var promise = postsService.GetPosts();

      promise
        .then(response => {
          res.render("posts", { posts: response.recordset });
        })
        .catch(e => {
          console.log("unable to get posts");
          console.log(e);
          res.render("error", { error: e });
        });
    } else {
      console.log("Please log in");
      res.send("Unable to create post if not logged in");
    }
  });

  /* POST posts listing */
  router.post("/", function(req, res, next) {
    var parameters = [
      { name: "Username", sqltype: sql.VarChar, value: req.body.Username },
      { name: "Question", sqltype: sql.VarChar, value: req.body.Question }
    ];

    var userSecurity = req.session.username;

    if (req.body.Username != userSecurity) {
      res.send("Please create posts as yourself");
    } else {
      var promise = postsService.CreatePost(parameters);

      promise
        .then(() => {
          var refresh = postsService.GetPosts();

          // 2nd level promise to guarantee page refresh
          // normally would be handled by front-end framework
          refresh
            .then(response => {
              res.render("posts", { posts: response.recordset });
            })
            .catch(e => {
              console.log("unable to get posts");
              console.log(e);
              res.render("error", { error: e });
            });
        })
        .catch(e => {
          console.log("unable to get posts");
          console.log(e);
          res.render("error", { error: e });
        });
    }
  });

  return router;
};
