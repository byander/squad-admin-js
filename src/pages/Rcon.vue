<template>
  <q-page padding>
    <h6 class="doc-heading doc-h2 text-grey-3">Rcon</h6>
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
        label="Colar dados do Rcon"
        v-on:click="getData"
      ></q-btn>
      <q-btn
        color="blue"
        label="Aplicar punição"
        v-on:click="createCommand"
      ></q-btn>
      <div class="row">
        <div class="text-white col-4">
          <q-option-group
            dark
            color="blue"
            v-model="group"
            :options="options"
            inline
            @update:model-value="checkBan"
          ></q-option-group>
        </div>
        <div class="col-8">
          <q-select
            v-model="reason"
            outlined
            use-input
            dense
            dark
            :options="reasons"
            :options-dense="true"
            label="Motivo"
          ></q-select>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <q-item>
            <q-item-section>
              <q-slider
                :disable="valueEnable"
                v-model="value"
                color="blue"
                :min="0"
                :max="30"
                label-always
              ></q-slider>
            </q-item-section>
          </q-item>
        </div>
        <div class="text-white col-8">
          <q-option-group
            :disable="valueEnable"
            dark
            color="blue"
            v-model="groupTime"
            :options="optionsTime"
            inline
          ></q-option-group>
        </div>
      </div>
    </div>

    <div class="q-pt-md">
      <q-table
        class="my-sticky-header-column-table table-height"
        dense
        color="text-grey-3"
        card-class="bg-drawer text-grey-4"
        :rows="rcon"
        :columns="columns"
        row-key="steamId"
        :rows-per-page-options="[0]"
        :filter="filter"
        :filter-method="customFilter"
        wrap-cells
        selection="single"
        v-model:selected="selected"
      >
        <template v-slot:top>
          <div style="width: 100%" class="row">
            <div class="col-12">
              <q-input
                dense
                dark
                label-color="grey-3"
                label="Procurar jogador"
                v-model="search"
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click="clearField"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { copyToClipboard, Notify } from 'quasar';
import { ref } from 'vue';

export default {
  name: 'RconPage',

  setup() {
    const selected = ref([]);
    const rcon = ref([]);
    const reasons = ref([]);
    const reason = ref('');
    const command = ref('');
    const lowerSearch = ref('');
    const search = ref('');
    const group = ref('opt1');
    const groupTime = ref('d');
    const value = ref(1);
    const valueEnable = ref(true);

    return {
      selected,
      rcon,
      reasons,
      reason,
      command,
      search,
      group,
      groupTime,
      lowerSearch,
      value,
      valueEnable,
      options: [
        {
          label: 'Kick',
          value: 'opt1',
        },
        {
          label: 'Ban',
          value: 'opt2',
        },
      ],
      optionsTime: [
        {
          label: 'Hora',
          value: 'h',
        },
        {
          label: 'Dia',
          value: 'd',
        },
        {
          label: 'Mês',
          value: 'm',
        },
      ],

      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: (row) => row.id,
          format: (val) => `${val}`,
          sortable: true,
          // style: 'max-width: 600px',
        },
        {
          name: 'steamId',
          required: true,
          label: 'SteamID',
          align: 'left',
          field: (row) => row.steamId,
          format: (val) => `${val}`,
          sortable: true,
          // style: 'max-width: 600px',
        },
        {
          name: 'name',
          required: true,
          label: 'Nome',
          align: 'left',
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
          // style: 'max-width: 600px',
        },
        {
          name: 'teamId',
          required: true,
          label: 'Time ID',
          align: 'left',
          field: (row) => row.teamId,
          format: (val) => `${val}`,
          sortable: true,
          // style: 'max-width: 600px',
        },
        {
          name: 'squadId',
          required: true,
          label: 'Esquadrão ID',
          align: 'left',
          field: (row) => row.squadId,
          format: (val) => `${val}`,
          sortable: true,
          // style: 'max-width: 600px',
        },
        {
          name: 'isLeader',
          required: true,
          label: 'É líder',
          align: 'left',
          field: (row) => row.isLeader,
          format: (val) => `${val}`,
          sortable: true,
          // style: 'max-width: 600px',
        },
        {
          name: 'role',
          required: true,
          label: 'Classe',
          align: 'left',
          field: (row) => row.role,
          format: (val) => `${val}`,
          sortable: true,
          // style: 'max-width: 600px',
        },
        ,
        {
          name: 'connected',
          required: true,
          label: 'Conectado',
          align: 'left',
          field: (row) => row.connected,
          format: (val) => `${val}`,
          sortable: true,
          // style: 'max-width: 600px',
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
    this.getReasons();
  },

  methods: {
    getData() {
      return navigator.clipboard.readText().then((clipText) => {
        // let test = JSON.stringify(clipText);
        let test = clipText.split('\n');
        // console.log(test);
        let data = [];
        test.forEach((el) => {
          let row = el.split('|');
          if (row.length === 7) {
            let id = row[0].split(':');
            let steamId = row[1].split(':');
            let name = row[2].split(':');
            let teamId = row[3].split(':');
            let squadId = row[4].split(':');
            let isLeader = row[5].split(':');
            let role = row[6].split(':');

            data.push({
              id: id[1].trim(),
              steamId: steamId[1].trim(),
              name: name[1].trim(),
              teamId: teamId[1].trim(),
              squadId: squadId[1].trim(),
              isLeader: isLeader[1].trim(),
              role: role[1].trim(),
              connected: 'Sim',
            });
          }
          if (row.length === 4) {
            let id = row[0].split(':');
            let steamId = row[1].split(':');
            let name = row[3].split(':');
            data.push({
              id: id[1].trim(),
              steamId: steamId[1].trim(),
              name: name[1].trim(),
              teamId: '-',
              squadId: '-',
              isLeader: '-',
              role: '-',
              connected: 'Não',
            });
          }
        });
        this.rcon = data;
      });
    },

    getReasons() {
      return window.api.getReasonsKickBan().then((response) => {
        response.forEach((el) => {
          this.reasons.push(el.motivo);
        });
      });
    },

    clearField() {
      this.search = '';
    },

    checkBan() {
      if (this.valueEnable === true) {
        this.valueEnable = false;
      } else {
        this.valueEnable = true;
      }
    },

    createCommand() {
      let sel = JSON.parse(JSON.stringify(this.selected));
      if (sel.length === 0) {
        return;
      }
      if (this.group === 'opt1') {
        this.command = `AdminKick ${sel[0].steamId} ${this.reason}`;
      } else {
        if (this.value === 0) {
          this.command = `AdminBan ${sel[0].steamId} Banido permanentemente por: ${this.reason}`;
        } else {
          let banLength = `${this.value}${this.groupTime}`;
          this.command = `AdminBan ${sel[0].steamId} ${banLength} Banido temporariamente por: ${this.reason} (${banLength})`;
        }
      }
    },

    customFilter(rows, terms) {
      this.lowerSearch = terms.search ? terms.search.toLowerCase() : '';

      const filteredRows = rows.filter((row, i) => {
        let ans = false;
        let s1 = true;
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
        if (s1) {
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

.table-height {
  height: calc(100vh - 320px) !important;
}
</style>
