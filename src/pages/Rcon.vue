<template>
  <q-page padding>
    <h6 class="doc-heading doc-h2 text-grey-3">Rcon - Aplicar punições</h6>
    <div class="q-gutter-sm col-12">
      <q-input
        outlined
        dense
        dark
        color="grey-3"
        label="Comando"
        v-model="store.command"
        type="textarea"
        rows="3"
      >
        <template v-slot:prepend>
          <q-icon
            name="content_copy"
            color="blue"
            @click="copyCommand"
            class="cursor-pointer"
          />
        </template>
      </q-input>

      <div class="row">
        <div class="col-3">
          <q-btn
            color="blue"
            label="Colar do Rcon"
            v-on:click="getData"
          ></q-btn>
        </div>
      </div>
    </div>

    <!-- Dialogs -->

    <!-- Dialog Kick -->
    <q-dialog v-model="kickDialog">
      <q-card dark style="max-width: 600px; width: 600px; height: 260px">
        <q-card-section>
          <div class="text-h6">Kick</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            v-model="reason"
            outlined
            bottom-slots
            dense
            dark
            :options="reasons"
            :options-dense="true"
            label="Selecione um motivo"
          >
            <template v-slot:append>
              <q-icon
                name="close"
                @click.stop.prevent="reason = ''"
                class="cursor-pointer"
              ></q-icon> </template
          ></q-select>
          ou
          <q-input
            v-model="reason"
            outlined
            dense
            dark
            color="grey-3"
            label="Digite o motivo"
          >
          </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="blue" v-close-popup></q-btn>
          <q-btn
            flat
            label="OK"
            color="blue"
            @click="kickPlayer"
            v-close-popup
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog Warning -->
    <q-dialog v-model="warnDialog">
      <q-card dark style="max-width: 600px; width: 600px; height: 260px">
        <q-card-section>
          <div class="text-h6">Warning</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-select
            v-model="reason"
            outlined
            bottom-slots
            dense
            dark
            :options="reasons"
            :options-dense="true"
            label="Selecione um motivo"
          >
            <template v-slot:append>
              <q-icon
                name="close"
                @click.stop.prevent="reason = ''"
                class="cursor-pointer"
              ></q-icon> </template
          ></q-select>
          ou
          <q-input
            v-model="reason"
            outlined
            dense
            dark
            color="grey-3"
            label="Digite o motivo"
          >
          </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="blue" v-close-popup></q-btn>
          <q-btn
            flat
            label="OK"
            color="blue"
            @click="warnPlayer"
            v-close-popup
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog Ban -->
    <q-dialog v-model="banDialog">
      <q-card dark style="max-width: 600px; width: 600px; height: 310px">
        <q-card-section>
          <div class="text-h6">Ban</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-4">
              <q-item>
                <q-item-section>
                  <q-slider
                    v-model="value"
                    color="blue"
                    :min="0"
                    :max="30"
                    label-always
                  ></q-slider>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-8">
              <q-option-group
                dark
                color="blue"
                v-model="groupTime"
                :options="optionsTime"
                inline
              ></q-option-group>
            </div>
          </div>

          <q-select
            v-model="reason"
            outlined
            bottom-slots
            dense
            dark
            :options="reasons"
            :options-dense="true"
            label="Selecione um motivo"
          >
            <template v-slot:append>
              <q-icon
                name="close"
                @click.stop.prevent="reason = ''"
                class="cursor-pointer"
              ></q-icon> </template
          ></q-select>
          ou
          <q-input
            v-model="reason"
            outlined
            dense
            dark
            color="grey-3"
            label="Digite o motivo"
          >
          </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="blue" v-close-popup></q-btn>
          <q-btn
            flat
            label="OK"
            color="blue"
            @click="banPlayer"
            v-close-popup
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="q-pt-md">
      <q-table
        class="my-sticky-header-column-table table-height"
        dense
        color="text-grey-3"
        card-class="bg-drawer text-grey-4"
        :rows="store.data"
        :columns="columns"
        row-key="eos"
        :rows-per-page-options="[0]"
        :filter="filter"
        :filter-method="customFilter"
        wrap-cells
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
        <!-- <template v-slot:body-cell-steamId="props">
          <q-td :props="props">
            <q-btn
              color="orange"
              raised
              small
              tile
            ></q-btn>
              <div>
                {{props.value}}
              <q-badge :label="props.value" href="https://quasar.dev/vue-components/table#QTable-API"></q-badge>
              <a href="https://quasar.dev/vue-components/table#QTable-API" />
            </div>
          </q-td>
        </template> -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              color="orange"
              icon="exit_to_app"
              @click="kickPlayerDialog(props)"
            >
              <q-tooltip>Kick</q-tooltip>
            </q-btn>
            <q-btn color="red" icon="cancel" @click="banPlayerDialog(props)">
              <q-tooltip>Ban</q-tooltip>
            </q-btn>
            <q-btn
              icon="warning"
              style="background: goldenrod"
              @click="warnPlayerDialog(props)"
            >
              <q-tooltip>Enviar um aviso</q-tooltip>
            </q-btn>
            <q-btn
              color="blue"
              icon="published_with_changes"
              @click="movePlayer(props)"
            >
              <q-tooltip>Trocar de time</q-tooltip>
            </q-btn>
            <q-btn color="green" icon="logout" @click="quitFromSquad(props)">
              <q-tooltip>Retirar do esquadrão</q-tooltip>
            </q-btn>
            <q-btn color="blue" icon="person_search" @click="findSteam(props)">
              <q-tooltip>Ver Steam</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { copyToClipboard, Notify } from 'quasar';
import { ref, isProxy, toRaw } from 'vue';
import { storeRcon } from 'stores/history';

export default {
  name: 'RconPage',

  setup() {
    const store = storeRcon();

    const command = ref('');
    const selected = ref([]);
    const data = ref([]);
    const reasons = ref([]);
    const reason = ref('');
    const lowerSearch = ref('');
    const search = ref('');
    const group = ref('opt1');
    const groupTime = ref('d');
    const value = ref(1);
    const kickDialog = ref(false);
    const warnDialog = ref(false);
    const banDialog = ref(false);
    const steamID = ref('');
    const eos = ref('');

    return {
      store,
      selected,
      reasons,
      reason,
      command,
      data,
      search,
      group,
      groupTime,
      lowerSearch,
      value,
      kickDialog,
      warnDialog,
      banDialog,
      steamID,
      eos,
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
          name: 'eos',
          required: true,
          label: 'EOS',
          align: 'left',
          field: (row) => row.eos,
          format: (val) => `${val}`,
          // format: (val) => `<a :href="/account/offers/edit/">${val}</a>`,
          sortable: true,
        },
        {
          name: 'steamId',
          required: true,
          label: 'SteamID',
          align: 'left',
          field: (row) => row.steamId,
          format: (val) => `${val}`,
          // format: (val) => `<a :href="/account/offers/edit/">${val}</a>`,
          sortable: true,
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
        },
        {
          name: 'squadId',
          required: true,
          label: 'Esquadrão',
          align: 'left',
          field: (row) => row.squadId,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'isLeader',
          required: true,
          label: 'É líder?',
          align: 'left',
          field: (row) => (row.isLeader === 'True' ? 'Sim' : ''),
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'role',
          required: true,
          label: 'Classe',
          align: 'left',
          field: (row) => row.role,
          format: (val) => `${val}`,
          sortable: true,
        },
        ,
        {
          name: 'connected',
          required: true,
          label: 'Conectado?',
          align: 'left',
          field: (row) => row.connected,
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          align: 'left',
          name: 'actions',
          label: 'Ações',
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
        let test = clipText.split('\n');
        let data: {
          id: string;
          eos: string;
          steamId: string;
          name: string;
          teamId: string;
          squadId: string;
          isLeader: string;
          role: string;
          connected: string;
        }[] = [];

        test.forEach((el) => {
          let row = el.split('|');

          if (row.length === 7) {
            let id = row[0].split(':');
            let eos = row[1].split(':');
            let steamId = row[1].split(':');
            let name = row[2].split(':');
            let teamId = row[3].split(':');
            let squadId = row[4].split(':');
            let isLeader = row[5].split(':');
            let role = row[6].split(':');

            let eosID = '-';
            try {
              eosID = eos[2].split('steam')[0].trim();
              steamId = steamId[3].trim();
            } catch (error) {
              eosID = eos[2].trim();
              steamId = '-';
            }
            // try {
            //   eos[2].split('steam')[0].trim();
            // } catch (error) {
            //   steamId = '-';
            // }

            data.push({
              id: parseInt(id[1].trim()),
              eos: eosID,
              steamId: steamId,
              name: name[1].trim(),
              teamId: parseInt(teamId[1].trim()),
              squadId: squadId[1].trim(),
              isLeader: isLeader[1].trim(),
              role: role[1].trim(),
              connected: 'Sim',
            });
          }
          if (row.length === 4) {
            let id = row[0].split(':');
            let eos = row[1].split(':');
            let steamId = row[1].split(':');
            let name = row[3].split(':');
            data.push({
              id: parseInt(id[1].trim()),
              eos: eos[2].split('steam')[0].trim(),
              steamId: steamId[3].trim(),
              name: name[1].trim(),
              teamId: '-',
              squadId: '-',
              isLeader: '-',
              role: '-',
              connected: 'Não',
            });
          }
        });
        this.data = data;
        this.store.saveData(data);
      });
    },

    movePlayer(player) {
      this.command = `AdminForceTeamChange ${player.key} `;

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

    quitFromSquad(player) {
      this.command = `AdminRemovePlayerFromSquad ${player.key} `;

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

    findSteam(player) {
      // console.log(this.store.data[0])
      let filtered = this.store.data.filter((x) => x.eos === player.key);
      const rawObjectOrArray = toRaw(filtered)
      // const target_copy = Object.assign({}, filtered);
      // console.log(target_copy[0].steamId)
      console.log(rawObjectOrArray[0].steamId)
      const steamId = rawObjectOrArray[0].steamId;
      if (steamId != undefined) {
        const url = `https://steamcommunity.com/profiles/${steamId}`;
        open(url);
      }
    },

    kickPlayerDialog(player) {
      this.kickDialog = true;
      this.eos = player.key;
    },

    kickPlayer() {
      this.command = `AdminKick ${this.eos} ${this.reason}`;
      this.store.saveLastCommand(this.command);
      this.copyCommand();
    },

    banPlayerDialog(player) {
      // console.log(player.row.steamId)
      this.banDialog = true;
      this.eos = player.key;
      this.steamID = player.row.steamId;
      // console.log(this.steamID)
    },

    banPlayer() {
      console.log(this.steamID);
      if (this.value === 0) {
        this.command = `AdminBan ${this.eos} 0 Banido permanentemente por: ${this.reason} (${this.steamID})`;
      } else {
        let banLength = `${this.value}${this.groupTime}`;
        this.command = `AdminBan ${this.eos} ${banLength} Banido temporariamente por: ${this.reason} (${banLength}) ${this.reason} (${this.steamID})`;
      }
      // this.command = `AdminBan ${this.steamID} ${this.reason}`;
      this.store.saveLastCommand(this.command);
      this.copyCommand();
    },

    warnPlayerDialog(player) {
      this.warnDialog = true;
      this.steamID = player.key;
    },

    warnPlayer() {
      this.command = `AdminWarn ${this.steamID} ${this.reason}`;
      this.store.saveLastCommand(this.command);
      this.copyCommand();
    },

    copyCommand() {
      if (this.command === '' || this.command === undefined) {
        return;
      }
      copyToClipboard(this.store.command);
      Notify.create({
        type: 'positive',
        timeout: 1000,
        progress: true,
        message: 'Copiado para a área de transferência',
        actions: [{ icon: 'close', color: 'white' }],
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
  height: calc(100vh - 300px) !important;
}
</style>
