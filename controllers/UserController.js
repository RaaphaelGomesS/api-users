class UserController{

    async index(req, res){

    }

    async create(req, res){
        res.send("catch body req!")
    }


}

module.exports = new UserController();