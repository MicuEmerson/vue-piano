import pianoKeyboard from "./PianoKeyboard.vue";

function install(Vue) {

  if (install.installed) 
    return;

  install.installed = true;
  Vue.component("piano-keyboard", pianoKeyboard);
}

const plugin = {
  install
};

let GlobalVue = null;

if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

pianoKeyboard.install = install;

export default pianoKeyboard;