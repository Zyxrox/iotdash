#include <Arduino.h>
#include <ArduinoJson.h>
#include "FirebaseESP8266.h"

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <time.h>

#define FIREBASE_HOST "iotdash.firebaseapp.com"
#define FIREBASE_AUTH "AIzaSyD-6IzYBipiBsBqmLCDizMG4w3zK273LBw"

FirebaseData firebaseData;

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

  configTime(timezone, dst, "pool.ntp.org", "time.nist.gov"); //ดึงเวลาจาก Server
  Serial.println("\nLoading time");
  while (!time(nullptr)) {
    Serial.print("*");
  }
  
}

String NowString()
{
  time_t now = time(nullptr);
  struct tm* newtime = localtime(&now);

 // String tmpNow = "";
  
 // tmpNow += String(newtime->tm_hour);
  //tmpNow += ":";
  //tmpNow += String(newtime->tm_min);
 // tmpNow += ":";
//  tmpNow += String(newtime->tm_sec);
//  tmpNow += ":";
  String tmpNow = String()+(newtime->tm_hour<10 ? "0":"")+newtime->tm_hour+':'+(newtime->tm_min<10?"0":"")+newtime->tm_min+':'+(newtime->tm_sec<10?"0":"")+newtime->tm_sec;
  return tmpNow;
}
String NowString1()
{
  time_t now = time(nullptr);
  struct tm* newtime = localtime(&now);

//  String tmpNow = "";
//  
//  tmpNow += String(newtime->tm_mday);
//  tmpNow += ":";
//  tmpNow += String(newtime->tm_mon+1);
//  tmpNow += ":";
//  tmpNow += String(newtime->tm_year+1900);
  String tmpNow = String()+(newtime->tm_mday<10 ? "0":"")+newtime->tm_mday+"-"+((newtime->tm_mon+1)<10?"0":"")+(newtime->tm_mon+1)+"-"+(newtime->tm_year+2443); //01
  return tmpNow;
}

String secret = "";
int humid = 1;
int temp = 2;
int light = 3;
String data;

void loop() {

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
  timestamp = NowString()+ " " + NowString1();
  data = "{ \"humid\":" + String(humid) + ",\"light\":" + String(light) + ",\"temp\":" + String(temp) +",\"time\":"+timestamp+"}";
  humid++;
  temp++;
  light++;

    if (Firebase.pushJSON(firebaseData, "telemetry/" + secret + "/", data))
    {
      Serial.println("----------Push result-----------");
      Serial.println("PATH: " + firebaseData.dataPath());
      Serial.print("PUSH NAME: ");
      Serial.println(firebaseData.pushName());
      Serial.println("--------------------------------");
      Serial.println();
    }
    else
    {
      Serial.println("----------Can't push data--------");
      Serial.println("REASON: " + firebaseData.errorReason());
      Serial.println("--------------------------------");
      Serial.println();
    }
      
}
