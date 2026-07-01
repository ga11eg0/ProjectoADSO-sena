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

    //search user by id
    async search_user(cedula){

        try{
            const query  = 'SELECT * FROM Persona WHERE cedula =? ';
            const [rows] = await db.query(query,[cedula]);
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

    //delete user 
    async delete_user(id){

        try{
            const sql = "DELETE FROM Persona WHERE idPersona = ? ";
            const [result] = await db.query(sql,[id]);
            return result.affectedRows; 

        }catch(error){
            console.log(error);
        }
    }

    //list admins
    async listAdmin(){

        try{
            const [rows] = db.query('SELECT * FROM Administrador');
            return  rows; 
        }catch(error){
            console.log(error);
        }
    }

    async getAdmin(user){

        try{
            
            const [rows] = await db.query('SELECT * FROM Administrador WHERE usuario = ? ',[user]);
            return  rows; 
        }catch(error){
            console.log(error);
        }
        
    }

    // insert new admin 
    async insertAdmin(user,pwd, id){

        try{
            const sql = 'INSERT INTO Administrador (usuario,contraseña,Persona_idPersona) VALUES (?,?,?)';
            const [result] = await db.query(sql, [user,pwd,id]);
            return result.insertId;
            }catch(error){
            console.log(error);
        }
    }

    //update admin the id is the one from admin table 
    async updateAdmin(id,user, pwd){

        try{
            const sql = 'UPDATE Administrador SET  usuario = ?,contraseña= ? WHERE idAdministrador = ? ';
            const [result] = await db.query(sql, [user,pwd,id]);
            return result.affectedRows;
        }catch(error){
            console.log(error);
        }
    }

    //delete admin 
    async deleteAdmin(id){

        try{
            const sql = 'DELETE FROM Administrador WHERE idAdministrador = ? ';
            const [result] = await db.query(sql,[id]);
            return result.affectedRows;

        }catch(error){
            console.log(error);
        }
    }

    //search recoleccion by person id
    async buscarRecById(id){

        try{
            const sql = 'SELECT * FROM Recoleccion WHERE Persona_idPersona = ?';
            const [result] = await db.query(sql,[id]);
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async buscarBydate(date1, date2){

        try{

            const sql =  'SELECT * FROM Recoleccion WHERE fecha BETWEEN ? AND ?';
            const [result] = await db.query(sql,[date1,date2]);
            return result; 
        }catch(error){
            console.log(error);
        }
    }

    //date has to be converted to default sql yyyy/mm/dd
    async insertRec(cantidad, uId, date){

        try{
            const sql = 'INSERT INTO Recoleccion (cantidad_recolectada,Persona_idPersona ,fecha) VALUES (?,?,?)';
            const [result] = await db.query(sql, [cantidad,uId,date]);
            return result.insertId;

        }catch(error){
            console.log(error);
        }

    }
    

}

module.exports = Model; 