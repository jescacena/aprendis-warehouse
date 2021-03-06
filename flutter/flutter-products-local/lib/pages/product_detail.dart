import 'package:flutter/material.dart';
import 'package:scoped_model/scoped_model.dart';
import 'dart:async';

import '../widgets/price_tag.dart';
import '../widgets/title_default.dart';
import '../scoped-models/main_scoped_model.dart';

class ProductDetail extends StatelessWidget {
  final int productIndex;

  ProductDetail(this.productIndex);

  _showWarningDialog(BuildContext context) {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Are you sure JANDER?'),
            content: Text('This action cannot be undone CLANDER!'),
            actions: <Widget>[
              FlatButton(
                  child: Text('DISCARD'),
                  onPressed: () {
                    Navigator.pop(context); // CLose the dialog
                  }),
              FlatButton(
                child: Text('CONTINUE'),
                onPressed: () {
                  Navigator.pop(context); // CLose the dialog
                  Navigator.pop(context,
                      true); // Pop current page to go back to previous one
                },
              )
            ],
          );
        });
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () {
        print('Back button pressed');
        Navigator.pop(context, false);
        return Future.value(false);
      },
      child: ScopedModelDescendant<MainScopedModel>(
        builder:
            (BuildContext context, Widget child, MainScopedModel model) {
          return Scaffold(
            appBar: AppBar(
              leading: Icon(Icons.description),
              title: Text('Product detail'),
            ),
            body: Center(
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Image.asset(model.products[productIndex].image),
                    Container(
                      padding: EdgeInsets.all(10.0),
                      child: TitleDefault(model.products[productIndex].title),
                    ),
                    Container(
                      padding: EdgeInsets.all(10.0),
                      child: Text(model.products[productIndex].description,
                          style: TextStyle(
                              color: Colors.blueAccent,
                              fontSize: 13,
                              fontStyle: FontStyle.italic)),
                    ),
                    PriceTag(model.products[productIndex].price),
                    Container(
                        padding: EdgeInsets.all(10.0),
                        child: IconButton(
                            color: Theme.of(context).errorColor,
                            iconSize: 30.0,
                            icon: Icon(Icons.delete),
                            onPressed: () => _showWarningDialog(context)))
                  ]),
            ),
          );
        },
      ),
    );
  }
}
