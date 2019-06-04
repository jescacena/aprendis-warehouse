import 'package:flutter/material.dart';
import 'package:scoped_model/scoped_model.dart';

import '../models/product_model.dart';
import '../scoped-models/main_scoped_model.dart';
import './product_card.dart';

class Products extends StatelessWidget {
  Widget _buildITemList(List<ProductModel> products) {
    Widget result;
    if (products.length > 0) {
      result = ListView.builder(
        itemBuilder: (BuildContext context, int index) =>
            ProductCard(products[index], index),
        itemCount: products.length,
      );
    } else {
      result = Center(child: Text('No products found, please add some'));
    }
    return result;
  }

  @override
  Widget build(BuildContext context) {
    print('[Products (widget)] build()');
    return ScopedModelDescendant<MainScopedModel>(builder:
        (BuildContext context, Widget child, MainScopedModel model) {
      return model.displayedProducts == null
          ? Container()
          : _buildITemList(model.displayedProducts);
    });
  }
}
