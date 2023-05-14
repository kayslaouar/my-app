#include <WiFi.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#define LED 2
#define motor1pin1 A13
#define motor1pin2 A14

const char* ssid = "CICS_Makerspace";
const char* password = "makerspace";
const char* mdns_name = "256FinalProjectCKM"; // change this to your desired mDNS name

WebServer server(80);

void handleRequest() {
  Serial.println("REQ RECV!");
  String direction = server.arg("direction");
  int speed = server.arg("speed").toInt();
  int delay_time = server.arg("delay").toInt() * 1000;
  Serial.println(direction);
  if ((direction == "up") || (direction == "down")) {
    int motorPinHigh = motor1pin1, motorPinLow = motor1pin2;
    if (direction == "up") {
      digitalWrite(2, HIGH);
    } else if (direction == "down") {
      digitalWrite(2, LOW);
      motorPinHigh = motor1pin2, motorPinLow = motor1pin1;
    }
    analogWrite(motorPinLow, 0); // turn off lowering
    analogWrite(motorPinHigh, speed); // turn on lower
    delay(delay_time); // as speed decreases, amount of time speed slot runs for increases
    analogWrite(motorPinHigh, 0);
    delay(1000); // serve no other requests for 1 second
    digitalWrite(2, LOW);
    server.sendHeader("Access-Control-Allow-Origin",  "*");
    server.send(200, "text/plain", "OK");
  }
}

void setup() {
  pinMode(LED, OUTPUT); // set pin 2 as an output
  
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  if (MDNS.begin(mdns_name)) {
    Serial.println("mDNS started");
  }
  
  server.on("/control", handleRequest);
  server.begin();
  
  Serial.println(WiFi.localIP());

  pinMode(motor1pin1, OUTPUT);
  pinMode(motor1pin2, OUTPUT);
  analogWrite(motor1pin1, 0);
  analogWrite(motor1pin2, 0);
}

void loop() {
  server.handleClient();
}
