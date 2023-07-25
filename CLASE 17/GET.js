productsRouter.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort === 'asc' ? 'price' : req.query.sort === 'desc' ? '-price' : null;
    const query = req.query.query || '';
  
    const options = {
      limit,
      skip: (page - 1) * limit,
      sort,
    };
  
    let filter = {};
    if (query) {
      filter = {
        $or: [
          { category: { $regex: query, $options: 'i' } },
          { status: { $regex: query, $options: 'i' } },
        ],
      };
    }
  
    try {
      const totalProducts = await Product.countDocuments(filter);
      const totalPages = Math.ceil(totalProducts / limit);
  
      const products = await Product.find(filter, null, options);
  
      const nextPage = page < totalPages ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;
      const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}&sort=${req.query.sort}&query=${query}` : null;
      const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}&sort=${req.query.sort}&query=${query}` : null;
  
      res.json({
        status: 'success',
        payload: products,
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
      res.status(500).json({ status: 'error', message: 'Error al obtener los productos.' });
    }
  });
  