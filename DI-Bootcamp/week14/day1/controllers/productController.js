let products = [
  { id: 1, name: "Produit 1", price: 10 },
  { id: 2, name: "Produit 2", price: 20 }
];

export const getAllProducts = (req, res) => {
  res.json(products);
};

export const createProduct = (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: "Produit non trouvé" });

  const { name, price } = req.body;
  product.name = name ?? product.name;
  product.price = price ?? product.price;
  res.json(product);
};

export const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Produit non trouvé" });

  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
};
