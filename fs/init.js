// load('api_config.js');
// load('api_gpio.js');
// load('api_mqtt.js');
// load('api_net.js');
// load('api_sys.js');
// load('api_timer.js');
// load('api_dht.js');


// let pin = 5, topic = 'my/topic';
// GPIO.set_button_handler(pin, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 1000, function() {
//   // let res = MQTT.pub('my/topic', JSON.stringify({ a: 1, b: 2 }), 1);
//   // print('Published:', res ? 'yes' : 'no');
//   print("Se presionó el botón");
// }, null);


load('api_gpio.js');
load('api_mqtt.js');
load('api_sys.js');
load('api_config.js');

let pin = 0;   // GPIO 0 is typically a 'Flash' button
GPIO.set_button_handler(pin, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function(x) {
  let topic = Cfg.get('device.id') + '/sensor';
  let message = JSON.stringify({
    total_ram: Sys.total_ram(),
    free_ram: Sys.free_ram()
  });
  print(topic);
  print(message);
  print("Se presionó un btn");
  let ok = MQTT.pub(topic, message, 2);
  print('Published:', ok ? 'yes' : 'no', 'topic:', topic, 'message:', message);
}, true);