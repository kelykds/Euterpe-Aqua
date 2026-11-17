#include <OneWire.h>
#include <DallasTemperature.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>

// Configuração do sensor DS18B20
#define DADOS_PINO 10
OneWire oneWire(DADOS_PINO);
DallasTemperature sensors(&oneWire);

// Configuração dos Pinos de Saída
#define LED_VERDE 2
#define LED_VERMELHO 3
#define RELE_AQUECEDOR 4
#define AQUECEDOR_VISUAL 5 
#define PIN_SERVO 9

Servo misturador; 
LiquidCrystal_I2C lcd(0x27, 16, 2);

unsigned long tempoInicial = 0;
bool agitando = false;
const unsigned long TEMPO_AGITACAO = 1800000; 

void setup() {
  Serial.begin(9600);
  sensors.begin();
  
  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_VERMELHO, OUTPUT);
  pinMode(RELE_AQUECEDOR, OUTPUT);
  pinMode(AQUECEDOR_VISUAL, OUTPUT);
  
  misturador.attach(PIN_SERVO);
  misturador.write(0); 
  
  digitalWrite(RELE_AQUECEDOR, HIGH); 
  digitalWrite(AQUECEDOR_VISUAL, HIGH); 
  
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("  USITAN by TT  ");
  lcd.setCursor(0, 1);
  lcd.print("  INICIALIZANDO ");
  delay(2000);
  lcd.clear();
}

void loop() {
  sensors.requestTemperatures(); 
  float temperatura = sensors.getTempCByIndex(0);
  
  
  // SUPER-AQUECIMENTO
  if (temperatura > 80.0) {
    digitalWrite(RELE_AQUECEDOR, LOW);    // DESLIGA O AQUECEDOR REAL - PARA IMPLEMENTAR
    digitalWrite(AQUECEDOR_VISUAL, LOW); 
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_VERMELHO, HIGH);
    misturador.write(0);                
    agitando = false;
    
    lcd.setCursor(0, 0);
    lcd.print("Temp: ");
    lcd.print(temperatura, 1);
    lcd.print((char)223);
    lcd.print("C        ");
    
    lcd.setCursor(0, 1);
    lcd.print("ALERTA: SUPERAQ. ");
    return; 
  }

  // Atualização da temperatura na tela
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(temperatura, 1);
  lcd.print((char)223);
  lcd.print("C        ");
  lcd.setCursor(0, 1);
  
  // FAIXA IDEAL
  if (temperatura >= 70.0 && temperatura <= 80.0) {
    digitalWrite(LED_VERDE, HIGH);
    digitalWrite(LED_VERMELHO, LOW);
    
    digitalWrite(RELE_AQUECEDOR, LOW);   
    digitalWrite(AQUECEDOR_VISUAL, LOW); 
    
    if (!agitando) {
      tempoInicial = millis();
      agitando = true;
    }
    
    if (millis() - tempoInicial < TEMPO_AGITACAO) {
      misturador.write(180); 
      delay(300);
      misturador.write(0);
      delay(300);
      lcd.print("Status: AGITANDO");
    } else {
      misturador.write(0); 
      lcd.print("PROCESSO PRONTO ");
    }
  } 

  // AQUECIMENTO INICIAL
  else {
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_VERMELHO, LOW);
    
    // Está frio: LIGA o aquecedor para subir a temperatura
    digitalWrite(RELE_AQUECEDOR, HIGH);   
    digitalWrite(AQUECEDOR_VISUAL, HIGH); 
    
    misturador.write(0);                
    agitando = false;
    
    lcd.print("Status:AQUECENDO");
    delay(200);
  }
}
