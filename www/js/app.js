var app = angular.module('starter', ['ionic','ngCordova']);

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.controller('ImagePickerController', function($scope, $cordovaImagePicker, $ionicPlatform, $cordovaContacts) {

    $scope.collection = {
        selectedImage : ''
    };

    $ionicPlatform.ready(function() {

        $scope.getImageSaveContact = function() {
            // Image picker will load images according to these settings
            var options = {
                maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
                width: 800,
                height: 800,
                quality: 80            // Higher is better
            };

            // $cordovaImagePicker.getPictures(options).then(function (results) {
            $cordovaImagePicker.getPictures().then(function (results) {
                // Loop through acquired images
                for (var i = 0; i < results.length; i++) {
                    $scope.collection.selectedImage = results[i];   // We loading only one image so we can use it like this

                    window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){  // Encode URI to Base64 needed for contacts plugin
                        $scope.collection.selectedImage = base64;
                        $scope.addContact();    // Save contact
                    });
                }
            }, function(error) {
                console.log('Error: ' + JSON.stringify(error));    // In case of error
            });
        };

    });

    $scope.contact = {     // We will use it to save a contact

        "displayName": "Gajotres",
        "name": {
            "givenName"  : "Dragannn",
            "familyName" : "Gaiccc",
            "formatted"  : "Dragannn Gaiccc"
        },
        "nickname": 'Gajotres',
        "phoneNumbers": [
            {
                "value": "+385959052082",
                "type": "mobile"
            },
            {
                "value": "+385914600731",
                "type": "phone"
            }
        ],
        "emails": [
            {
                "value": "dragan.gaic@gmail.com",
                "type": "home"
            }
        ],
        "addresses": [
            {
                "type": "home",
                "formatted": "Some Address",
                "streetAddress": "Some Address",
                "locality":"Zagreb",
                "region":"Zagreb",
                "postalCode":"10000",
                "country":"Croatia"
            }
        ],
        "ims": null,
        "organizations": [
            {
                "type": "Company",
                "name": "Generali",
                "department": "IT",
                "title":"Senior Java Developer"
            }
        ],
        "birthday": Date("08/01/1980"),
        "note": "",
        "photos": [
            {
                "type": "base64",
                "value": $scope.collection.selectedImage

            }
        ],
        "categories": null,
        "urls": null
    }

    $scope.addContact = function() {
        $cordovaContacts.save($scope.contact).then(function(result) {
            console.log('Contact Saved!');
        }, function(err) {
            console.log('An error has occured while saving contact data!');
        });
    };

});
