<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: #588157">
      <q-toolbar>
        <q-btn
          flat
          @click="leftDrawerOpen = !leftDrawerOpen"
          round
          dense
          icon="menu"
        />
        <q-space />
        <q-btn-dropdown
          flat
          size="md"
          icon="manage_accounts"
          color="white"
          label="Administrator"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-sm">Settings</div>
              <q-btn
                color="primary"
                outline
                label="Akses Pengguna"
                :to="{ name: 'accesPengguna' }"
                size="sm"
                v-close-popup
              />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs text-weight-bold">
                Gunawan
              </div>

              <q-btn
                color="primary"
                outline
                label="Logout"
                @click="logout()"
                push
                size="sm"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="sentiment_very_dissatisfied" text-color="primary" />
          <span class="q-ml-sm">Apakah anda yakin untuk keluar ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat :to="{ name: 'dash' }" label="Logout" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="300"
      :breakpoint="400"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item
            clickable
            :to="{ name: 'dashboardKopi' }"
            v-ripple
            style="color: #588157"
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item>
            <q-item-section> MAIN MENU </q-item-section>
          </q-item>

          <q-item
            clickable
            :to="{ name: 'penjualan' }"
            v-ripple
            style="color: #588157"
          >
            <q-item-section avatar>
              <q-icon name="storefront" />
            </q-item-section>
            <q-item-section> Penjualan </q-item-section>
          </q-item>

          <q-item clickable :to="{ name: 'pembelian' }" v-ripple>
            <q-item-section avatar>
              <q-icon name="shopping_bag" style="color: #588157" />
            </q-item-section>
            <q-item-section style="color: #588157"> Pembelian </q-item-section>
          </q-item>

          <q-item clickable :to="{ name: 'pengeluaranKopi' }" v-ripple>
            <q-item-section avatar>
              <q-icon name="outbox" style="color: #588157" />
            </q-item-section>
            <q-item-section style="color: #588157">
              Pengeluaran
            </q-item-section>
          </q-item>

          <q-expansion-item
            expand-separator
            icon="extension"
            label="Data Barang"
            style="color: #588157"
            :content-inset-level="1"
          >
            <q-item clickable :to="{ name: 'laporanPenarikan' }" v-ripple>
              <q-item-section avatar>
                <q-icon name="payments" />
              </q-item-section>
              <q-item-section> Inventaris </q-item-section>
            </q-item>
            <q-item clickable :to="{ name: 'laporanPinjaman' }" v-ripple>
              <q-item-section avatar>
                <q-icon name="price_change" />
              </q-item-section>
              <q-item-section> Stok</q-item-section>
            </q-item>
          </q-expansion-item>

          <q-item>
            <q-item-section> EXTRAS </q-item-section>
          </q-item>

          <q-item
            clickable
            :to="{ name: 'mitra' }"
            v-ripple
            style="color: #588157"
          >
            <q-item-section avatar>
              <q-icon name="payments" />
            </q-item-section>

            <q-item-section> Mitra </q-item-section>
          </q-item>

          <!-- <q-expansion-item
            expand-separator
            icon="groups"
            label="Mitra"
            :content-inset-level="1"
          >
            <q-item clickable :to="{ name: 'laporanPenarikan' }" v-ripple>
              <q-item-section avatar>
                <q-icon name="payments" />
              </q-item-section>
              <q-item-section> Laporan Penarikan </q-item-section>
            </q-item>
            <q-item clickable :to="{ name: 'laporanPinjaman' }" v-ripple>
              <q-item-section avatar>
                <q-icon name="price_change" />
              </q-item-section>
              <q-item-section> Laporan Pinjaman </q-item-section>
            </q-item> -->
          <!-- <q-card>
              <q-card-section>
                <q-item
                  clickable
                  v-ripple
                  :to="{ name: 'customer' }"
                  style="color: #588157"
                >
                  <q-item-section avatar>
                    <q-icon
                      name="sentiment_satisfied_alt"
                      style="color: #588157"
                    />
                  </q-item-section>

                  <q-item-section style="color: #588157">
                    Customer
                  </q-item-section>
                </q-item>

                <q-item clickable v-ripple :to="{ name: 'supplier' }">
                  <q-item-section avatar>
                    <q-icon name="local_shipping" style="color: #588157" />
                  </q-item-section>

                  <q-item-section style="color: #588157">
                    Supplier / Vendor
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-card> -->
          <!-- </q-expansion-item> -->

          <q-item
            clickable
            :to="{ name: 'laporan' }"
            v-ripple
            style="color: #588157"
          >
            <q-item-section avatar>
              <q-icon name="summarize" />
            </q-item-section>

            <q-item-section> Laporan </q-item-section>
          </q-item>

          <q-item
            @click="confirm = true"
            clickable
            v-ripple
            style="color: #588157"
          >
            <q-item-section avatar>
              <q-icon name="sentiment_very_dissatisfied" />
            </q-item-section>

            <q-item-section> Sign Out </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="~assets/forest.jpg"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="~assets/logo_gapari.png" />
          </q-avatar>
          <div claSs="text-weight-bold">Administrator</div>
          <div>@Admin_usahkopi</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage } from "quasar";
export default {
  name: "KopiLayout",
  data() {
    return {
      leftDrawerOpen: false,
      confirm: false,
    };
  },
  methods: {
    logout() {
      // LocalStorage.remove("user", { path: "/auth" });
      this.$router.push({ name: "login" });
    },
  },
};
</script>
