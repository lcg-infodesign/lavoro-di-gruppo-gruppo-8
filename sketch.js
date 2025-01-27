p5.disableFriendlyErrors = true;

let currentScene = 0;
let scrollAmount = 0;
let startSceneScrollAmount = 0;
const maxScroll = 42000;
let scrollDisabled = false;

let startingWidth;
let startingHeight;
let cappedReferenceMeasure;
let realReferenceMeasure;
const minReferenceMeasure = 0.5;

const backgroundColor = "#210908";
const maxScenes = 7;

let timesNewRomanBold, montserratRegular;

const categoryTextMap = {
    "FAMILY MEMBER": "Family member",
    "INTIMATE PARTNER": "Intimate partner",
    "OTHER PERPETRATOR KNOWN TO THE VICTIM": "Known to the victim",
    "PERPETRATOR UNKNOWN TO THE VICTIM": "Unknown to the victim",
    "PERPETRATOR TO VICTIM RELATIONSHIP UNKNOWN": "Relationship unknown",
    "NON CI SONO DATI SULLA CATEGORIA": "No data"
};

const categoryHoverTextMap = {
    "FAMILY MEMBER": "Violence grows closest to home. This category includes femicides committed by parents, siblings, or other relatives.",
    "INTIMATE PARTNER": "A relationship of love turns deadly. This category highlights femicides committed by current or former intimate partners.",
    "OTHER PERPETRATOR KNOWN TO THE VICTIM": "Not a stranger, yet not family. Here, the perpetrator is an acquaintance, friend, or someone familiar to the victim.",
    "PERPETRATOR UNKNOWN TO THE VICTIM": "A cruel act of violence by a stranger. These cases involve perpetrators who had no prior connection to the victim.",
    "PERPETRATOR TO VICTIM RELATIONSHIP UNKNOWN": "The relationship between the victim and the perpetrator remains a mystery.",
    "NON CI SONO DATI SULLA CATEGORIA": "No data available for this category."
};

const scenesScrollAmount = {
    0: 6000,
    1: 6000,
    2: 6000,
    3: 6000,
    4: 6000,
    5: 6000,
    6: 6000
};

const colorsDict = {
    "FAMILY MEMBER": "#841242",
    "INTIMATE PARTNER": "#8D0016",
    "OTHER PERPETRATOR KNOWN TO THE VICTIM": "#A02B25",
    "PERPETRATOR UNKNOWN TO THE VICTIM": "#D45249",
    "PERPETRATOR TO VICTIM RELATIONSHIP UNKNOWN": "#E4908B",
    "NON CI SONO DATI SULLA CATEGORIA": "#663634"
};

let dataset;
let circles = [];
let fadeAmount = 255;
let categoryColors = {};
let sceneFiveStartingCirclePositions;
let countriesData;
let countriesPositions;
let countriesCircles;

const scenes = {
    0: sceneOne,
    1: sceneTwo,
    2: sceneThree,
    3: sceneFour,
    4: sceneFive,
    5: sceneSix,
    6: sceneSeven,
};
const scenesSetup = {
    0: sceneOneSetup,
    1: sceneTwoSetup,
    2: sceneThreeSetup,
    3: sceneFourSetup,
    4: sceneFiveSetup,
    5: sceneSixSetup,
    6: sceneSevenSetup,
};

function preload() {
    timesNewRomanBold = loadFont('fonts/times_new_roman_bold.ttf');
    montserratRegular = loadFont('fonts/Montserrat-Regular.ttf'); // Nuovo font
    // dataset = loadTable("assets/Femminicidi2.csv", 'ssv', 'header');
    dataset = loadTable("assets/Femminicidi3.csv", 'csv', 'header');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noSmooth();
    frameRate(30);

    startingWidth = width;
    startingHeight = height;
    updateReferenceMeasure();

    for (let cat in colorsDict) {
        categoryColors[cat] = color(colorsDict[cat]);
    }

    scenesSetup[0]();
}

function draw() {
    scenes[currentScene]();
    simulateFading();
    drawSceneLegend();
}

function updateReferenceMeasure() {
    cappedReferenceMeasure = max(width / 1920, minReferenceMeasure);
    realReferenceMeasure = width / 1920;
}

function simulateFading() {
    let startFadingIn = startSceneScrollAmount;
    let endFadingIn = startSceneScrollAmount + 0.2 * scenesScrollAmount[currentScene];
    let startFadingOut = startSceneScrollAmount + 0.8 * scenesScrollAmount[currentScene];
    let endFadingOut = startSceneScrollAmount + scenesScrollAmount[currentScene];

    if (scrollAmount >= startFadingIn && scrollAmount < endFadingIn) {
        if (currentScene === 0) {
            fadeAmount = 255;
        } else {
            fadeAmount = map(scrollAmount, startFadingIn, endFadingIn, 0, 255);
        }
    } else if (scrollAmount > startFadingOut && scrollAmount <= endFadingOut) {
        if (currentScene === maxScenes - 1) {
            fadeAmount = 255;
        } else {
            fadeAmount = map(scrollAmount, startFadingOut, endFadingOut, 255, 0);
        }
    } else {
        if (currentScene === 0 && scrollAmount === 0) {
            fadeAmount = 255;
        } else if (scrollAmount === startSceneScrollAmount && currentScene !== 0) {
            fadeAmount = 0;
        } else {
            fadeAmount = 255;
        }
    }
}

function drawSceneLegend() {
    // Disegna un cerchio bianco vuoto per ogni scena sul lato sinistro dello schermo, e uno pieno per la scena corrente.
    let sceneCircleSize = 15 * cappedReferenceMeasure;
    let sceneCircleSpacing = 30 * cappedReferenceMeasure;
    let sceneCircleX = 50 * cappedReferenceMeasure;
    let sceneCircleY = height / 2 - (maxScenes / 2) * sceneCircleSpacing;

    for (let i = 0; i < maxScenes; i++) {
        if (i === currentScene) {
            fill(255);
            ellipse(sceneCircleX, sceneCircleY, sceneCircleSize);
            text("PROVA")
        } else {
            let distance = dist(mouseX, mouseY, sceneCircleX, sceneCircleY);
            if (distance < sceneCircleSize / 2) {
                fill(255, 100);
                ellipse(sceneCircleX, sceneCircleY, sceneCircleSize);
            }
            else {
                noFill();
                stroke(255);
            }
            ellipse(sceneCircleX, sceneCircleY, sceneCircleSize);
            noStroke();
        }
        sceneCircleY += sceneCircleSpacing;
    }
}

// SCENE SETUP & FUNCTIONS
function sceneOneSetup() {
    fadeAmount = 255;
}
function sceneOne() {
    background(backgroundColor);

    // Titolo
    fill(255, fadeAmount);
    textFont(timesNewRomanBold);
    textAlign(CENTER, CENTER);
    textSize(48 * cappedReferenceMeasure);
    text('Flowers that shouldn’t bloom', width / 2, height / 2 - 50 * cappedReferenceMeasure);

    // Linea più sottile
    stroke(255, fadeAmount);
    strokeWeight(0.5);
    line(width / 2 - 150 * cappedReferenceMeasure, height / 2, width / 2 + 150 * cappedReferenceMeasure, height / 2);
    noStroke();

    // Sottotitolo in Montserrat
    fill(255, fadeAmount);
    textFont(montserratRegular);
    textSize(24 * cappedReferenceMeasure);
    text('World visualization of femicides in 2020', width / 2, height / 2 + 30 * cappedReferenceMeasure);
}

function sceneTwoSetup() {
    fadeAmount = 0;
}
function sceneTwo() {
    background(backgroundColor);
    textAlign(CENTER, CENTER);

    // Titolo principale (times new roman)
    fill(255, fadeAmount);
    textFont(timesNewRomanBold);
    textSize(64 * cappedReferenceMeasure);
    text('40.000 femicides', width / 2, height / 2 - 30 * cappedReferenceMeasure);

    // Sottotitolo in montserrat
    textSize(24 * cappedReferenceMeasure);
    textFont(montserratRegular);
    text('in the world only in 2020', width / 2, height / 2 + 30 * cappedReferenceMeasure);
}

function sceneThreeSetup() {
    fadeAmount = 0;
    circles = [];
    const columns = dataset.columns.slice(1);
    for (let r = 0; r < dataset.getRowCount(); r++) {
        const row = dataset.getRow(r);
        columns.forEach(columnName => {
            const numCircles = int(row.get(columnName));
            const circleColor = categoryColors[columnName];
            let count = numCircles;
            for (let i = 0; i < count; i++) {
                const x = random(startingWidth);
                const y = random(startingHeight);
                let dx = random(-5, 5) * cappedReferenceMeasure;
                let dy = random(-5, 5) * cappedReferenceMeasure;
                circles.push({
                    x: x,
                    y: y,
                    color: circleColor,
                    dx: dx,
                    dy: dy
                });
            }
        });
    }
}
function sceneThree() {
    background(backgroundColor);
    noStroke();
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];

        if (circle.x < 0) {
            circle.x = startingWidth;
        }
        else if (circle.x > startingWidth) {
            circle.x = 0;
        }
        if (circle.y < 0) {
            circle.y = startingHeight;
        }
        else if (circle.y > startingHeight) {
            circle.y = 0;
        }

        const targetX = circle.x + circle.dx;
        const targetY = circle.y + circle.dy;
        circle.x = lerp(circle.x, targetX, 0.5);
        circle.y = lerp(circle.y, targetY, 0.5);
        // circle.x = constrain(circle.x, 0, startingWidth);
        // circle.y = constrain(circle.y, 0, startingHeight);



        fill(red(circle.color), green(circle.color), blue(circle.color), fadeAmount);
        ellipse(
            circle.x * (width / startingWidth),
            circle.y * (height / startingHeight),
            5 * cappedReferenceMeasure,
            5 * cappedReferenceMeasure
        );
    }
}

function sceneFourSetup() {
    fadeAmount = 0;
    computeSceneFiveStartingPositions();
}
function sceneFour() {
    background(backgroundColor);
    fill(255, fadeAmount);
    textFont(timesNewRomanBold);
    textSize(38 * cappedReferenceMeasure);
    textAlign(CENTER);
    text('The seeds of violence', width / 2, height / 2 - 300 * cappedReferenceMeasure);

    let dotSpacing = 200 * realReferenceMeasure;
    let dotY = height / 2 - 150 * cappedReferenceMeasure;
    let startX = width / 2 - (Object.keys(colorsDict).length - 1) * dotSpacing / 2;

    let hoveredText = "";
    let hoveredCircleColor = null;
    let hoveredX, hoveredY, hoveredSize;

    let hoverRadius = 80 * cappedReferenceMeasure;

    let startFadingOut = startSceneScrollAmount + 0.8 * scenesScrollAmount[currentScene];

    noStroke();
    textFont(montserratRegular); // Montserrat per le label delle palline e testi
    let i = 0;
    for (let key in colorsDict) {
        let dotX = startX + i * dotSpacing;
        let dotSize = 100 * cappedReferenceMeasure;
        let cCol = categoryColors[key];
        let endFadingOut = startSceneScrollAmount + scenesScrollAmount[currentScene];

        if (scrollAmount <= endFadingOut && scrollAmount > startFadingOut) {
            let t = constrain((scrollAmount - startFadingOut) / (0.2 * scenesScrollAmount[currentScene]), 0, 1);
            dotX = lerp(dotX, sceneFiveStartingCirclePositions[key].x, t);
            dotY = lerp(dotY, sceneFiveStartingCirclePositions[key].y, t);
            dotSize = min(100 * cappedReferenceMeasure, lerp(100 * cappedReferenceMeasure, 50 * cappedReferenceMeasure, t));
        }

        fill(red(cCol), green(cCol), blue(cCol), fadeAmount);
        circle(dotX, dotY, dotSize * cappedReferenceMeasure);

        // Mostra label solo se NON siamo nella fase di fade out (quindi scrollAmount < startFadingOut)
        if (scrollAmount < startFadingOut) {
            let distance = dist(mouseX, mouseY, dotX, dotY);
            if (distance < hoverRadius) {
                hoveredText = categoryHoverTextMap[key];
                hoveredCircleColor = cCol;
                hoveredX = dotX;
                hoveredY = dotY;
                hoveredSize = dotSize * cappedReferenceMeasure;
            }

            fill(255, fadeAmount);
            textSize(16 * cappedReferenceMeasure);
            text(categoryTextMap[key], dotX - dotSpacing / 2, dotY + 70 * cappedReferenceMeasure, dotSpacing);
        }

        i++;
    }



    noStroke();
    fill(255, fadeAmount);
    textFont(montserratRegular);
    textAlign(CENTER);
    textSize(24 * cappedReferenceMeasure);

    if (hoveredText !== "" && scrollAmount < startFadingOut) {
        stroke(255, fadeAmount);
        strokeWeight(2);
        noFill();
        circle(hoveredX, hoveredY, hoveredSize);

        fill(255, fadeAmount);
        noStroke();
        textAlign(LEFT);
        text(hoveredText, width / 2 - 450 * realReferenceMeasure, height / 2 + 200 * cappedReferenceMeasure, 1000 * realReferenceMeasure);

        fill(red(hoveredCircleColor), green(hoveredCircleColor), blue(hoveredCircleColor), fadeAmount);
        circle(width / 2 - 600 * realReferenceMeasure, height / 2 + 200 * cappedReferenceMeasure, 200 * realReferenceMeasure);
    } else {
        // Testo generico in montserrat
        let bodyText = "Femicide is a phenomenon with various nuances depending on the relationship between victim and perpetrator. We associate these categories with the six seeds of violence from which the so-called flowers that shouldn't bloom are born.";
        textAlign(CENTER);
        text(bodyText, width / 2 - 300 * realReferenceMeasure, height / 2 + 200 * cappedReferenceMeasure, 600 * realReferenceMeasure);
    }
}

function getRandomPositionOutsideCanvas() {
    let side = random(["top", "bottom", "left", "right"]);
    let x, y;
    if (side === "top") {
        x = random(width);
        y = random(-height, 0);
    } else if (side === "bottom") {
        x = random(width);
        y = random(height, 2 * height);
    } else if (side === "left") {
        x = random(-width, 0);
        y = random(height);
    } else {
        x = random(width, 2 * width);
        y = random(height);
    }
    return { x, y };
}

function sceneFiveSetup() {
    fadeAmount = 0;
    circles = [];
    const columns = dataset.columns.slice(1);
    let circlesPerCategory = {};

    for (let r = 0; r < dataset.getRowCount(); r++) {
        const row = dataset.getRow(r);
        columns.forEach(columnName => {
            const numCircles = int(row.get(columnName));
            // let scaleFactor = 2;
            // if (columnName === "NON CI SONO DATI SULLA CATEGORIA") {
            //     scaleFactor *= 4;
            // }
            if (circlesPerCategory[columnName] === undefined) {
                // circlesPerCategory[columnName] = numCircles / scaleFactor;
                circlesPerCategory[columnName] = numCircles;
            } else {
                // circlesPerCategory[columnName] += numCircles / scaleFactor;
                circlesPerCategory[columnName] += numCircles;
            }
        });
    }

    let maxCircles = max(Object.values(circlesPerCategory));
    countriesData = {};
    countriesCircles = {};
    for (let r = 0; r < dataset.getRowCount(); r++) {
        const row = dataset.getRow(r);
        const country = row.get("2020_SUBREGION");
        countriesData[country] = {};
        countriesCircles[country] = {};
        for (let i = 1; i < dataset.columns.length; i++) {
            const category = dataset.columns[i];
            countriesData[country][category] = int(row.get(category));
            countriesCircles[country][category] = [];
            sceneFiveStartingCirclePositions[category].dy = (50 + map(circlesPerCategory[category] / maxCircles, 0, 1, 50, 200)) * realReferenceMeasure;
        }
    }

    for (let country in countriesData) {
        let sum = 0;
        for (let key in countriesData[country]) {
            sum += countriesData[country][key];
        }
        if (sum === 0) {
            delete countriesData[country];
        }
    }

    let maxSceneValuesCache = {};
    for (let country in countriesData) {
        maxSceneValuesCache[country] = max(Object.values(countriesData[country]));
    }

    for (let country in countriesData) {
        let i = 0;
        let maxValues = maxSceneValuesCache[country];
        for (let category in countriesData[country]) {
            const value = countriesData[country][category];
            let circleColor = categoryColors[category];
            for (let j = 0; j < value; j++) {
                const startingPosition = getRandomPositionOutsideCanvas();
                const targetPosition = sceneFiveStartingCirclePositions[category];

                const radius1 = random(25, map(circlesPerCategory[category] / maxCircles, 0, 1, 50, 200)) * realReferenceMeasure;
                const angle1 = random(TWO_PI);
                const x1 = targetPosition.x + cos(angle1) * radius1;
                const y1 = targetPosition.y + sin(angle1) * radius1;

                const circleRadius = map(value, 0, maxValues, 50, 100) * realReferenceMeasure;
                const radius2 = (40 * realReferenceMeasure + circleRadius / 2);
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
    background(backgroundColor);
    fill(255, fadeAmount);
    textFont(timesNewRomanBold);
    textSize(38 * cappedReferenceMeasure);
    textAlign(LEFT);
    text('Flowers that shouldn’t bloom', 100 * cappedReferenceMeasure, 100 * cappedReferenceMeasure);

    noStroke();
    for (let key in sceneFiveStartingCirclePositions) {
        let cCol = categoryColors[key];
        fill(red(cCol), green(cCol), blue(cCol), fadeAmount);
        circle(sceneFiveStartingCirclePositions[key].x, sceneFiveStartingCirclePositions[key].y, 50 * realReferenceMeasure);

        fill(255, fadeAmount);
        textFont(montserratRegular);
        textSize(16 * cappedReferenceMeasure);
        textAlign(CENTER);
        text(categoryTextMap[key], sceneFiveStartingCirclePositions[key].x - 100 * realReferenceMeasure, sceneFiveStartingCirclePositions[key].y + sceneFiveStartingCirclePositions[key].dy, 200 * realReferenceMeasure);
    }

    // Cerchi in animazione
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        let t = constrain((scrollAmount - startSceneScrollAmount) / (0.5 * scenesScrollAmount[currentScene]), 0, 1);
        let x = lerp(circle.x, circle.targetX, t);
        let y = lerp(circle.y, circle.targetY, t);

        fill(red(circle.color), green(circle.color), blue(circle.color), fadeAmount);
        noStroke();
        ellipse(x, y, 2 * cappedReferenceMeasure, 2 * cappedReferenceMeasure);
    }
}

function sceneSixSetup() {
    fadeAmount = 0;
}
function sceneSix() {
    background(backgroundColor);
    fill(255, fadeAmount);
    textFont(timesNewRomanBold);
    textSize(38 * cappedReferenceMeasure);
    textAlign(LEFT); // centrato orizzontalmente
    text('The Global Distribution of Femicides', 100 * cappedReferenceMeasure, 100 * cappedReferenceMeasure);

    let i = 0;
    for (let key in colorsDict) {
        fill(red(colorsDict[key]), green(colorsDict[key]), blue(colorsDict[key]), fadeAmount);
        circle(120 * cappedReferenceMeasure, (200 + i * 30) * cappedReferenceMeasure, 20 * cappedReferenceMeasure);
        fill(255, fadeAmount);
        textFont(montserratRegular);
        textSize(16 * cappedReferenceMeasure);
        text(categoryTextMap[key], 150 * cappedReferenceMeasure, (200 + i * 30) * cappedReferenceMeasure);
        i++;
    }

    noStroke();
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        let t = constrain((scrollAmount - startSceneScrollAmount) / (0.5 * scenesScrollAmount[currentScene]), 0, 1);
        let x = lerp(circle.targetX, circle.targetX2, t);
        let y = lerp(circle.targetY, circle.targetY2, t);
        fill(red(circle.color), green(circle.color), blue(circle.color));
        ellipse(x, y, 2 * cappedReferenceMeasure, 2 * cappedReferenceMeasure);
    }

    for (let country in countriesData) {
        const position = countriesPositions[country];
        fill(255, fadeAmount);
        ellipse(position.x, position.y, 80 * realReferenceMeasure, 80 * realReferenceMeasure);
        fill(0, fadeAmount);
        textSize(8 * cappedReferenceMeasure);
        textFont(montserratRegular); // anche qui usiamo montserrat se necessario
        textAlign(CENTER);
        text(country, position.x - 40 * realReferenceMeasure, position.y, 80 * realReferenceMeasure);
    }
}

function mouseClicked(event) {
    if (isClickOnSceneLegend()) {
        disableScrollAndChangeScene();
    }
}

function isClickOnSceneLegend() {
    let sceneCircleSize = 20 * cappedReferenceMeasure;
    let sceneCircleSpacing = 30 * cappedReferenceMeasure;
    let sceneCircleX = 50 * cappedReferenceMeasure;
    let sceneCircleY = height / 2 - (maxScenes / 2) * sceneCircleSpacing;

    for (let i = 0; i < maxScenes; i++) {
        let distance = dist(mouseX, mouseY, sceneCircleX, sceneCircleY);
        if (distance < sceneCircleSize / 2) {
            return true;
        }
        sceneCircleY += sceneCircleSpacing;
    }
    return false;
}

function disableScrollAndChangeScene() {
    scrollDisabled = true;

    let sceneCircleSize = 20 * cappedReferenceMeasure;
    let sceneCircleSpacing = 30 * cappedReferenceMeasure;
    let sceneCircleX = 50 * cappedReferenceMeasure;
    let sceneCircleY = height / 2 - (maxScenes / 2) * sceneCircleSpacing;

    for (let i = 0; i < maxScenes; i++) {
        let distance = dist(mouseX, mouseY, sceneCircleX, sceneCircleY);
        if (distance < sceneCircleSize / 2) {
            let scrollToReach = 0;
            for (let j = 0; j < i; j++) {
                scrollToReach += scenesScrollAmount[j];
            }
            scrollToReach += scenesScrollAmount[i] * 0.6;

            manipulateScroll(scrollToReach);

            break;
        }
        sceneCircleY += sceneCircleSpacing;
    }
}

function manipulateScroll(scrollToReach) {
    let steps = Math.abs(scrollToReach - scrollAmount) / 300;
    let delta = 300;
    if (scrollAmount > scrollToReach) {
        delta = -delta;
    }

    let speed = 50 * 20 / steps;
    console.log(speed)

    setScrollRecursive(0, steps, delta, speed);
}

function setScrollRecursive(i, steps, delta, speed) {
    setTimeout(() => {
        i++;
        scrollAmount += delta;
        scrollAmount = constrain(scrollAmount, 0, maxScroll - 1);
        if (scrollAmount >= startSceneScrollAmount + scenesScrollAmount[currentScene]) {
            nextScene();
        } else if (scrollAmount <= startSceneScrollAmount && currentScene > 0) {
            prevScene();
        }
        if (i < steps) {
            setScrollRecursive(i, steps, delta, speed);
        }
        else {
            scrollDisabled = false;
        }
    }, speed)
}

function mouseWheel(event) {
    if (!scrollDisabled) {
        scrollAmount += event.delta * 3;
        scrollAmount = constrain(scrollAmount, 0, maxScroll - 1);
        if (scrollAmount >= startSceneScrollAmount + scenesScrollAmount[currentScene]) {
            nextScene();
        } else if (scrollAmount <= startSceneScrollAmount && currentScene > 0) {
            prevScene();
        }
    }
}

function nextScene() {
    if (currentScene < maxScenes - 1) {
        console.log("Changing scene from " + currentScene + " to " + (currentScene + 1));
        console.log("Scroll amount: " + scrollAmount);
        console.log("Start scene scroll amount: " + startSceneScrollAmount);

        startSceneScrollAmount += scenesScrollAmount[currentScene];
        //   startSceneScrollAmount = scrollAmount;

        console.log("Start scene scroll amount: " + startSceneScrollAmount);

        currentScene++;
        scenesSetup[currentScene]();
    } else if (currentScene === maxScenes - 1) {
        scrollAmount = maxScroll - 1;
    }
}

function prevScene() {
    if (currentScene > 0) {
        console.log("Changing scene from " + currentScene + " to " + (currentScene - 1));
        console.log("Scroll amount: " + scrollAmount);
        console.log("Start scene scroll amount: " + startSceneScrollAmount);

        // startSceneScrollAmount = startSceneScrollAmount - scenesScrollAmount[currentScene - 1];
        startSceneScrollAmount -= scenesScrollAmount[currentScene - 1];

        console.log("Start scene scroll amount: " + startSceneScrollAmount);
        currentScene--;
        scenesSetup[currentScene]();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateReferenceMeasure();
    computeSceneFiveStartingPositions();
    if (currentScene === 4 || currentScene === 5) {
        sceneFiveSetup();
    }
}

function computeSceneFiveStartingPositions() {
    sceneFiveStartingCirclePositions = {
        "FAMILY MEMBER": { x: width / 2 + 70 * realReferenceMeasure, y: height / 2 - 230 * realReferenceMeasure },
        "INTIMATE PARTNER": { x: width / 2 - 100 * realReferenceMeasure, y: height / 2 + 220 * realReferenceMeasure },
        "OTHER PERPETRATOR KNOWN TO THE VICTIM": { x: width / 2 - 600 * realReferenceMeasure, y: height / 2 + 180 * realReferenceMeasure },
        "PERPETRATOR UNKNOWN TO THE VICTIM": { x: width / 2 + 400 * realReferenceMeasure, y: height / 2 + 200 * realReferenceMeasure },
        "PERPETRATOR TO VICTIM RELATIONSHIP UNKNOWN": { x: width / 2 - 400 * realReferenceMeasure, y: height / 2 - 100 * realReferenceMeasure },
        "NON CI SONO DATI SULLA CATEGORIA": { x: width / 2 + 500 * realReferenceMeasure, y: height / 2 - 200 * realReferenceMeasure }
    };

    countriesPositions = {
        "NORTHERN AFRICA": { x: width / 2 - 800 * realReferenceMeasure, y: height / 2 + 300 * realReferenceMeasure },
        "SUB-SAHARIAN AFRICA": { x: width / 2 - 500 * realReferenceMeasure, y: height / 2 + 340 * realReferenceMeasure },
        "LATIN AMERICA AND CARRIBEAN": { x: width / 2 + 750 * realReferenceMeasure, y: height / 2 - 320 * realReferenceMeasure },
        "NORTHERN AMERICA": { x: width / 2 + 600 * realReferenceMeasure, y: height / 2 + 300 * realReferenceMeasure },
        "CENTRAL ASIA": { x: width / 2 + 350 * realReferenceMeasure, y: height / 2 - 290 * realReferenceMeasure },
        "EASTERN ASIA": { x: width / 2 + 50 * realReferenceMeasure, y: height / 2 + 100 * realReferenceMeasure },
        "SOUTH-EASTERN ASIA": { x: width / 2 - 600 * realReferenceMeasure, y: height / 2 + 50 * realReferenceMeasure },
        "SOUTHERN ASIA": { x: width / 2 - 400 * realReferenceMeasure, y: height / 2 - 70 * realReferenceMeasure },
        "WESTERN ASIA": { x: width / 2 + 150 * realReferenceMeasure, y: height / 2 + 280 * realReferenceMeasure },
        "EASTERN EUROPE": { x: width / 2 + 660 * realReferenceMeasure, y: height / 2 - 25 * realReferenceMeasure },
        "NORTHERN EUROPE": { x: width / 2 + 100 * realReferenceMeasure, y: height / 2 - 200 * realReferenceMeasure },
        "SOUTHERN EUROPE": { x: width / 2 - 170 * realReferenceMeasure, y: height / 2 + 250 * realReferenceMeasure },
        "WESTERN EUROPE": { x: width / 2 + 340 * realReferenceMeasure, y: height / 2 },
        "AUSTRALIA AND NEW ZELAND": { x: width / 2 - 150 * realReferenceMeasure, y: height / 2 + 20 * realReferenceMeasure }
    };
}

// Scena 7 crediti
scenesScrollAmount[6] = 6000;
scenes[6] = sceneSeven;
scenesSetup[6] = sceneSevenSetup;
function sceneSevenSetup() {
    fadeAmount = 0;
}
function sceneSeven() {
    background(backgroundColor);
    fill(255, fadeAmount);

    // Titolo
    fill(255, fadeAmount);
    textFont(timesNewRomanBold);
    textAlign(CENTER, CENTER);
    textSize(48 * cappedReferenceMeasure);
    text('Credits', width / 2, height / 1.7 - 500 * cappedReferenceMeasure);

    // Sottotitolo
    fill(255, fadeAmount);
    textFont(montserratRegular);
    textSize(24 * realReferenceMeasure);
    textAlign(CENTER, CENTER);
    let creditsText = [ //testo
        "This project was created by students from the Politecnico di Milano,",
        "within the Information Design course, Bachelor's Degree in Communication Design",
        "",
        "Lorenzo Coluccia",
        "Ermanio Malko",
        "Gaia Manera",
        "Cristina Pedrazzini",
        "Marta Stella Ratti",
        "Susanna Scopelliti",
        "",
        "The data used in this project sourced from the United Nations Office on Drugs and Crime (UNODC):",
        "dataunodc.un.org/dp-femicide",
        "",
        "National data are submitted by Member States to UNODC through the United Nations Survey of Crime Trends and",
        "Operations of Criminal Justice Systems (UN-CTS) or via other means. Regional and global estimates are",
        "produced by UNODC based on national data."
    ];

    let lineHeight = 30 * cappedReferenceMeasure;
    let blockHeight = creditsText.length * lineHeight;
    let startY = height / 2 - blockHeight / 2;
    creditsText.forEach((line, index) => {
        text(line, width / 2, startY + index * lineHeight);
    });

}