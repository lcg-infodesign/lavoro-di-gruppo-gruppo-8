// Dichiarazione delle variabili globali

// Indice della scena corrente. Inizia da 0.
let currentScene = 0;
// Quantità di scroll effettuato.
let scrollAmount = 0;
// Quantità di scroll all'inizio della scena corrente.
let startSceneScrollAmount = 0;
// Quantità massima di scroll consentita.
const maxScroll = 36000;

// Larghezza iniziale della finestra.
let startingWidth;
// Altezza iniziale della finestra.
let startingHeight;
// Misura di riferimento per la responsività, calcolata in base alla larghezza.
let responsiveReferenceMeasure;
// Misura di riferimento minima per la responsività.
const minReferenceMeasure = 0.5;

// Colore di sfondo.
const backgroundColor = "#210908";

// Numero massimo di scene.
const maxScenes = 6;
// Oggetto che contiene le funzioni per disegnare ogni scena. Le chiavi sono gli indici delle scene.
const scenes = {
    0: sceneOne,
    1: sceneTwo,
    2: sceneThree,
    3: sceneFour,
    4: sceneFive,
    5: sceneSix,
};
// Oggetto che contiene le funzioni di setup per ogni scena.
const scenesSetup = {
    0: sceneOneSetup,
    1: sceneTwoSetup,
    2: sceneThreeSetup,
    3: sceneFourSetup,
    4: sceneFiveSetup,
    5: sceneSixSetup,
};

// Oggetto che contiene la quantità di scroll necessaria per ogni scena.
const scenesScrollAmount = {
    0: 6000,
    1: 6000,
    2: 6000,
    3: 6000,
    4: 6000,
    5: 6000,
};

// Dizionario dei colori per le diverse categorie.
const colorsDict = {
    "FAMILY MEMBER": "#841242",
    "INTIMATE PARTNER": "#611915",
    "OTHER PERPETRATOR KNOWN TO THE VICTIM": "#A02B25",
    "PERPETRATOR UNKNOWN TO THE VICTIM": "#D45249",
    "PERPETRATOR TO VICTIM RELATIONSHIP UNKNOWN": "#E4908B",
    "NON CI SONO DATI SULLA CATEGORIA": "#663634",
};

// Variabile per contenere il dataset caricato.
let dataset;

// Array per contenere i cerchi (probabilmente per una visualizzazione).
let circles = [];

// Funzione per ottenere la misura di riferimento, prendendo il massimo tra la misura responsiva e quella minima.
function getReferenceMeasure() {
    return max(responsiveReferenceMeasure, minReferenceMeasure);
}

// Funzione di preload di p5.js, chiamata prima di setup().
function preload() {
    // Caricamento dei font.
    bodoniBold = loadFont('fonts/Bodoni-Bold.ttf');
    bodoniRegular = loadFont('fonts/Bodoni-Regular.ttf');

    // Caricamento del dataset da un file CSV.
    dataset = loadTable("assets/Femmincidi2.csv", 'ssv', 'header');
    console.log(dataset);
}

// Funzione di setup di p5.js, chiamata una volta all'inizio.
function setup() {
    // Creazione del canvas a schermo intero.
    createCanvas(windowWidth, windowHeight);

    // Inizializzazione delle dimensioni iniziali.
    startingWidth = width;
    startingHeight = height;

    // Calcolo della misura di riferimento responsiva.
    responsiveReferenceMeasure = width / 1920;
}

// Funzione di draw di p5.js, chiamata ripetutamente.
function draw() {
    // Chiamata alla funzione di disegno della scena corrente.
    scenes[currentScene]();
    // Simulazione dell'effetto di fading.
    simulateFading();
}

// Variabile per la gestione del fading.
let fadeAmount = 255;
// Funzione per simulare l'effetto di fading in entrata e in uscita tra le scene.
function simulateFading() {
    // Variabile per indicare se si sta effettuando un fade out.
    let isFadeOut = false;
    // Controllo se lo scroll si trova nella fase di fade in (primi 20% della scena).
    if (scrollAmount >= startSceneScrollAmount && scrollAmount < startSceneScrollAmount + 0.2 * scenesScrollAmount[currentScene]) {
        // Se è la prima scena, il fadeAmount è sempre 255 (completamente opaco).
        if (currentScene === 0) {
            fadeAmount = 255;
        }
        // Altrimenti, calcola il fadeAmount mappando lo scroll tra 0 e 255.
        else {
            fadeAmount = map(scrollAmount, startSceneScrollAmount, startSceneScrollAmount + 0.2 * scenesScrollAmount[currentScene], 0, 255);
        }
    }
    // Controllo se lo scroll si trova nella fase di fade out (ultimi 20% della scena).
    else if (scrollAmount <= startSceneScrollAmount + scenesScrollAmount[currentScene] && scrollAmount > startSceneScrollAmount + 0.8 * scenesScrollAmount[currentScene]) {
        isFadeOut = true;
        // Se è l'ultima scena, il fadeAmount è sempre 255.
        if (currentScene === maxScenes - 1) {
            fadeAmount = 255;
        }
        // Altrimenti, calcola il fadeAmount mappando lo scroll tra 255 e 0.
        else {
            fadeAmount = map(scrollAmount, startSceneScrollAmount + 0.8 * scenesScrollAmount[currentScene], startSceneScrollAmount + scenesScrollAmount[currentScene], 255, 0);
        }
    }
}

// Funzione di setup per la prima scena.
function sceneOneSetup() {
    // Attualmente vuota, non esegue nessuna operazione di setup specifica.
}

// Funzione per disegnare la prima scena.
function sceneOne() {
    // Imposta il colore di sfondo.
    background(backgroundColor);

    // Imposta l'allineamento del testo al centro.
    textAlign(CENTER, CENTER);
    // Imposta il colore del testo con l'opacità gestita da fadeAmount.
    fill(255, fadeAmount);
    // Imposta il font del testo.
    textFont(bodoniBold);
    // Imposta la dimensione del testo in base alla misura di riferimento per la responsività.
    textSize(48 * getReferenceMeasure());
    // Disegna il testo principale.
    text('Flowers that shouldn’t bloom', width / 2, height / 2 - 50 * getReferenceMeasure());

    // Imposta il colore del tratto con l'opacità gestita da fadeAmount.
    stroke(255, fadeAmount);
    // Imposta lo spessore del tratto.
    strokeWeight(1);
    // Disegna una linea orizzontale sotto il titolo.
    line(width / 2 - 150 * getReferenceMeasure(), height / 2, width / 2 + 150 * getReferenceMeasure(), height / 2);

    // Disabilita il tratto.
    noStroke();
    // Imposta la dimensione del testo per il sottotitolo.
    textSize(24 * getReferenceMeasure());
    // Disegna il sottotitolo.
    text('World visualization of femicide in 2020', width / 2, height / 2 + 30 * getReferenceMeasure());

    // Disabilita il tratto.
    noStroke();
    // Disegna un triangolo in basso al centro della schermata (probabilmente un indicatore di scroll).
    triangle(width / 2 - 10 * getReferenceMeasure(), height - 50 * getReferenceMeasure(), width / 2 + 10 * getReferenceMeasure(), height - 50 * getReferenceMeasure(), width / 2, height - 30 * getReferenceMeasure());
}

// Funzione di setup per la seconda scena.
function sceneTwoSetup() {
    // Attualmente vuota, non esegue nessuna operazione di setup specifica.
}

// Funzione per disegnare la seconda scena.
function sceneTwo() {
    // Imposta il colore di sfondo.
    background(backgroundColor);
    // Imposta l'allineamento del testo al centro.
    textAlign(CENTER, CENTER);
    // Imposta il font del testo.
    textFont(bodoniBold);
    // Imposta il colore del testo con l'opacità gestita da fadeAmount.
    fill(255, fadeAmount);

    // Controllo per il fade out completo alla fine della scena.
    if (scrollAmount <= startSceneScrollAmount + scenesScrollAmount[currentScene] && scrollAmount > startSceneScrollAmount + 0.8 * scenesScrollAmount[currentScene]) {
        // Se si trova nell'ultimo 20% della scena, imposta il testo completamente opaco.
        fill(255);
    }
    // Imposta la dimensione del testo per il numero di femminicidi.
    textSize(64 * getReferenceMeasure());
    // Disegna il numero di femminicidi.
    text('40.000 femicide', width / 2, height / 2 - 30 * getReferenceMeasure());

    // Imposta il colore del testo con l'opacità gestita da fadeAmount.
    fill(255, fadeAmount);
    // Imposta la dimensione del testo per la descrizione.
    textSize(24 * getReferenceMeasure());
    // Imposta il font del testo per la descrizione.
    textFont(bodoniRegular);
    // Disegna la descrizione.
    text('in the world only in 2020', width / 2, height / 2 + 30 * getReferenceMeasure());

    // Imposta il colore del testo con l'opacità gestita da fadeAmount.
    fill(255, fadeAmount);
    // Disabilita il tratto.
    noStroke();
    // Disegna un triangolo in basso al centro della schermata (probabilmente un indicatore di scroll).
    triangle(width / 2 - 10 * getReferenceMeasure(), height - 50 * getReferenceMeasure(), width / 2 + 10 * getReferenceMeasure(), height - 50 * getReferenceMeasure(), width / 2, height - 30 * getReferenceMeasure());
}

// Funzione di setup per la terza scena.
function sceneThreeSetup() {
    // Ottiene i nomi delle colonne del dataset, escludendo la prima.
    const columns = dataset.columns.slice(1);
    // Inizializza l'array dei cerchi.
    circles = [];

    // Itera sulle righe del dataset.
    for (let r = 0; r < dataset.getRowCount(); r++) {
        const row = dataset.getRow(r);

        // Itera sulle colonne.
        columns.forEach(columnName => {
            // Ottiene il numero di cerchi da creare per la colonna corrente.
            const numCircles = int(row.get(columnName));
            // Ottiene il colore del cerchio dal dizionario dei colori.
            const circleColor = colorsDict[columnName];

            // Fattore di scala per alcuni cerchi, in particolare per quelli senza categoria.
            let scaleFactor = 1;
            if (columnName === "NON CI SONO DATI SULLA CATEGORIA") {
                scaleFactor = 4;
            }
            // Crea i cerchi.
            for (let i = 0; i < numCircles / scaleFactor; i++) {
                // Genera coordinate casuali per il cerchio.
                const x = random(startingWidth);
                const y = random(startingHeight);

                // Aggiunge il cerchio all'array.
                circles.push({
                    x: x,
                    y: y,
                    color: circleColor
                });
            }
        });
    }
}

// Funzione per disegnare la terza scena.
function sceneThree() {
    // Imposta il colore di sfondo.
    background(backgroundColor);

    // Mostra il testo "40.000 femicide" durante la prima parte della scena (primi 30%).
    if (scrollAmount >= startSceneScrollAmount && scrollAmount < startSceneScrollAmount + 0.3 * scenesScrollAmount[currentScene]) {
        textAlign(CENTER, CENTER);
        textFont(bodoniBold);
        fill(255, 255 - fadeAmount); // Fade out del testo

        textSize(64 * getReferenceMeasure());
        text('40.000 femicide', width / 2, height / 2 - 30 * getReferenceMeasure());
    }

    // Disegna i cerchi.
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];

        // Calcola una posizione target leggermente casuale per il movimento.
        const targetX = circle.x + random(-5, 5) * getReferenceMeasure();
        const targetY = circle.y + random(-5, 5) * getReferenceMeasure();

        // Esegue l'interpolazione lineare per un movimento fluido.
        circle.x = lerp(circle.x, targetX, 0.5);
        circle.y = lerp(circle.y, targetY, 0.5);

        // Vincola le coordinate dei cerchi all'interno dei bordi della finestra.
        circle.x = constrain(circle.x, 0, startingWidth);
        circle.y = constrain(circle.y, 0, startingHeight);

        // Imposta il colore del cerchio con l'opacità gestita da fadeAmount.
        fill(rgbaFromHexAndAlpha(circle.color, fadeAmount));
        // Disabilita il tratto.
        noStroke();
        // Disegna l'ellisse, scalando le coordinate in base alle dimensioni iniziali e correnti della finestra per la responsività.
        ellipse(
            circle.x * (width / startingWidth),
            circle.y * (height / startingHeight),
            5 * getReferenceMeasure(),
            5 * getReferenceMeasure()
        );
    }
}


// Funzione di setup per la quarta scena.
function sceneFourSetup() {
    // Calcola le posizioni iniziali dei cerchi per la quinta scena (transizione).
    computeSceneFiveStartingPositions();
}

// Funzione per mappare le chiavi colore a testo visualizzato.
function mapColorKeyToText(key) {
    switch (key) {
        case "FAMILY MEMBER":
            return "Family member"; // Membro della famiglia
        case "INTIMATE PARTNER":
            return "Intimate partner"; // Partner intimo
        case "OTHER PERPETRATOR KNOWN TO THE VICTIM":
            return "Known to the victim"; // Conosciuto dalla vittima
        case "PERPETRATOR UNKNOWN TO THE VICTIM":
            return "Unknown to the victim"; // Sconosciuto alla vittima
        case "PERPETRATOR TO VICTIM RELATIONSHIP UNKNOWN":
            return "Relationship unknown"; // Relazione sconosciuta
        case "NON CI SONO DATI SULLA CATEGORIA":
            return "No data"; // Nessun dato
    }
}

// Funzione per mappare le chiavi colore a testo di hover (descrizione).
function mapColorKeyToHoverText(key) {
    switch (key) {
        case "FAMILY MEMBER":
            return "Violence grows closest to home. This category includes femicides committed by parents, siblings, or other relatives."; // La violenza cresce più vicino a casa. Questa categoria include femminicidi commessi da genitori, fratelli o altri parenti.
        case "INTIMATE PARTNER":
            return "A relationship of love turns deadly. This category highlights femicides committed by current or former intimate partners."; // Una relazione d'amore diventa mortale. Questa categoria evidenzia i femminicidi commessi da partner intimi attuali o passati.
        case "OTHER PERPETRATOR KNOWN TO THE VICTIM":
            return "Not a stranger, yet not family. Here, the perpetrator is an acquaintance, friend, or someone familiar to the victim."; // Non uno sconosciuto, ma non famiglia. Qui, l'autore è una conoscenza, un amico o qualcuno di familiare alla vittima.
        case "PERPETRATOR UNKNOWN TO THE VICTIM":
            return "A cruel act of violence by a stranger. These cases involve perperrarors who had no prior connection to the victim."; // Un crudele atto di violenza da parte di uno sconosciuto. Questi casi coinvolgono autori che non avevano alcun legame precedente con la vittima.
        case "PERPETRATOR TO VICTIM RELATIONSHIP UNKNOWN":
            return "The relationship between the victim and the perpetrator remains a mystery."; // La relazione tra la vittima e l'autore rimane un mistero.
        case "NON CI SONO DATI SULLA CATEGORIA":
            return "No data available for this category."; // Nessun dato disponibile per questa categoria.
    }
}

// Funzione per disegnare la quarta scena.
function sceneFour() {
    // Imposta il colore di sfondo.
    background(backgroundColor);

    // Imposta il colore, il font, la dimensione e l'allineamento del testo del titolo.
    fill(255, fadeAmount);
    textFont(bodoniBold);
    textSize(38 * getReferenceMeasure());
    textAlign(CENTER);
    // Disegna il titolo.
    text('The seeds of violence', width / 2, height / 2 - 300 * getReferenceMeasure()); // I semi della violenza

    // Calcola la spaziatura tra i punti/cerchi.
    let dotSpacing = 200 * getReferenceMeasure();
    // Calcola la posizione verticale dei punti.
    let dotY = height / 2 - 150 * getReferenceMeasure();
    // Calcola la posizione orizzontale di partenza per centrare i punti.
    let startX = width / 2 - (Object.keys(colorsDict).length - 1) * dotSpacing / 2;

    // Indice per la posizione orizzontale dei punti.
    let i = 0;
    // Testo da mostrare al hover.
    let hoveredText = "";
    // Colore del cerchio su cui si trova il mouse.
    let hoveredCircleColor;

    // Itera sulle chiavi del dizionario dei colori.
    for (let key in colorsDict) {
        // Calcola la posizione orizzontale del punto corrente.
        let dotX = startX + i * dotSpacing;
        // Dimensione del punto.
        let dotSize = 100;

        // Imposta il colore del punto con l'opacità gestita da fadeAmount.
        fill(rgbaFromHexAndAlpha(colorsDict[key], fadeAmount));

        // Gestisce la transizione verso la quinta scena (fade out della quarta e fade in della quinta).
        if (scrollAmount <= startSceneScrollAmount + scenesScrollAmount[currentScene] && scrollAmount > startSceneScrollAmount + 0.8 * scenesScrollAmount[currentScene]) {
            // Calcola la posizione target del cerchio nella quinta scena.
            const targetX = sceneFiveStartingCirclePositions[key].x;
            const targetY = sceneFiveStartingCirclePositions[key].y;

            // Calcola il valore di interpolazione (t) in base allo scroll.
            let t = constrain((scrollAmount - (startSceneScrollAmount + 0.8 * scenesScrollAmount[currentScene])) / (0.2 * scenesScrollAmount[currentScene]), 0, 1);

            // Esegue l'interpolazione lineare per animare la transizione.
            dotX = lerp(dotX, targetX, t);
            dotY = lerp(dotY, targetY, t);
            fill(rgbaFromHexAndAlpha(colorsDict[key]));
            dotSize = min(100, lerp(100, 50, t));
        }

        // Disegna il cerchio.
        circle(dotX, dotY, dotSize * getReferenceMeasure());

        // Calcola la distanza tra il mouse e il centro del cerchio.
        let distance = dist(mouseX, mouseY, dotX, dotY);
        // Se il mouse è sopra il cerchio, imposta il testo e il colore per l'hover.
        if (distance < 50 * getReferenceMeasure()) {
            hoveredText = mapColorKeyToHoverText(key);
            hoveredCircleColor = colorsDict[key];
        }

        // Imposta il colore, il font, la dimensione e l'allineamento del testo delle etichette.
        fill(255, fadeAmount);
        textAlign(CENTER);
        textFont(bodoniRegular);
        textSize(16 * getReferenceMeasure());
        // Disegna l'etichetta sotto ogni cerchio.
        text(mapColorKeyToText(key), dotX, dotY + 70 * getReferenceMeasure());

        i++;
    }

    // Disegna una linea orizzontale.
    stroke(255, fadeAmount);
    strokeWeight(1.5);
    line(width / 2 - 600 * getReferenceMeasure(), height / 2, width / 2 + 600 * getReferenceMeasure(), height / 2);

    // Gestisce la visualizzazione del testo di hover o del testo principale.
    fill(255, fadeAmount);
    textFont(bodoniRegular);
    textAlign(CENTER);
    textSize(24 * getReferenceMeasure());
    noStroke();
    // Se c'è un testo di hover da mostrare.
    if (hoveredText !== "") {
        fill(rgbaFromHexAndAlpha(hoveredCircleColor, fadeAmount));
        circle(width / 2 - 600 * getReferenceMeasure(), height / 2 + 200 * getReferenceMeasure(), 200 * getReferenceMeasure());
        fill(255, fadeAmount);
        textAlign(LEFT);
        text(hoveredText, width / 2 - 450 * getReferenceMeasure(), height / 2 + 200 * getReferenceMeasure(), 1000 * getReferenceMeasure());
    } else {
        // Testo principale da mostrare quando non c'è hover.
        let bodyText = "Femicide is a phenomenon with various nuances depending on the relationship between victim and perpetrator. We associate these categories with the six seeds of violence from which the so-called flowers that shouldn't bloom are born.";
        text(bodyText, (width - 600 * getReferenceMeasure()) / 2, height / 2 + 200 * getReferenceMeasure(), 600 * getReferenceMeasure());
    }

    // Disegna il triangolo in basso al centro (indicatore di scroll).
    fill(255, fadeAmount);
    noStroke();
    triangle(width / 2 - 10 * getReferenceMeasure(), height - 50 * getReferenceMeasure(), width / 2 + 10 * getReferenceMeasure(), height - 50 * getReferenceMeasure(), width / 2, height - 30 * getReferenceMeasure());
}

// Variabile per memorizzare le posizioni iniziali dei cerchi nella quinta scena.
let sceneFiveStartingCirclePositions;

// Funzione per generare una posizione casuale al di fuori del canvas.
function getRandomPositionOutsideCanvas() {
    // Sceglie un lato casuale (top, bottom, left, right).
    let side = random(["top", "bottom", "left", "right"]);
    let x, y;

    // Calcola le coordinate x e y in base al lato scelto.
    if (side === "top") {
        x = random(width);
        y = random(-height, 0); // Sopra il canvas
    } else if (side === "bottom") {
        x = random(width);
        y = random(height, 2 * height); // Sotto il canvas
    } else if (side === "left") {
        x = random(-width, 0); // A sinistra del canvas
        y = random(height);
    } else if (side === "right") {
        x = random(width, 2 * width); // A destra del canvas
        y = random(height);
    }

    // Restituisce un oggetto con le coordinate x e y.
    return { x: x, y: y };
}

// Funzione di setup per la quinta scena.
function sceneFiveSetup() {
    const columns = dataset.columns.slice(1);
    circles = [];
    let circlesPerCategory = {};

    // Calcola il numero totale di cerchi per ogni categoria.
    for (let r = 0; r < dataset.getRowCount(); r++) {
        const row = dataset.getRow(r);

        columns.forEach(columnName => {
            const numCircles = int(row.get(columnName));
            let scaleFactor = 2;
            if (columnName === "NON CI SONO DATI SULLA CATEGORIA") {
                scaleFactor *= 4;
            }
            if (circlesPerCategory[columnName] === undefined) {
                circlesPerCategory[columnName] = numCircles / scaleFactor;
            } else {
                circlesPerCategory[columnName] += numCircles / scaleFactor;
            }
        });
    }

    let maxCircles = max(Object.values(circlesPerCategory));

    countriesData = {};
    countriesCircles = {};

    // Organizza i dati per paese e categoria e calcola la distanza verticale tra le etichette.
    for (let r = 0; r < dataset.getRowCount(); r++) {
        const row = dataset.getRow(r);
        const country = row.get("SUB-REGIONE 2020");
        countriesData[country] = {};
        countriesCircles[country] = {};
        for (let i = 1; i < dataset.columns.length; i++) {
            const category = dataset.columns[i];
            countriesData[country][category] = int(row.get(category));
            countriesCircles[country][category] = [];
            sceneFiveStartingCirclePositions[category].dy = (20 + map(circlesPerCategory[category] / maxCircles, 0, 1, 50, 200)) * getReferenceMeasure();
        }
    }

    // Rimuove i paesi con dati pari a zero.
    for (let country in countriesData) {
        let sum = 0;
        for (let key in countriesData[country]) {
            sum += countriesData[country][key];
        }
        if (sum === 0) {
            delete countriesData[country];
        }
    }

    // Definisce le posizioni dei paesi sulla mappa.
    countriesPositions = {
        "NORD AFRICA": { x: width / 2 - 440 * getReferenceMeasure(), y: height / 2 + 230 * getReferenceMeasure() },
        "AFRICA SUB-SARIANA": { x: width / 2 - 800 * getReferenceMeasure(), y: height / 2 + 300 * getReferenceMeasure() },
        "LATINA AMERICA E CARAIBI": { x: width / 2 + 750 * getReferenceMeasure(), y: height / 2 - 320 * getReferenceMeasure() },
        "NORD AMERICA": { x: width / 2 + 600 * getReferenceMeasure(), y: height / 2 + 300 * getReferenceMeasure() },
        "ASIA CENTRALE": { x: width / 2 + 350 * getReferenceMeasure(), y: height / 2 - 290 * getReferenceMeasure() },
        "ASIA EST": { x: width / 2 + 50 * getReferenceMeasure(), y: height / 2 + 100 * getReferenceMeasure() },
        "SUD-EST ASIATICO": { x: width / 2 - 600 * getReferenceMeasure(), y: height / 2 + 150 * getReferenceMeasure() },
        "ASIA SUD": { x: width / 2 - 400 * getReferenceMeasure(), y: height / 2 - 70 * getReferenceMeasure() },
        "ASIA OVEST": { x: width / 2 + 150 * getReferenceMeasure(), y: height / 2 + 280 * getReferenceMeasure() },
        "EST EUROPA (+RUSSIA)": { x: width / 2 + 660 * getReferenceMeasure(), y: height / 2 - 25 * getReferenceMeasure() },
        "NORD EUROPA": { x: width / 2 + 100 * getReferenceMeasure(), y: height / 2 - 200 * getReferenceMeasure() },
        "SUD EUROPA": { x: width / 2 - 120 * getReferenceMeasure(), y: height / 2 + 250 * getReferenceMeasure() },
        "OVEST EUROPA": { x: width / 2 + 340 * getReferenceMeasure(), y: height / 2 },
        "AUSTRALIA E NUOVA ZELANDA": { x: width / 2 - 150 * getReferenceMeasure(), y: height / 2 + 20 * getReferenceMeasure() }
    };

    // Crea i cerchi e calcola le loro posizioni target.
    for (let country in countriesData) {
        let i = 0;
        let maxValues = max(Object.values(countriesData[country]));

        for (let category in countriesData[country]) {
            const value = countriesData[country][category];

            let circleColor = colorsDict[category];

            for (let j = 0; j < value; j++) {
                const startingPosition = getRandomPositionOutsideCanvas();
                const targetPosition = sceneFiveStartingCirclePositions[category];

                const radius1 = random(25, map(circlesPerCategory[category] / maxCircles, 0, 1, 50, 200)) * getReferenceMeasure();
                const angle1 = random(TWO_PI);
                const x1 = targetPosition.x + cos(angle1) * radius1;
                const y1 = targetPosition.y + sin(angle1) * radius1;

                const circleRadius = map(value, 0, maxValues, 50, 100) * getReferenceMeasure();
                const radius2 = (40 * getReferenceMeasure() + circleRadius / 2);
                const angle2 = TWO_PI / 6 * i;
                const angle3 = random(TWO_PI);
                const x2 = countriesPositions[country].x + cos(angle2) * radius2 + cos(angle3) * random(0, circleRadius / 2);
                const y2 = countriesPositions[country].y + sin(angle2) * radius2 + sin(angle3) * random(0, circleRadius / 2);

                circles.push({
                    x: startingPosition.x,
                    y: startingPosition.y,
                    targetX: x1,
                    targetY: y1,
                    targetX2: x2,
                    targetY2: y2,
                    color: circleColor
                });
            }
            i++;
        }
    }
}

function sceneFive() {
    // Imposta lo sfondo della scena.
    background(backgroundColor);

    // Disegna il titolo "Flowers that shouldn’t bloom".
    fill(255, fadeAmount); // Colore bianco con gestione dell'opacità (fade)
    textFont(bodoniBold);
    textSize(38 * getReferenceMeasure());
    textAlign(LEFT);
    text('Flowers that shouldn’t bloom', 100 * getReferenceMeasure(), 100 * getReferenceMeasure());

    // Disegna i cerchi grandi che rappresentano le categorie e le relative etichette.
    for (let key in sceneFiveStartingCirclePositions) {
        fill(rgbaFromHexAndAlpha(colorsDict[key], fadeAmount)); // Colore della categoria con fade

        // Se lo scroll è all'inizio della scena (primi 20%), i cerchi sono completamente opachi.
        if (scrollAmount >= startSceneScrollAmount && scrollAmount < startSceneScrollAmount + 0.2 * scenesScrollAmount[currentScene]) {
            fill(rgbaFromHexAndAlpha(colorsDict[key])); // Rimuove il fade
        }

        circle(sceneFiveStartingCirclePositions[key].x, sceneFiveStartingCirclePositions[key].y, 50 * getReferenceMeasure());

        // Disegna l'etichetta testuale sotto ogni cerchio grande.
        fill(255, fadeAmount);
        textSize(16 * getReferenceMeasure());
        textAlign(CENTER);
        textFont(bodoniRegular);
        text(mapColorKeyToText(key), sceneFiveStartingCirclePositions[key].x, sceneFiveStartingCirclePositions[key].y + sceneFiveStartingCirclePositions[key].dy);
    }

    // Anima i cerchi piccoli dalla posizione iniziale (fuori canvas) alla posizione target (raggruppamento per categoria).
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];

        // Calcola il valore di interpolazione `t` in base allo scroll.
        // L'animazione dura per il 50% dello scroll della scena.
        let t = constrain((scrollAmount - startSceneScrollAmount) / (0.5 * scenesScrollAmount[currentScene]), 0, 1);

        // Esegue l'interpolazione lineare per calcolare la posizione corrente del cerchio.
        let x = lerp(circle.x, circle.targetX, t);
        let y = lerp(circle.y, circle.targetY, t);

        fill(rgbaFromHexAndAlpha(circle.color, fadeAmount)); // Colore del cerchio con fade

        // Se lo scroll si trova nell'ultima parte della scena (ultimi 20%), i cerchi sono completamente opachi.
        if (scrollAmount <= startSceneScrollAmount + scenesScrollAmount[currentScene] && scrollAmount > startSceneScrollAmount + 0.8 * scenesScrollAmount[currentScene]) {
            fill(rgbaFromHexAndAlpha(circle.color)); // Rimuove il fade
        }

        noStroke();
        ellipse(x, y, 5 * getReferenceMeasure(), 5 * getReferenceMeasure()); // Disegna il cerchio piccolo
    }

    // Disegna il triangolo in basso al centro (indicatore di scroll).
    fill(255);
    noStroke();
    triangle(width / 2 - 10 * getReferenceMeasure(), height - 50 * getReferenceMeasure(), width / 2 + 10 * getReferenceMeasure(), height - 50 * getReferenceMeasure(), width / 2, height - 30 * getReferenceMeasure());
}

// Dichiarazioni delle variabili globali relative ai dati e alle posizioni dei paesi.
let countriesData; // Dati relativi ai paesi (numero di femminicidi per categoria).
let countriesPositions; // Posizioni dei paesi sulla mappa.
let countriesCircles; // Cerchi associati ai paesi (potrebbe non essere utilizzato direttamente in questa funzione).

// Funzione di setup per la sesta scena. Attualmente vuota, non esegue operazioni di setup specifiche.
function sceneSixSetup() {
}

// Funzione per disegnare la sesta scena.
function sceneSix() {
    // Imposta il colore di sfondo.
    background(backgroundColor);

    // Disegna il titolo "The Global Distribution of Feminicides" (La Distribuzione Globale dei Femminicidi).
    fill(255, fadeAmount); // Colore bianco con opacità gestita da fadeAmount per l'effetto di dissolvenza.
    textFont(bodoniBold); // Usa il font Bodoni Bold.
    textSize(38 * getReferenceMeasure()); // Dimensione del testo scalata in base alla misura di riferimento per la responsività.
    textAlign(LEFT); // Allinea il testo a sinistra.
    text('The Global Distribution of Feminicides', 100 * getReferenceMeasure(), 100 * getReferenceMeasure()); // Disegna il testo con un margine di 100px scalato.

    // Disegna la legenda dei colori.
    let i = 0; // Indice per posizionare verticalmente gli elementi della legenda.
    for (let key in colorsDict) {
        fill(rgbaFromHexAndAlpha(colorsDict[key], fadeAmount)); // Colore del cerchio preso da colorsDict e applicato il fade.
        circle(120 * getReferenceMeasure(), (200 + i * 30) * getReferenceMeasure(), 20 * getReferenceMeasure()); // Disegna il cerchio della legenda.
        fill(255, fadeAmount); // Colore bianco con fade per il testo della legenda.
        textSize(16 * getReferenceMeasure()); // Dimensione del testo scalata.
        text(mapColorKeyToText(key), 150 * getReferenceMeasure(), (200 + i * 30) * getReferenceMeasure()); // Disegna il testo della legenda a destra del cerchio.
        i++; // Incrementa l'indice per la prossima voce della legenda.
    }

    // Anima i cerchi piccoli dalla posizione target della quinta scena (raggruppamento per categoria) alla posizione target della sesta scena (posizione sulla mappa).
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];

        // Calcola il valore di interpolazione `t` in base allo scroll.
        // L'animazione dura per il 50% dello scroll della scena.
        let t = constrain((scrollAmount - startSceneScrollAmount) / (0.5 * scenesScrollAmount[currentScene]), 0, 1); // t varia tra 0 e 1.

        // Esegue l'interpolazione lineare (lerp) per calcolare la posizione corrente del cerchio.
        // In questa scena, l'interpolazione avviene tra targetX (posizione raggruppata per categoria) e targetX2 (posizione sulla mappa).
        let x = lerp(circle.targetX, circle.targetX2, t); // Interpola la coordinata x.
        let y = lerp(circle.targetY, circle.targetY2, t); // Interpola la coordinata y.

        fill(rgbaFromHexAndAlpha(circle.color)); // Applica il colore del cerchio (senza fade in questa scena).
        noStroke(); // Nessun contorno.
        ellipse(x, y, 5 * getReferenceMeasure(), 5 * getReferenceMeasure()); // Disegna il cerchio piccolo, scalato per la responsività.
    }

    // Disegna i cerchi e le etichette per i paesi sulla mappa.
    for (let country in countriesData) {
        const position = countriesPositions[country]; // Ottiene la posizione del paese dal dizionario.
        fill(255, fadeAmount); // Bianco con fade per i cerchi dei paesi.
        ellipse(position.x, position.y, 80 * getReferenceMeasure(), 80 * getReferenceMeasure()); // Disegna il cerchio del paese.

        fill(0, fadeAmount); // Nero con fade per il testo del nome del paese.
        textSize(16 * getReferenceMeasure()); // Dimensione del testo scalata.
        textAlign(CENTER); // Allinea il testo al centro.
        textFont(bodoniRegular); // Usa il font Bodoni Regular.
        text(country, position.x - 40 * getReferenceMeasure(), position.y, 80 * getReferenceMeasure()); // Disegna il nome del paese all'interno del cerchio.
    }
}

// Gestisce l'evento di rotellina del mouse (mouse wheel).
function mouseWheel(event) {
    // Aggiorna la quantità di scroll in base alla rotazione della rotellina (delta).
    scrollAmount += event.delta;
  
    // Limita lo scrollAmount tra 0 e il valore massimo consentito (maxScroll - 1).
    scrollAmount = constrain(scrollAmount, 0, maxScroll - 1);
  
    // Controlla se lo scroll ha raggiunto la fine della scena corrente.
    if (scrollAmount >= startSceneScrollAmount + scenesScrollAmount[currentScene]) {
      // Passa alla scena successiva.
      nextScene();
    } else if (scrollAmount <= startSceneScrollAmount) {
      // Passa alla scena precedente.
      prevScene();
    }
  }
  
  // Funzione per passare alla scena successiva.
  function nextScene() {
    // Controlla se non si è già nell'ultima scena.
    if (currentScene < maxScenes) {
      // Aggiorna la posizione iniziale di scroll per la scena successiva.
      startSceneScrollAmount = scrollAmount;
      // Incrementa l'indice della scena corrente.
      currentScene++;
      // Esegue la funzione di setup per la scena appena selezionata.
      scenesSetup[currentScene]();
    }
  }
  
  // Funzione per passare alla scena precedente.
  function prevScene() {
    // Controlla se non si è già nella prima scena.
    if (currentScene > 0) {
      // Calcola la nuova posizione iniziale di scroll per la scena precedente.
      startSceneScrollAmount = startSceneScrollAmount - scenesScrollAmount[currentScene - 1];
      // Decrementa l'indice della scena corrente.
      currentScene--;
      // Esegue la funzione di setup per la scena appena selezionata.
      scenesSetup[currentScene]();
    }
  }
  
  // Gestisce il ridimensionamento della finestra.
  function windowResized() {
    // Aggiorna le dimensioni del canvas in base alla finestra.
    resizeCanvas(windowWidth, windowHeight);
    // Calcola una misura di riferimento in base alla larghezza della finestra per la responsività.
    responsiveReferenceMeasure = width / 1920;
    // Aggiorna le posizioni iniziali dei cerchi della quinta scena se necessario.
    computeSceneFiveStartingPositions();
    // Controlla la scena corrente e richiama la funzione di setup specifica se serve.
    if (currentScene === 4) {
      sceneFiveSetup();
    } else if (currentScene === 5) {
      sceneSixSetup();
    }
  }
  
  // Converte un colore esadecimale e un valore di alpha in un colore con trasparenza (RGBA).
  function rgbaFromHexAndAlpha(c, alpha) {
    // Converte il colore esadecimale in un oggetto p5.Color.
    c = color(c);
    // Estrae i valori RGB dal colore.
    let r = red(c);
    let g = green(c);
    let b = blue(c);
    // Restituisce un nuovo colore con i valori RGB originali e l'alpha specificata.
    return color(r, g, b, alpha);
  }
  
  // Calcola le posizioni iniziali dei cerchi per la quinta scena.
  function computeSceneFiveStartingPositions() {
    // Crea un dizionario per memorizzare le posizioni e gli spostamenti verticali delle etichette.
    sceneFiveStartingCirclePositions = {
        "FAMILY MEMBER": { x: width / 2 + 70 * getReferenceMeasure(), y: height / 2 - 230 * getReferenceMeasure(), dy: 0 },
        "INTIMATE PARTNER": { x: width / 2 - 100 * getReferenceMeasure(), y: height / 2 + 220 * getReferenceMeasure(), dy: 0 },
        "OTHER PERPETRATOR KNOWN TO THE VICTIM": { x: width / 2 - 600 * getReferenceMeasure(), y: height / 2 + 180 * getReferenceMeasure(), dy: 0 },
        "PERPETRATOR UNKNOWN TO THE VICTIM": { x: width / 2 + 400 * getReferenceMeasure(), y: height / 2 + 200 * getReferenceMeasure(), dy: 0 },
        "PERPETRATOR TO VICTIM RELATIONSHIP UNKNOWN": { x: width / 2 - 400 * getReferenceMeasure(), y: height / 2 - 100 * getReferenceMeasure(), dy: 0 },
        "NON CI SONO DATI SULLA CATEGORIA": { x: width / 2 + 500 * getReferenceMeasure(), y: height / 2 - 200 * getReferenceMeasure(), dy: 0 }
    };
}