# TUGASSEKOLAH

[![Website](https://img.shields.io/badge/🌐_Live_Demo-https://xmoryal.github.io/TUGASSEKOLAH/-blue?style=for-the-badge)](https://xmoryal.github.io/TUGASSEKOLAH/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-success?style=for-the-badge)](https://xmoryal.github.io/TUGASSEKOLAH/)
[![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)](https://xmoryal.github.io/TUGASSEKOLAH/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **Mempermudah Hal-hal Berkaitan dengan Tugas Pendidikan**

🚀 **Akses Langsung**: [https://xmoryal.github.io/TUGASSEKOLAH/](https://xmoryal.github.io/TUGASSEKOLAH/)

Website frontend yang dirancang khusus untuk membantu guru, siswa, dan orang tua dalam mengelola berbagai aspek pendidikan dengan mudah dan cepat.

## 🎯 Fitur Utama

### ✅ Generate Jadwal Piket
Buat jadwal piket siswa secara otomatis atau manual dengan berbagai template yang menarik.

### 🚧 Generate Raport (Coming Soon)
Fitur pembuatan raport siswa akan segera hadir.

### 🚧 Kantin Online (Coming Soon)
Sistem kantin online untuk memudahkan transaksi di sekolah.

## 🚀 Cara Penggunaan

### 1. Akses Website
Buka browser dan kunjungi `index.html` atau buka file HTML langsung di browser Anda.

### 2. Halaman Utama
Pada halaman utama, Anda akan melihat:
- **Header** dengan nama website dan deskripsi
- **3 Fitur Utama** dalam bentuk kartu
- **Keunggulan Website** yang menjelaskan manfaat menggunakan platform ini

### 3. Generate Jadwal Piket

#### Langkah 1: Isi Form Data
Klik tombol "Mulai" pada kartu "Generate Jadwal Piket" untuk membuka form input.

Isi data berikut:
- **Nama Sekolah**: Nama sekolah Anda
- **Kelas**: Nama kelas (contoh: X IPA 1)
- **Wali Kelas**: Nama wali kelas
- **Ketua Kelas**: Nama ketua kelas

#### Langkah 2: Pilih Metode Input Jadwal
Pilih salah satu metode:
- **Manual**: Input jadwal piket secara manual untuk setiap hari
- **Acak Otomatis**: Sistem akan mengacak nama siswa secara otomatis

##### Untuk Metode Manual:
1. Klik "Tambah Hari" untuk menambah hari piket
2. Pilih hari dari dropdown
3. Masukkan nama siswa yang piket di hari tersebut (pisahkan dengan koma)
4. Klik tombol merah "Hapus" jika ingin menghapus hari tertentu

##### Untuk Metode Acak Otomatis:
1. Masukkan semua nama siswa yang akan diacak (pisahkan dengan koma)
2. Sistem akan otomatis membagikan siswa ke hari Senin-Sabtu

#### Langkah 3: Tambah Keterangan Hukuman (Opsional)
Tambahkan catatan hukuman jika siswa tidak melakukan piket, contoh:
```
Jika tidak piket, maka diberi hukuman push-up 10 kali
```

#### Langkah 4: Pilih Template
Setelah mengisi form, klik "Lanjut Pilih Template" untuk memilih desain jadwal.

Tersedia 3 template:
1. **Template Sepia** 🧹: Desain elegan dengan tema coklat muda
2. **Template Sticky Notes** 📝: Desain casual dengan kertas catatan
3. **Template Ceria** 🧼: Desain colorful dengan tema orange

#### Langkah 5: Preview dan Simpan
- Lihat preview jadwal piket dengan template yang dipilih
- Klik "Simpan sebagai PNG" untuk menyimpan sebagai gambar
- Klik "Simpan sebagai PDF" untuk menyimpan sebagai dokumen PDF
- Klik "Kembali" untuk kembali ke halaman sebelumnya

## 🎨 Template Jadwal Piket

### Template 1: Sepia (Elegan)
- Tema warna coklat muda dan gelap
- Layout kartu vertikal
- Cocok untuk suasana formal

### Template 2: Sticky Notes (Casual)
- Tema kertas catatan dengan pin
- Layout grid 3 kolom
- Efek rotasi untuk tampilan natural

### Template 3: Ceria (Colorful)
- Tema orange dan kuning cerah
- Gradient background
- Layout kartu dengan emoji dekoratif

## 🔒 Keamanan & Privasi

### ✅ Data Tidak Tersimpan
- Semua data diproses secara lokal di browser Anda
- Tidak ada database atau penyimpanan server
- Data otomatis hilang saat browser ditutup

### ✅ 100% Frontend
- Tidak memerlukan koneksi internet setelah file diunduh
- Bisa digunakan secara offline
- Tidak ada risiko kebocoran data

## 📱 Responsive Design

Website ini dirancang responsive untuk semua ukuran perangkat:
- **Mobile** (< 480px): Layout vertikal, font kecil
- **Tablet** (480px - 768px): Layout adaptif
- **Desktop** (> 768px): Layout penuh dengan grid

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur website
- **CSS3**: Styling dengan Tailwind CSS
- **JavaScript (ES6+)**: Interaktivitas dan logika
- **Tailwind CSS**: Framework CSS utility-first
- **html2canvas**: Konversi HTML ke gambar PNG
- **jsPDF**: Konversi HTML ke dokumen PDF

## 📁 Struktur File

```
TUGASSEKOLAH/
├── index.html          # Halaman utama
├── form.html           # Form input jadwal piket
├── template.html       # Pemilihan template
├── preview.html        # Preview dan simpan jadwal
├── script.js           # JavaScript untuk semua interaksi
└── README.md           # Dokumentasi ini
```

## 🚀 Instalasi & Penggunaan

### Cara 1: Jalankan Langsung
1. Download semua file HTML dan JS
2. Buka `index.html` di browser web apa saja
3. Website siap digunakan tanpa instalasi tambahan

### Cara 2: Jalankan dengan Server Lokal
```bash
# Menggunakan Python (jika tersedia)
python -m http.server 8000

# Atau menggunakan Node.js
npx http-server

# Kemudian buka http://localhost:8000 di browser
```

## 🌟 Keunggulan

### 🔒 Privasi Data Terjamin
Data Anda 100% aman! Data tidak disimpan di database, sehingga informasi Anda tetap privat dan terlindungi sepenuhnya.

### ✨ Mudah Digunakan
Antarmuka yang intuitif dan user-friendly membuat siapa saja dapat menggunakan aplikasi ini tanpa kesulitan.

### 💰 Sepenuhnya Gratis
Tidak ada biaya tersembunyi. Gunakan semua fitur kami secara gratis tanpa membayar sepeser pun.

### ⚡ Akses Cepat
Aplikasi web yang responsif dan cepat, dapat diakses kapan saja dan dari mana saja melalui browser.

## 📞 Dukungan

Jika Anda mengalami kesulitan atau memiliki pertanyaan:
- Periksa bagian "Cara Penggunaan" di atas
- Pastikan browser Anda mendukung JavaScript
- Coba refresh halaman jika ada error

## 📄 Lisensi

Proyek ini menggunakan lisensi MIT. Silakan lihat file LICENSE untuk detail lebih lanjut.

## 🤝 Kontribusi

Kontribusi untuk pengembangan website ini sangat diterima! Silakan:
1. Fork repositori ini
2. Buat branch fitur baru
3. Commit perubahan Anda
4. Push ke branch
5. Buat Pull Request

## 📊 Status Pengembangan

- ✅ Generate Jadwal Piket - **SELESAI**
- 🚧 Generate Raport - **DALAM PENGEMBANGAN**
- 🚧 Kantin Online - **DALAM PENGEMBANGAN**

---

**Dibuat dengan ❤️ untuk memudahkan dunia pendidikan Indonesia**

&copy; 2026 TUGASSEKOLAH - Semua data Anda terjaga privasi.
