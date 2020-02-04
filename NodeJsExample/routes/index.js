var express = require("express");

const postsRoute = require("./posts");
const loginRoute = require("./login");
const signupRoute = require("./signup");

var router = express.Router();

module.exports = params => {
  // dependency injection
  const { postsService } = params;

  /* GET home page. */
  router.get("/", function(req, res, next) {
    var promise = postsService.GetPosts();

    promise
      .then(response => {
        // SERVICE -------------------
        if (req.session.loggedin) {
          console.log("Welcome back, " + req.session.username + "!");
        } else {
          console.log("Please log in");
          res.send("please login or signup");
        }
        // --------------------------

        res.render("index", { posts: response.recordset });
      })
      .catch(e => {
        console.log(e);
        res.render("error", { error: e });
      });
  });

  // callback version
  //   )
  //   function(recordset) {
  //     // SERVICE -------------------
  //     if (req.session.loggedin) {
  //       console.log("Welcome back, " + req.session.username + "!");
  //     } else {
  //       console.log("Please log in");
  //       res.redirect("/login");
  //     }
  //     // --------------------------

  //     res.render("index", { products: res.recordset });
  //   });
  // });

  router.use("/posts", postsRoute(params));
  router.use("/login", loginRoute(params));
  router.use("/signup", signupRoute(params));

  return router;
};
