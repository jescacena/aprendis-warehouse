import 'package:flutter/material.dart';
import 'package:scoped_model/scoped_model.dart';

import '../widgets/products.dart';
import '../models/product_model.dart';
import '../scoped-models/main_scoped_model.dart';

class HomePage extends StatelessWidget {
  final List<ProductModel> products;
  HomePage(this.products) {
    print('[ProductManager] constructor');
  }

  Widget _buildSideDrawer(BuildContext context) {
    return Drawer(
      child: Column(children: <Widget>[
        AppBar(automaticallyImplyLeading: false, title: Text('Choose')),
        ListTile(
            title: Text('Manage products'),
            onTap: () {
              Navigator.pushReplacementNamed(context, '/manager');
            })
      ]),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: _buildSideDrawer(context),
        appBar: AppBar(
          title: Text('Home'),
          actions: <Widget>[
            ScopedModelDescendant<MainScopedModel>(builder:
                (BuildContext context, Widget child,
                    MainScopedModel model) {
              return IconButton(
                icon: Icon(model.displayFavoritesMode
                    ? Icons.favorite
                    : Icons.favorite_border),
                onPressed: () {
                  model.toggleDisplayMode();
                },
              );
            })
          ],
        ),
        body: Products());
  }
}
