db = require('../config/db');

class Model{

    async get_users(){
        try{
            const [rows] = await db.query('SELECT * FROM Persona');
            return rows; 
            
        } catch (error){
            console.log(error);
        }

    }
}

module.exports = Model; 