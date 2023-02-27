# vue-piano

[![npm version](https://img.shields.io/npm/v/vue-piano-keyboard.svg)](https://www.npmjs.com/package/vue-piano-keyboard)
[![bundle size](https://img.shields.io/bundlephobia/min/vue-piano-keyboard.svg)](https://bundlephobia.com/result?p=vue-piano-keyboard)

An interactive piano keyboard for Vue. Supports click/keyboard events and some configurations. [**Try it out**](https://micuemerson.github.io/vue-piano/).

## Installing

```
npm i vue-piano-keyboard
```

Alternatively, you can download the UMD build from [unpkg](https://unpkg.com/vue-piano-keyboard).


## Usage

Import and use the compoment:

```js
<template>
  <div id="app">
    <PianoKeyboard/>
  </div>
</template>

<script>
import PianoKeyboard  from 'vue-piano-keyboard'

export default {
  name: 'App',
  components: {
    PianoKeyboard
  }
}
</script>
```

## Audio

vue-piano component uses Tone.js library for audio playback of each note, more specifically it uses Tone.Synth (that's why the size of the component it's pretty big).

## Props

| Name | Type | Default Value | Description |
| ---- | -----| ------------- | ----------- |
| `allKeys` | Array | (all the keyboard numbers/signs/letters) `['a', 's', 'd', ..]` |  An array of keyboard keys which corresponds to musical notes, from left to right the values will be assigned to the piano tiles. |
| `whiteNoteColor` | String | "#1eb7eb" | Color for white notes when they are pressed |
| `blackNoteColor` | String | "#f9bb2d" | Color for black notes when they are pressed |
| `showKeys` | Boolean | false | It will show the key corresponding to each note |
| `showNotes` | Boolean | false | It will show the notes corresponding to each tile |
| `startOctave` | Number | 2 | The notes will start from startOctave |
| `endOctave` | Number | 4 | The notes will end at endOctave |
| `sustain` | Boolean | false | It will sustain the note (some more seconds) after you release the key/click |
| `indianNote` | Boolean | false | It will show Indian Note (Only applicable if `showNotes` is true) |
| `noteConfig` | Object | {scale: "C", middleOctave: 4, lang: "hi"} | Configuration for Indian note (Only applicable if `indianNote` is true) |
| `tone` | Boolean | true | It will produce sound using tone.js |

## Style

The width (100%) and the height (100%) are adjusted base on the first parent width and height


## License

MIT
