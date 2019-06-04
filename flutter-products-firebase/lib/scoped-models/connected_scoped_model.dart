import 'dart:convert';
import 'dart:async';
import 'dart:io';

import 'package:flutter_course/models/location_data.dart';
import 'package:mime/mime.dart';
import 'package:scoped_model/scoped_model.dart';
import 'package:flutter_course/models/user_model.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:rxdart/subjects.dart';
import 'package:http_parser/http_parser.dart';

import 'package:http/http.dart' as http;

import '../models/product_model.dart';

import '../shared/global_config.dart';

mixin ConnectedScopedModel on Model {
  List<ProductModel> _products = [];
  int _selectedProductIndex;
  bool _showFavorites = false;
  bool _isLoading = false;
  UserModel _authenticatedUser;
  Timer _authTimer;
  PublishSubject<bool> _userSubject = PublishSubject();

  PublishSubject<bool> get userSubject {
    return _userSubject;
  }

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

  void loadProducts(List<ProductModel> data) {
    _products = data;
  }

  Future<Null> fetchProducts({onlyUser = false}) {
    _isLoading = true;
    notifyListeners();

    _products = [];

    return http
        .get(
            'https://flutter-course-7d0aa.firebaseio.com/products.json?auth=${_authenticatedUser.token}')
        .then((http.Response response) {
      final List<ProductModel> fetchedProductList = [];
      final Map<String, dynamic> productListData = json.decode(response.body);
      if (productListData == null) {
        _isLoading = false;
        notifyListeners();
        return;
      }
      productListData.forEach((String productId, dynamic productData) {
        final ProductModel product = ProductModel(
            id: productId,
            title: productData['title'],
            description: productData['description'],
            image: productData['image'],
            // imageUrl: productData['imageUrl'],
            // imagePath: productData['imagePath'],
            price: productData['price'],
            location: productData['loc_address'] != null
                ? LocationData(
                    address: productData['loc_address'],
                    latitude: productData['loc_lat'],
                    longitude: productData['loc_lon'])
                : null,
            userEmail: productData['userEmail'],
            userId: productData['userId'],
            isFavorite: productData['wishListUsers'] == null
                ? false
                : (productData['wishListUsers'] as Map<String, dynamic>)
                    .containsKey(_authenticatedUser.id));
        fetchedProductList.add(product);
      });
      _products = onlyUser
          ? fetchedProductList.where((ProductModel product) {
              return product.userId == _authenticatedUser.id;
            }).toList()
          : fetchedProductList;
      _isLoading = false;
      notifyListeners();
    });
  }

  int get selectedProductIndex {
    return _selectedProductIndex;
  }

  bool get displayFavoritesMode {
    return _showFavorites;
  }

  bool get isLoading {
    return _isLoading;
  }

  UserModel get authenticatedUser {
    return _authenticatedUser;
  }

  ProductModel get selectedProduct {
    if (_selectedProductIndex == null) {
      return null;
    }
    return _products[_selectedProductIndex];
  }

  Future<Map> signUp(String email, String password) async {
    _isLoading = true;
    notifyListeners();
    final Map<String, dynamic> authData = {
      'email': email,
      'password': password
    };
    final http.Response response = await http.post(
        signupUrl,
        body: json.encode(authData),
        headers: {'Content-Type': 'application/json'});

    print('Response-->' + response.body);

    final Map<String, dynamic> responseData = json.decode(response.body);

    String message = 'Something went wrong!';
    bool hasError = true;

    if (responseData['error'] != null) {
      if (responseData['error']['message'] == 'EMAIL_EXISTS') {
        message = "Email already exists";
      }
    } else {
      _authenticatedUser =
          UserModel(id: 'kaka', email: email, token: responseData['idToken']);

      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString('token', responseData['idToken']);
      prefs.setString('email', email);
      prefs.setString('userId', responseData['localId']);
      prefs.setInt('expiresIn', int.parse(responseData['expiresIn']));

      setAuthTimeout(int.parse(responseData['expiresIn']));

      message = 'Authentication succeeded!';
      hasError = false;
    }

    _isLoading = false;
    notifyListeners();

    return {'success': !hasError, 'message': message};
  }

  Future<Map> login(String email, String password) async {
    _isLoading = true;
    notifyListeners();
    final Map<String, dynamic> authData = {
      'email': email,
      'password': password,
      'returnSecureToken': true
    };
    final response = await http.post(
        loginUrl,
        body: json.encode(authData),
        headers: {'Content-Type': 'application/json'});

    final Map<String, dynamic> responseData = json.decode(response.body);

    String message = 'Something went wrong!';
    bool hasError = true;

    if (responseData['error'] != null) {
      if (responseData['error']['message'] == 'EMAIL_NOT_FOUND') {
        message = "Email not found";
      }
      if (responseData['error']['message'] == 'INVALID_PASSWORD') {
        message = "Invalid password";
      }
    } else {
      print('Response-->' + response.body);
      _authenticatedUser = UserModel(
          id: responseData['localId'],
          email: email,
          token: responseData['idToken']);

      _userSubject.add(true);

      message = 'Login succeeded!';
      hasError = false;

      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString('token', responseData['idToken']);
      prefs.setString('email', email);
      prefs.setString('userId', responseData['localId']);

      setAuthTimeout(int.parse(responseData['expiresIn']));

      final DateTime now = DateTime.now();
      final DateTime expiryTime =
          now.add(Duration(seconds: int.parse(responseData['expiresIn'])));
      prefs.setString('expiryTime', expiryTime.toIso8601String());
    }

    _isLoading = false;
    notifyListeners();

    return {'success': !hasError, 'message': message};
  }

  void autoAuthentication() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    final String expiryTimeString = prefs.getString('expiryTime');
    if (prefs.getString('token') != null) {
      final DateTime now = DateTime.now();
      final parsedExpiryTime = DateTime.parse(expiryTimeString);
      if (parsedExpiryTime.isBefore(now)) {
        _authenticatedUser = null;
        notifyListeners();
        return;
      }
      final tokenLifespan = parsedExpiryTime.difference(now).inSeconds;
      _authenticatedUser = UserModel(
          email: prefs.getString('email'),
          id: prefs.getString('userId'),
          token: prefs.getString('token'));
      _userSubject.add(true);

      setAuthTimeout(tokenLifespan);

      notifyListeners();
    }
  }

  void logout() async {
    print('Logout');
    _authenticatedUser = null;
    _authTimer.cancel();

    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove('email');
    prefs.remove('userId');
    prefs.remove('token');

    _userSubject.add(false);

    notifyListeners();
  }

  void setAuthTimeout(int timeInSeconds) {
    _authTimer = Timer(Duration(seconds: timeInSeconds), () {
      logout();
    });
  }

  Future<bool> addProduct(ProductModel product) async {
    _isLoading = true;
    notifyListeners();

    // final uploadData = await uploadImage(product.image);

    // if(uploadData == null) {
    //   print('Upload failed');
    //   return false;
    // }

    //Save into backend server
    Map<String, dynamic> productData = {
      'title': product.title,
      'description': product.description,
      'image':product.image,
      // 'imageUrl':uploadData['imageUrl'],
      // 'imagePath':uploadData['imagePath'],
      'price': product.price,
      'userEmail': product.userEmail,
      'userId': product.userId,
      'loc_lat': product.location.latitude,
      'loc_lon': product.location.longitude,
      'loc_address': product.location.address,
    };
    try {
      final response = await http.post(
          'https://flutter-course-7d0aa.firebaseio.com/products.json?auth=${_authenticatedUser.token}',
          body: json.encode(productData));
      if (response.statusCode != 200 && response.statusCode != 201) {
        _isLoading = false;
        notifyListeners();
        return false;
      }
      final Map<String, dynamic> responseData = json.decode(response.body);
      productData['id'] = responseData['name'];
      ProductModel product2 = ProductModel(
        id: productData['id'],
        title: productData['title'],
        description: productData['description'],
        image: productData['image'],
        // imageUrl: productData['imageUrl'],
        // imagePath: productData['imagePath'],
        price: productData['price'],
        userEmail: productData['userEmail'],
        userId: _authenticatedUser.id,
        location: product.location,
      );
      _products.add(product2);
      _selectedProductIndex = null;
      _isLoading = false;

      notifyListeners();
      print('addProduct add firebase id' + responseData['name']);
      return true;
    } catch (error) {
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> updateProduct(ProductModel product) {
    _isLoading = true;
    notifyListeners();

    //Save into backend server
    Map<String, dynamic> updateData = {
      'title': product.title,
      'description': product.description,
      'image':product.image,
      // 'imageUrl':product.imageUrl,
      // 'imagePath':product.imagePath,
      'price': product.price,
      'userEmail': selectedProduct.userEmail,
      'userId': selectedProduct.userId,
      'loc_lat': product.location.latitude,
      'loc_lon': product.location.longitude,
      'loc_address': product.location.address,
    };

    return http
        .put(
            'https://flutter-course-7d0aa.firebaseio.com/products/${selectedProduct.id}.json?auth=${_authenticatedUser.token}',
            body: json.encode(updateData))
        .then((http.Response response) {
      _isLoading = false;
      final ProductModel updatedProduct = ProductModel(
          id: selectedProduct.id,
          title: product.title,
          description: product.description,
          image: product.image,
          // imageUrl: product.imageUrl,
          // imagePath: product.imagePath,
          price: product.price,
          location: product.location,
          userEmail: selectedProduct.userEmail,
          userId: selectedProduct.userId);
      _products[selectedProductIndex] = updatedProduct;
      notifyListeners();
      return true;
    }).catchError((error) {
      _isLoading = false;
      notifyListeners();
      return false;
    });
  }

  Future<bool> deleteProduct() {
    _isLoading = true;
    notifyListeners();
    final deletedProductId = selectedProduct.id;
    _products.removeAt(_selectedProductIndex);
    _selectedProductIndex = null;

    return http
        .delete(
            'https://flutter-course-7d0aa.firebaseio.com/products/${deletedProductId}.json?auth=${_authenticatedUser.token}')
        .then((http.Response response) {
      _isLoading = false;
      notifyListeners();
      return true;
    }).catchError((error) {
      _isLoading = false;
      notifyListeners();
      return false;
    });
  }

  void toggleProductFavoriteStatus() async {
    final bool isCurrentlyFavorite = selectedProduct.isFavorite;
    final bool newFavoriteStatus = !isCurrentlyFavorite;
    final ProductModel updatedProduct = ProductModel(
        id: selectedProduct.id,
        title: selectedProduct.title,
        description: selectedProduct.description,
        price: selectedProduct.price,
        location: selectedProduct.location,
        image: selectedProduct.image,
        isFavorite: newFavoriteStatus);

    _products[_selectedProductIndex] = updatedProduct;

    notifyListeners();

    http.Response response;
    if (newFavoriteStatus) {
      response = await http.post(
          'https://flutter-course-7d0aa.firebaseio.com/products/${updatedProduct.id}/wishListUsers/${_authenticatedUser.id}.json?auth=${_authenticatedUser.token}',
          body: json.encode(true));
    } else {
      response = await http.delete(
          'https://flutter-course-7d0aa.firebaseio.com/products/${updatedProduct.id}/wishListUsers/${_authenticatedUser.id}.json?auth=${_authenticatedUser.token}');
    }

    if (response.statusCode != 200 && response.statusCode != 201) {
      final ProductModel updatedProduct = ProductModel(
          id: selectedProduct.id,
          title: selectedProduct.title,
          description: selectedProduct.description,
          price: selectedProduct.price,
          location: selectedProduct.location,
          image: selectedProduct.image,
          // imageUrl: selectedProduct.imageUrl,
          // imagePath: selectedProduct.imagePath,
          isFavorite: !newFavoriteStatus);

      _products[_selectedProductIndex] = updatedProduct;

      notifyListeners();
    }
  }

  void toggleDisplayMode() {
    _showFavorites = !_showFavorites;
    notifyListeners();
  }

  void selectProduct(index) {
    _selectedProductIndex = index;
    notifyListeners();
  }

  Future<Map<String, dynamic>> uploadImage(File image,
      {String imagePath}) async {
    final mimeTypeData = lookupMimeType(image.path).split('/');

    final imageUploadRequest = http.MultipartRequest(
        'POST',
        Uri.parse(
            'https://us-central1-flutter-course-7d0aa.cloudfunctions.net/storeImage'));

    final file = await http.MultipartFile.fromPath('image', image.path,
        contentType: MediaType(mimeTypeData[0], mimeTypeData[1]));

    imageUploadRequest.files.add(file);

    if(imagePath != null) {
      imageUploadRequest.fields['imagePath'] = Uri.encodeComponent(imagePath);
    }

    imageUploadRequest.headers['Authorization'] = 'Bearer ${_authenticatedUser.token}';

    try {
      final streamedResponse = await imageUploadRequest.send();
      final response = await http.Response.fromStream(streamedResponse);

      if(response.statusCode != 200 && response.statusCode != 201) {
        print('Something went wrong');
        print(json.decode(response.body));
        return null;
      }

      final responseData = json.decode(response.body);
      return responseData;

    } catch(error) {

      print(error);
      return null;
    }
    
  }
}
