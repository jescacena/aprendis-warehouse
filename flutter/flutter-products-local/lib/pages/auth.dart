import 'package:flutter/material.dart';
import 'package:scoped_model/scoped_model.dart';

import '../scoped-models/main_scoped_model.dart';

class AuthPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _AuthPageState();
  }
}

class _AuthPageState extends State<AuthPage> {
  Map<String, dynamic> _formData = {'user': null, 'password': null};
  bool _acceptTermValue = false;
  GlobalKey<FormState> _formKey = new GlobalKey<FormState>();
  String errorMessage = null;

  _showWelcomeDialog(BuildContext context) {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Welcome ' + _formData['user']),
            content: Text('This is the Product List JANDER / CLANDER'),
            actions: <Widget>[
              FlatButton(
                child: Text('CONTINUE'),
                onPressed: () {
                  Navigator.pushReplacementNamed(
                      context, '/home'); // CLose the dialog
                },
              )
            ],
          );
        });
  }

  Widget _buildUserField() {
    return TextFormField(
        decoration: InputDecoration(
            labelText: 'Email', filled: true, fillColor: Colors.white),
        keyboardType: TextInputType.emailAddress,
        validator: (String value) {
          if (value.isEmpty ||
              !RegExp(r"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                  .hasMatch(value)) {
            return "Email is not valid";
          }
        },
        onSaved: (String value) {
          _formData['user'] = value;
        });
  }

  Widget _buildPasswordField() {
    return TextFormField(
        decoration: InputDecoration(
            labelText: 'Password', filled: true, fillColor: Colors.white),
        obscureText: true,
        validator: (String value) {
          if (value.isEmpty) {
            return "Password is empty";
          }
        },
        onSaved: (String value) {
          _formData['password'] = value;
        });
  }

  Widget _buildAcceptSwitch() {
    return SwitchListTile(
      value: _acceptTermValue,
      title: Text('Accept Terms'),
      onChanged: (bool value) {
        setState(() {
          _acceptTermValue = value;
        });
      },
    );
  }

  void _submitForm(Function login) {
    if (!_formKey.currentState.validate()) {
      return;
    }
    if (!_acceptTermValue) {
      setState(() {
        errorMessage = "Must accept the terms";
      });
      return;
    }
    _formKey.currentState.save();
    login(_formData['user'], _formData['password']);
    _showWelcomeDialog(context);
  }

  Widget _buildSubmitButton() {
    return ScopedModelDescendant<MainScopedModel>(
        builder: (BuildContext context, Widget child, MainScopedModel model) {
      return RaisedButton(
          textColor: Colors.white,
          onPressed: () => _submitForm(model.login),
          child: Text('LOGIN'));
    });
    // return GestureDetector(
    //   onTap: () {
    //     _showWelcomeDialog(context);
    //   },
    //   child: Container(
    //     padding: EdgeInsets.all(10.0),
    //     color: Colors.red,
    //     child: Text('LOGIN'),
    //   ),
    // );
  }

  DecorationImage _buildBackgroundImage() {
    return DecorationImage(
      fit: BoxFit.cover,
      colorFilter:
          ColorFilter.mode(Colors.black.withOpacity(0.3), BlendMode.dstATop),
      image: AssetImage('assets/background.jpg'),
    );
  }

  Widget _buildErrorMessage() {
    return (errorMessage != null && errorMessage.isNotEmpty
        ? Text(
            errorMessage,
            style: TextStyle(color: Colors.red),
          )
        : Container());
  }

  @override
  Widget build(BuildContext context) {
    final double deviceWidth = MediaQuery.of(context).size.width;
    final double targetWidth = (deviceWidth > 550) ? 300.0 : deviceWidth * 0.8;
    return Scaffold(
      appBar: AppBar(
        title: Text('Auth'),
      ),
      body: Container(
        decoration: BoxDecoration(
          image: _buildBackgroundImage(),
        ),
        padding: EdgeInsets.all(10.0),
        child: Center(
          child: SingleChildScrollView(
            child: Container(
              width: targetWidth,
              child: Form(
                key: _formKey,
                child: Column(
                  children: <Widget>[
                    _buildUserField(),
                    SizedBox(height: 10.0),
                    _buildPasswordField(),
                    SizedBox(height: 20.0),
                    _buildAcceptSwitch(),
                    SizedBox(height: 20.0),
                    _buildSubmitButton(),
                    SizedBox(height: 20.0),
                    _buildErrorMessage()
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
