import 'package:scoped_model/scoped_model.dart';

import './products_scoped_model.dart';
import './user_scoped_model.dart';

class MainScopedModel extends Model with UserScopedModel, ProductsScopedModel {}
