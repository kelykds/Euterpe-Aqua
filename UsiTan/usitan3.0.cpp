#include <OneWire.h>
#include <DallasTemperature.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>

// Sensor DS18B20
#define DADOS_PINO 10
OneWire oneWire(DADOS_PINO);
DallasTemperature sensors(&oneWire);

// Pinos de Saída e Entrada
#define LED_VERDE 2
#define LED_VERMELHO 3
#define RELE_AQUECEDOR 4
#define AQUECEDOR_VISUAL 5 
#define PINO_BOTAO_LIGAR 6    
#define PINO_BOTAO_DESLIGAR 7 
#define PIN_SERVO 9

Servo misturador; 
LiquidCrystal_I2C lcd(0x27, 16, 2);

bool sistemaLigado = false;

unsigned long tempoInicial = 0;
unsigned long tempoUltimoServo = 0;
unsigned long tempoUltimoSensor = 0; 
bool agitando = false;
int posicaoServo = 0;
float temperaturaAtual = 0.0;

const unsigned long TEMPO_AGITACAO = 1800000;  
const unsigned long INTERVALO_SERVO = 300;     
const unsigned long INTERVALO_SENSOR = 1000; 

void setup() {
  Serial.begin(9600);
  sensors.begin();
  
  
  sensors.setWaitForConversion(false);
  sensors.requestTemperatures(); 
  
  pinMode(PINO_BOTAO_LIGAR, INPUT_PULLUP);
  pinMode(PINO_BOTAO_DESLIGAR, INPUT_PULLUP);
  
  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_VERMELHO, OUTPUT);
  pinMode(RELE_AQUECEDOR, OUTPUT);
  pinMode(AQUECEDOR_VISUAL, OUTPUT);
  
  misturador.attach(PIN_SERVO);
  misturador.write(0); 
  
  desligarTudo();
  
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
  // LEITURA DOS BOTÕES
  if (digitalRead(PINO_BOTAO_LIGAR) == LOW) {
    if (!sistemaLigado) {
      sistemaLigado = true;
      lcd.clear();
    }
  }

  if (digitalRead(PINO_BOTAO_DESLIGAR) == LOW) {
    if (sistemaLigado) {
      sistemaLigado = false;
      desligarTudo();
      lcd.clear();
    }
  }

  // SE O SISTEMA ESTIVER DESLIGADO
  if (!sistemaLigado) {
    lcd.setCursor(0, 0);
    lcd.print("  USITAN by TT  ");
    lcd.setCursor(0, 1);
    lcd.print("   DESLIGADO   ");
    return; 
  }

  // LEITURA DO SENSOR 
  if (millis() - tempoUltimoSensor >= INTERVALO_SENSOR) {
    temperaturaAtual = sensors.getTempCByIndex(0);
    sensors.requestTemperatures();
    tempoUltimoSensor = millis();
  }
  
  // SUPER-AQUECIMENTO
  if (temperaturaAtual > 80.0) {
    digitalWrite(RELE_AQUECEDOR, LOW);    
    digitalWrite(AQUECEDOR_VISUAL, LOW); 
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_VERMELHO, HIGH);
    misturador.write(0);                
    agitando = false;
    
    mostrarTemperatura(temperaturaAtual);
    lcd.setCursor(0, 1);
    lcd.print("ALERTA: SUPERAQ. ");
    return; 
  }

  mostrarTemperatura(temperaturaAtual);
  lcd.setCursor(0, 1);
  
  // FAIXA IDEAL
  if (temperaturaAtual >= 70.0 && temperaturaAtual <= 80.0) {
    digitalWrite(LED_VERDE, HIGH);
    digitalWrite(LED_VERMELHO, LOW);
    digitalWrite(RELE_AQUECEDOR, LOW);   
    digitalWrite(AQUECEDOR_VISUAL, LOW); 
    
    if (!agitando) {
      tempoInicial = millis();
      agitando = true;
    }
    
    if (millis() - tempoInicial < TEMPO_AGITACAO) {

      if (millis() - tempoUltimoServo >= INTERVALO_SERVO) {
        tempoUltimoServo = millis();
        posicaoServo = (posicaoServo == 0) ? 180 : 0; 
        misturador.write(posicaoServo);
      }
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
    digitalWrite(RELE_AQUECEDOR, HIGH);   
    digitalWrite(AQUECEDOR_VISUAL, HIGH); 
    
    misturador.write(0);                
    agitando = false;
    
    lcd.print("Status:AQUECENDO");
  }
}

void desligarTudo() {
  digitalWrite(RELE_AQUECEDOR, LOW);   
  digitalWrite(AQUECEDOR_VISUAL, LOW); 
  digitalWrite(LED_VERDE, LOW);
  digitalWrite(LED_VERMELHO, LOW);
  misturador.write(0);
  agitando = false;
}

void mostrarTemperatura(float temp) {
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  
  if(temp < -10) {
    lcd.print("---.-");
  } else {
    lcd.print(temp, 1);
  }
  lcd.print((char)223);
  lcd.print("C        ");
}
