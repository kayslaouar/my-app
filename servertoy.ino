#include <WiFi.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#define LED 2

const char* ssid = "CICS_Makerspace";
const char* password = "makerspace";
const char* mdns_name = "256FinalProjectCKM"; // change this to your desired mDNS name

WebServer server(80);

void handleRequest() {
  Serial.println("REQ RECV!");
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
}

void loop() {
  server.handleClient();
}
