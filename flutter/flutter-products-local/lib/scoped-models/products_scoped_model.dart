import 'package:scoped_model/scoped_model.dart';
import '../models/product_model.dart';

mixin ProductsScopedModel on Model {
  List<ProductModel> _products = [];
  int _selectedProductIndex;
  bool _showFavorites = false;

  List<ProductModel> get products {
    return List.from(_products);
  }

  List<ProductModel> get displayedProducts {
    if (_showFavorites) {
      return _products
          .where((ProductModel product) => product.isFavorite)
          .toList();
    }
    return List.from(_products);
  }

  int get selectedProductIndex {
    return _selectedProductIndex;
  }

  bool get displayFavoritesMode {
    return _showFavorites;
  }

  ProductModel get selectedProduct {
    if (_selectedProductIndex == null) {
      return null;
    }
    return _products[_selectedProductIndex];
  }

  void addProduct(ProductModel product) {
    _products.add(product);
    _selectedProductIndex = null;
    notifyListeners();
  }

  void updateProduct(ProductModel product) {
    _products[_selectedProductIndex] = product;
    _selectedProductIndex = null;
    notifyListeners();
  }

  void deleteProduct() {
    _products.removeAt(_selectedProductIndex);
    _selectedProductIndex = null;
    notifyListeners();
  }

  void toggleProductFavoriteStatus() {
    final bool isCurrentlyFavorite = selectedProduct.isFavorite;
    final bool newFavoriteStatus = !isCurrentlyFavorite;
    final ProductModel updatedProduct = ProductModel(
        title: selectedProduct.title,
        description: selectedProduct.description,
        price: selectedProduct.price,
        image: selectedProduct.image,
        isFavorite: newFavoriteStatus);

    _products[_selectedProductIndex] = updatedProduct;

    notifyListeners();
    _selectedProductIndex = null;
  }

  void toggleDisplayMode() {
    _showFavorites = !_showFavorites;
    notifyListeners();
  }

  void selectProduct(index) {
    _selectedProductIndex = index;
  }
}
