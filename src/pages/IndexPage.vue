<template>
  <q-page>
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-8" active-color="black">
          <q-breadcrumbs-el label="Dashboard" icon="home" />
        </q-breadcrumbs>
      </q-card>
      <div class="row items-center q-col-gutter-md q-pt-md">
        <div class="col-12 col-md-4 col-sm-6 col-xs-12 col-lg-4">
          <q-card style="padding: 33px 0px 24px 0px">
            <q-item>
              <q-item-section avatar>
                <q-btn
                  round
                  color="blue-2"
                  text-color="blue-8"
                  icon="business_center"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold q-mb-sm">
                  SIMPANAN
                </q-item-label>
                <q-item-label caption>
                  Jumlah simpanan pada bulan ini
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-green"
                  ><strong>Rp. {{ simpanan }}</strong>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12">
          <q-card style="padding: 33px 0px 24px 0px">
            <q-item>
              <q-item-section avatar>
                <q-btn
                  round
                  color="blue-2"
                  text-color="blue-8"
                  icon="payments"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold q-mb-sm">
                  PENARIKAN
                </q-item-label>
                <q-item-label caption>
                  Jumlah penarikan pada bulan ini
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-green"
                  ><strong>RP. {{ penarikan }}</strong>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>

        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-card style="padding: 33px 0px 24px 0px">
            <q-item>
              <q-item-section avatar>
                <q-btn
                  round
                  color="blue-2"
                  text-color="blue-8"
                  icon="price_change"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold q-mb-sm">
                  PINJAMAN
                </q-item-label>
                <q-item-label caption>
                  Jumlah pinjaman pada bulan ini
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-green"
                  ><strong>RP. {{ pinjaman }}</strong>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>
      <div class="row items-center q-col-gutter-md q-py-md">
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
                <div class="text-weight-bold">RIWAYAT TRANSAKSI</div>
                <div>Daftar riwayat transaksi pada saat ini</div>
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
                <q-td key="kode_transaksi" :props="props">
                  {{ props.row.kode_transaksi }}
                </q-td>
                <q-td key="tanggal" :props="props">
                  <!-- {{ $parseDate(props.row.created_at).fullDate }} -->
                  {{ props.row.tanggal }}
                </q-td>
                <q-td key="nasabah" :props="props">
                  {{ props.row.nasabah }}
                </q-td>
                <q-td key="tarik" :props="props">
                  {{ props.row.tarik }}
                </q-td>
                <q-td key="masuk" :props="props">
                  {{ props.row.masuk }}
                </q-td>
                <q-td key="saldo" :props="props">
                  {{ props.row.saldo }}
                </q-td>
                <q-td key="pengelola" :props="props">
                  {{ props.row.pengelola }}
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
    name: "kode_transaksi",
    label: "Kode Transaksi",
    field: "kode_transaksi",
    align: "left",
  },
  {
    name: "tanggal",
    label: "Tanggal",
    field: "tanggal",
    align: "left",
  },
  {
    name: "nasabah",
    label: "Nasabah",
    field: "nasabah",
    align: "left",
  },
  {
    name: "tarik",
    label: "Tarik",
    field: "tarik",
    align: "left",
  },
  {
    name: "masuk",
    label: "Masuk",
    field: "masuk",
    align: "left",
  },
  {
    name: "saldo",
    label: "Saldo",
    field: "saldo",
    align: "left",
  },
  {
    name: "pengelola",
    label: "Pengelola",
    field: "pengelola",
    align: "left",
    tarik: "25.000",
  },
];

const rows = [
  {
    kode_transaksi: "001",
    tanggal: "01 Juli 2023",
    nasabah: "Gunawan",
    tarik: "tarik",
    masuk: "masuk",
    saldo: "saldo",
    pengelola: "pengelola",
  },
  {
    kode_transaksi: "002",
    tanggal: "02 Juli 2023",
    nasabah: "Andre",
    tarik: "tarik",
    masuk: "masuk",
    saldo: "saldo",
    pengelola: "pengelola",
  },
];
export default {
  name: "IndexPage",
  data() {
    return {
      columns,
      rows,
      filter: "",
      pagination: {
        rowsPerPage: 10,
      },
      visibles: false,
      simpanan: 20000,
      penarikan: 25000,
      pinjaman: 30000,
    };
  },
  methods: {
    exportTable() {
      const content = [
        "Kode Transaksi; Tanggal; Nasabah; Tarik; Masuk; Saldo; Pengelola",
      ]
        .concat(
          this.rows.map((row) => {
            return `${row.kode_transaksi};${row.tanggal};${row.nasabah};${row.tarik};${row.masuk};${row.saldo};${row.pengelola}`;
          })
        )
        .join("\r\n");
      const status = exportFile(
        "daftar-riwayat-transaksi.csv",
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
