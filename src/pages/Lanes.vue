<template>
  <q-page padding>
    <h6 class="doc-heading doc-h2 text-grey-3">Squad Lanes</h6>

    <div class="q-pt-md">
      <!-- <iframe class="fill"
        src="https://squadlanes.com"
        width="100%"
        height="100%"
        frameborder="0"
      >
      </iframe> -->
    </div>
  </q-page>
</template>

<script lang="ts">
import { copyToClipboard, Notify } from 'quasar';

export default {
  name: 'LayersPage',

  data() {
    return {};
  },

  methods: {},
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
