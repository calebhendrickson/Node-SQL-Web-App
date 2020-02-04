var sql = require("mssql/msnodesqlv8");
var connection = require("../db");

class PostsService {
  GetPosts = () =>
    new Promise((resolves, rejects) => {
      // PERSISTENCE ------------
      var request = new sql.Request(connection);

      request.query("select * from posts", function(err, recordset) {
        if (err) {
          rejects(new Error(err));
        } else {
          resolves(recordset);
        }
      });
      // -----------------------
    });

  CreatePost = parameters =>
    new Promise((resolves, rejects) => {
      // PERSISTENCE ------------
      var request = new sql.Request(connection);

      var query =
        "INSERT INTO [Posts] (Username, Question) VALUES (@Username, @Question)";

      parameters.forEach(function(p) {
        request.input(p.name, p.sqltype, p.value);
      });

      request.query(query, function(err) {
        if (err) {
          console.log("Error in the PostService " + err);
          rejects(new Error(err));
        } else {
          sql.close();
          resolves();
        }
      });
      // -------------------------
    });
}

module.exports = PostsService;
