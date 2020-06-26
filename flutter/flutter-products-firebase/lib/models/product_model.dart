import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_course/models/location_data.dart';

class ProductModel {
  final String id;
  final String title;
  final String description;
  final double price;
  final String image;
  final String imageUrl;
  final String imagePath;
  final bool isFavorite;
  final String userEmail;
  final String userId;
  final LocationData location;

  ProductModel({
    @required this.id,
    @required this.title,
    @required this.description,
    @required this.price,
    @required this.image,
    this.imageUrl,
    this.imagePath,
    @required this.userEmail,
    @required this.userId,
    @required this.location,
    this.isFavorite = false,
  });
}
