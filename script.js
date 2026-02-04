document.addEventListener('DOMContentLoaded', function() {
    // 1. DYNAMIC NAV LOADER
    const authContainer = document.getElementById('auth-button-container');
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (authContainer) {
        if (isLoggedIn) {
            const userName = localStorage.getItem("regName") || "User";
            authContainer.innerHTML = `
                <div style="display:flex; align-items:center; gap:20px;">
                    <a href="profile.html" style="color:white; text-decoration:none; font-weight:700;">
                        <i class="fa-solid fa-circle-user" style="color:#4caf50;"></i> ${userName}
                    </a>
                    <button onclick="handleLogout()" class="btn-logout-nav">Logout</button>
                </div>`;
        } else {
            authContainer.innerHTML = `<a href="login.html" class="btn-hero" style="padding:10px 25px; font-size:13px;">Join Now</a>`;
        }
    }

    // 2. HERO CAROUSEL
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');
    if (slides && dots.length > 0) {
        let current = 0;
        const autoPlay = setInterval(() => {
            current = (current + 1) % dots.length;
            moveSlide(current);
        }, 5000);
        
        window.moveSlide = (index) => {
            current = index;
            slides.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === index));
        };
    }

    // 3. FAQ ACCORDION
    const faqItems = document.querySelectorAll('.faq-question');
    faqItems.forEach(q => {
        q.addEventListener('click', () => {
            const parent = q.parentElement;
            const wasActive = parent.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!wasActive) parent.classList.add('active');
        });
    });

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const btn = contactForm.querySelector('button');
        btn.innerText = "Sending...";
    });
}
   // 4. MAP LOGIC (Updated with expanded details)
if (document.getElementById('map')) {
    const map = L.map('map').setView([6.5244, 3.3792], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    const carIcon = L.divIcon({ 
        html: '<i class="fa-solid fa-car-side" style="color:#4CAF50; font-size:28px;"></i>', 
        className: 'map-car-icon', iconSize:[30,30] 
    });

    const rides = [
        { 
            driver: "Tunde W.", 
            car: "Toyota Corolla", 
            rating: "4.8 ★", 
            destination: "Lekki Phase 1", 
            passengers: "2 seats left", 
            lat: 6.4654, lng: 3.4064, 
            price: "₦2,500" 
        },
        { 
            driver: "Sarah J.", 
            car: "Honda Civic", 
            rating: "4.9 ★", 
            destination: "Ikeja City Mall", 
            passengers: "Full (Booking Closed)", 
            lat: 6.4454, lng: 3.4864, 
            price: "₦3,000" 
        },
        { 
            driver: "Emeka K.", 
            car: "Ford Focus", 
            rating: "4.7 ★", 
            destination: "Victoria Island", 
            passengers: "1 seat left", 
            lat: 6.4254, lng: 3.4164, 
            price: "₦2,800" 
        },
        { 
            driver: "Ada O.", 
            car: "Hyundai Elantra", 
            rating: "4.6 ★", 
            destination: "Surulere", 
            passengers: "3 seats left", 
            lat: 6.4854, lng: 3.3564, 
            price: "₦2,200" 
        },
        { 
            driver: "John D.", 
            car: "Kia Rio", 
            rating: "4.5 ★", 
            destination: "Yaba", 
            passengers: "Full (Booking Closed)", 
            lat: 6.5054, lng: 3.3864, 
            price: "₦2,600" 
        }
    ];

    rides.forEach(r => {
        const popupContent = `
            <div class="map-popup">
                <h3>${r.driver} <span class="pop-rating">${r.rating}</span></h3>
                <p><strong>Car:</strong> ${r.car}</p>
                <p><strong>To:</strong> ${r.destination}</p>
                <p><strong>Status:</strong> ${r.passengers}</p>
                <div class="pop-price">${r.price}</div>
                <button onclick="bookRide('${r.driver}','${r.car}',${parseInt(r.price.replace('₦','').replace(',',''))})" class="btn-hero pop-btn">Book Ride</button>
            </div>`;

        L.marker([r.lat, r.lng], {icon: carIcon}).addTo(map)
         .bindPopup(popupContent);
    });
}

    // 5. PROFILE CONTENT
    const uNameDisplay = document.getElementById('u-name-display');
    const uEmailDisplay = document.getElementById('u-email-display');
    const profilePic = document.getElementById('profile-pic');
    if (uNameDisplay) {
        uNameDisplay.innerText = localStorage.getItem("regName") || "Bada Emmanuel";
    }
    if (uEmailDisplay) {
        uEmailDisplay.innerText = localStorage.getItem("userEmail") || "user@example.com";
    }
    if (profilePic) {
        const savedPic = localStorage.getItem("profilePic");
        if (savedPic) {
            profilePic.src = savedPic;
        } else {
            profilePic.src = "data:image/svg+xml;base64," + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="#ccc"/><text x="40" y="45" text-anchor="middle" font-size="20" fill="#fff">User</text></svg>');
        }
    }

    // Edit profile functionality
    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const uNameInput = document.getElementById('u-name-input');
    const uEmailInput = document.getElementById('u-email-input');
    const picInput = document.getElementById('pic-input');

    if (editBtn) {
        editBtn.addEventListener('click', () => {
            if (uNameDisplay) uNameDisplay.style.display = 'none';
            if (uEmailDisplay) uEmailDisplay.style.display = 'none';
            if (uNameInput) {
                uNameInput.style.display = 'block';
                uNameInput.value = uNameDisplay ? uNameDisplay.innerText : '';
            }
            if (uEmailInput) {
                uEmailInput.style.display = 'block';
                uEmailInput.value = uEmailDisplay ? uEmailDisplay.innerText : '';
            }
            editBtn.style.display = 'none';
            if (saveBtn) saveBtn.style.display = 'inline-block';
            if (cancelBtn) cancelBtn.style.display = 'inline-block';
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const newName = uNameInput ? uNameInput.value.trim() : '';
            const newEmail = uEmailInput ? uEmailInput.value.trim() : '';
            if (newName && uNameDisplay) {
                localStorage.setItem("regName", newName);
                uNameDisplay.innerText = newName;
                // Update navbar
                const authContainer = document.getElementById('auth-button-container');
                if (authContainer) {
                    const link = authContainer.querySelector('a');
                    if (link) {
                        link.innerHTML = `<i class="fa-solid fa-circle-user" style="color:#4caf50;"></i> ${newName}`;
                    }
                }
            }
            if (newEmail && uEmailDisplay) {
                localStorage.setItem("userEmail", newEmail);
                uEmailDisplay.innerText = newEmail;
            }
            if (uNameDisplay) uNameDisplay.style.display = 'block';
            if (uEmailDisplay) uEmailDisplay.style.display = 'block';
            if (uNameInput) uNameInput.style.display = 'none';
            if (uEmailInput) uEmailInput.style.display = 'none';
            editBtn.style.display = 'inline-block';
            saveBtn.style.display = 'none';
            if (cancelBtn) cancelBtn.style.display = 'none';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (uNameDisplay) uNameDisplay.style.display = 'block';
            if (uEmailDisplay) uEmailDisplay.style.display = 'block';
            if (uNameInput) uNameInput.style.display = 'none';
            if (uEmailInput) uEmailInput.style.display = 'none';
            editBtn.style.display = 'inline-block';
            if (saveBtn) saveBtn.style.display = 'none';
            cancelBtn.style.display = 'none';
        });
    }

    if (profilePic) {
        profilePic.addEventListener('click', () => {
            if (editBtn && editBtn.style.display === 'none' && picInput) {
                picInput.click();
            }
        });
    }

    if (picInput) {
        picInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && profilePic) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const dataURL = e.target.result;
                    profilePic.src = dataURL;
                    localStorage.setItem("profilePic", dataURL);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const bookingStatus = document.getElementById('booking-status');
    if (bookingStatus) {
        const activeBooking = localStorage.getItem("activeBooking");
        if (activeBooking) {
            const booking = JSON.parse(activeBooking);
            bookingStatus.innerText = `Booked with ${booking.driver} (${booking.car}) on ${booking.date}`;
        } else {
            bookingStatus.innerText = "No active rides at the moment.";
        }
    }

    const savedDetails = document.getElementById('saved-details');
    const reportHistoryBtn = document.getElementById('report-history-btn');
    if (savedDetails) {
        const history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
        let total = 0;
            let html = '<ul style="list-style: none; padding: 0;">';
        history.forEach((b) => {
            html += `<li style="margin-bottom:8px;">Ride with ${b.driver} (${b.car}) on ${b.date}: Saved ₦${b.saved}</li>`;
            total += b.saved;
        });
        html += '</ul>';
        html += `<p><strong>Total: ₦${total}</strong></p>`;
        savedDetails.innerHTML = html;

        // show single report-from-history button when there are past rides
        if (reportHistoryBtn) {
            if (history.length > 0) {
                reportHistoryBtn.style.display = 'inline-block';
            } else {
                reportHistoryBtn.style.display = 'none';
            }
        }
    }

    // Report modal logic
    const reportBackdrop = document.getElementById('report-modal-backdrop');
    const reportForm = document.getElementById('report-form');
    const reportName = document.getElementById('report-name');
    const reportEmail = document.getElementById('report-email');
    const reportRideSelect = document.getElementById('report-ride-select');
    const reportMessage = document.getElementById('report-message');
    const reportCancel = document.getElementById('report-cancel');
    const reportHistoryBtnEl = document.getElementById('report-history-btn');

    function openReportModal(rideInfo = '') {
        if (!reportBackdrop) return;
        // Prefill name/email from storage
        reportName.value = localStorage.getItem('regName') || '';
        reportEmail.value = localStorage.getItem('userEmail') || '';
        reportMessage.value = '';
        // set selection if provided
        if (reportRideSelect) {
            if (rideInfo) reportRideSelect.value = rideInfo;
            else reportRideSelect.value = '';
        }
        reportBackdrop.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeReportModal() {
        if (!reportBackdrop) return;
        reportBackdrop.style.display = 'none';
        document.body.style.overflow = '';
    }

    // active booking is included when populating the history select

    // populate ride select from history and active booking when opening from history button
    if (reportHistoryBtnEl) {
        reportHistoryBtnEl.addEventListener('click', () => {
            // gather rides
            const history = JSON.parse(localStorage.getItem('bookingHistory')) || [];
            const active = JSON.parse(localStorage.getItem('activeBooking')) || null;
            if (!reportRideSelect) return openReportModal();
            // clear existing options (keep placeholder)
            reportRideSelect.innerHTML = '<option value="">-- Select a ride --</option>';
            if (active) {
                const val = `${active.driver} / ${active.car} / ${active.date}`;
                const opt = document.createElement('option');
                opt.value = val;
                opt.textContent = `Active: ${val}`;
                reportRideSelect.appendChild(opt);
            }
            history.forEach(h => {
                const val = `${h.driver} / ${h.car} / ${h.date}`;
                const opt = document.createElement('option');
                opt.value = val;
                opt.textContent = val;
                reportRideSelect.appendChild(opt);
            });
            openReportModal();
        });
    }

    if (reportCancel) {
        reportCancel.addEventListener('click', (e) => {
            e.preventDefault();
            closeReportModal();
        });
    }

    if (reportForm) {
        reportForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const rideInfoValue = reportRideSelect ? reportRideSelect.value : '';
            const report = {
                name: reportName.value,
                email: reportEmail.value,
                rideInfo: rideInfoValue,
                message: reportMessage.value,
                date: new Date().toISOString()
            };
            // persist locally
            const reports = JSON.parse(localStorage.getItem('reports')) || [];
            reports.push(report);
            localStorage.setItem('reports', JSON.stringify(reports));

            // try sending to Formspree (form action must be set in HTML)
            if (reportForm.action && !reportForm.action.includes('YOUR_ID')) {
                try {
                    const formData = new FormData(reportForm);
                    const res = await fetch(reportForm.action, {
                        method: 'POST',
                        body: formData,
                        headers: { 'Accept': 'application/json' }
                    });
                    if (res.ok) {
                        alert('Report submitted and emailed to support. Thank you.');
                    } else {
                        alert('Report saved locally but email submission failed.');
                    }
                } catch (err) {
                    console.error('Report email failed', err);
                    alert('Report saved locally but email submission failed.');
                }
            } else {
                alert('Report saved locally. To enable email delivery, set your Formspree form ID in the form action.');
            }

            closeReportModal();
        });
    }
});

// GLOBAL UTILITIES
window.handleLogout = () => {
    if(confirm("Logout from ConnectRide?")) {
        localStorage.setItem("isLoggedIn", "false");
        window.location.href = "index.html";
    }
};

window.bookRide = (driver, car, price) => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        alert("Please login to book!");
        window.location.href = "login.html";
    } else {
        const saved = Math.round(price * 0.4);
        let history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
        // Move current active to history if exists
        const currentActive = localStorage.getItem("activeBooking");
        if (currentActive) {
            history.push(JSON.parse(currentActive));
        }
        localStorage.setItem("bookingHistory", JSON.stringify(history));
        localStorage.setItem("activeBooking", JSON.stringify({ driver, car, date: new Date().toLocaleDateString(), price, saved }));
        alert("Ride Booked! Redirecting to profile...");
        window.location.href = "profile.html";
    }
};

// --- AUTHENTICATION LOGIC ---
let isSignUp = false;

window.toggleAuth = () => {
    isSignUp = !isSignUp;
    const title = document.getElementById('auth-title');
    const subtitle = document.getElementById('auth-subtitle');
    const nameInput = document.getElementById('reg-name');
    const toggleLink = document.getElementById('toggle-link');
    const toggleText = document.getElementById('toggle-text');

    if (isSignUp) {
        title.innerText = "Join ConnectRide";
        subtitle.innerText = "Create an account to start sharing rides";
        nameInput.style.display = "block";
        nameInput.required = true;
        toggleText.innerText = "Already have an account?";
        toggleLink.innerText = "Login";
    } else {
        title.innerText = "Welcome Back";
        subtitle.innerText = "Login to manage your rides";
        nameInput.style.display = "none";
        nameInput.required = false;
        toggleText.innerText = "Don't have an account?";
        toggleLink.innerText = "Sign Up";
    }
};

window.handleAuth = (event) => {
    event.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const nameInput = document.getElementById('reg-name');
    
    // Get existing users from storage or start an empty list
    let users = JSON.parse(localStorage.getItem("allUsers")) || [];

    if (isSignUp) {
        // CHECK IF ACCOUNT ALREADY EXISTS
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            alert("An account with this email already exists. Please Login.");
            toggleAuth(); // Switch them back to login view
            return;
        }

        // REGISTER NEW USER
        const newUser = { name: nameInput.value, email: email, password: password };
        users.push(newUser);
        localStorage.setItem("allUsers", JSON.stringify(users));
        
        // AUTO-LOGIN
        loginUser(newUser.name, newUser.email);
        alert("Account Created Successfully!");
    } else {
        // LOGIN RECOGNITION
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            loginUser(user.name, user.email);
            alert("Welcome Back, " + user.name + "!");
        } else {
            alert("Invalid email or password. Please try again or Sign Up.");
        }
    }
};

// Helper function to set login state
function loginUser(name, email) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("regName", name);
    localStorage.setItem("userEmail", email);
    window.location.href = "index.html";
}