const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
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
            return result;

        }catch(error){
            console.log(error);
        }

    }

    //----- Generating the payment documents --------------------------------------------

    // get the collected amounts searching by a date range
    async GetCollectedByDateRange(date1,date2){

        try{
            const sql = "SELECT t2.*, t1.nombre,t1.cedula FROM Recoleccion t2 JOIN Persona t1 ON t2.Persona_idPersona = t1.idPersona WHERE fecha BETWEEN ? AND ?"; 
            const [result] = await db.query(sql,[date1,date2]); 
            return result; 

        }catch(error){
            console.log(error); 
        }
    }

    // order de data in a table like format 
    async OrderData(rawData,kgPrice){

        try{
            // result: here will be save the new resutls 
            const result= []; 

            //# get all the unique IDs, context:  map gets all ids, set removes duplicates and ... converts it to a list 
            const uniqueIdList= [... new Set( rawData.map( item => item.Persona_idPersona))]; 
            //console.log("unique ids: ", uniqueIdList); 
            //## function gets a list and converts and return into a object with the desired format
            function ToObject(rawList){
                //intital data of the object 
                const worker= {id: rawList[0].Persona_idPersona, Nombre: rawList[0].nombre, Cedula: rawList[0].cedula }

                //loop the list and get the date(fecha) and cantidad
                let total = 0; 
                for(let i= 0; i < rawList.length; i++){
                    worker[rawList[i].fecha.toISOString().split('T')[0]] = Number(rawList[i].cantidad_recolectada);
                    total+= Number(rawList[i].cantidad_recolectada);
                }
                worker["total"] = total;
                const pago= total*kgPrice; 
                worker["Pago"] = pago.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0 // Quita los decimales (,00) si no los necesitas
                    });

                return worker; 
            }   
            //# loop the ids and get all the other data 
            for(let i = 0; i < uniqueIdList.length; i++){
                let ordered= rawData.filter( item => item.Persona_idPersona === uniqueIdList[i]); 
                result.push(ToObject(ordered)); 

            }
            //console.log("result is array ",Array.isArray(result));
            //console.log("Results: ", result); 
            return result; 
        }catch(error){
            console.log(error); 
        }
    }

    //converts object to html 
    async ObjectToHtml(object){

        try{

        //get all the columns/headers
        const headers = Array.from(new Set(object.flatMap(obj => Object.keys(obj)))); 
        //console.log(headers);  

        const columns = headers.map(h => `<th>${h}</th>`).join(''); 
        const rows = object.map(row => {
            const cells = headers.map(h => `<td>${row[h] ?? ''}</td>`).join('');
            return `<tr>${cells}</tr>`;
        }).join('');

        return `
            <!DOCTYPE html>
            <html>
            <head>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                table { border-collapse: collapse; width: 100%; font-size: 14px; }
                th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                th { background-color: #2c3e50; color: white; }
                tr:nth-child(even) { background-color: #f9f9f9; }
            </style>
            </head>
            <body>
            <h2>Vista Previa Planilla de Pagos </h2>
            <table>
                <thead><tr>${columns}</tr></thead>
                <tbody>${rows}</tbody>
            </table>
            </body>
            </html>
        `;


        }catch(error){
            console.log("---------------------");
            console.log("| error in the model|");
            console.log("---------------------");
            console.log(error); 
        }
    }
    

}
/* 
//testing
const fs = require('fs');
const test1= new Model; 

async function Testing (){
        const resutl= await test1.GetCollectedByDateRange('2026-09-01','2026-09-05'); 
        //console.log(resutl); 
        const objectdata = await test1.OrderData(resutl,1200);
        const htmlfile = await test1.ObjectToHtml(objectdata);
        fs.writeFileSync('preview.html',htmlfile );
        console.log(); 
};
Testing(); 
*/

module.exports = Model; 