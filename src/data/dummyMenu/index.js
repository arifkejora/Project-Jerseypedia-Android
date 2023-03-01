import React from 'react';
import { IconChangePassword, IconEditProfile, IconHistory, IconSignOut } from "../../assets";

export const dummyMenu = [
  {
    id: 1,
    nama: 'Edit Profile',
    gambar: <IconEditProfile />,
    halaman: 'EditProfile'
  },
  {
    id: 2,
    nama: 'Change Password',
    gambar: <IconChangePassword />,
    halaman: 'ChangePassword'
  },
  {
    id: 3,
    nama: 'History Pemesanan',
    gambar: <IconHistory />,
    halaman: 'History'
  },
  {
    id: 4,
    nama: 'Sign Out',
    gambar: <IconSignOut />,
    halaman: 'Login'
  },
];