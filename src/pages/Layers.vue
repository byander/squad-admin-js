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
        v-model="command"
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
                use-input
                dense
                :options-dense=true
                dark
                v-model="filterMap"
                :options="maps"
                label="Mapa"
              ></q-select>
            </div>
            <div class="col-4">
              <q-select
                outlined
                use-input
                dense
                :options-dense=true
                dark
                v-model="filterMode"
                :options="gameMods"
                label="Modo"
              ></q-select>
            </div>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { copyToClipboard, Notify } from 'quasar';

export default {
  name: 'LayersPage',

  data() {
    return {
      command: '',
      search: '',
      lowerSearch: '',
      filterMap: null,
      filterMode: null,
      model: '',
      data: [],
      maps: [],
      gameMods: [],
      columns: [
        {
          name: 'Mapa',
          required: true,
          label: 'Mapa',
          align: 'left',
          field: (row) => row.map,
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: 'Layer',
          required: true,
          label: 'Layer',
          align: 'left',
          field: (row) => row.layer,
          format: (val) => `${val}`,
          sortable: false,
          // style: 'max-width: 600px',
        },
        {
          name: 'time_day',
          required: true,
          label: 'Hora',
          align: 'left',
          field: (row) => row.time_day,
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: 'type',
          required: true,
          label: 'Modo',
          align: 'left',
          field: (row) => row.type,
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: 'team1',
          required: true,
          label: 'Time 1',
          align: 'left',
          field: (row) => row.team1,
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: 'tickets1',
          required: true,
          label: 'Tickets 1',
          align: 'left',
          field: (row) => row.tickets1,
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: 'tanks1',
          required: true,
          label: 'Tanks 1',
          align: 'left',
          field: (row) => row.tanks1,
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: 'heli1',
          required: true,
          label: 'Heli 1',
          align: 'left',
          field: (row) => row.heli1,
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: 'team2',
          required: true,
          label: 'Time 2',
          align: 'left',
          field: (row) => row.team2,
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: 'tickets2',
          required: true,
          label: 'Tickets 2',
          align: 'left',
          field: (row) => row.tickets2,
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: 'tanks2',
          required: true,
          label: 'Tanks 2',
          align: 'left',
          field: (row) => row.tanks2,
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: 'heli2',
          required: true,
          label: 'Heli 2',
          align: 'left',
          field: (row) => row.heli2,
          format: (val) => `${val}`,
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
      return window.api.getLayers().then((response) => {
        this.data = response;
      });
    },

    readMaps() {
      return window.api.getMaps().then((response) => {
        response.forEach((el) => {
          this.maps.push(el.map);
        });
      });
    },

    readGameMode() {
      return window.api.getGameMode().then((response) => {
        response.forEach((el) => {
          this.gameMods.push(el.modo);
        });
      });
    },


    onRowClick(evt, row) {
      this.command = `AdminSetNextLayer ${row.layer}`;
      copyToClipboard(this.command);
      Notify.create({
        type: 'positive',
        timeout: 1000,
        progress: true,
        message: 'Copiado para a área de transferência',
        actions: [{ icon: 'close', color: 'white' }],
      });
    },

    customFilter(rows, terms) {
      this.lowerSearch = terms.search ? terms.search.toLowerCase() : '';

      const filteredRows = rows.filter((row, i) => {
        let ans = false;
        let s1 = true;
        let map = true;
        let mode = true;
        if (this.filterMap) {
          map = row.map == this.filterMap;
        }
        if (this.filterMode) {
          mode = row.type == this.filterMode;
        }

        if (this.lowerSearch != '') {
          s1 = false;
          let s1_values = Object.values(row);
          let s1_lower = s1_values.map((x) => x.toString().toLowerCase());

          for (let val = 0; val < s1_lower.length; val++) {
            if (s1_lower[val].includes(this.lowerSearch)) {
              s1 = true;
              break;
            }
          }
        }
        ans = false;
        if (map && mode) {
          ans = true;
        }
        return ans;
      });

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
