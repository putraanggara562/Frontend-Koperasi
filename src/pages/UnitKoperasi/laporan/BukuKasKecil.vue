<template>
  <q-page>
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-8" active-color="black">
          <q-breadcrumbs-el label="Master Laporan" icon="widgets" />
          <q-breadcrumbs-el label="Data Laporan" icon="description" />
          <q-breadcrumbs-el label="Laporan Buku Kas Kecil" icon="trending_up" />
        </q-breadcrumbs>
      </q-card>
      <div class="row items-center q-col-gutter-md q-pt-md">
        <div class="col-md-12 col-xs-12">
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="name"
            :filter="filter"
            :pagination="pagination"
          >
            <template v-slot:top>
              <div class="col">
                <div class="text-weight-bold">LAPORAN BUKU KAS KECIL</div>
                <div>Daftar laporan buku kas kecil pada saat ini</div>
              </div>

              <q-space />

              <q-btn
                flat
                unelevated
                icon="document_scanner"
                text-color="blue-7"
                @click="exportTable()"
              >
                <q-tooltip> Export Data </q-tooltip>
              </q-btn>

              <q-btn
                flat
                color="primary"
                icon="search"
                @click="visibles = !visibles"
                size="md"
                class="q-mr-sm"
              />
              <q-slide-transition>
                <div v-show="visibles">
                  <q-input
                    outlined
                    debounce="300"
                    placeholder="Pencarian"
                    style="width: 200px"
                    color="primary"
                    v-model="filter"
                    dense
                  />
                </div>
              </q-slide-transition>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="created_at" :props="props">
                  {{ props.row.created_at }}
                </q-td>
                <q-td key="referensiVoucher" :props="props">
                  {{ props.row.referensiVoucher }}
                </q-td>
                <q-td key="deskripsi" :props="props">
                  {{ props.row.deskripsi }}
                </q-td>
                <q-td key="debet" :props="props">
                  {{ props.row.debet }}
                </q-td>
                <q-td key="kredit" :props="props">
                  {{ props.row.kredit }}
                </q-td>
                <q-td key="saldo" :props="props">
                  {{ props.row.saldo }}
                </q-td>
                <q-td key="action" :props="props">
                  <div class="justify-center q-gutter-x-xs">
                    <q-btn
                      flat
                      color="blue-8"
                      size="md"
                      class="q-px-xs"
                      icon="edit"
                      @click="openDialog(true, props.row)"
                    ></q-btn>
                    <q-btn
                      flat
                      color="red"
                      size="md"
                      @click="hapusBarang(props.row._id)"
                      class="q-px-xs"
                      icon="delete"
                    ></q-btn>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { exportFile } from "quasar";

const columns = [
  {
    name: "created_at",
    label: "Tanggal",
    field: "created_at",
    align: "left",
  },
  {
    name: "referensiVoucher",
    label: "Referensi Voucher",
    field: "referensiVoucher",
    align: "left",
  },
  {
    name: "deskripsi",
    label: "Deskripsi",
    field: "deskripsi",
    align: "left",
  },
  {
    name: "debet",
    label: "Debet",
    field: "debet",
    align: "left",
  },
  {
    name: "kredit",
    label: "Kredit",
    field: "kredit",
    align: "left",
  },
  {
    name: "saldo",
    label: "Saldo",
    field: "saldo",
    align: "left",
  },
  {
    name: "action",
    label: "Action",
    field: "action",
    align: "center",
  },
];

const rows = [
  {
    created_at: "01 Juli 2023",
    referensiVoucher: "Reverensi Voucher",
    deskripsi: "dibayar",
    debet: "50.000",
    kredit: "50.000",
    saldo: "50.000",
  },
  {
    created_at: "02 Juli 2023",
    referensiVoucher: "Reverensi Voucher",
    deskripsi: "dibayar",
    debet: "50.000",
    kredit: "50.000",
    saldo: "50.000",
  },
];
export default {
  name: "BukuKasKecilPage",
  data() {
    return {
      columns,
      rows,
      filter: "",
      pagination: {
        rowsPerPage: 10,
      },
      visibles: false,
    };
  },
  methods: {
    exportTable() {
      const content = [
        "Tanggal; referensiVoucher; Deskripsi; Debet; Kredit; Saldo",
      ]
        .concat(
          this.rows.map((row) => {
            return `${row.created_at};${row.referensiVoucher};${row.deskripsi};${row.debet};${row.kredit};${row.saldo}`;
          })
        )
        .join("\r\n");
      const status = exportFile(
        "laporan-buku-pembantu-advance.csv",
        content,
        "text/csv"
      );
      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
  },
};
</script>
