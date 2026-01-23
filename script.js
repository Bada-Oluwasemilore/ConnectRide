/**
 * CONNECT RIDE - COMPLETE INTEGRATED SCRIPT
 */

// ---  STAR RATING LOGIC ---
function setRating(n) {
  const stars = document.querySelectorAll('#live-rating i');
  stars.forEach((star, index) => {
    if (index < n) {
      star.classList.remove('fa-regular');
      star.classList.add('fa-solid', 'active');
    } else {
      star.classList.remove('fa-solid', 'active');
      star.classList.add('fa-regular');
    }
  });
}

// --- MODAL CONTROLS ---
function openOfferModal() {
    const modal = document.getElementById('offerModal');
    if (modal) {
        modal.style.display = 'flex';
    } else {
        window.location.href = "find-ride.html#offer";
    }
}

function closeModal() {
    const modal = document.getElementById('offerModal');
    if (modal) modal.style.display = 'none';
}

// --- BOOKING LOGIC ---
function checkAuthAndBook(driver, car) {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        alert("Please login to book a ride!");
        window.location.href = "login.html";
        return;
    }
    const booking = { driver, car, date: new Date().toLocaleDateString() };
    localStorage.setItem("activeBooking", JSON.stringify(booking));
    window.location.href = "profile.html";
}

// ---  HERO CAROUSEL WITH AUTOPLAY ---
let currentIndex = 0;

function moveSlide(index) {
  const slides = document.querySelector('.slides');
  const dots = document.querySelectorAll('.dot');
  
  if (!slides || dots.length === 0) return;

  if (index >= dots.length) currentIndex = 0;
  else if (index < 0) currentIndex = dots.length - 1;
  else currentIndex = index;

  slides.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

let carouselInterval = setInterval(() => {
    moveSlide(currentIndex + 1);
}, 5000);

function manualMove(index) {
    clearInterval(carouselInterval);
    moveSlide(index);
    carouselInterval = setInterval(() => moveSlide(currentIndex + 1), 5000);
}

// --- INITIALIZATION & EVENT LISTENERS ---
document.addEventListener("DOMContentLoaded", () => {
    
    // Handle URL Hash (for "Offer Ride")
    if (window.location.hash === '#offer') openOfferModal();

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => item.parentElement.classList.toggle('active'));
    });

    // Auth UI Update (Navbar)
    const authBox = document.getElementById("auth-button-container");
    if (localStorage.getItem("isLoggedIn") === "true" && authBox) {
        const name = localStorage.getItem("regName") || "Rider";
        authBox.innerHTML = `
            <div class="user-status" onclick="window.location.href='profile.html'" style="display:flex; align-items:center; gap:10px; cursor:pointer;">
                <i class="fa-solid fa-circle-user" style="color:#4caf50; font-size: 24px;"></i>
                <span style="color:white; font-weight:700;">Hi, ${name}</span>
                <button onclick="event.stopPropagation(); localStorage.removeItem('isLoggedIn'); location.reload();" 
                        style="background:none; border:none; color:#ff4d4d; font-size:11px; cursor:pointer; text-decoration:underline;">LOGOUT</button>
            </div>`;
    }

    // PROFILE PAGE RENDERING
    const profName = document.getElementById('u-name');
    if (profName) {
        profName.innerText = localStorage.getItem("regName") || "Account User";
        document.getElementById('u-email').innerText = localStorage.getItem("regEmail") || "No email linked";
        
        const bookingData = localStorage.getItem("activeBooking");
        const container = document.getElementById('new-booking');
        
        if (bookingData && container) {
            const ride = JSON.parse(bookingData);
            container.innerHTML = `
                <div style="padding:20px; background:#f0fdf4; border:1px solid #4caf50; border-radius:15px; color:#111;">
                    <p><strong>Driver:</strong> ${ride.driver} (${ride.car})</p>
                    <div class="star-rating" id="live-rating" style="margin:10px 0;">
                        <i class="fa-regular fa-star" onclick="setRating(1)"></i>
                        <i class="fa-regular fa-star" onclick="setRating(2)"></i>
                        <i class="fa-regular fa-star" onclick="setRating(3)"></i>
                        <i class="fa-regular fa-star" onclick="setRating(4)"></i>
                        <i class="fa-regular fa-star" onclick="setRating(5)"></i>
                    </div>
                    <button onclick="localStorage.removeItem('activeBooking'); location.reload();" style="color:red; background:none; border:none; cursor:pointer; font-weight:700;">End Trip</button>
                </div>`;
        }
    }

    // CONTACT FORM SUBMISSION
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const btn = this.querySelector('button');
            const originalBtnText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.pointerEvents = "none";
            btn.style.opacity = "0.7";

            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    const successModal = document.getElementById('successModal');
                    if (successModal) successModal.style.display = 'flex';
                    else alert("Message sent successfully!");
                    
                    contactForm.reset(); 
                } else {
                    alert("Submission failed. Please check your Formspree ID.");
                }
            })
            .catch(() => alert("Network error. Please check your connection."))
            .finally(() => {
                // Reset Button
                btn.innerHTML = originalBtnText;
                btn.style.pointerEvents = "auto";
                btn.style.opacity = "1";
            });
        });
    }
});