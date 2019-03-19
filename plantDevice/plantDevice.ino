#include <Arduino.h>
#include <ArduinoJson.h>
#include <FirebaseArduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>

#define FIREBASE_HOST "iotdash.firebaseapp.com"
#define FIREBASE_AUTH "AIzaSyD-6IzYBipiBsBqmLCDizMG4w3zK273LBw"
#define WIFI_SSID "SSID"
#define WIFI_PASSWORD "PASSWORD"

ESP8266WiFiMulti wifiMulti;
HTTPClient http;

String addDataAPI = "https://us-central1-iotdash.cloudfunctions.net/testURL";
String testAPI = "https://us-central1-iotdash.cloudfunctions.net/helloWorld";

void setup() {
//  Serial.begin(9600);
  Serial.begin(115200);

  wifiMulti.addAP("batman10g_2.4GHz", "13467900");
  wifiMulti.addAP("Jubjam", "Jamnaja0");
  
  Serial.println("Connecting Wifi");
  
}

String secret = "testSecret";
int humid = 1;
int temp = 2;
int light = 3;
String payload;
String data;

void loop() {

  std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);

    client->setFingerprint(fingerprint);

  while(wifiMulti.run() != WL_CONNECTED) {
    Serial.print("Can't connect to Wi-Fi...");
    delay(1000);
    if (wifiMulti.run() == WL_CONNECTED) {
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    }
  }
  data = "humid="+String(humid)+"&temp="+String(temp)+"&light="+String(light)+"&secret="+secret;
  
  //String data = "soil="+String(soilValue)+"&light="+String(lux)+"&humidity="+String(Humidity)+"&temperature="+String(Temperature)+"&datenow="+String(datenow)+"&timenow="+String(timenow);

//  http.begin(testAPI);
  Serial.print("HTTP begin\n"); 
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
//  Serial.println("Post to " + urlnew);
//  int httpCode = http.POST(data2);
  int httpCode = http.GET();
  Serial.print("Making HTTP request\n"); 
  if(httpCode > 0) {
    if(httpCode == HTTP_CODE_OK) {
      Serial.print("HTTP Success\n"); 
      payload = http.getString();
      Serial.println(payload);
      delay(10000);
    }
  } else {
      Serial.print("HTTP FAILED\n"); 
      Serial.println(http.errorToString(httpCode).c_str());
      delay(10000);
  }
  Serial.print("HTTP End\n"); 
  http.end();
      
}
