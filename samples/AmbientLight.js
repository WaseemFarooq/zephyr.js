// Copyright (c) 2016-2018, Intel Corporation.

// Test code to use the AmbientLightSensor (subclass of Generic Sensor) API
// to communicate with the Grove Light sensor on the Arduino 101

// Hardware Requirements:
//   - A Grove Light sensor
// Wiring:
//   - Wire the sensor's power to Arduino 3.3V or 5V and ground to GND (try 5V if you are
//       seeing inaccurate numbers as 3.3V may not have enough power)
//   - Wire the signal pin to Arduino A2

// Reference chart for measuring light
// https://learn.adafruit.com/photocells/measuring-light
//
// Illuminance                  Example
// 0.002 lux                    Moonless clear night sky
// 0.2 lux                      Design minimum for emergency lighting (AS2293).
// 0.27 - 1 lux                 Full moon on a clear night
// 3.4 lux                      Dark limit of civil twilight under a clear sky
// 50 lux                       Family living room
// 80 lux                       Hallway/toilet
// 100 lux                      Very dark overcast day
// 300 - 500 lux                Sunrise or sunset on a clear day. Well-lit office area.
// 1,000 lux                    Overcast day; typical TV studio lighting
// 10,000 - 25,000 lux          Full daylight (not direct sun)
// 32,000 - 130,000 lux         Direct sunlight

console.log("Ambient light test...");

var sensor = new AmbientLightSensor({
    pin: 'A2'
});

sensor.onreading = function() {
    var val = sensor.illuminance;
    if (val <= 1) {
        console.log("(very dark): " + sensor.illuminance);
    } else if (val > 1 && val <= 50) {
        console.log("(very dim): " + sensor.illuminance);
    } else if (val > 50 && val <= 100) {
        console.log("(dim): " + sensor.illuminance);
    } else if (val > 100 && val <= 300) {
        console.log("(average-lit): " + sensor.illuminance);
    } else if (val > 300 && val <= 500) {
        console.log("(well-lit): " + sensor.illuminance);
    } else if (val > 500 && val <= 1000) {
        console.log("(overcast day): " + sensor.illuminance);
    } else if (val > 1000 && val <= 10000) {
        console.log("(day light): " + sensor.illuminance);
    } else
        console.log("(full brightness): " + sensor.illuminance);
};

sensor.onactivate = function() {
    console.log("activated");
};

sensor.onerror = function(event) {
    console.log("error: " + event.error.name +
                " - " + event.error.message);
};

sensor.start();
