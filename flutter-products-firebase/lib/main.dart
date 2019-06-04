import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_course/widgets/adaptive_theme.dart';
import 'package:scoped_model/scoped_model.dart';
// import 'package:map_view/map_view.dart';

import './pages/auth.dart';
import './pages/home.dart';
import './pages/product_manager_page.dart';
import './pages/product_detail.dart';

import './scoped-models/main_scoped_model.dart';

import './widgets/helpers/custom_route.dart';

void main() {
  // debugPaintSizeEnabled = true;
  debugPaintBaselinesEnabled = false;
  debugPaintPointersEnabled = false;
  // MapView.setApiKey("AIzaSyD8jzGVNH7GDsN7ZQX6HOBU54iX_U_YeLo");

  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MyAppState();
  }
}

class _MyAppState extends State<MyApp> {
  MainScopedModel model = MainScopedModel();
  bool _isAuthenticated = false;
  final _platformChannel = MethodChannel('flutter-course.com/battery');

  Future<Null> _getBatteryLevel() async {
    String batteryLevel;
    try {
      final int result = await _platformChannel.invokeMethod('getBatteryLevel');
      batteryLevel = 'Battery Level is $result %.';
      print(batteryLevel);
    } catch (error) {
      batteryLevel = 'Failed to get Battery Level.';
      print(error);
    }
  }

  @override
  void initState() {
    print('[ProductManager] initState()');
    model.autoAuthentication();
    model.userSubject.listen((bool isAuthenticated) {
      setState(() {
        _isAuthenticated = isAuthenticated;
      });
    });
    _getBatteryLevel();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return ScopedModel<MainScopedModel>(
      model: model,
      child: MaterialApp(
        title:'Flutter Jander Clander',
        debugShowMaterialGrid: false,
        theme: getAdaptiveTheme(context),
        // home: AuthPage());
        routes: {
          '/': (BuildContext context) =>
              !_isAuthenticated ? AuthPage() : HomePage(model),
          '/manager': (BuildContext context) =>
              !_isAuthenticated ? AuthPage() : ProductManagerPage(model)
        },
        onGenerateRoute: (RouteSettings settings) {
          if (!_isAuthenticated) {
            return MaterialPageRoute(
                builder: (BuildContext context) => AuthPage());
          }
          final List<String> pathElements = settings.name.split('/');
          if (pathElements[0] != '') {
            return null;
          }
          if (pathElements[1] == 'product') {
            // '/product/1'
            final int index = int.parse(pathElements[2]);

            return MaterialPageRoute<bool>(
                builder: (BuildContext context) => ProductDetail(index));
          }
        },
        onUnknownRoute: (RouteSettings settings) {
          return CustomRoute(
              builder: (BuildContext context) =>
                  !_isAuthenticated ? AuthPage() : HomePage(model));
        },
      ),
    );
  }
}
