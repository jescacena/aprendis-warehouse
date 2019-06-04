import 'package:flutter/material.dart';
import 'package:flutter_course/models/product_model.dart';
// import 'package:map_view/map_view.dart';
import 'package:http/http.dart' as http;
import 'package:location/location.dart' as geoloc;

import 'dart:convert';

import './ensure-visible.dart';

import '../models/location_data.dart';

class LocationInput extends StatefulWidget {
  final Function setLocation;
  final ProductModel product;

  LocationInput(this.setLocation, this.product);

  @override
  State<StatefulWidget> createState() {
    return _LocationInputState();
  }
}

class _LocationInputState extends State<LocationInput> {
  final FocusNode _addressInputFocusNode = FocusNode();
  Uri _staticMapUri;
  final TextEditingController _addressInputController = TextEditingController();
  LocationData _locationData;

  @override
  void initState() {
    _addressInputFocusNode.addListener(_updateLocation);
    if (widget.product != null) {
      getStaticMap(widget.product.location.address, false);
    }

    super.initState();
  }

  @override
  void dispose() {
    _addressInputFocusNode.removeListener(_updateLocation);
    super.dispose();
  }

  void getStaticMap(String address, [geocode = true]) async {
    String addressResult;
    if (address.isEmpty) {
      setState(() {
        _staticMapUri = null;
      });
      return;
    }

    if (geocode) {
      // Geocode
      final Uri uri =
          Uri.https('nominatim.openstreetmap.org', '/search/${address}', {
        'format': 'json',
        'addressdetails': '1',
        'limit': '1',
      });

      // final Uri uri = Uri.https('maps.googleapis.com', '/maps/api/geocode/json',
      //     {'address': address, 'key': 'AIzaSyD8jzGVNH7GDsN7ZQX6HOBU54iX_U_YeLo'});
      // https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=bakery+in+berlin+wedding&format=json&limit=1

      final http.Response response = await http.get(uri);
      if (response.statusCode != 200 && response.statusCode != 201) {
        print(response.body);
        setState(() {
          _staticMapUri = null;
        });
        widget.setLocation(null);
        return;
      }
      final decodedResponse = json.decode(response.body);
      print(decodedResponse);
      if (decodedResponse == null || decodedResponse.length == 0) {
        setState(() {
          _staticMapUri = null;
        });
        widget.setLocation(null);
        return;
      }
      addressResult = decodedResponse[0]['display_name'];
      final double lat = double.parse(decodedResponse[0]['lat']);
      final double lon = double.parse(decodedResponse[0]['lon']);
      _locationData =
          LocationData(latitude: lat, longitude: lon, address: addressResult);
    } else {
      _locationData = widget.product.location;
      addressResult = widget.product.location.address;
    }

    widget.setLocation(_locationData);

    // Get static map uri
    // final StaticMapProvider staticMapProvider =
    //     StaticMapProvider('AIzaSyD8jzGVNH7GDsN7ZQX6HOBU54iX_U_YeLo');
    // final Uri staticMapUri = staticMapProvider.getStaticUriWithMarkers([
    //   Marker('position', 'Position', _locationData.latitude,
    //       _locationData.longitude),
    // ],
    //     center: Location(_locationData.latitude, _locationData.longitude),
    //     width: 500,
    //     height: 300,
    //     maptype: StaticMapViewType.roadmap);

    setState(() {
      _staticMapUri = null;
      // _staticMapUri = staticMapUri;
      _addressInputController.text = addressResult;
    });
  }

  

  void _getUserLocation() async {
    final location = geoloc.Location();
    final currentLocation = await location.getLocation();
    print('JES' + currentLocation.toString());
  }

  void _updateLocation() {
    getStaticMap(_addressInputController.text);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        EnsureVisibleWhenFocused(
            focusNode: _addressInputFocusNode,
            child: TextFormField(
              focusNode: _addressInputFocusNode,
              controller: _addressInputController,
              decoration: InputDecoration(labelText: 'Address'),
              // validator: (String value) {
              //   if (_locationData == null || value.isEmpty) {
              //     return 'No valid location found.';
              //   }
              // },
            )),
        SizedBox(height: 10.0),
        FlatButton(
          child: Text('Locate user'),
          onPressed: _getUserLocation,
        ),
        SizedBox(height: 10.0),
        _staticMapUri == null
            ? Container()
            : Image.network(_staticMapUri.toString())
      ],
    );
  }
}
