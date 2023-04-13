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
        path: "/simpanan",
        name: "simpanan",
        component: () => import("pages/Simpanan.vue"),
      },
      {
        path: "/pinjaman",
        name: "pinjaman",
        component: () => import("pages/Pinjaman.vue"),
      },
      {
        path: "/penarikan",
        name: "penarikan",
        component: () => import("pages/Penarikan.vue"),
      },
      {
        path: "/laporan-simpanan",
        name: "laporanSimpanan",
        component: () => import("pages/laporan/LaporanSimpanan.vue"),
      },
      {
        path: "/laporan-penarikan",
        name: "laporanPenarikan",
        component: () => import("pages/laporan/LaporanPenarikan.vue"),
      },
      {
        path: "/laporan-pinjaman",
        name: "laporanPinjaman",
        component: () => import("pages/laporan/LaporanPinjaman.vue"),
      },
      {
        path: "/profil",
        name: "profil",
        component: () => import("pages/lanjutan/ProfilPage.vue"),
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: () => import("pages/access/LoginPage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
