import 'package:flutter/material.dart';
import 'package:scoped_model/scoped_model.dart';

import './price_tag.dart';
import './title_default.dart';
import '../models/product_model.dart';
import '../scoped-models/main_scoped_model.dart';

class ProductCard extends StatelessWidget {
  final ProductModel product;
  final int productIndex;

  ProductCard(this.product, this.productIndex);

  Widget _buildTitlePriceRow() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Flexible(
          flex: 5,
          fit: FlexFit.loose,
          child: TitleDefault(product.title),
        ),
        SizedBox(
          width: 10.0,
        ),
        Flexible(
          flex: 1,
          child: PriceTag(product.price),
        )
      ],
    );
  }

  Widget _buildActionButtons(BuildContext context) {
    return ScopedModelDescendant<MainScopedModel>(
        builder: (BuildContext context, Widget child, MainScopedModel model) {
      return ButtonBar(alignment: MainAxisAlignment.center, children: <Widget>[
        IconButton(
            icon: Icon(Icons.info),
            color: Theme.of(context).accentColor,
            onPressed: () {
              model.selectProduct(productIndex);
              Navigator.pushNamed<bool>(
                      context, '/product/' + productIndex.toString())
                  .then((_) {
                model.selectProduct(null);
              });
            }),
        IconButton(
            icon: Icon(model.products[productIndex].isFavorite
                ? Icons.favorite
                : Icons.favorite_border),
            color: Colors.red,
            onPressed: () {
              model.selectProduct(productIndex);
              model.toggleProductFavoriteStatus();
            }),
      ]);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: <Widget>[
          product.image != null
              ? Hero(
                  tag: product.id,
                  child: FadeInImage(
                    image: NetworkImage(product.image),
                    height: 300.0,
                    fit: BoxFit.cover,
                    placeholder: AssetImage('assets/background.jpg'),
                  ))
              : Container(),
          Container(
            padding: EdgeInsets.only(top: 10.0),
            child: _buildTitlePriceRow(),
          ),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 6.0, vertical: 2.5),
            decoration: BoxDecoration(
                border: Border.all(color: Colors.grey, width: 1.0),
                borderRadius: BorderRadius.circular(4.0)),
            child: product.userEmail != null
                ? Text(product.userEmail)
                : Container(),
          ),
          _buildActionButtons(context)
        ],
      ),
    );
  }
}
