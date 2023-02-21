<template>
  <q-page padding>
    <h6 class="doc-heading doc-h2 text-grey-3">Squad Lanes</h6>

    <div class="q-pt-md">
      <iframe
        class="fill"
        :src="url"
        width="100%"
        height="100%"
        frameborder="0"
      >
      </iframe>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue';
import { storeLanes } from 'stores/lanes';

export default {
  name: 'LayersPage',

  setup() {
    const store = storeLanes();
    const loaded = false;
    const url = ref('');
    return {
      store,
      loaded,
      url,
    };
  },

  mounted() {
    // this.url = 'https://www.google.com.br/search?q=teste';
    this.url = 'https://squadlanes.com/';
    this.loaded = true;
    this.store.loaded = true;
  },

  methods: {
    loadURL() {
      console.log('teste');
    },
  },
};
</script>

<style>
.icon {
  border-radius: 0 !important;
  height: 80% !important;
  width: 80% !important;
}
textarea {
  resize: none !important;
}
</style>
