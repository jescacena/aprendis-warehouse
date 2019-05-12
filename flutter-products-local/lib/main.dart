import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:scoped_model/scoped_model.dart';

import './pages/auth.dart';
import './pages/home.dart';
import './pages/product_manager_page.dart';
import './pages/product_detail.dart';

import './models/product_model.dart';

import './scoped-models/main_scoped_model.dart';

void main() {
  // debugPaintSizeEnabled = true;
  debugPaintBaselinesEnabled = false;
  debugPaintPointersEnabled = false;
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MyAppState();
  }
}

class _MyAppState extends State<MyApp> {
  List<ProductModel> _products = [];

  @override
  void initState() {
    print('[ProductManager] initState()');

    _products = [];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return ScopedModel<MainScopedModel>(
      model: MainScopedModel(),
      child: MaterialApp(
        debugShowMaterialGrid: false,
        theme: ThemeData(
            primarySwatch: Colors.deepOrange,
            brightness: Brightness.light,
            accentColor: Colors.deepPurple,
            buttonColor: Colors.red
            // fontFamily: 'Oswald'
            ),
        // home: AuthPage());
        routes: {
          '/': (BuildContext context) => AuthPage(),
          '/home': (BuildContext context) => HomePage(_products),
          '/manager': (BuildContext context) => ProductManagerPage()
        },
        onGenerateRoute: (RouteSettings settings) {
          final List<String> pathElements = settings.name.split('/');
          if (pathElements[0] != '') {
            return null;
          }
          if (pathElements[1] == 'product') {
            // '/product/1'
            final int index = int.parse(pathElements[2]);

            return MaterialPageRoute<bool>(
                builder: (BuildContext context) =>
                    ProductDetail(index));
          }
        },
        onUnknownRoute: (RouteSettings settings) {
          return MaterialPageRoute(
              builder: (BuildContext context) => HomePage(_products));
        },
      ),
    );
  }
}
