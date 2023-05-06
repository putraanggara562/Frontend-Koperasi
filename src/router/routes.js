const routes = [
  {
    path: "",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/nasabah",
        name: "nasabah",
        component: () => import("pages/Nasabah.vue"),
      },
      {
        path: "/pendapatan",
        name: "pendapatan",
        component: () => import("pages/Pendapatan.vue"),
      },
      {
        path: "/pengeluaran",
        name: "pengeluaran",
        component: () => import("pages/Pengeluaran.vue"),
      },
      {
        path: "/peminjaman",
        name: "peminjaman",
        component: () => import("pages/Peminjaman.vue"),
      },
      {
        path: "/data-laporan",
        name: "dataLaporan",
        component: () => import("pages/laporan/DataLaporan.vue"),
      },
      {
        path: "/laporan-buku-bank",
        name: "laporanBukuBank",
        component: () => import("pages/laporan/BukuBank.vue"),
      },
      {
        path: "/laporan-buku-besar",
        name: "laporanBukuBesar",
        component: () => import("pages/laporan/BukuBesar.vue"),
      },
      {
        path: "/laporan-buku-pembantu-advance",
        name: "laporanBukuPembantuAdvance",
        component: () => import("pages/laporan/BukuPembantuAdvance.vue"),
      },
      {
        path: "/laporan-buku-pembantu-biaya",
        name: "laporanBukuPembantuBiaya",
        component: () => import("pages/laporan/BukuPembantuBiaya.vue"),
      },
      {
        path: "/laporan-buku-kas-kecil",
        name: "laporanBukuKasKecil",
        component: () => import("pages/laporan/BukuKasKecil.vue"),
      },
      {
        path: "/laporan-rekonsiliasi-bank",
        name: "laporanRekonsiliasiBank",
        component: () => import("pages/laporan/RekonsiliasiBank.vue"),
      },
      {
        path: "/profil",
        name: "profil",
        component: () => import("pages/lanjutan/ProfilPage.vue"),
      },
    ],
  },

  {
    path: "",
    component: () => import("layouts/KopiLayout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboardKopi",
        component: () => import("pages/UsahaKopi/Dashboard.vue"),
      },
      {
        path: "/penjualan",
        name: "penjualan",
        component: () => import("pages/UsahaKopi/Penjualan.vue"),
      },
      {
        path: "/pembelian",
        name: "pembelian",
        component: () => import("pages/UsahaKopi/Pembelian.vue"),
      },
      {
        path: "/pengeluaran-kopi",
        name: "pengeluaranKopi",
        component: () => import("pages/UsahaKopi/Pengeluaran.vue"),
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: () => import("pages/access/LoginPage.vue"),
  },
  {
    path: "/acces-pengguna",
    name: "accesPengguna",
    component: () => import("pages/access/MenuAcces.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
