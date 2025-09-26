// JavaScript untuk website company profile

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Greeting Functionality
    const greetButton = document.getElementById('greet-button');
    const nameInput = document.getElementById('name-input');
    const greetingText = document.getElementById('greeting-text');
    
    if (greetButton && nameInput && greetingText) {
        greetButton.addEventListener('click', function() {
            const name = nameInput.value.trim();
            if (name) {
                greetingText.textContent = `Hi ${name}, selamat datang di TechSolutions!`;
                // Simpan nama di localStorage agar bisa digunakan di halaman lain
                localStorage.setItem('userName', name);
            } else {
                greetingText.textContent = 'Silakan masukkan nama Anda terlebih dahulu!';
            }
        });
        
        // Cek jika nama sudah ada di localStorage
        const savedName = localStorage.getItem('userName');
        if (savedName) {
            greetingText.textContent = `Hi ${savedName}, selamat datang kembali di TechSolutions!`;
            nameInput.value = savedName;
        }
    }
    
    // Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    const formResult = document.getElementById('form-result');
    const resultContent = document.getElementById('result-content');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('[id$="-error"]').forEach(el => {
                el.classList.add('hidden');
            });
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (!name) {
                document.getElementById('name-error').classList.remove('hidden');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                document.getElementById('email-error').classList.remove('hidden');
                isValid = false;
            }
            
            // Validate phone (minimal 10 digit, hanya angka)
            const phoneRegex = /^[0-9]{10,}$/;
            if (!phone || !phoneRegex.test(phone)) {
                document.getElementById('phone-error').classList.remove('hidden');
                isValid = false;
            }
            
            // Validate message
            if (!message) {
                document.getElementById('message-error').classList.remove('hidden');
                isValid = false;
            }
            
            // If form is valid, show results
            if (isValid) {
                // Simpan data di localStorage
                const formData = {
                    name,
                    email,
                    phone,
                    message,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem('contactFormData', JSON.stringify(formData));
                
                // Tampilkan hasil
                resultContent.innerHTML = `
                    <p><strong>Nama:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Nomor HP:</strong> ${phone}</p>
                    <p><strong>Pesan:</strong> ${message}</p>
                    <p class="text-green-600 font-semibold mt-4">Terima kasih! Pesan Anda telah dikirim.</p>
                `;
                
                formResult.classList.remove('hidden');
                formResult.classList.add('fade-in');
                
                // Reset form
                contactForm.reset();
                
                // Scroll ke hasil
                formResult.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Cek jika ada data form yang disimpan di localStorage
    const savedFormData = localStorage.getItem('contactFormData');
    if (savedFormData && formResult && resultContent) {
        const formData = JSON.parse(savedFormData);
        resultContent.innerHTML = `
            <p><strong>Data terakhir dikirim:</strong></p>
            <p><strong>Nama:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Nomor HP:</strong> ${formData.phone}</p>
            <p><strong>Pesan:</strong> ${formData.message}</p>
            <p><strong>Waktu:</strong> ${new Date(formData.timestamp).toLocaleString('id-ID')}</p>
        `;
        formResult.classList.remove('hidden');
    }
});