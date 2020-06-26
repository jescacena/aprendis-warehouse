import 'package:flutter/material.dart';
import 'package:scoped_model/scoped_model.dart';

import './product_edit.dart';
import '../scoped-models/main_scoped_model.dart';
import '../models/product_model.dart';

class ProductListPage extends StatelessWidget {
  Widget _buildEditIconButton(
      BuildContext context, MainScopedModel scopedModel, int index) {
    return IconButton(
        icon: Icon(Icons.edit),
        onPressed: () {
          scopedModel.selectProduct(index);
          Navigator.of(context).push(
            MaterialPageRoute(builder: (BuildContext context) {
              return ProductEditPage();
            }),
          );
        });
  }

  Widget _buildListTile(
      BuildContext context, MainScopedModel scopedModel, int index) {
    return ListTile(
      leading: CircleAvatar(
        backgroundImage: AssetImage(scopedModel.products[index].image),
      ),
      title: Text(scopedModel.products[index].title),
      subtitle: Text('\$${scopedModel.products[index].price.toString()}'),
      trailing: _buildEditIconButton(context, scopedModel, index),
    );
  }

  @override
  Widget build(BuildContext context) {
    return ScopedModelDescendant<MainScopedModel>(builder:
        (BuildContext context, Widget child, MainScopedModel model) {
      return ListView.builder(
        itemCount: model.products.length,
        itemBuilder: (BuildContext context, int index) {
          return Dismissible(
            key: Key(model.products[index].title),
            background: Container(color: Colors.red),
            onDismissed: (DismissDirection direction) {
              if (direction == DismissDirection.endToStart) {
                model.selectProduct(index);
                model.deleteProduct();
              }
            },
            child: Column(
              children: <Widget>[
                _buildListTile(context, model, index),
                Divider(
                  height: 2,
                )
              ],
            ),
          );
        },
      );
    });
  }
}
