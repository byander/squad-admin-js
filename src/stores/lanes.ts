import { defineStore } from 'pinia';
import { boot } from 'quasar/wrappers';

export const storeLanes = defineStore('storeLanes', {
  state: () => ({
    map: '',
    layer: '',
    loaded: false,
  }),
  actions: {
    saveLastMap(text: string) {
      this.map = text;
    },
    saveLastLayer(text: string) {
      this.layer = text;
    },
    setLoaded(bool: boolean) {
      this.loaded = bool;
    },
  },
});
