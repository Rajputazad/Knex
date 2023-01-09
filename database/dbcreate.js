
const knex=require("./db")

knex.schema.createTable("profile",(table)=>{
    table.increments("id")
    table.string("name")
    table.integer("mobile")
    table.string("email")
}).then(()=>{console.log("table created");}).catch((err)=>{console.log(err);throw err})
.finally(()=>{
    knex.destroy();
})  