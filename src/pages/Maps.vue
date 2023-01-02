<template>
  <q-page padding>
    <h6 class="doc-heading doc-h2 text-grey-3">Votação de mapa</h6>
    <div class="q-gutter-sm col-12">
      <q-input
        outlined
        dense
        dark
        color="grey-3"
        label="Comando"
        v-model="command"
        type="textarea"
        rows="1"
      >
      </q-input>
      <q-btn
        color="blue"
        label="Sugerir votação"
        v-on:click="suggestion"
      ></q-btn>
      <q-btn
        color="blue"
        label="Vencedor de mapa e modo"
        v-on:click="winnerMapMode"
      ></q-btn>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="q-pt-md">
          <q-table
            class="my-sticky-header-column-table table-height"
            dense
            color="text-grey-3"
            card-class="bg-drawer text-grey-4"
            :rows="maps"
            :columns="columnsMaps"
            row-key="map"
            :rows-per-page-options="[0]"
            wrap-cells
            selection="multiple"
            v-model:selected="selected"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th></q-th>
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
            <template v-slot:top>
              <div style="width: 100%" class="row">
                <div class="col-12">
                  <q-btn
                    color="blue"
                    label="Propor mapas"
                    v-on:click="createVoteMap"
                  ></q-btn>
                </div>
              </div>
            </template>
          </q-table>
        </div>
      </div>
      <div class="col-6">
        <div class="q-pa-md">
          <q-table
            class="my-sticky-header-column-table table-height"
            dense
            color="text-grey-3"
            card-class="bg-drawer text-grey-4"
            :rows="modes"
            :columns="columnsModes"
            row-key="modo"
            :rows-per-page-options="[0]"
            wrap-cells
            selection="multiple"
            v-model:selected="selectedMode"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th></q-th>
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
            <template v-slot:top>
              <div style="width: 100%" class="row">
                <div class="col-12">
                  <q-btn
                    color="blue"
                    label="Propor modo"
                    v-on:click="createVoteMode"
                  ></q-btn>
                </div>
              </div>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { copyToClipboard, Notify } from 'quasar';
import { userVote } from 'stores/history';
import { runInThisContext } from 'vm';

export default {
  name: 'MapsPage',

  setup() {
    const store = userVote();

    const selected = ref([]);
    const selectedMode = ref([]);
    const maps = ref([]);
    const modes = ref([]);
    const command = computed(() => store.command);
    const selectedMaps = computed(() => store.selectedMaps);
    const selectedModes = computed(() => store.selectedModes);

    return {
      store,
      selected,
      selectedMode,
      maps,
      modes,
      command,
      selectedMaps,
      selectedModes,
      columnsMaps: [
        {
          name: 'maps',
          required: true,
          label: 'Mapa',
          align: 'left',
          field: (row: any[]) => row.map,
          format: (val: any) => `${val}`,
          sortable: false,
        },
      ],
      columnsModes: [
        {
          name: 'modes',
          required: true,
          label: 'Modo de jogo',
          align: 'left',
          field: (row: { modo: any }) => row.modo,
          format: (val: any) => `${val}`,
          sortable: false,
        },
      ],
    };
  },

  mounted() {
    this.readMaps();
    this.readModes();
    this.setSelectedMapsModes();
  },
  methods: {
    readMaps() {
      return window.api.getMaps().then((response: never[]) => {
        this.maps = response;
      });
    },

    suggestion() {
      this.store.saveLastCommand(
          'adminbroadcast Sugestões para o próximo mapa?'
        );
        this.setNotify('positive', 'Copiado para a área de transferência');
        copyToClipboard(this.command);
        return;
    },

    setSelectedMapsModes() {
      this.selected = this.selectedMaps;
      this.selectedMode = this.selectedModes;
    },

    readModes() {
      return window.api.getGameMode().then((response: never[]) => {
        this.modes = response;
      });
    },

    createVoteMap() {
      let sel = JSON.parse(JSON.stringify(this.selected));
      let mapSel: string[] = [];
      let maps = '';
      let count = 0;
      sel.forEach((el: { map: string }) => {
        count++;
        mapSel.push(count + ') ' + el.map);
      });
      if (count < 1) {
        this.setNotify('warning', 'Selecione um mapa');
        return;
      }
      if (count === 1) {
        // this.command = `adminbroadcast mapa ${sel[0].map} venceu! Obrigado a todos pelo voto e bom jogo!`;
        this.store.saveLastCommand(
          `adminbroadcast mapa ${sel[0].map} venceu! Obrigado a todos pelo voto e bom jogo!`
        );
        this.store.saveSelectedMaps(sel);
        this.setNotify('positive', 'Copiado para a área de transferência');
        copyToClipboard(this.command);
        return;
      }
      mapSel.forEach((el) => {
        maps = maps + ' ' + el;
      });
      // this.command = `adminbroadcast Vote apenas uma vez: ${maps}`;
      this.store.saveLastCommand(`adminbroadcast Vote apenas uma vez: ${maps}`);
      this.store.saveSelectedMaps(sel);

      this.setNotify('positive', 'Copiado para a área de transferência');
      copyToClipboard(this.command);
    },

    createVoteMode() {
      let selMode = JSON.parse(JSON.stringify(this.selectedMode));
      let modeSel: string[] = [];
      let modes = '';
      let count = 0;
      selMode.forEach((el: { modo: string }) => {
        count++;
        modeSel.push(count + ') ' + el.modo);
      });
      if (count < 1) {
        this.setNotify('warning', 'Selecione um modo');
        return;
      }
      if (count === 1) {
        // this.command = `adminbroadcast Modo ${selMode[0].modo} venceu! Obrigado a todos pelo voto e bom jogo!`;
        this.store.saveLastCommand(
          `adminbroadcast Modo ${selMode[0].modo} venceu! Obrigado a todos pelo voto e bom jogo!`
        );
        this.store.saveSelectedModes(selMode);

        this.setNotify('positive', 'Copiado para a área de transferência');
        copyToClipboard(this.command);
        return;
      }
      modeSel.forEach((el) => {
        modes = modes + ' ' + el;
      });
      // this.command = `adminbroadcast Vote apenas uma vez: ${modes}`;
      this.store.saveLastCommand(
        `adminbroadcast Vote apenas uma vez: ${modes}`
      );
      this.store.saveSelectedModes(selMode);

      this.setNotify('positive', 'Copiado para a área de transferência');
      copyToClipboard(this.command);
    },

    winnerMapMode() {
      let sel = JSON.parse(JSON.stringify(this.selected));
      let selMode = JSON.parse(JSON.stringify(this.selectedMode));

      if (sel.length === 1 && selMode.length === 1) {
        // this.command = `adminbroadcast Mapa ${sel[0].map} modo ${selMode[0].modo} venceu! Obrigado a todos pelo voto e bom jogo!`;
        this.store.saveLastCommand(
          `adminbroadcast Mapa ${sel[0].map} modo ${selMode[0].modo} venceu! Obrigado a todos pelo voto e bom jogo!`
        );
        this.store.saveSelectedMaps(sel);
        this.store.saveSelectedModes(selMode);

        this.setNotify('positive', 'Copiado para a área de transferência');
        copyToClipboard(this.command);
      }
    },

    setNotify(type: string, message: string) {
      Notify.create({
        type: type,
        timeout: 1000,
        progress: true,
        message: message,
        actions: [{ icon: 'close', color: 'white' }],
      });
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
.table-height {
  height: calc(100vh - 280px) !important;
}
textarea {
  resize: none !important;
}
</style>
