// Ruta para visualizar todos los productos con paginación
viewsRouter.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || null;
    const query = req.query.query || '';
  
    // Obtener los productos utilizando la API
    try {
      const response = await axios.get(`/api/products?limit=${limit}&page=${page}&sort=${sort}&query=${query}`);
      const { payload, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink } = response.data;
  
      res.render('products', {
        products: payload,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      });
    } catch (error) {
      res.status(500).send('Error al obtener los productos.');
    }
  });
  

