const  express = require('express');
const app = express();
const db = require('./database');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});



app.get('/flights/:id/passengers', (req, res) => {
    // Logica de simulacion de check-in de pasajeros de un vuelo
    // Los requerimientos a tener en cuenta son:
    //  ● Todo pasajero menor de edad debe quedar al lado de al menos uno de sus acompañantes mayores de edad (se
    //  puede agrupar por el id de la compra).
    //  ● Si una compra tiene, por ejemplo, 4 tarjetas de embarque, tratar en lo posible que los asientos que se asignen
    //  estén juntos, o queden muy cercanos (ya sea en la fila o en la columna).
    //  ● Si una tarjeta de embarque pertenece a la clase “económica”, no se puede asignar un asiento de otra clase. 
    const flightID = req.params.id;
  let flight = db.getFlight(flightID, (error, flight) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(snakeToCamel(flight));
      }
  });


  function snakeToCamel(obj) {
    if (Array.isArray(obj)) {
      return obj.map((item) => snakeToCamel(item));
    } else if (typeof obj === 'object' && obj !== null) {
      return Object.keys(obj).reduce((camelObj, key) => {
        const camelKey = key.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase());
        camelObj[camelKey] = snakeToCamel(obj[key]);
        return camelObj;
      }, {});
    }
    return obj;
  }



});