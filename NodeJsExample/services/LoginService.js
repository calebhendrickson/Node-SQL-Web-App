var sql = require("mssql/msnodesqlv8");
var connection = require("../db");

class LoginService {
  Login = parameters =>
    new Promise((resolves, rejects) => {
      // PERSISTENCE ---------------
      var request = new sql.Request(connection);

      var query =
        "SELECT * FROM [Users] WHERE email = @Email AND passwords = @Passwords";

      parameters.forEach(function(p) {
        request.input(p.name, p.sqltype, p.value);
      });

      request.query(query, function(err, results) {
        if (err) {
          console.log("Error in Login Service" + err);
          rejects(new Error(err));
        } else {
          sql.close();
          resolves(results);
        }
      });
      // --------------------------
    });
}

module.exports = LoginService;
