(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.set_throttle = function(t) {

       $.ajax({
             url: 'http://car.local:5000/_set_servo?t=' + t,
             dataType: 'jsonp',
             success: function( servo_data ) {
                 throttle = servo_data['t'];
                 callback(throttle);
             }
       });
    };

    ext.set_steering = function(s) {

       $.ajax({
             url: 'http://car.local:5000/_set_servo?s=' + s,
             dataType: 'jsonp',
             success: function( servo_data ) {
                 steering = servo_data['s'];
                 callback(steering);
             }
       });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          // Block type, block name, function name
        [' ', 'Set Throttle %n', 'set_throttle', 330],
        [' ', 'Set Steering %n', 'set_steering', 315],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Picar extension', descriptor, ext);
})({});
