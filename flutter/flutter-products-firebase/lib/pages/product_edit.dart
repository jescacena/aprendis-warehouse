import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_course/models/location_data.dart';
import 'package:flutter_course/widgets/adaptive_progress_indicators.dart';
import 'package:flutter_course/widgets/image.dart';
import 'package:flutter_course/widgets/location.dart';
import 'package:scoped_model/scoped_model.dart';

import '../widgets/ensure-visible.dart';
import '../models/product_model.dart';
import '../scoped-models/main_scoped_model.dart';

class ProductEditPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _ProductEditPageState();
  }
}

class _ProductEditPageState extends State<ProductEditPage> {
  Map<String, dynamic> _formData = {
    'title': null,
    'description': null,
    'price': null,
    'image': null,
    'location': null
  };

  GlobalKey<FormState> _formKey = new GlobalKey<FormState>();
  final _titleFocusNode = FocusNode();
  final _descriptionFocusNode = FocusNode();
  final _priceFocusNode = FocusNode();

  Widget _buildTitleWidget(ProductModel product) {
    return EnsureVisibleWhenFocused(
      focusNode: _titleFocusNode,
      child: TextFormField(
          focusNode: _titleFocusNode,
          decoration: InputDecoration(labelText: 'Product title'),
          initialValue: product == null ? '' : product.title,
          validator: (String value) {
            if (value.isEmpty) {
              return 'Title is empty';
            }
          },
          onSaved: (String value) {
            _formData['title'] = value;
          }),
    );
  }

  Widget _buildDescriptionWidget(ProductModel product) {
    return EnsureVisibleWhenFocused(
      focusNode: _descriptionFocusNode,
      child: TextFormField(
          focusNode: _descriptionFocusNode,
          decoration: InputDecoration(labelText: 'Product description'),
          initialValue: product == null ? '' : product.description,
          maxLines: 4,
          onSaved: (String value) {
            _formData['description'] = value;
          }),
    );
  }

  Widget _buildPriceWidget(ProductModel product) {
    return EnsureVisibleWhenFocused(
      focusNode: _priceFocusNode,
      child: TextFormField(
          focusNode: _priceFocusNode,
          decoration: InputDecoration(labelText: 'Product price'),
          initialValue: product == null ? '' : product.price.toString(),
          keyboardType: TextInputType.number,
          validator: (String value) {
            double aux = value.isNotEmpty ? double.parse(value) : 0;
            if (value.isEmpty ||
                aux == 0.0 ||
                !RegExp(r'^(?:[1-9]\d*|0)?(?:\.\d+)?$').hasMatch(value)) {
              return 'Price is zero or empty';
            }
          },
          onSaved: (String value) {
            if (value.isNotEmpty) {
              _formData['price'] = double.parse(value);
            }
          }),
    );
  }

  void _setLocation(LocationData location) {
    _formData['location'] = location;
  }

  void _setImage(File image) {
    _formData['image'] = image;
  }

  void _submitForm(MainScopedModel model) {
    if (!_formKey.currentState.validate()) {
      // if (!_formKey.currentState.validate() || (_formData['image'] == null)) {
      return;
    }
    _formKey.currentState.save();
    if (model.selectedProductIndex == null) {
      model
          .addProduct(ProductModel(
              title: _formData['title'],
              description: _formData['description'],
              price: _formData['price'],
              image: _formData['image'],
              userEmail: model.authenticatedUser.email,
              userId: model.authenticatedUser.id,
              location: _formData['location']))
          .then((bool success) {
        if (success) {
          model.selectProduct(null);
          Navigator.pushReplacementNamed(context, '/home');
        } else {
          showDialog(
              context: context,
              builder: (BuildContext context) {
                return AlertDialog(
                  title: Text('Something went wrong!'),
                  content: Text('Please try again!'),
                  actions: <Widget>[
                    FlatButton(
                        onPressed: () => Navigator.of(context).pop(),
                        child: Text('OK'))
                  ],
                );
              });
        }
      });
    } else {
      model
          .updateProduct(ProductModel(
              title: _formData['title'],
              description: _formData['description'],
              price: _formData['price'],
              image: _formData['image'],
              userEmail: model.selectedProduct.userEmail,
              userId: model.selectedProduct.userId,
              location: _formData['location']))
          .then((_) => Navigator.pushReplacementNamed(context, '/home')
              .then((_) => model.selectProduct(null)));
    }
  }

  Widget _buildSaveButton() {
    return ScopedModelDescendant<MainScopedModel>(
        builder: (BuildContext context, Widget child, MainScopedModel model) {
      return ScopedModelDescendant(
          builder: (BuildContext context, Widget child, MainScopedModel model) {
        return RaisedButton(
          child: model.isLoading
              ? Center(child: AdaptiveProgressIndicator())
              : Text('SAVE'),
          textColor: Colors.white,
          onPressed: () => {_submitForm(model)},
        );
      });
    });
  }

  Widget _buildPageContent(BuildContext context, ProductModel selectedProduct) {
    final double deviceWidth = MediaQuery.of(context).size.width;
    final double targetWidth = (deviceWidth > 550) ? 300.0 : deviceWidth * 0.8;
    final targetPadding = deviceWidth - targetWidth;
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).requestFocus(FocusNode());
      },
      child: Container(
        margin: EdgeInsets.all(10.0),
        child: Form(
          key: _formKey,
          child: ListView(
            padding: EdgeInsets.symmetric(horizontal: targetPadding / 2),
            children: <Widget>[
              _buildTitleWidget(selectedProduct),
              _buildDescriptionWidget(selectedProduct),
              _buildPriceWidget(selectedProduct),
              SizedBox(
                height: 10.0,
              ),
              LocationInput(_setLocation, selectedProduct),
              SizedBox(
                height: 10.0,
              ),
              ImageInput(_setImage, selectedProduct),
              SizedBox(
                height: 10.0,
              ),
              _buildSaveButton()
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return ScopedModelDescendant<MainScopedModel>(
        builder: (BuildContext context, Widget child, MainScopedModel model) {
      final Widget pageContent =
          _buildPageContent(context, model.selectedProduct);
      return model.selectedProductIndex == null
          ? pageContent
          : Scaffold(
              appBar: AppBar(
                title: Text('Edit product'),
                elevation: Theme.of(context).platform == TargetPlatform.iOS ? 0 : 4.0,
              ),
              body: pageContent);
    });
  }
}
