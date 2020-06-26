import 'package:flutter/material.dart';

final ThemeData _androidTheme = ThemeData(
    primarySwatch: Colors.deepOrange,
    brightness: Brightness.light,
    accentColor: Colors.deepPurple,
    buttonColor: Colors.red
    // fontFamily: 'Oswald'
    );

final ThemeData _iosTheme = ThemeData(
    primarySwatch: Colors.grey,
    brightness: Brightness.light,
    accentColor: Colors.deepPurple,
    buttonColor: Colors.red
    // fontFamily: 'Oswald'
    );

ThemeData getAdaptiveTheme(context) {
  return Theme.of(context).platform == TargetPlatform.android
      ? _androidTheme
      : _iosTheme;
}
