<template>
  <q-page padding>
    <h6 class="doc-heading doc-h2 text-grey-3">Layers</h6>
    <div class="col-12">
      <q-input
        outlined
        dense
        dark
        color="grey-3"
        label="Comando"
        v-model="store.command"
        type="textarea"
        rows="1"
      >
      </q-input>
    </div>

    <div class="q-pt-md">
      <q-table
        class="my-sticky-header-column-table minor"
        dense
        color="text-grey-3"
        card-class="bg-drawer text-grey-4"
        :rows="data"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[0]"
        :filter="filter"
        :filter-method="customFilter"
        @row-click="onRowClick"
        wrap-cells
      >
        <template v-slot:top>
          <div style="width: 100%" class="row">
            <div class="col-4">
              <q-select
                outlined
                bottom-slots
                dense
                :options-dense="true"
                dark
                v-model="store.filteredMap"
                :options="maps"
                label="Mapa"
              >
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click.stop.prevent="store.filteredMap = ''"
                    class="cursor-pointer"
                  ></q-icon>
                </template>
              </q-select>
            </div>
            <div class="col-4">
              <q-select
                outlined
                bottom-slots
                dense
                :options-dense="true"
                dark
                v-model="store.filteredMode"
                :options="gameMods"
                label="Modo"
              >
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click.stop.prevent="store.filteredMode = ''"
                    class="cursor-pointer"
                  ></q-icon> </template
              ></q-select>
            </div>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue';
import { copyToClipboard, Notify } from 'quasar';
import { allMapsModes } from 'stores/history';

export default {
  name: 'LayersPage',

  setup() {
    const store = allMapsModes();

    const command = ref('');
    const data = ref([]);
    const maps = ref([]);
    const gameMods = ref([]);
    const filteredMap = ref('');
    const filteredMode = ref('');
    const lowerSearch = ref('');
    const search = ref('');

    return {
      store,
      command,
      search,
      lowerSearch,
      filteredMap,
      filteredMode,
      data,
      maps,
      gameMods,
      columns: [
        {
          name: 'Mapa',
          required: true,
          label: 'Mapa',
          align: 'left',
          field: (row: any[]) => row.map,
          format: (val: any) => `${val}`,
          sortable: false,
        },
        {
          name: 'Layer',
          required: true,
          label: 'Layer',
          align: 'left',
          field: (row: { layer: any }) => row.layer,
          format: (val: any) => `${val}`,
          sortable: false,
          // style: 'max-width: 600px',
        },
        {
          name: 'time_day',
          required: true,
          label: 'Hora',
          align: 'left',
          field: (row: { time_day: string }) =>
            row.time_day ? row.time_day : '',
          format: (val: any) => `${val}`,
          sortable: false,
        },
        {
          name: 'type',
          required: true,
          label: 'Modo',
          align: 'left',
          field: (row: { type: '' }) => row.type,
          format: (val: any) => `${val}`,
          sortable: false,
        },
        {
          name: 'team1',
          required: true,
          label: 'Time 1',
          align: 'left',
          field: (row: { team1: '' }) => row.team1,
          format: (val: any) => `${val}`,
          sortable: false,
        },
        {
          name: 'tickets1',
          required: true,
          label: 'Tickets 1',
          align: 'left',
          field: (row: { tickets1: '' }) => row.tickets1,
          format: (val: any) => `${val}`,
          sortable: false,
        },
        {
          name: 'tanks1',
          required: true,
          label: 'Tanks 1',
          align: 'left',
          field: (row: { tanks1: string }) => (row.tanks1 ? row.tanks1 : ''),
          format: (val: any) => `${val}`,
          sortable: false,
        },
        {
          name: 'heli1',
          required: true,
          label: 'Heli 1',
          align: 'left',
          field: (row: { heli1: '' }) => (row.heli1 ? row.heli1 : ''),
          format: (val: any) => `${val}`,
          sortable: false,
        },
        {
          name: 'team2',
          required: true,
          label: 'Time 2',
          align: 'left',
          field: (row: { team2: '' }) => row.team2,
          format: (val: any) => `${val}`,
          sortable: false,
        },
        {
          name: 'tickets2',
          required: true,
          label: 'Tickets 2',
          align: 'left',
          field: (row: { tickets2: any }) => row.tickets2,
          format: (val: any) => `${val}`,
          sortable: false,
        },
        {
          name: 'tanks2',
          required: true,
          label: 'Tanks 2',
          align: 'left',
          field: (row: { tanks2: any }) => (row.tanks2 ? row.tanks2 : ''),
          format: (val: any) => `${val}`,
          sortable: false,
        },
        {
          name: 'heli2',
          required: true,
          label: 'Heli 2',
          align: 'left',
          field: (row: { heli2: any }) => (row.heli2 ? row.heli2 : ''),
          format: (val: any) => `${val}`,
          sortable: false,
        },
      ],
    };
  },

  computed: {
    filter() {
      return {
        search: this.search,
      };
    },
  },

  mounted() {
    this.readData();
    this.readMaps();
    this.readGameMode();
  },
  methods: {
    readData() {
      return window.api.getLayers().then((response: never[]) => {
        this.data = response;
      });
    },

    readMaps() {
      return window.api.getMaps().then((response: never[]) => {
        response.forEach((el: never[]) => {
          this.maps.push(el.map);
        });
      });
    },

    readGameMode() {
      return window.api.getGameMode().then((response: never[]) => {
        response.forEach((el: { modo: never }) => {
          this.gameMods.push(el.modo);
        });
      });
    },

    onRowClick(evt: any, row: { layer: any }) {
      this.command = `AdminSetNextLayer ${row.layer}`;
      this.store.saveLastCommand(this.command);

      copyToClipboard(this.command);
      Notify.create({
        type: 'positive',
        timeout: 1000,
        progress: true,
        message: 'Copiado para a área de transferência',
        actions: [{ icon: 'close', color: 'white' }],
      });
    },

    customFilter(rows: never[], terms: { search: string }) {
      this.lowerSearch = terms.search ? terms.search.toLowerCase() : '';

      this.store.saveSelectedMap(this.store.filteredMap);
      this.store.saveSelectedMode(this.store.filteredMode);


      const filteredRows = rows.filter(
        (row: { [s: string]: unknown } | ArrayLike<unknown>) => {
          let ans = false;
          let map = true;
          let mode = true;

          if (this.store.filteredMap) {
            map = row.map == this.store.filteredMap;
          }
          if (this.store.filteredMode) {
            mode = row.type == this.store.filteredMode;
          }

          if (this.lowerSearch != '') {
            let s1_values = Object.values(row);
            let s1_lower = s1_values.map((x) => x.toString().toLowerCase());

            for (let val = 0; val < s1_lower.length; val++) {
              if (s1_lower[val].includes(this.lowerSearch)) {
                break;
              }
            }
          }
          ans = false;
          if (map && mode) {
            ans = true;
          }
          return ans;
        }
      );

      return filteredRows;
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
