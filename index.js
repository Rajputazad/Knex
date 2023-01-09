const express = require("express");
const router=express.Router()
const app = express();

var bodyParser = require("body-parser");
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const crud=require("./crud")(router)



app.use("/",crud)
app.listen(port, () => {
  console.log(`Port = ${port} URL:-http://localhost:${port}`);
});

//  await knex.select('*').from('user').then(function(depts){
//         console.log(depts);
//       }).catch(function(err){
//         resp.send(err)
//       console.log(err);
//     })
