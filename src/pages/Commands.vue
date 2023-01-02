<template>
  <q-page padding>
    <h6 class="doc-heading doc-h2 text-grey-3">Comandos úteis</h6>
    <div class="col-12">
      <q-input
        ref="commandContent"
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
    </div>
    <div class="q-pt-md">
      <q-table
        class="my-sticky-header-column-table"
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
            <div class="col-12">
              <q-input
                dense
                dark
                label-color="grey-3"
                label="Pesquisar"
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
import { storeCommands } from 'stores/history';

export default {
  name: 'CommandsPage',

  setup() {
    const store = storeCommands();
    const command = ref('');
    const data = ref([]);

    return {
      store,
      command,
      search: '',
      lowerSearch: '',
      data,
      editedIndex: -1,
      editedItem: null,
      columns: [
        {
          name: 'message',
          required: true,
          label: 'Comando',
          align: 'left',
          field: (row: { comando: any }) => row.comando,
          format: (val: any) => `${val}`,
          sortable: false,
          style: 'max-width: 600px',
        },
        {
          name: 'message',
          required: true,
          label: 'Descrição',
          align: 'left',
          field: (row: { descricao: any }) => row.descricao,
          format: (val: any) => `${val}`,
          sortable: false,
          style: 'max-width: 600px',
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
  },

  methods: {
    readData() {
      return window.api.getCommands().then((response: never[]) => {
        this.data = response;
      });
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

    clearField() {
      this.search = '';
    },

    onRowClick(evt: any, row: { comando: any }) {
      if (this.show_dialog === true) {
        return;
      }
      this.command = `${row.comando} `;
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

    customFilter(rows: any[], terms: { search: string }) {
      this.lowerSearch = terms.search ? terms.search.toLowerCase() : '';

      const filteredRows = rows.filter(
        (row: { [s: string]: unknown } | ArrayLike<unknown>, i: any) => {
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
