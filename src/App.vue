<template>
  <div id="app">
    <h1> Vue Piano Component </h1>

    <div class="config-container">
      <h2> Configuration </h2>
      <div>
        #todo
      </div>
    </div>

    <div style="height: 300px">
      <PianoKeyboard/>
    </div>
  </div>
</template>

<script>
import PianoKeyboard from "./components/PianoKeyboard"

export default {
  name: 'App',
  components: {
    PianoKeyboard
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
  /* overflow-y: hidden; */
}

.piano-container {
  margin-left: 8%;
  margin-right: 8%;
  height: 30%;
}

.config-container {
  text-align: left;
}
</style>
