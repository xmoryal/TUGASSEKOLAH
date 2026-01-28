// script.js

// Form handling for form.html
if (document.getElementById('piketForm')) {
    const form = document.getElementById('piketForm');
    const metodeRadios = document.querySelectorAll('input[name="metode"]');
    const manualInput = document.getElementById('manualInput');
    const acakInput = document.getElementById('acakInput');
    const hariContainer = document.getElementById('hariContainer');
    const tambahHariBtn = document.getElementById('tambahHari');

    // Toggle input method
    metodeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'manual') {
                manualInput.classList.remove('hidden');
                acakInput.classList.add('hidden');
            } else {
                manualInput.classList.add('hidden');
                acakInput.classList.remove('hidden');
            }
        });
    });

    // Add new day
    tambahHariBtn.addEventListener('click', function() {
        const hariItem = document.createElement('div');
        hariItem.className = 'hari-item mb-4 p-4 border border-gray-200 rounded';
        hariItem.innerHTML = `
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 space-y-2 sm:space-y-0">
                <div class="flex items-center space-x-2">
                    <label class="font-medium">Hari:</label>
                    <select class="hari-select px-2 py-1 border border-gray-300 rounded">
                        <option value="Senin">Senin</option>
                        <option value="Selasa">Selasa</option>
                        <option value="Rabu">Rabu</option>
                        <option value="Kamis">Kamis</option>
                        <option value="Jumat">Jumat</option>
                        <option value="Sabtu">Sabtu</option>
                    </select>
                </div>
                <button type="button" class="hapus-hari bg-red-500 text-white px-2 py-1 rounded text-sm self-start sm:self-auto">Hapus</button>
            </div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Siswa Piket:</label>
            <textarea class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" rows="2" placeholder="Masukkan nama siswa, pisahkan dengan koma"></textarea>
        `;
        hariContainer.appendChild(hariItem);

        // Add event listener to delete button
        hariItem.querySelector('.hapus-hari').addEventListener('click', function() {
            hariItem.remove();
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate that at least some schedule data is provided
        let hasScheduleData = false;
        if (data.metode === 'manual') {
            const hariItems = document.querySelectorAll('.hari-item');
            hariItems.forEach(item => {
                const siswa = item.querySelector('textarea').value.split(',').map(s => s.trim()).filter(s => s);
                if (siswa.length > 0) hasScheduleData = true;
            });
        } else {
            const siswaList = document.getElementById('daftarSiswa').value.split(',').map(s => s.trim()).filter(s => s);
            if (siswaList.length > 0) hasScheduleData = true;
        }

        if (!hasScheduleData) {
            alert('Harap isi setidaknya satu jadwal piket atau daftar siswa untuk diacak.');
            return;
        }

        // Collect schedule data
        if (data.metode === 'manual') {
            data.jadwal = [];
            const hariItems = document.querySelectorAll('.hari-item');
            hariItems.forEach(item => {
                const hari = item.querySelector('.hari-select').value;
                const siswa = item.querySelector('textarea').value.split(',').map(s => s.trim()).filter(s => s);
                if (siswa.length > 0) {
                    data.jadwal.push({ hari, siswa });
                }
            });
        } else {
            const siswaList = document.getElementById('daftarSiswa').value.split(',').map(s => s.trim()).filter(s => s);
            data.jadwal = generateRandomSchedule(siswaList);
        }

        // Store data in localStorage
        localStorage.setItem('jadwalData', JSON.stringify(data));

        // Redirect to template selection
        window.location.href = 'template.html';
    });
}

// Template selection for template.html
function selectTemplate(templateId) {
    const data = JSON.parse(localStorage.getItem('jadwalData'));
    data.template = templateId;
    localStorage.setItem('jadwalData', JSON.stringify(data));

    // Redirect to preview
    window.location.href = 'preview.html';
}

// Generate random schedule
function generateRandomSchedule(siswaList) {
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const jadwal = [];
    const shuffled = [...siswaList];

    days.forEach(day => {
        // Shuffle array
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Take 1-2 students per day
        const numStudents = Math.floor(Math.random() * 2) + 1;
        const selectedStudents = shuffled.slice(0, numStudents);
        jadwal.push({ hari: day, siswa: selectedStudents });
    });

    return jadwal;
}

// Preview and save functionality for preview.html
if (document.getElementById('scheduleContainer')) {
    const data = JSON.parse(localStorage.getItem('jadwalData'));
    const container = document.getElementById('scheduleContainer');

    // Generate schedule based on template
    container.innerHTML = generateScheduleHTML(data);
}

function generateScheduleHTML(data) {
    let html = '';

    // Detect screen size untuk responsive font sizing
    const isMobile = window.innerWidth < 480;
    const isTablet = window.innerWidth < 768;

    // Padding responsive - Portrait standard
    let padding = '35px';
    if (isMobile) padding = '12px';
    else if (isTablet) padding = '20px';

    // Gap responsive
    let gap = '18px';
    let gapSmall = '16px';
    if (isMobile) {
        gap = '8px';
        gapSmall = '10px';
    } else if (isTablet) {
        gap = '12px';
        gapSmall = '12px';
    }

    // Generate header info if provided
    let headerInfo = '';
    if (data.namaSekolah || data.kelas || data.waliKelas || data.ketuaKelas) {
        const infoParts = [];
        if (data.namaSekolah) infoParts.push(data.namaSekolah);
        if (data.kelas) infoParts.push(data.kelas);
        if (data.waliKelas) infoParts.push(data.waliKelas);
        if (data.ketuaKelas) infoParts.push(data.ketuaKelas);
        headerInfo = infoParts.join(' | ');
    }

    if (data.template == 1) {
        // Template Sepia/Coklat - Desain Elegan
        html = `
            <style>
                .sepia-container {
                    background-color: #e8dcc8;
                    padding: ${padding};
                    background-image:
                        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cpath d='M0 0l50 50M50 0L0 50' stroke='%238b7355' stroke-width='1' opacity='0.1'/%3E%3C/svg%3E");
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .sepia-header-info {
                    background-color: #8b6f47;
                    color: white;
                    padding: ${isMobile ? '6px' : isTablet ? '8px' : '10px'};
                    text-align: center;
                    font-size: ${isMobile ? '8px' : isTablet ? '10px' : '12px'};
                    margin-bottom: ${isMobile ? '8px' : '12px'};
                    border-radius: 6px;
                }
                .sepia-title {
                    color: #5c4033;
                    font-size: ${isMobile ? '18px' : isTablet ? '28px' : '36px'};
                    font-weight: bold;
                    text-align: center;
                    margin: 0 0 ${isMobile ? '4px' : '8px'} 0;
                    font-style: italic;
                }
                .sepia-subtitle {
                    color: #7d6d5e;
                    text-align: center;
                    font-size: ${isMobile ? '12px' : isTablet ? '14px' : '22px'};
                    margin: 0 0 ${isMobile ? '6px' : '10px'} 0;
                }
                .sepia-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: ${gap};
                    margin-bottom: ${isMobile ? '10px' : '15px'};
                    flex-grow: 1;
                    grid-auto-rows: 1fr;
                    align-items: stretch;
                    align-content: start;
                }
                .sepia-card {
                    background-color: #8b6f47;
                    color: white;
                    padding: ${isMobile ? '8px' : isTablet ? '12px' : '15px'};
                    border-radius: 8px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    text-align: center;
                    min-height: ${isMobile ? '80px' : isTablet ? '100px' : '120px'};
                }
                .sepia-card-title {
                    background-color: rgba(255,255,255,0.2);
                    padding: ${isMobile ? '4px 8px' : isTablet ? '6px 10px' : '8px 14px'};
                    border-radius: 5px;
                    text-align: center;
                    font-weight: bold;
                    margin-bottom: ${isMobile ? '6px' : '10px'};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: ${isMobile ? '10px' : isTablet ? '11px' : '14px'};
                    width: 100%;
                    height: ${isMobile ? '24px' : isTablet ? '28px' : '32px'};
                    line-height: 1.2;
                }
                .sepia-card-content {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    width: 100%;
                    text-align: center;
                }
                .sepia-card-content li {
                    padding: ${isMobile ? '1px' : '3px'} 0;
                    list-style-type: disc;
                    list-style-position: inside;
                    font-size: ${isMobile ? '9px' : isTablet ? '11px' : '13px'};
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .sepia-catatan {
                    background-color: #8b6f47;
                    color: white;
                    padding: ${isMobile ? '8px' : isTablet ? '10px' : '14px'};
                    text-align: center;
                    font-size: ${isMobile ? '8px' : isTablet ? '10px' : '12px'};
                    font-weight: bold;
                }
            </style>
            <div class="sepia-container">
                ${headerInfo ? `<div class="sepia-header-info">${headerInfo}</div>` : ''}
                <div class="sepia-title">🧹 Jadwal Piket 🧹</div>
                <div class="sepia-subtitle">Kelas ${data.kelas}</div>
                <div class="sepia-grid">
        `;
        
        data.jadwal.forEach((item, index) => {
            html += `
                <div class="sepia-card">
                    <div class="sepia-card-title">${item.hari}</div>
                    <ul class="sepia-card-content">
            `;
            item.siswa.forEach(siswa => {
                html += `<li>${siswa}</li>`;
            });
            html += `
                    </ul>
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="sepia-catatan">
                    ${data.keteranganHukuman ? `⚠ ${data.keteranganHukuman} ⚠` : '⚠ CATATAN: Piket dilakukan setelah jam pelajaran terakhir ⚠'}
                </div>
            </div>
        `;
    } else if (data.template == 2) {
        // Template Sticky Notes - Desain Casual
        html = `
            <style>
                .sticky-container {
                    background-color: #f5f1e8;
                    padding: ${padding};
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='5' y='20' font-size='12' opacity='0.05'%3E══════════════%3C/text%3E%3C/svg%3E");
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .sticky-header {
                    text-align: center;
                    margin-bottom: ${isMobile ? '10px' : isTablet ? '15px' : '22px'};
                }
                .sticky-header-title {
                    color: #6b5344;
                    font-size: ${isMobile ? '16px' : isTablet ? '20px' : '30px'};
                    font-weight: bold;
                    margin: 0 0 4px 0;
                }
                .sticky-header-subtitle {
                    color: #8b7355;
                    font-size: ${isMobile ? '9px' : isTablet ? '11px' : '13px'};
                    margin: 0;
                }
                .sticky-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: ${gap};
                    margin-bottom: ${isMobile ? '10px' : isTablet ? '14px' : '18px'};
                    flex-grow: 1;
                }
                .sticky-note {
                    background-color: #f0ead3;
                    padding: ${isMobile ? '8px' : isTablet ? '12px' : '14px'};
                    border-radius: 8px;
                    box-shadow: 0 3px 8px rgba(0,0,0,0.12);
                    transform: rotate(-1deg);
                    position: relative;
                }
                .sticky-note:nth-child(2n) {
                    transform: rotate(1deg);
                }
                .sticky-note::before {
                    content: "📌";
                    position: absolute;
                    top: -5px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: ${isMobile ? '12px' : isTablet ? '14px' : '18px'};
                }
                .sticky-day {
                    color: #6b5344;
                    font-weight: bold;
                    font-size: ${isMobile ? '10px' : isTablet ? '12px' : '14px'};
                    margin-bottom: ${isMobile ? '4px' : '8px'};
                    padding-bottom: ${isMobile ? '3px' : '5px'};
                    border-bottom: 2px dashed #d4b896;
                }
                .sticky-students {
                    color: #7d6d5e;
                    font-size: ${isMobile ? '9px' : isTablet ? '11px' : '13px'};
                    line-height: 1.5;
                    margin: 0;
                    padding: 0;
                }
                .sticky-students li {
                    list-style-position: inside;
                    padding: 2px 0;
                }
                .sticky-footer {
                    background-color: #d4b896;
                    padding: ${isMobile ? '8px' : isTablet ? '10px' : '14px'};
                    text-align: center;
                    color: #6b5344;
                    font-size: ${isMobile ? '8px' : isTablet ? '10px' : '12px'};
                }
            </style>
            <div class="sticky-container">
                ${headerInfo ? `<div style="background-color: #d4b896; color: #6b5344; padding: ${isMobile ? '6px' : isTablet ? '8px' : '10px'}; text-align: center; font-size: ${isMobile ? '8px' : isTablet ? '10px' : '12px'}; margin-bottom: ${isMobile ? '8px' : '12px'}; border-radius: 6px;">${headerInfo}</div>` : ''}
                <div class="sticky-header">
                    <div class="sticky-header-title">JADWAL PIKET KELAS</div>
                    <div class="sticky-header-subtitle">Kelas: ${data.kelas}</div>
                </div>
                <div class="sticky-grid">
        `;
        
        data.jadwal.forEach(item => {
            html += `
                <div class="sticky-note">
                    <div class="sticky-day">${item.hari}</div>
                    <ul class="sticky-students">
            `;
            item.siswa.forEach(siswa => {
                html += `<li>${siswa}</li>`;
            });
            html += `
                    </ul>
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="sticky-footer">
                    ${data.keteranganHukuman ? `<strong>CATATAN:</strong> ${data.keteranganHukuman}` : '<strong>CATATAN:</strong> Piket dilakukan setelah jam pelajaran terakhir'}
                </div>
            </div>
        `;
    } else if (data.template == 3) {
        // Template Orange Ceria - Desain Colorful
        html = `
            <style>
                .colorful-container {
                    background: linear-gradient(135deg, #ff9a56 0%, #ff8c42 100%);
                    padding: ${padding};
                    position: relative;
                    overflow: hidden;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .colorful-container::before {
                    content: "🧹 🧼 🧹 🧼 🧹";
                    position: absolute;
                    top: -10px;
                    right: -20px;
                    font-size: ${isMobile ? '30px' : isTablet ? '40px' : '60px'};
                    opacity: 0.2;
                    transform: rotate(15deg);
                }
                .colorful-title {
                    color: #1a1a1a;
                    font-size: ${isMobile ? '16px' : isTablet ? '26px' : '34px'};
                    font-weight: bold;
                    text-align: center;
                    margin: 0 0 ${isMobile ? '4px' : '8px'} 0;
                }
                .colorful-kelas {
                    background-color: #ffd699;
                    color: #1a1a1a;
                    padding: 6px 14px;
                    border-radius: 20px;
                    text-align: center;
                    display: block;
                    margin: 0 auto ${isMobile ? '10px' : '16px'};
                    width: fit-content;
                    font-weight: bold;
                    font-size: ${isMobile ? '10px' : isTablet ? '12px' : '14px'};
                }
                .colorful-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: ${gap};
                    margin-bottom: ${isMobile ? '10px' : '14px'};
                    flex-grow: 1;
                }
                .colorful-card {
                    background-color: #ffd699;
                    padding: ${isMobile ? '8px' : isTablet ? '12px' : '14px'};
                    border-radius: 12px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                }
                .colorful-card-day {
                    background-color: #ffb366;
                    color: white;
                    padding: ${isMobile ? '4px' : isTablet ? '6px' : '7px'};
                    border-radius: 8px;
                    text-align: center;
                    font-weight: bold;
                    margin-bottom: ${isMobile ? '4px' : '8px'};
                    font-size: ${isMobile ? '10px' : isTablet ? '12px' : '14px'};
                }
                .colorful-card-students {
                    color: #1a1a1a;
                    font-size: ${isMobile ? '9px' : isTablet ? '11px' : '13px'};
                    line-height: 1.5;
                    margin: 0;
                    padding: 0;
                }
                .colorful-card-students li {
                    list-style-position: inside;
                    padding: 2px 0;
                }
                .colorful-catatan {
                    background-color: #ffd699;
                    padding: ${isMobile ? '8px' : isTablet ? '10px' : '14px'};
                    text-align: center;
                    color: #1a1a1a;
                }
                .colorful-catatan p {
                    font-size: ${isMobile ? '8px' : isTablet ? '10px' : '12px'};
                    font-weight: bold;
                    margin: 0;
                }
            </style>
            <div class="colorful-container">
                ${headerInfo ? `<div style="background-color: #ffd699; color: #1a1a1a; padding: ${isMobile ? '6px' : isTablet ? '8px' : '10px'}; text-align: center; font-size: ${isMobile ? '8px' : isTablet ? '10px' : '12px'}; margin-bottom: ${isMobile ? '8px' : '12px'}; border-radius: 6px; font-weight: bold;">${headerInfo}</div>` : ''}
                <div class="colorful-title">JADWAL PIKET KELAS</div>
                <div class="colorful-kelas">${data.kelas} - ${data.namaSekolah}</div>
                <div class="colorful-grid">
        `;
        
        data.jadwal.forEach(item => {
            html += `
                <div class="colorful-card">
                    <div class="colorful-card-day">${item.hari}</div>
                    <ul class="colorful-card-students">
            `;
            item.siswa.forEach(siswa => {
                html += `<li>${siswa}</li>`;
            });
            html += `
                    </ul>
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="colorful-catatan">
                    <p>${data.keteranganHukuman ? `✨ ${data.keteranganHukuman} ✨` : `✨ "Ayo Bersama Ciptakan Kelas yang Bersih, Indah & Nyaman" ✨`}</p>
                </div>
            </div>
        `;
    }

    return html;
}

// Save as PNG
function saveAsPNG() {
    const container = document.getElementById('scheduleContainer');
    html2canvas(container).then(canvas => {
        const link = document.createElement('a');
        link.download = 'jadwal-piket.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

// Save as PDF
function saveAsPDF() {
    const container = document.getElementById('scheduleContainer');
    html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        // A4 format: 210mm x 297mm at 72dpi
        const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        // Calculate image dimensions to fit A4 page perfectly
        const imgAspectRatio = canvas.width / canvas.height;
        let imgWidth = pageWidth;
        let imgHeight = pageWidth / imgAspectRatio;
        
        // If image is too tall, scale to fit height
        if (imgHeight > pageHeight) {
            imgHeight = pageHeight;
            imgWidth = pageHeight * imgAspectRatio;
        }
        
        // Center image on page
        const xOffset = (pageWidth - imgWidth) / 2;
        const yOffset = (pageHeight - imgHeight) / 2;
        
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
        pdf.save('jadwal-piket.pdf');
    });
}
