<template>
    <div class="piano-keyboard">

        <div v-for="noteObject in notes" :key="noteObject.note"
          class="white-note" :class="[noteObject.pressed ? 'white-note-pressed' : '']"
          :style="{width: whiteNoteWidthSize + '%', background: whiteNoteBackground(noteObject.pressed)}"
          @mousedown="playNoteMouse(noteObject)" @mouseup="removePressedKeyMouse(noteObject)"
          @mouseover="playNoteHover(noteObject)" @mouseleave="removePressedKey(noteObject)">
            
          <div v-if="noteObject.blackNote"
            class="black-note" :class="[noteObject.blackNote.pressed ? 'black-note-pressed' : '']" 
            :style="{background: blackNoteBackground(noteObject.blackNote.pressed)}"
            @mousedown.stop="playNoteMouse(noteObject.blackNote)" @mouseup.stop="removePressedKeyMouse(noteObject.blackNote)"
            @mouseover.stop="playNoteHover(noteObject.blackNote)" @mouseleave.stop="removePressedKey(noteObject.blackNote)">

            <div class="key-group unselectable">
                <div v-if="showKeys" class="key-input">
                    {{noteObject.blackNote.key}}
                </div>
                 
                <div v-if="showNotes" class="key-text key-text-on-black-note">
                    {{noteObject.blackNote.note}}
                </div>
            </div>
          </div> 

          <div class="key-group unselectable"> 
            <div v-if="showKeys" class="key-input">
                {{noteObject.key}}
            </div>

            <div v-if="showNotes" class="key-text">
                {{noteObject.note}}
            </div>
          </div>

        </div>
    </div>
</template>

<script>
import * as Tone from "tone";

export default {

  data: function () {
    return {

         /* Tone.js Synth instance which help us to play musical notes */
        synth : null,

        /* Helper map for pressed key, (e.g notesIndexesByKey['a'] = 4, we found the note which coresponds to 'a' key at index 4 in notes array) */
        notesIndexesByKey: {},

        /* Here we need generate notes, it contains objects of the form 
            { 
                note: <C4>,
                key: <a>,
                pressed: <false>,
                blackNote: { 
                    name: <C#4>,
                    key: <b>,
                    pressed: <false> 
                } 
            }
            where note is the note name, key is a keyboard key you have to press in order to play that note,
            pressed is telling us if note is pressed or not and blackNote is mandatory only for notes that have 'sharp/flat'
        */
        notes : [],

        /* It's used to generate notes, used in 'generateNotes' method */
        allNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],

        /* As name says */
        whiteNoteWidthSize: 0,

        /* It's used to play note when mouse is pressed and note is hovered */
        isMousePressed: false
    };
  },

  props: {

    allKeys:{
        type: Array,
        default: () => [
            '`', `1`, '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
            'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
            'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
            'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.' 
        ]
    },

    whiteNoteColor: {
        type: String,
        default: "#1eb7eb"
    },

    blackNoteColor: {
        type: String,
        default: "#f9bb2d"
    },

    showKeys: {
        type: Boolean,
        default: false,
    },

    showNotes: {
        type:Boolean,
        default: false
    },

    startOctave: {
        type: Number,
        default: 2
    },

    endOctave: {
        type: Number,
        default: 4
    },

    sustain: {
        type: Boolean,
        default: false
    }
  },


  created() {
    this.synth = new Tone.Synth().toDestination();

    this.generateNotes();
    this.generateNotesIndexesByKey();

    window.addEventListener("keydown", e => {
      const key = e.key;
      const index = this.notesIndexesByKey[key];

      if(index != undefined){
        const noteObject = this.notes[index].key === key ? this.notes[index] : this.notes[index].blackNote;
        this.playNote(noteObject);
      }
    });

    window.addEventListener("keyup", e => {
      const key = e.key;
      const index = this.notesIndexesByKey[key];

      if(index != undefined){
        const noteObject = this.notes[index].key === key ? this.notes[index] : this.notes[index].blackNote;
        this.removePressedKey(noteObject);
      }
    });

    window.onmouseup = () => {
       this.isMousePressed = false;
    }
  },

  destroyed() {
    window.removeEventListener('keydown', () => {});
    window.removeEventListener('keyup', () => {});
    window.removeEventListener('onmouseup', () => {});
  },

  methods: {
    playNote(noteObject) {
        if(!noteObject.pressed){
            this.synth.triggerAttackRelease(noteObject.note, this.sustain ? "2n" : "8n");
            noteObject.pressed = true;
        }
    },

    playNoteMouse(noteObject) {
        this.isMousePressed = true;
        this.playNote(noteObject);
    },

    playNoteHover(noteObject) {
        if(this.isMousePressed)
            this.playNote(noteObject);
    },

    removePressedKey(noteObject) {
        noteObject.pressed = false;
    },

    removePressedKeyMouse(noteObject) {
        this.isMousePressed = false
        this.removePressedKey(noteObject);
    },

    whiteNoteBackground: function(pressed){
      return pressed ? this.whiteNoteColor : 'linear-gradient(to bottom, #eee 0%, #fff 100%)';
    },
    
    blackNoteBackground: function(pressed){
      return pressed ? this.blackNoteColor : 'linear-gradient(45deg, #555, #222)';
    },

    generateNotes: function(){
        let keyIndex = 0;
        let noteIndex = 0;
        this.notes.length = 0;

        for(let octave = this.startOctave; octave <= this.endOctave; octave++) {

            while(noteIndex < this.allNotes.length) {
                const currentNote = this.allNotes[noteIndex];

                let newNote = {
                    note: currentNote + octave,
                    key: this.allKeys[keyIndex++],
                    pressed: false,
                }

                if(currentNote !== "B" && currentNote !== "E") {
                    let blackNote = {
                        note: currentNote + '#' + octave,
                        key: this.allKeys[keyIndex++],
                        pressed: false,
                    }

                    newNote["blackNote"] = blackNote;
                }

                this.notes.push(newNote);
                
                if(octave === this.endOctave && currentNote === "B")
                    break;
                
                noteIndex++;
            }

            noteIndex = 0;
        }

        this.whiteNoteWidthSize = 100 / this.notes.length;
    },

    generateNotesIndexesByKey: function() {
        this.notesIndexesByKey.length = 0;

        for(let index = 0; index < this.notes.length; index++){
            this.notesIndexesByKey[this.notes[index].key] = index;

            if(this.notes[index].blackNote != undefined)
                this.notesIndexesByKey[this.notes[index].blackNote.key] = index;
            
        }
    },
  },
}
</script>

<style>
.piano-keyboard {
  position: relative;
  height: 100%;
  width: 100%;
}
 
.white-note {
  display: flex;
  justify-content: center;
  float: left;
  position: relative;
  cursor: pointer;
  color: black;
  height: 98%;
  border-radius: 0 0 5px 5px;
  box-shadow: 
    0px 0px 0px rgba(255, 255, 255, 0.8) inset,
    -2px -5px 3px #ccc inset,
    0 0 3px rgba(0, 0, 0, 0.5);
}
 
.white-note-pressed {
  box-shadow: 
     2px 0 3px rgba(0, 0, 0, 0.2) inset,
    -5px -1px 20px rgba(0, 0, 0, 0.2) inset,
     0 0 3px rgba(0, 0, 0, 0.5); 
}
 
.black-note {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: absolute;
  cursor: pointer;
  height: 65%;
  width: 65%;
  left: 68%;
  z-index: 1;
  color: white;
  border-radius: 0 0 3px 3px;
  box-shadow: 
    -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
    0 -5px 2px  rgba(0, 0, 0, 0.5) inset,
    0 2px 4px rgba(0, 0, 0, 0.5);
}
 
.black-note-pressed {
  box-shadow: 
    -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
    0 -1px 2px rgba(0, 0, 0, 0.2) inset,
    0 1px 2px rgba(0, 0, 0, 0.2);
}
 
.key-group {
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.8vw;
  font-size: 1.2vw;
}
 
.key-text {
  margin-top: 0.8vw;
}
 
.key-text-on-black-note {
  transform: rotate(-90deg);
  margin: 0.8vw 0;
  margin-top: 1vw;
}
 
.key-input {
  text-align: center;
  width: 2em;
  color: inherit;
  font-size: 1vw;
}
 
.unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
