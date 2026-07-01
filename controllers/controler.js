
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

            //1. CHECK IF USER EXISTS 
            const lookup = await model.search_user(cedula);
            //console.log(lookup);
            //console.log(lookup.length);
            if (lookup.length === 0){

                const insertId = await model.insert_user(nombre,cedula);
                res.status(201).json({success: 'true' ,msg: 'persona ingresada con exito'});
            
            }else if ( lookup.length === 1){
                res.status(200).json({success: 'false', msg: 'parece que la persona ya esta registrada', persona: lookup[0].nombre, cedula: lookup[0].cedula}); 
            }

            

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


    async autenticarAdmin(req,res){

        try{
            //console.log(req.body);
            const {user, pwd } = req.body; 
            const answer = await model.getAdmin(user); 
            // se valida que el usuario existe, es decir si la respuesta de la base de datos no es un arr vacio
            if ( answer.length >= 1 ){           
                // validar usuario y contraseña coinciden 
                if ( user.trim() === answer[0].usuario.trim() && pwd.trim() === answer[0].contraseña.trim() ){
                    req.session.autenticado = {id : answer[0].idAdministrador,nombre : user};
                    res.json({success: true, msg : "autenticado correctamente "});
                }else{
                    res.status(401).json({success: false , msg: "contraseña incorrecta "});
                }
            } else{
                res.status(401).json({success: false, msg: "parece que el usuario no existe "});          
            }   
        }catch (error){   
            res.status(401).json({success: false, msg: "error al intentar iniciar seccion "});
        }
    }

    //logout function 
    async logout(req,res){

        try{

            req.session.destroy(() => {
            })

            res.json({success: true, msg: "session cerrada con exito ", redirectUrl: '/'  })

        } catch(error){
            res.status(401).json({success: false, msg: "error al intentar cerrar la seccion "})
        }
    }

}

module.exports = Controler; 