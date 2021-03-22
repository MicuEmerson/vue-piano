const western = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const indianPhonetic = ['S', 'r', 'R', 'g', 'G', 'm', 'M', 'P', 'd', 'D', 'n', 'N'];

let indicScripts = {
    "bn": [
        ["সা়", "ঋা়", "রা়", "জ্ঞা়", "গা়", "মা়", "ক্ষা়", "পা়", "দা়", "ধা়", "ণা়", "না়"],
        ["সা", "ঋা", "রা", "জ্ঞা", "গা", "মা", "ক্ষা", "পা", "দা", "ধা", "ণা", "না"],
        ["র্সা", "র্ঋা", "র্রা", "র্জ্ঞা", "র্গা", "র্মা", "র্ক্ষা", "র্পা", "র্দা", "র্ধা", "র্ণা", "র্না"]
    ],
    "hi": [
        ["सा़", "रे़॒", "रे़", "ग़॒", "ग़", "म़", "म़॑", "प़", "ध़॒", "ध़", "ऩी॒", "ऩी"],
        ["सा", "रे॒", "रे", "ग॒", "ग", "म", "म॑", "प", "ध॒", "ध", "नी॒", "नी"],
        ["सां", "रें॒", "रें", "गं॒", "गं", "मं", "मं॑", "पं", "धं॒", "धं", "नीं॒", "नीं"]
    ]
};


function getScaleMap(scale, octave=4) {
    console.log("scale: " + scale + ", octave: " + octave)
    let index = western.indexOf(scale);
    if (index == -1) {
        throw "Scale not supported: " + scale;
    }

    let allNotes = [];
    for (let oct = 1; oct <= 8; oct++) {
        western.forEach(note => {
            allNotes.push(note + oct);
        })
    }

    let allPhonetic = []
    for (let oct = 0; oct <= 2; oct++) {
        indianPhonetic.forEach(note => {
            allPhonetic.push(note + oct);
        })
    }

    let start = allNotes.indexOf(scale + (octave - 1))

    let scaleMap = {};
    for (let j = start, i = 0; j < start + 36; j++, i++) {
        scaleMap[allNotes[j]] = allPhonetic[i]
    }
    return scaleMap;
}

function getTranslationLookup() {
    let translationMap = {};
    for (const lng in indicScripts) {
        const element = indicScripts[lng];
        element.forEach((arr, octave) => {
            if (translationMap[lng] == undefined) {
                translationMap[lng] = {};
            }
            let noteObj = {};
            arr.forEach((note, i) => {
                noteObj[indianPhonetic[i]] = note;
            })
            translationMap[lng][octave] = noteObj
        });
    }
    return translationMap;
}



/**
 * It will return specific note in Indian format
 *
 * @param {String} noteWithOctave Provide western note i.e. C1, D#2 etc
 * @param {String} lang Language code in ISO 639-1 format,
 * currently Bengali (bn) and Hindi (hi) is supported
 */
export const getIndianNotation = function (noteWithOctave, middleOctave, scale = "C", lang = "bn") {
    let map = getScaleMap(scale, middleOctave);
    const transMap = getTranslationLookup();
    let phoneticNote = map[noteWithOctave];
    if (phoneticNote) {
        let newNote = phoneticNote.substring(0, phoneticNote.length - 1);
        let newOctave = phoneticNote.substring(phoneticNote.length - 1);

        let translatedNote = transMap[lang][newOctave][newNote];
        return translatedNote;
    }
    return "";
}