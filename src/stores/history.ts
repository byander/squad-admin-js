import { defineStore } from 'pinia';

export const userVote = defineStore('userVote', {
  state: () => ({
    command: '',
    selectedMaps: [],
    selectedModes: [],
  }),
  actions: {
    saveLastCommand(text: string) {
      this.command = text;
    },
    saveSelectedMaps(selectedMaps: never[]) {
      this.selectedMaps = selectedMaps;
    },
    saveSelectedModes(selectedModes: never[]) {
      this.selectedModes = selectedModes;
    },
  },
});

export const allMapsModes = defineStore('allMapsModes', {
  state: () => ({
    command: '',
    filteredMap: '',
    filteredMode: '',
  }),
  actions: {
    saveLastCommand(text: string) {
      this.command = text;
    },
    saveSelectedMap(filteredMap: string) {
      this.filteredMap = filteredMap;
    },
    saveSelectedMode(filteredMode: string) {
      this.filteredMode = filteredMode;
    },
  },
});

export const storeCommands = defineStore('storeCommands', {
  state: () => ({
    command: '',
    filter: '',
  }),
  actions: {
    saveLastCommand(text: string) {
      this.command = text;
    },
    saveSelectedMap(text: string) {
      this.filter = text;
    },
  },
});

export const storeRcon = defineStore('storeRcon', {
  state: () => ({
    command: '',
    data: [],
  }),
  actions: {
    saveLastCommand(text: string) {
      this.command = text;
    },
    saveData(data: never[]) {
      this.data = data;
    },
  },
});
