const request = require('supertest');
const express = require('express');

// vamos a probar esta parte del middlware 
function isAuthorized(req, res, next) {
    if (!req.session || !req.session.autenticado) {
        return res.status(401).json({
            success: false,
            msg: "No autorizado"
        });
    }
    next();
}

// 2. Creamos una mini aplicación de Express de prueba para aislar el comportamiento
const app = express();

app.use(express.json());

// Simulamos un middleware falso que simula una sesión de Express (express-session)
// Esto es necesario porque middleware lee de `req.session`
app.use((req, res, next) => {
    // Si la ruta incluye ?simularLogin=true, simulamos que el usuario está autenticado
    req.session = {
        autenticado: req.query.simularLogin === 'true'
    };
    next();
});

// Montamos una ruta protegida usando tu mismo middleware
app.get('/personas', isAuthorized, (req, res) => {
    res.status(200).json({ success: true, msg: "Bienvenido a personas" });
});

// --- PRUEBAS AUTOMATIZADAS ---
describe('Pruebas del middleware isAuthorized', () => {

    it('Debería bloquear el acceso (401 No autorizado) si no hay sesión autenticada', async () => {
        // Hacemos la petición a /personas SIN simular login (?simularLogin=false o vacío)
        const respuesta = await request(app).get('/personas');

        // Verificamos que responda con 401 y el mensaje esperado
        expect(respuesta.status).toBe(401);
        expect(respuesta.body).toEqual({
            success: false,
            msg: "No autorizado"
        });
    });

    it('Debería permitir el acceso si el usuario está autenticado en la sesión', async () => {
        // Hacemos la petición a /personas PASANDO ?simularLogin=true
        const respuesta = await request(app).get('/personas?simularLogin=true');

        // Verificamos que lo deje pasar exitosamente (código 200)
        expect(respuesta.status).toBe(200);
        expect(respuesta.body).toEqual({
            success: true,
            msg: "Bienvenido a personas"
        });
    });

});