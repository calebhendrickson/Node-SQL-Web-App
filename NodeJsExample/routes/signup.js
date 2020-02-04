var express = require("express");
var sql = require("mssql/msnodesqlv8");
var router = express.Router();

module.exports = params => {
  // dependency injection
  const { signupService } = params;

  /* GET signup page. */
  router.get("/", function(req, res, next) {
    res.render("signup");
  });

  /* POST new user */
  router.post("/", function(req, res, next) {
    var parameters = [
      { name: "Username", sqltype: sql.VarChar, value: req.body.Username },
      { name: "Email", sqltype: sql.VarChar, value: req.body.Email },
      { name: "Passwords", sqltype: sql.VarChar, value: req.body.Password }
    ];

    var promise = signupService.Signup(parameters);

    promise
      .then(() => {
        res.redirect("/login");
      })
      .catch(e => {
        console.log(e);
        res.render("error", { error: e });
      });
  });

  return router;
};
