<template>
  <q-page>
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-8" active-color="black">
          <q-breadcrumbs-el label="Master Laporan" icon="widgets" />
          <q-breadcrumbs-el label="Data Laporan" icon="description" />
          <q-breadcrumbs-el label="Laporan Pinjaman" icon="price_change" />
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
                <div class="text-weight-bold">LAPORAN PINJAMAN</div>
                <div>Daftar laporan pinjaman pada saat ini</div>
              </div>

              <q-space />

              <q-btn
                flat
                unelevated
                icon="document_scanner"
                text-color="blue-7"
                @click="exportToCSV()"
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
                <q-td key="nasabah" :props="props">
                  {{ props.row.nasabah }}
                </q-td>
                <q-td key="dipinjam" :props="props">
                  {{ props.row.dipinjam }}
                </q-td>
                <q-td key="dibayar" :props="props">
                  {{ props.row.dibayar }}
                </q-td>
                <q-td key="sisa_pembayaran" :props="props">
                  {{ props.row.sisa_pembayaran }}
                </q-td>
                <q-td key="durasi_perbulan" :props="props">
                  {{ props.row.durasi_perbulan }}
                </q-td>
                <q-td key="created_at" :props="props">
                  {{ props.row.created_at }}
                </q-td>
                <q-td key="pengelola" :props="props">
                  {{ props.row.pengelola }}
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
const columns = [
  {
    name: "kode_transaksi",
    label: "Kode Transaksi",
    field: "kode_transaksi",
    align: "left",
  },
  {
    name: "nasabah",
    label: "Nama Nasabah",
    field: "nasabah",
    align: "left",
  },
  {
    name: "dipinjam",
    label: "Dipinjam",
    field: "dipinjam",
    align: "left",
  },
  {
    name: "dibayar",
    label: "Dibayar",
    field: "dibayar",
    align: "left",
  },
  {
    name: "sisa_pembayaran",
    label: "Sisa Pembayaran",
    field: "sisa_pembayaran",
    align: "left",
  },
  {
    name: "durasi_perbulan",
    label: "Durasi /Perbulan",
    field: "durasi_perbulan",
    align: "left",
  },
  {
    name: "created_at",
    label: "Tanggal",
    field: "created_at",
    align: "left",
  },
  {
    name: "pengelola",
    label: "Pengelola",
    field: "pengelola",
    align: "left",
  },
  {
    name: "action",
    label: "Action",
    field: "action",
    align: "center",
    tarik: "25.000",
  },
];

const rows = [
  {
    kode_transaksi: "001",
    nasabah: "Gunawan",
    dipinjam: "dipinjam",
    dibayar: "dibayar",
    sisa_pembayaran: "sisa pembayaran",
    durasi_perbulan: "durasi perbulan",
    created_at: "01 Juli 2023",
    pengelola: "pengelola",
  },
  {
    kode_transaksi: "002",
    created_at: "02 Juli 2023",
    nasabah: "Andre",
    dipinjam: "dipinjam",
    dibayar: "dibayar",
    sisa_pembayaran: "sisa pembayaran",
    durasi_perbulan: "durasi perbulan",
    created_at: "01 Juli 2023",
    pengelola: "pengelola",
  },
];
export default {
  name: "LaporanPinjaman",
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
  created() {
    this.getLaporanPinjaman();
  },
  methods: {
    getLaporanPinjaman() {},
  },
};
</script>
