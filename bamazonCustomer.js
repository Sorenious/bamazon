var mysql = require("mysql");
var inquirer = require("inquirer");
var key = require("./keys.js");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: key,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});

// function createProduct() {
//   console.log("Inserting a new product...\n");
//   var query = connection.query(
//     "INSERT INTO products SET ?",
//     {
//       flavor: "Rocky Road",
//       price: 3.0,
//       quantity: 50
//     },
//     function(err, res) {
//       console.log(res.affectedRows + " product inserted!\n");
//       // Call updateProduct AFTER the INSERT completes
//       updateProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

function buyProduct() {
  inquirer
    .prompt([
      {
        name: "getID",
        type: "input",
        message: "Give the ID of the item you would like to purchase: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "purchase",
        type: "input",
        message: "How many would you like to purchase? ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT stock_quantity, price, product_name FROM products WHERE item_id=?";
      connection.query(query, answer.getID, function(err, res) {
        if (answer.purchase <= res[0].stock_quantity) {
          var cost = res[0].price * answer.purchase;
          updateProduct(res[0].stock_quantity, answer.purchase, answer.getID);
          console.log("You bought " + answer.purchase + " " + res[0].product_name + " for $" + cost + "\n");
        } else {
          console.log("\nThere is not enough in stock to make that purchase.\n");
          buyProduct();
        }
      });
    });
}

function updateProduct(stock, purchase, id) {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: stock-purchase
      },
      {
        item_id: id
      }
    ],
    function(err, res) {
      readProducts();
    }
  );

  // logs the actual query being run
  //console.log(query.sql);
}

// function deleteProduct() {
//   console.log("Deleting all strawberry icecream...\n");
//   connection.query(
//     "DELETE FROM products WHERE ?",
//     {
//       flavor: "strawberry"
//     },
//     function(err, res) {
//       console.log(res.affectedRows + " products deleted!\n");
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }

function readProducts() {
  connection.query("SELECT item_id AS ID, product_name AS Name, price AS Price, stock_quantity AS Stock FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(" ID:   Price: Stock:  Product Name: ")
    for (var i = 0; i<res.length; i++) {
      if (i === 2 || i === 8) {
        var price = parseFloat(res[i].Price).toFixed(2);
          console.log("   " + res[i].ID+ "  "+price+"    "+res[i].Stock+"    "+res[i].Name);
        
      } else if (i === 5 || i === 6) {
        var price = parseFloat(res[i].Price).toFixed(2);
          console.log("   " + res[i].ID+ "    "+price+"    "+res[i].Stock+"    "+res[i].Name);
      } else if (i >= 9) {
        console.log("  " + res[i].ID+ "   "+parseFloat(res[i].Price).toFixed(2)+"    "+res[i].Stock+"    "+res[i].Name);
      } else {
        var price = parseFloat(res[i].Price).toFixed(2);
          console.log("   " + res[i].ID+ "   "+price+"    "+res[i].Stock+"    "+res[i].Name);
      }
    }
    
    // console.log(res);
    console.log("");

  buyProduct();
  });
}
