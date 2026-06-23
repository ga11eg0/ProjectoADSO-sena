
const import_model = require('../models/model')
const model = new import_model()

class Controler{

    // return list of table personas
    async list_persona(req, res){

        try{
            const personas = await model.get_users();
            res.json(personas)
        }catch(error){
            res.status(500).json({ error: 'error al obtener las personas '})
        }

    }

    //instert new persona
    async insert_persona(req,res){
        
        try{
            const {nombre,cedula} = req.body;
            const insertId = await model.insert_user(nombre,cedula);
            res.status(201).json({mensaje: 'persona ingresada con exito'});

        }catch(error){
            res.status(500).json({error: 'error al insertar usuario '});

        }
    }

    //update persona 
    async update_persona(req,res){

        try{
            const {id} = req.params;
            const {nombre,cedula} = req.body;
            const filasActualizadas = await model.update_user(id,nombre,cedula);

            if (filasActualizadas >= 1){
                res.json({mensaje : "persona actualizada con exito"});
            } else {
                return res.status(404).json({mensaje : "no se pudo actualizar persona"});
            }

        }catch (error){
            res.status(500).json({error: "error al intentar actualizar persona"});
        }
    }

    //delete persona
    async delete_persona(req,res){

        try{
            const {id} = req.params;
            const filasActualizadas = await model.delete_user(id);

            if (filasActualizadas >= 1){
                res.json({mensaje : "persona eliminada con exito"});
            } else {
                return res.status(404).json({mensaje : "no se pudo eliminar persona"});
            }

        }catch (error){
            res.status(500).json({error: "error al intentar eliminar persona"});
        }

    }


}

module.exports = Controler; 