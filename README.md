# 🌈 Modern RGB GitHub Readme Stats

<p align="center">
  <img src="https://img.shields.io/badge/Theme-Modern%20RGB%20Chroma-ff007f?style=for-the-badge&logo=github" alt="Theme RGB" />
  <img src="https://img.shields.io/badge/Design-Glassmorphism%20%2B%20Neon-00f2fe?style=for-the-badge" alt="Design Glassmorphism" />
  <img src="https://img.shields.io/badge/Node.js-18%2B-00ff87?style=for-the-badge&logo=node.js" alt="Node" />
  <img src="https://img.shields.io/badge/License-MIT-7928ca?style=for-the-badge" alt="License MIT" />
</p>

Generator kartu statistik GitHub (**GitHub Readme Stats**) dinamis dengan tema modern **RGB Spectrum Glow**, **Neon Cyberpunk**, efek **Glassmorphism**, dan animasi CSS `@keyframes` langsung di dalam SVG untuk mempercantik profil GitHub Anda.

---

## ✨ Fitur Utama

- 🌈 **Modern RGB Chroma Glow**: Animasi border & text gradien warna RGB spektrum penuh (`#ff007f` -> `#7928ca` -> `#0070f3` -> `#00dfd8` -> `#00ff87`).
- 💎 **Glassmorphism Backdrop**: Efek kaca gelap semi-transparan dengan blur modern yang pas untuk Dark & Light mode GitHub.
- ⚡ **Realtime GitHub Stats**: Menghitung Total Stars, Commits, Pull Requests, Issues, Followers, dan Rank Grade otomatis.
- 📊 **Top Languages Card**: Menampilkan diagram persentase bahasa pemrograman dengan multi-color RGB stacked progress bar.
- 📌 **Pinned Repo Card**: Kartu sorotan repository dengan bintang, fork, dan bahasa utama.
- 🖥️ **Live Web Customizer**: Antarmuka web interaktif lokal untuk preview langsung kartu dan salin kode Markdown / HTML sekali klik.

---

## 🚀 Cara Cepat Pakai di Profil GitHub (Ready-to-Use)

Salin kode Markdown di bawah ini dan tempelkan ke file `README.md` repository profil GitHub Anda (`username/username`):

### 1. Kartu Statistik & Top Languages (Side-by-Side Modern RGB)

```markdown
<p align="center">
  <a href="https://github.com/Novazeb/github-stats">
    <img src="https://github-stats-gray-three.vercel.app/api/stats?username=USERNAME_ANDA&theme=modern-rgb&v=2" alt="GitHub Stats" />
  </a>
  <a href="https://github.com/Novazeb/github-stats">
    <img src="https://github-stats-gray-three.vercel.app/api/top-langs/?username=USERNAME_ANDA&layout=compact&theme=modern-rgb&v=2" alt="Top Languages" />
  </a>
</p>
```

> **Ganti `USERNAME_ANDA` dengan username GitHub Anda!**

---

### 2. Jika Menggunakan Server Lokal / Self-Hosted Instance Ini

```markdown
<p align="center">
  <img src="http://localhost:3000/api/stats?username=USERNAME_ANDA&theme=modern-rgb" alt="Stats" />
  <img src="http://localhost:3000/api/top-langs?username=USERNAME_ANDA&theme=modern-rgb&layout=compact" alt="Languages" />
</p>
```

---

## 🎨 Tema RGB Modern yang Tersedia

| Nama Tema | Identifier (`theme=...`) | Deskripsi Warna |
| :--- | :--- | :--- |
| **Modern RGB (Default)** | `modern-rgb` | Animasi Chroma Spectrum (Pink, Purple, Blue, Cyan, Green) |
| **Neon Cyberpunk** | `neon-cyberpunk` | Electric Cyan, Hot Pink, & Neon Violet glow |
| **Matrix Emerald RGB** | `matrix-rgb` | Cyber Green, Lime & Emerald pulse |
| **Sunset Chroma** | `sunset-chroma` | Sunset Violet, Coral, Tangerine, Goldenrod |
| **Aurora Borealis** | `aurora-rgb` | Teal, Deep Aqua, Emerald & Indigo glow |
| **Tokyo Night RGB** | `tokyo-night-rgb` | Deep Slate Blue, Lavender, & Soft Cyan |

---

## 🛠️ Instalasi & Menjalankan Server Lokal

### 1. Install Dependensi
```bash
npm install
```

### 2. Konfigurasi Token (Opsional)
Salin `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Tambahkan GitHub Personal Access Token Anda di `.env` untuk menghindari batas kuota GitHub API (60 req/jam -> 5000 req/jam).

### 3. Jalankan Server
```bash
npm start
```

Buka browser dan akses **`http://localhost:3000`** untuk membuka **Interactive Live Customizer**.

---

## 📡 Dokumentasi Endpoint API

### 1. GitHub Stats Card
```
GET /api/stats?username={username}&theme={theme}&hide_rank={true|false}&show_icons={true|false}
```

### 2. Top Languages Card
```
GET /api/top-langs?username={username}&theme={theme}&layout={normal|compact}&langs_count={number}
```

### 3. Pinned Repo Card
```
GET /api/pin?username={username}&repo={repo_name}&theme={theme}
```

---

## 📄 Lisensi
Didistribusikan di bawah lisensi MIT. Bebas digunakan dan dimodifikasi untuk profil GitHub Anda.

