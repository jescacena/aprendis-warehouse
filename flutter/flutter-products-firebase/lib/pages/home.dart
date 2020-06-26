import 'package:flutter/material.dart';
import 'package:flutter_course/widgets/adaptive_progress_indicators.dart';
import 'package:scoped_model/scoped_model.dart';
import 'package:flutter/cupertino.dart';

import '../widgets/products.dart';
import '../models/product_model.dart';
import '../scoped-models/main_scoped_model.dart';

class HomePage extends StatefulWidget {
  final MainScopedModel model;

  HomePage(this.model);

  @override
  State<StatefulWidget> createState() {
    return _HomePageState();
  }
}

class _HomePageState extends State<HomePage> {
  @override
  initState() {
    widget.model.fetchProducts();
    super.initState();
  }

  Widget _buildSideDrawer(BuildContext context) {
    return Drawer(
      child: Column(children: <Widget>[
        AppBar(
          automaticallyImplyLeading: false,
          title: Text('Choose'),
          elevation: Theme.of(context).platform == TargetPlatform.iOS ? 0 : 4.0,
        ),
        ListTile(
            title: Text('Manage products'),
            onTap: () {
              Navigator.pushReplacementNamed(context, '/manager');
            }),
        ScopedModelDescendant<MainScopedModel>(builder:
            (BuildContext context, Widget child, MainScopedModel model) {
          return ListTile(
              title: Text('Logout'),
              leading: Icon(Icons.exit_to_app),
              onTap: () {
                model.logout();
              });
        })
      ]),
    );
  }

  Widget _buildContent() {
    return ScopedModelDescendant(
      builder: (BuildContext context, Widget child, MainScopedModel model) {
        Widget content = Center(child: Text('No products found'));

        if (model.displayedProducts.length > 0 && !model.isLoading) {
          content = Products();
        } else if (model.isLoading) {
          content = Center(
            child: AdaptiveProgressIndicator(),
          );
        }

        return RefreshIndicator(onRefresh: model.fetchProducts, child: content);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    print('[HOME] build()');

    return Scaffold(
        drawer: _buildSideDrawer(context),
        appBar: AppBar(
          title: Text('Home'),
          elevation: Theme.of(context).platform == TargetPlatform.iOS ? 0 : 4.0,
          actions: <Widget>[
            ScopedModelDescendant<MainScopedModel>(builder:
                (BuildContext context, Widget child, MainScopedModel model) {
              return IconButton(
                icon: Icon(model.displayFavoritesMode
                    ? Icons.favorite
                    : Icons.favorite_border),
                onPressed: () {
                  model.toggleDisplayMode();
                },
              );
            }),
          ],
        ),
        body: _buildContent());
  }
}
