import 'package:flutter_course/models/user_model.dart';
import 'package:scoped_model/scoped_model.dart';

mixin UserScopedModel on Model {
  UserModel _authenticatedUser;

  UserModel get authenticatedUser {
    return _authenticatedUser;
  }
  void login(String email, String password) {
    _authenticatedUser =
        UserModel(id: 'fdfdd', email: email, password: password);

        print('Authenticated user-->' + _authenticatedUser.toString());
  }
}
