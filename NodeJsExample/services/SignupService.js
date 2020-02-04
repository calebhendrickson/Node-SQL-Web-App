var sql = require("mssql/msnodesqlv8");
var connection = require("../db");

class SignupService {
  Signup = parameters =>
    new Promise((resolves, rejects) => {
      // PERSISTENCE ----------
      var request = new sql.Request(connection);

      var query =
        "INSERT INTO [Users] (Username, Email, Passwords) VALUES (@Username, @Email, @Passwords)";

      parameters.forEach(function(p) {
        request.input(p.name, p.sqltype, p.value);
      });

      request.query(query, function(err) {
        if (err) {
          console.log("Error in Signup Service" + err);
          rejects(new Error(err));
        } else {
          sql.close();
          resolves();
        }
      });

      //------------------------------
    });
}

module.exports = SignupService;
