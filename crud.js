const multer = require("multer")();
const knex = require("./database/db");

module.exports = function (router) {
    //get all data
    router.get("/", multer.any(), async (req, res) => {
        try {
            var result = await knex("user").select("*");
            if (result) {
                res.json({ success: true, data: result });
                // console.log(result);
            } else {
                res.json({ success: false, message: "somethig went wrong" });
            }
        } catch (error) {
            res.json({ success: false, error: error.sqlMessage });
            console.log(error);
        }
    });


    //insert data
    router.post("/insert", multer.any(), async (req, res) => {
        try {
            let data = {
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
            };
            var result = await knex("user").insert(data);
            //   console.log(result);
            res.json({ success: true, data: result });
        } catch (error) {
            res.json({ success: false, error: error.sqlMessage });
            console.log(error);
        }
    });



    //update data
    router.put("/update/:id", multer.any(), async (req, res) => {
        try {
            // console.log(req.body);

            if (req.body.email == "" || req.body.name == "") {
                res.json({ success: false, message: "Fill all the details" });
            } else {
                var result = await knex("user")
                    .where("id", req.params.id)
                    .update(req.body);
                console.log(result);
                res.json({ success: true, result: result });
            }
        } catch (error) {
            res.json({ success: false, error: error.sqlMessage });
            console.log(error);
        }
    });


    //delete data
    router.delete("/delete/:id", multer.any(), async (req, res) => {
        try {
            var result = await knex("user").where("id", req.params.id).del();
            //   console.log(result);
            if (result == 0) {
                res.json({ success: false, result: result, message: "No data found" });
            } else {
                res.json({ success: true, result: result });
            }
        } catch (error) {
            res.json({ success: false, error: error.sqlMessage });
            console.log(error);
        }
    });


    //find one data
    router.get("/findOne/:id", multer.any(), async (req, res) => {
        try {
            var result = await knex
                .select("*")
                .from("user")
                .where("id", req.params.id);
            if (result.length > 0) {
                res.json({ success: true, data: result });
            } else {
                res.json({ success: false, message: "No data found" });
            }
        } catch (error) {
            res.json({ success: false, error: error.sqlMessage });
            console.log(error);
        }
    });


    router.get("/Search/:search", multer.any(), async (req, res) => {
        try {
            // let params=req.params.search
            var result = await knex.select("*").from("user").where((qb) => {
                if(req.params.search.searchTerm){
                qb.where('name', 'like', `%${req.params.search.searchTerm}%`)}
                else{
                    qb.where('email', 'like', `%${req.params.search}%`);

                }
            })
            res.json({ success: true, data: result });

        } catch (error) {
            res.json({ success: false, error: error.sqlMessage });
            console.log(error);
        }
    });

    return router;
};
