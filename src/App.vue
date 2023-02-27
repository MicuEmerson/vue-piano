<template>
  <div id="app">
    <h1> Vue Piano Component </h1>

    <section class="config-container">
      <div>
        <h2> Configuration </h2>
          <!-- <hr> -->
      </div>
      <!-- <div style="width: 50%"> -->
        <div class="config-elem">
          <div class="config-elem-cell">
            <div> All keys: </div>
            <textarea :value="allKeys" @change="handleAllKeysChanges" rows="2" cols="60"
              style="margin-top: 1.5%" placeholder="add keys followed by semicolumns (e.g: a,s,d...)">
            </textarea>
          </div>
        </div>

        <div class="config-elem">
          <div class="config-elem-cell">
            <label> Show Keys: </label> <input type="checkbox" v-model="showKeys"/>
          </div>
          <div class="config-elem-cell">
            <label> Show Notes: </label> <input type="checkbox" v-model="showNotes"/> 
          </div>
          <div v-if="showNotes" class="config-elem-cell">
            <label> Indian Notes: </label> <input type="checkbox" v-model="indianNotes"/> 
          </div>        
          <div class="config-elem-cell">
            <label> Sustain: </label> <input type="checkbox" v-model="sustain"/> 
          </div>
        </div>

         <div v-if="indianNotes" class="config-elem">
          <div class="config-elem-cell">            
            <label> Notation Scale </label>       
            <select v-model="noteConfig.scale">
            <option disabled value="">Please select scale</option>
            <option selected>C</option>
            <option>C#</option>
            <option>D</option>
            <option>D#</option>
            <option>E</option>
            <option>F</option>
            <option>F#</option>
            <option>G</option>
            <option>G#</option>
            <option>A</option>
            <option>A#</option>
            <option>B</option>
          </select>          
          </div>

          <div class="config-elem-cell">      
            <label> Notation Language </label>       
            <select v-model="noteConfig.lang">
              <option disabled value="">Please select language</option>
              <option selected value="bn">Bengali</option>
              <option value="hi">Hindi</option>            
            </select>          
          </div>

          <div class="config-elem-cell">
            <label> Middle Octave </label> <input v-model="noteConfig.middleOctave" min="3" max="5" type="number">
          </div>      

         </div>

        <div class="config-elem">
          <div class="config-elem-cell">
            <label> White Note Color: </label> <input v-model="whiteNoteColor" type="color">
          </div>
          <div class="config-elem-cell">
            <label> Black Note Color: </label> <input v-model="blackNoteColor" type="color">
          </div>
        </div>

        <div class="config-elem">
          <div class="config-elem-cell">
            <label> Start Octave </label> <input v-model="startOctave" min="1" max="8" type="number">
          </div>
          <div class="config-elem-cell">
            <label> End Octave: </label> <input v-model="endOctave" min="1" max="8" type="number">
          </div>
        </div>
      <!-- </div> -->

      <!-- <div> <hr> </div> -->
    </section>

    <section class="piano-container">
      <PianoKeyboard 
        :showKeys="showKeys"
        :showNotes="showNotes"
        :sustain="sustain"
        :whiteNoteColor="whiteNoteColor"
        :blackNoteColor="blackNoteColor"
        :startOctave="startOctave"
        :endOctave="endOctave"
        :allKeys="allKeys"
        :indianNotes="indianNotes"
        :noteConfig="noteConfig"
        @noteClick="noteClick"
      />
    </section>
  </div>
</template>

<script>
import PianoKeyboard from "./components/PianoKeyboard"

export default {
  name: 'App',
  data: function () {
    return { 
      whiteNoteColor: "#1eb7eb",
      blackNoteColor: "#f9bb2d",
      showKeys: false,
      showNotes: false,
      sustain: false,
      startOctave: 2,
      endOctave: 4,
      allKeys: [ '`', `1`, '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
            'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
            'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
            'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.' ],
      indianNotes: false,
      noteConfig:{
        scale: "C",
        middleOctave: 4,
        lang: "bn"
      }
    }
  },
  components: {
    PianoKeyboard
  },
  methods: {
    handleAllKeysChanges: function(e){
      this.allKeys = e.srcElement.value.split(',').map(elem => elem.trim())      
    },
    noteClick: function(n){
      console.log(n)
    }
  }
}
</script>

<style>
* {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10+ and Edge */
  user-select: none; /* Standard syntax */
  box-sizing: border-box;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  padding: 5%;
  justify-content: space-between;
  flex-direction: column;
  height: inherit;
}

body, html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.piano-container {
  margin-left: 8%;
  margin-right: 8%;
  height: 30%;
}

.config-container {
  text-align: left;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 40%;
  width: 70%;
  padding-left: 6%;
}

.config-elem {
  display: flex;
  justify-content: flex-start;
}

.config-elem-cell {
  margin-right: 5%;
}
</style>
