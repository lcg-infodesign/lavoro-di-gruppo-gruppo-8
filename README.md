# README | Flowers that shouldn't bloom

## L'obiettivo di questa visualizzazione
Lo scopo della visualizzazione è quello di illustrare i dati relativi al numero e alla natura dei femminicidi a livello mondiale nel 2020, facendo leva, in particolare , sulla quantità dei dati mancanti, al fine di far riflettere su quanta importanza viene ancora oggi attribuita a questo fenomeno. I dati vengono resi visibili grazie alla metafora del fiore, il quale più è rigoglioso e più ci fa capire quanto grave sia il problema. Ogni vittima, invece, è rappresentata da un puntino che si va collocare prima nella posizione che comunica la relazione con il suo carnefice e dopo nella sub-regioone geografica corretta. Da queste riflessioni deriva la scelta del titolo “Flowers that shouldn’t bloom”.

## Funzionalità principali

### 1. **Gestione delle Scene**
- Ogni scena è composta da:
  - Una funzione di setup (`sceneXSetup`), equivalente alla funzione `setup()` di p5.js ma specifica per una scena.
  - Una funzione di rendering (`sceneX`), equivalente alla funzione `draw()` di p5.js per la scena corrente.
- La funzione `setup()` generale gestisce la configurazione globale non legata a una scena specifica.
- La funzione `draw()` generale richiama dinamicamente la funzione della scena corrente (`currentScene`).
- **Cambio scena**:
  - Il cambio scena è gestito tramite la rotella del mouse (funzione `mouseWheel()`).
  - La variabile `scrollAmount` tiene traccia dello scorrimento.
  - Per ogni scena vengono definiti i limiti superiori e inferiori di `scrollAmount` che determinano il passaggio alla scena successiva o precedente.

### 2. **Dissolvenza tra Scene**
- La variabile globale `fadeAmount` regola la trasparenza degli elementi.
- La funzione `simulateFading` calcola dinamicamente `fadeAmount` nei primi e ultimi 20% di `scrollAmount` all'interno della scena.
- **Eccezioni**:
  - Nessuna dissolvenza iniziale nella **prima scena**.
  - Nessuna dissolvenza finale nell’**ultima scena**.
  - Per elementi specifici che non richiedono dissolvenza, si utilizzano controlli ad hoc su `scrollAmount`.

### 3. **Animazioni Particolari**
- **Scene con pallini (3, 5 e 6)**:
  - Durante il setup della scena viene creato un array `circles` contenente oggetti che definiscono:
    - Posizione iniziale e finale.
    - Colore di ogni pallino.
  - Nella funzione di rendering, i pallini sono animati con interpolazione lineare (`lerp`).
- **Fiori (scene 5 e 6)**:
  - Gli oggetti fiori memorizzano le posizioni di riferimento.
  - Le posizioni dei pallini attorno ai fiori vengono calcolate dinamicamente nel setup della scena.

### 4. **Responsività**
- La variabile `responsiveReferenceMeasure` viene calcolata in base alla larghezza dello schermo rispetto a un riferimento standard di 1920px:
  - `responsiveReferenceMeasure = windowWidth / 1920`.
  - Se la larghezza è inferiore a 1920px, i valori di dimensione e posizione scalano proporzionalmente.
- Questa variabile è aggiornata automaticamente ogni volta che la finestra viene ridimensionata.
- Tutte le dimensioni e posizioni definite in pixel sono moltiplicate per `responsiveReferenceMeasure`.

## Struttura del Codice

### Funzioni principali
- **Setup globale (`setup`)**: inizializza elementi comuni a tutte le scene.
- **Render globale (`draw`)**: richiama dinamicamente la funzione della scena corrente.
- **Gestione dello scroll (`mouseWheel`)**: aggiorna `scrollAmount` e gestisce il cambio scena.
- **Simulazione dissolvenza (`simulateFading`)**: calcola `fadeAmount` per le transizioni.

### Scene
Ogni scena include:
- **`sceneXSetup`**: inizializzazione di elementi specifici della scena.
- **`sceneX`**: rendering della scena e animazioni personalizzate.

### Variabili principali
- `currentScene`: indice della scena corrente.
- `scrollAmount`: tiene traccia dello scroll della rotella del mouse.
- `fadeAmount`: regola la trasparenza degli elementi.
- `responsiveReferenceMeasure`: coefficiente di responsività.

## Come usare il progetto

1. **Installazione di p5.js**:
   - Scarica la libreria p5.js dal sito ufficiale: [p5js.org](https://p5js.org/).
   - Includila nel tuo progetto.

2. **Aggiungi il codice al tuo progetto**:
   - Crea uno sketch p5.js e importa il codice che definisce le scene, transizioni e animazioni.

3. **Configurazione**:
   - Definisci le scene specifiche e personalizza le funzioni di setup e rendering.

4. **Esegui il progetto**:
   - Apri il file HTML che include il tuo sketch p5.js in un browser.

## Fonti

- **United Nations Office on Drugs and Crime (UNODC)**: [Data UNODC - Femicide](https://dataunodc.un.org/dp-femicide)

## Team e Ruoli

- **Lorenzo Coluccia**: codice  
- **Ermanio Malko**: codice  
- **Gaia Manera**: codice  
- **Cristina Pedrazzini**: mockup e grafiche  
- **Marta Stella Ratti**: mockup e grafiche  
- **Susanna Scopelliti**: dataset e testi  
