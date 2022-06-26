var express = require('express');
const pool = require('../../models/bd');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

/* GET home page. */
router.get('/', async function (req, res, next) {

  var novedades = await novedadesModel.getNovedades();

  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre, //valentin
    novedades
  });
});

// para eliminar una novedad 
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await novedadesModel.deleteNovedadesById(id);
  res.redirect('/admin/novedades')

}); //cierra get de eliminar


//  formulario para agregar novedades

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', { // agregar hbs
    layout: 'admin/layout'
  }) //cierra render 
}); //cierra get

/agregar cuando yo toco el boton de gaurdar/
router.post('/agregar', async (req, res, next) => {

  console.log(req.body)
  try {
    if (req.body.titutlo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargo la novedad'
    });
  }
});


//modificar y traigo la novedad que seleccione
router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  var novedad = await novedadesModel.getNovedadById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  });
}); //cierro get modi

router.post('/modificar', async (req, res, next) => {
  try {
    // console.log(req.body.id); //para ver si trae id
    // console.log(req.body);
    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo
    }

    //console.log(obj) //para ver se trae los datos
    await novedadesModel.modificarNovedadesById(obj, req.body.id);
    res.redirect('/admin/novedades');
  } catch (error) {
      console.log(error)
      res.render('/admin/modificar',{
        layout:'admin/layout',
        error: true,
        message: 'No se modifico la novedad'
      })
  } //cierro catch
}); //cierro el post

module.exports = router;



