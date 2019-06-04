import 'package:flutter/material.dart';
import 'package:flutter_course/widgets/adaptive_progress_indicators.dart';
import 'package:scoped_model/scoped_model.dart';

import '../scoped-models/main_scoped_model.dart';

enum AuthSwitch { Signup, Login }

class AuthPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _AuthPageState();
  }
}

class _AuthPageState extends State<AuthPage> with TickerProviderStateMixin {
  Map<String, dynamic> _formData = {'user': null, 'password': null};
  bool _acceptTermValue = false;
  GlobalKey<FormState> _formKey = new GlobalKey<FormState>();
  String errorMessage = null;
  final TextEditingController _passwordTextController = TextEditingController();
  AuthSwitch _authSwitch = AuthSwitch.Login;

  AnimationController _animationController;

  Animation<Offset> _slideInTransition;

  void initState() {
    _animationController =
        AnimationController(vsync: this, duration: Duration(milliseconds: 300));

    _slideInTransition =
        Tween<Offset>(begin: Offset(0.0, -2.0), end: Offset.zero).animate(
            CurvedAnimation(
                parent: _animationController,
                curve: Curves.fastOutSlowIn,
                reverseCurve: Curves.fastOutSlowIn));

    super.initState();
  }

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

  _showErrorDialog(BuildContext context, String errorMessage) {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Signup error'),
            content: Text(errorMessage),
            actions: <Widget>[
              FlatButton(
                child: Text('Ok'),
                onPressed: () {
                  Navigator.of(context).pop();
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
        controller: _passwordTextController,
        validator: (String value) {
          if (value.isEmpty) {
            return "Password is empty";
          }
        },
        onSaved: (String value) {
          _formData['password'] = value;
        });
  }

  Widget _buildConfirmPasswordField() {
    return FadeTransition(
        opacity: CurvedAnimation(
          parent: _animationController,
          curve: Interval(0.0, 1.0, curve: Curves.easeInOut),
        ),
        child: SlideTransition(
            position: _slideInTransition,
            child: TextFormField(
                decoration: InputDecoration(
                    labelText: 'Confirm Password',
                    filled: true,
                    fillColor: Colors.white),
                obscureText: true,
                validator: (String value) {
                  if (value.isEmpty && _authSwitch == AuthSwitch.Signup) {
                    return "Password is empty";
                  }
                  if (_passwordTextController.text != value &&
                      _authSwitch == AuthSwitch.Signup) {
                    return "Password doesnt match";
                  }
                })));
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

  void _submitForm(Function login, Function signup) async {
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

    var result;
    if (_authSwitch == AuthSwitch.Login) {
      result = await login(_formData['user'], _formData['password']);
    } else {
      result = await signup(_formData['user'], _formData['password']);
    }
    if (result['success']) {
      _showWelcomeDialog(context);
    } else {
      _showErrorDialog(context, result['message']);
    }
  }

  Widget _buildSubmitButton() {
    return ScopedModelDescendant<MainScopedModel>(
        builder: (BuildContext context, Widget child, MainScopedModel model) {
      return model.isLoading
          ? Center(child: AdaptiveProgressIndicator())
          : RaisedButton(
              textColor: Colors.white,
              onPressed: () => _submitForm(model.login, model.signUp),
              child:
                  Text(_authSwitch == AuthSwitch.Login ? 'LOGIN' : 'SIGNUP'));
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

  Widget _buildSigninSignupSwitch() {
    return FlatButton(
      child: Text(_authSwitch == AuthSwitch.Login ? 'Signup' : 'Login'),
      onPressed: () {
        if (_authSwitch == AuthSwitch.Login) {
          setState(() {
            _authSwitch = AuthSwitch.Signup;
          });
          _animationController.forward();
        } else {
          setState(() {
            _authSwitch = AuthSwitch.Login;
          });
          _animationController.reverse();
        }
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final double deviceWidth = MediaQuery.of(context).size.width;
    final double targetWidth = (deviceWidth > 550) ? 300.0 : deviceWidth * 0.8;
    return Scaffold(
      appBar: AppBar(
        title: Text('Auth'),
        elevation: Theme.of(context).platform == TargetPlatform.iOS ? 0 : 4.0,
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
                    _buildConfirmPasswordField(),
                    SizedBox(height: 20.0),
                    _buildAcceptSwitch(),
                    SizedBox(height: 20.0),
                    _buildSigninSignupSwitch(),
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
