
const import_model = require('../models/model')
const model = new import_model()

class Controler{

    async list_persona(req, res){

        try{
            const personas = await model.get_users();
            res.json(personas)
        }catch(error){
            res.status(500).json({ error: 'error al obtener las personas '})
        }

    }

}

module.exports = Controler; 