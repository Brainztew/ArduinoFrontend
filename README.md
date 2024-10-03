# ArduinoAvDennisIsaksson

## För att starta backend:
1. Se till att ha mongodb installerat
2. Se till så du har java version 17 eller senare
3. Ladda ner projektet
4. Öppna i VSC
5. Ta  bort (spring.data.mongodb.uri= )i application.properties för att köra lokalt
6. lägg till i application.properties för att matcha Andruino enheten
server.address=0.0.0.0
server.port=3000
7. Du kan övervaka databasen med Studio3T eller MongodbCompass
8. Starta projektet

## För att starta frontend:
1. Se till att ha node.js installerat
2. Ladda ner projektet
3. Se till att backend delen är igång
4. Öppna i VSC
5. Kör kommando i terminalen "npm install" för att installera dependencies
6. Kör kommando i terminalen "npm run dev" för att starta applikationen
7. Öppna applikationen, du får fram en port (brukar vara "http://localhost:5173/")

## I Backend kan du:
1. Registrera live temp
2. Registrera DataBas temp
3. Skicka datum och tid

## I Frontend kan du:
1. Se senaste temp och fukt värden
2. Se diagram med fukt och temperatur som adruino har fångat
3. Byta datum


## Om projktetet:
Jag har gjort en Adruino modul som samlar in fukt och temp data som sedan skickar vidare till en LCD skärm. Finns status markörer som Grön led för skicka data status=ok (200)<br>
Ifall något fel inträffar med givare eller servern så tänds röd led och ifall datum inte kan hämtas syns det även i skärmen.

Färgkod:<br>
1 mellan snabb grön led = skickar live temp och fukt som sparas som en variabel <br>
3 snabba och en långsam grön led = skickar data till backend för lagring i databas<br>
Röd lampa lyser = Fel på nätverk eller DHT sensor<br>
Gul lampa lyser = skickar data var 30 minut till backend för lagring i databas<br>

## Det som användes:
Arduino R4 WiFi<br>
1602IIC skärm<br>
DHT11 sensor <br>
2 Knappar<br>
3 Led lampor (Gul, Röd, Grön)<br>
Ett gäng kablar och några resistorer<br>
Kopplingsdäck<br>

## Länkar:
Backend: https://github.com/Brainztew/ArduinoBackend <br>
Frontend: https://github.com/Brainztew/ArduinoFrontend <br>
Ardunino: https://github.com/Brainztew/arduinoMagic
