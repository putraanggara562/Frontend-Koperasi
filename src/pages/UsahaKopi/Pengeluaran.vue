<template>
  <q-page>
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs
          separator="---"
          class="text-blue-10"
          active-color="secondary"
        >
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Pengeluaran" icon="shopping_bag" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">
        <div class="row q-gutter-md col-12">
          <q-card class="my-card col-lg-3 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm" style="font-size: 14px">
                  Data Pengeluaran belum dibayar
                </div>
                <div class="text-caption text-grey" style="font-size: 11px">
                  semua data pengeluaran belum dibayar.
                </div>
                <div class="row items-center">
                  <q-icon name="payment" />
                  <div
                    class="text-h6 q-ml-sm text-blue-13"
                    style="font-size: 12px"
                  >
                    <vue3-autocounter
                      ref="counter"
                      :startAmount="0"
                      :endAmount="Number(totalHutang)"
                      :duration="3"
                      :autoinit="true"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>

          <q-card class="my-card col-lg-3 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm" style="font-size: 14px">
                  Data pengeluaran
                </div>
                <div class="text-caption text-grey" style="font-size: 11px">
                  berisi semua data pengeluaran salsafical.
                </div>
                <div class="row items-center">
                  <q-icon name="credit_score" />
                  <div
                    class="text-h6 q-ml-sm text-blue-13"
                    style="font-size: 12px"
                  >
                    <vue3-autocounter
                      ref="counter"
                      :startAmount="0"
                      :endAmount="Number(totalLunas)"
                      :duration="3"
                      :autoinit="true"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <div class="row col-12 q-mt-md">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col-12 q-pa-sm">
                <q-table
                  title="Master Data Pembelian"
                  aria-label="Text"
                  class="text-h5"
                  :rows="rows"
                  flat
                  :columns="columns"
                  row-key="name"
                  :filter="filter"
                >
                  <template v-slot:top>
                    <div class="col">
                      <div class="col-2 q-table__title">
                        Master Data Pengeluaran
                      </div>
                      <p class="text-caption">
                        Data pengeluaran yang di lakukan di dalam sistem
                        salsafical.
                      </p>
                    </div>

                    <q-space />

                    <q-btn
                      flat
                      round
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
                          placeholder="Placeholder"
                          style="width: 300px"
                          color="primary"
                          v-model="filter"
                          dense
                        />
                      </div>
                    </q-slide-transition>
                    <q-btn
                      dense
                      icon="add"
                      class="q-ml-md q-pr-md"
                      color="blue-13"
                      label="Tambah Pengeluaran"
                      :to="{ name: 'pengeluaran_add' }"
                      size="md"
                      outline
                    />
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="idPengeluaran" :props="props">{{
                        props.row.idPengeluaran
                      }}</q-td>
                      <!-- <q-td key="namaBarang" :props="props">{{props.row.namaBarang}}</q-td> -->
                      <!-- <q-td key="hargaBarang" :props="props">{{props.row.hargaBarang}}</q-td> -->
                      <!-- <q-td key="jumlahPengeluaran" :props="props">{{props.row.jumlahPengeluaran}}</q-td> -->
                      <!-- <q-td key="total" :props="props">{{this.$formatPrice(props.row.total)}}</q-td> -->
                      <q-td key="barang" :props="props">
                        <q-btn
                          @click="
                            showDetail(props.row._id, props.row.grandTotal)
                          "
                          outline
                          color="primary"
                          label="detail"
                          size="sm"
                          class="q-ml-sm"
                        />
                      </q-td>
                      <q-td key="grandTotal" :props="props">{{
                        this.$formatPrice(props.row.grandTotal)
                      }}</q-td>
                      <q-td key="keterangan" :props="props">{{
                        props.row.keterangan
                      }}</q-td>
                      <q-td key="aksi" :props="props">
                        <q-btn
                          round
                          outline
                          color="red"
                          @click="this.delete(props.row._id)"
                          size="sm"
                          icon="delete"
                          no-caps
                          class="q-ml-sm"
                        />
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <q-dialog v-model="detail.visible">
          <q-card>
            <q-card-section>
              <div class="text-h6">#Detail Pengeluaran Barang</div>
              <p class="text-caption q-ml-md">
                supplier: <b>{{ detail.namaBarang }}</b>
              </p>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh" class="scroll">
              <q-table
                :rows="detail.rows"
                row-key="name"
                flat
                :columns="detail.columns"
                :hide-pagination="true"
              />
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="text-h8 q-ml-md">
                <b>Grand Total - </b>{{ this.$formatPrice(detail.grandTotal) }}
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Ok" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import Vue3autocounter from "vue3-autocounter";

export default {
  name: "PageIndex",
  components: {
    "vue3-autocounter": Vue3autocounter,
  },
  data() {
    return {
      visibles: false,
      filter: null,
      totalHutang: 0,
      totalLunas: 0,
      columns: [
        {
          name: "idPengeluaran",
          required: true,
          label: "ID Pengeluaran",
          align: "left",
          field: "idPengeluaran",
          sortable: true,
        },
        {
          name: "barang",
          required: true,
          label: "Barang",
          align: "left",
          field: "barang",
          sortable: true,
        },
        // { name: 'hargaBarang', required: true, label: 'Harga Barang', align: 'left', field: 'hargaBarang', sortable: true },
        // { name: 'jumlahPengeluaran', required: true, label: 'Jumlah Pengeluaran', align: 'left', field: 'jumlahPengeluaran', sortable: true },
        // { name: 'total', required: true, label: 'Total', align: 'left', field: 'total', sortable: true },
        {
          name: "grandTotal",
          required: true,
          label: "Grand Total",
          align: "left",
          field: "grandTotal",
          sortable: true,
        },
        {
          name: "keterangan",
          required: true,
          label: "Keterangan",
          align: "left",
          field: "keterangan",
          sortable: true,
        },
        { name: "aksi", label: "Actions", field: "aksi", align: "center" },
      ],
      rows: [],
      detail: {
        visible: false,
        grandTotal: null,
        // supplier: null,
        columns: [
          {
            name: "idPengeluaran",
            required: true,
            label: "ID Pengeluaran",
            align: "left",
            field: "idPengeluaran",
            sortable: true,
          },
          {
            name: "namaBarang",
            required: true,
            label: "Barang",
            align: "left",
            field: "namaBarang",
            sortable: true,
          },
          {
            name: "hargaBarang",
            required: true,
            label: "Harga Barang",
            align: "left",
            field: "hargaBarang",
            sortable: true,
          },
          {
            name: "jumlahPengeluaran",
            required: true,
            label: "Jumlah Pengeluaran",
            align: "left",
            field: "jumlahPengeluaran",
            sortable: true,
          },
          {
            name: "total",
            required: true,
            label: "Total",
            align: "left",
            field: "total",
            sortable: true,
          },
          {
            name: "grandTotal",
            required: true,
            label: "Grand Total",
            align: "left",
            field: "grandTotal",
            sortable: true,
          },
        ],
        rows: [],
      },
    };
  },
  created() {
    this.getPembelian();
  },
  methods: {
    getPembelian() {
      try {
        this.$api.get("pengeluaran/get").then((res) => {
          if (res.data.status !== true) {
            this.$showNotif(res.data.message, "negative");
          } else {
            const data = res.data.result;
            this.rows = data;
          }
        });
      } catch (e) {
        this.$showNotif("Terjadi kesalahan !", "negative");
      }
    },
    showDetail(id, grandTotal) {
      try {
        this.$api.get("pengeluaran/detail/" + id).then((res) => {
          if (res.data.status !== true) {
            this.$showNotif(res.data.message, "negative");
          } else {
            this.detail.rows = res.data.result.map((r) => {
              return {
                _id: r._id,
                objectIdPegeluaran: r.objectIdPengeluaran,
                idPengeluaran: r.idPengeluaran,
                namaBarang: r.namaBarang,
                hargaBarang: this.$formatPrice(r.hargaBarang),
                jumlahPengeluaran: r.jumlahPengeluaran,
                total: this.$formatPrice(r.total),
              };
            });
            this.detail.grandTotal = grandTotal;
            this.detail.visible = true;
          }
        });
        this.detail.visible = true;
      } catch (e) {
        console.log(e);
        this.$showNotif("Terjadi kesalahan !", "negative");
      }
    },
    delete(id) {
      this.$dialog
        .create({
          title: "Peringatan",
          message: "Apakah Anda Yakin ?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          try {
            this.$api.delete("/pengeluaran/delete/" + id).then((res) => {
              if (res.data.status !== true) {
                this.$showNotif(res.data.message, "negative");
              } else {
                this.totalLunas = 0;
                this.totalHutang = 0;
                this.getPembelian();
                this.$showNotif(res.data.message, "positive");
              }
            });
          } catch (e) {
            console.log(e);
            this.$showNotif("Terjadi kesalahan !", "negative");
          }
        });
    },
  },
};
</script>

<style scoped></style>
