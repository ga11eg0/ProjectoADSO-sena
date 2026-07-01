const express = require('express');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const personRoutes = require('./routes/persona_rutas');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware para que Express entienda el cuerpo en formato JSON (req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// CONFIGURACIÓN DE LA MEMORIA (SESIONES)
app.use(session({
    secret: 'clave_secreta_adso_sena',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // false porque estamos en localhost sin HTTPS
}));

// la ruta por defecto para el login 
app.use(express.static(path.join(__dirname, 'views','public')));

// Middleware para verificar la sesión
function verificarSesion(req, res, next) {

    if (!req.session.autenticado) {
        return res.redirect("/");
    }

    next();
};

//verifica session para las apis
function isAuthorized(req,res,next){

    if(!req.session.autenticado){
        return res.status(401).json({
            success: false,
            msg: "No autorizado"
        });

    }
    next();
}


// Middleware para evitar que se guarde la página en caché
const noCache = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
};
app.use(
    "/private",noCache,
    verificarSesion,
    express.static("views/private")
);
// gestion del login 
app.get('/board',noCache, (req, res) => {
    
    if (req.session.autenticado) {
        res.sendFile(path.join(__dirname, 'views', 'private', 'board.html'));
    } else {
        res.redirect('/'); // Intento de intrusión: Al login de inmediato
    }
});


// Montamos las rutas del módulo de personas
app.use('/personas',isAuthorized, personRoutes);
// ruta de autenticacion 
app.use('/',authRoutes); 

// Usamos el puerto definido en el .env, o el 3000 por defecto
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('¡Servidor corriendo y conectado a la base de datos!');
});
app.listen(PORT, () => {
    console.log(`🚀 Servidor asíncrono escuchando en http://localhost:${PORT}`);
});