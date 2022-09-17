<template>
  <q-page padding>
    <h6 class="doc-heading doc-h2 text-grey-3">Regras do servidor</h6>
    <div class="col-12">
      <q-input
        outlined
        dense
        dark
        color="grey-3"
        label="Comando"
        v-model="command"
        type="textarea"
        rows="3"
      >
      </q-input>
    </div>
    <div class="q-pa-md">
      <q-table
        class="my-sticky-header-column-table"
        dense
        color="text-grey-3"
        card-class="bg-drawer text-grey-4"
        :rows="rules"
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
          <div class="q-pa-sm q-gutter-sm">
            <q-dialog v-model="show_dialog">
              <q-card-section>
                <div class="row">
                  <q-input dark label="Dessert Name"></q-input>
                </div>
              </q-card-section>
              <q-card-actions>
                <q-btn
                  flat
                  label="OK"
                  color="primary"
                  v-close-popup
                  @click="addRow"
                ></q-btn>
              </q-card-actions>
            </q-dialog>
          </div>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              color="grey"
              @click="editRow(props.row)"
              icon="edit"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              @click="deleteRow(props)"
              icon="delete"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { copyToClipboard, Notify } from 'quasar';

export default {
  name: 'RulesPage',

  data() {
    return {
      show_dialog: false,
      command: '',
      search: '',
      lowerSearch: '',
      rules: [],
      editedIndex: -1,
      editedItem: null,
      columns: [
        {
          name: 'rules',
          required: true,
          label: 'Regras',
          align: 'left',
          field: (row) => row.rule,
          format: (val) => `${val}`,
          sortable: false,
          style: 'max-width: 600px',
        },
        {
          name: 'actions',
          label: 'Ações',
          field: '',
          align: 'center',
          style: 'min-width: 100px',
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
    this.readRules();
  },
  methods: {
    readRules() {
      return window.api.getRules().then((response) => {
        this.rules = response;
      });
    },

    clearField() {
      this.search = '';
    },

    editRow(props) {
      console.log(props);
      this.show_dialog = true;
    },

    onRowClick(evt, row) {
      if (this.show_dialog === true) {
        return;
      }
      this.command = `adminbroadcast ${row.rule}`;
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
</style>
