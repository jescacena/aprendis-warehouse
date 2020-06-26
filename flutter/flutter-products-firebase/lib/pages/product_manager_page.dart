import 'package:flutter/material.dart';

import './product_edit.dart';
import './product_list.dart';
import '../scoped-models/main_scoped_model.dart';

class ProductManagerPage extends StatelessWidget {
  final MainScopedModel model;

  ProductManagerPage(this.model);

  final List<Tab> myTabs = <Tab>[
    Tab(icon: Icon(Icons.create), text: 'Create Product'),
    Tab(icon: Icon(Icons.list), text: 'My Products'),
  ];

  Widget _buildSideDrawer(BuildContext context) {
    return Drawer(
        child: Column(
      children: <Widget>[
        AppBar(
          automaticallyImplyLeading: false,
          title: Text('Choose'),
          elevation: Theme.of(context).platform == TargetPlatform.iOS ? 0 : 4.0,
        ),
        ListTile(
            leading: Icon(Icons.shop),
            title: Text('Home'),
            onTap: () {
              Navigator.pushReplacementNamed(context, '/home');
            })
      ],
    ));
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 2,
        child: Scaffold(
            drawer: _buildSideDrawer(context),
            appBar: AppBar(
              title: Text('Product manager page'),
              elevation:
                  Theme.of(context).platform == TargetPlatform.iOS ? 0 : 4.0,
              bottom: TabBar(
                tabs: myTabs,
              ),
            ),
            body: TabBarView(
              children: <Widget>[ProductEditPage(), ProductListPage(model)],
            )));
  }
}
