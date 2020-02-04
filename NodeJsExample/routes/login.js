var express = require("express");
var sql = require("mssql/msnodesqlv8");
var router = express.Router();

module.exports = params => {
  // dependency injection
  const { loginService } = params;

  /* GET login page. */
  router.get("/", function(req, res, next) {
    res.render("login");
  });

  /* POST login credentials */
  router.post("/", function(req, res, next) {
    var parameters = [
      { name: "Username", sqltype: sql.VarChar, value: req.body.Username },
      { name: "Email", sqltype: sql.VarChar, value: req.body.Email },
      { name: "Passwords", sqltype: sql.VarChar, value: req.body.Password }
    ];

    var username = req.body.Username;

    var promise = loginService.Login(parameters);

    promise
      .then(response => {
        // SERVICE -----------------------
        if (response.recordset != null) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect("/");
        } else {
          res.send("Incorrect login details");
          res.end();
        }
        // -----------------------------
      })
      .catch(e => {
        console.log(e);
        res.render("error", { error: e });
      });
  });

  return router;
};
