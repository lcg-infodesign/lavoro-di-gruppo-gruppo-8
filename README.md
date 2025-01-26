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
  - Il cambio scena è gestito tramite la rotella del mouse (funzione `mouseWheel()`) oppure tramute click su una determinata sezione della navigation bar.
  - La variabile `scrollAmount` tiene traccia dello scorrimento.
  - Per ogni scena vengono definiti i limiti superiori e inferiori di `scrollAmount` che determinano il passaggio alla scena successiva o precedente.

### 2. **Dissolvenza tra Scene**
- La variabile globale `fadeAmount` regola la trasparenza degli elementi.
- La funzione `simulateFading` calcola dinamicamente `fadeAmount` nei primi e ultimi 20% di `scrollAmount` all'interno della scena.

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

## Fonti

- **United Nations Office on Drugs and Crime (UNODC)**: [Data UNODC - Femicide](https://dataunodc.un.org/dp-femicide)

Il dataset dell'UNODC fornisce informazioni dettagliate sugli omicidi intenzionali e, tramite appositi filtri, si giunge al focus sui femminicidi. Questo tipo di dato è essenziale per comprendere le tendenze globali, le differenze tra regioni e l'efficacia delle politiche di prevenzione e risposta. I dati raccolti si riferiscono agli anni che vanno dal 1990 al 2023 e sono specifici per ogni stato. 
Abbiamo, quindi, filtrato il dataset concentrandoci solo sui dati del 2020 (particolarmente significativo a causa della pandemia da covid-19 e del lockdown) suddivisi per subregioni mondiali, al posto degli stati. 

## Team e Ruoli

- **Lorenzo Coluccia**: codice  
- **Ermanio Malko**: codice  
- **Gaia Manera**: codice  
- **Cristina Pedrazzini**: mockup e grafiche  
- **Marta Stella Ratti**: mockup e grafiche  
- **Susanna Scopelliti**: dataset e testi  
