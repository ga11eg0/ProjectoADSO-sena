db = require('../config/db');

class Model{

    //returna list with all the data in that table 
    async get_users(){
        try{
            const [rows] = await db.query('SELECT * FROM Persona');
            return rows; 
            
        } catch (error){
            console.log(error);
        }

    }

    //insert new data 
    async insert_user(nombre,cedula){

        try{
            const sql = 'INSERT INTO Persona (nombre,cedula) VALUES (?,?) ';
            const [resultado] = await db.query(sql,[nombre,cedula]);
            return resultado.insertId; 
        }catch(error){
            console.log(error);
        }
    }

    //update user 
    async update_user(id,nombre,cedula){

        try{
            const sql = 'UPDATE Persona SET nombre= ?,cedula=  ? WHERE idPersona = ?';
            const [result] = await db.query(sql,[nombre,cedula,id]);
            return result.affectedRows;
        }catch(error){
            console.log(error);
        }
    }

    //delete uset 
    async delete_user(id){

        try{
            const sql = "DELETE FROM Persona WHERE idPersona = ? ";
            const [result] = await db.query(sql,[id]);
            return result.affectedRows; 

        }catch(error){
            console.log(error);
        }
    }
}

module.exports = Model; 