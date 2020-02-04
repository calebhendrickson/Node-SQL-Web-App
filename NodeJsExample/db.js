var sql = require("mssql/msnodesqlv8");
var config = require("./dbconfig.json");
var connection;

function connectDatabase() {
  connection = new sql.ConnectionPool(config, function(err) {
    if (err) {
      console.log(err);
    }
  });

  return connection;
}

module.exports = connectDatabase();
