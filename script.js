// ================= TVOJ ORIGINALNI KÔD ZA HAMBURGER (NETAKNUT) =================
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
        menu.classList.toggle("open");
    });
}


// ================= OVDJE JE SADA NOVI POPRAVLJENI DROPDOWN (STARI JE OBRISAN) =================
const toggles = document.querySelectorAll(".dropdown-toggle");

toggles.forEach(toggle => {
    toggle.addEventListener("click", (e) => {
        // Sprječavamo da klik na strelicu aktivira bilo što drugo i otvaramo meni
        e.preventDefault();
        e.stopPropagation();

        const item = toggle.closest(".menu-item");
        if (item) {
            item.classList.toggle("open");
        }
    });
});


// ================= ULTRA-BRZI LOKALNI LIGHTBOX (NE DIRAJ) =================
document.addEventListener("DOMContentLoaded", () => {
    const galleryLinks = document.querySelectorAll('.boat-gallery .gallery-item');
    if (galleryLinks.length === 0) return;

    const overlay = document.createElement('div');
    overlay.className = 'sl-overlay';
    overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.92); z-index:999999; display:none; justify-content:center; align-items:center;';

    const wrapper = document.createElement('div');
    wrapper.className = 'sl-wrapper';
    wrapper.style.cssText = 'position:relative; max-width:85%; max-height:85vh; display:flex; justify-content:center; align-items:center;';

    const img = document.createElement('img');
    img.style.cssText = 'max-width:100%; max-height:85vh; object-fit:contain; border-radius:4px; box-shadow:0 10px 30px rgba(0,0,0,0.7); transition: transform 0.2s ease;';

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = 'position:fixed; top:30px; right:40px; background:rgba(0,0,0,0.6); color:#fff; border:none; font-size:45px; width:55px; height:55px; line-height:48px; border-radius:50%; cursor:pointer; z-index:1000005; font-family:Arial, sans-serif; text-align:center; transition: background 0.2s;';

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '‹';
    prevBtn.style.cssText = 'position:fixed; left:40px; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.6); color:#fff; border:none; font-size:50px; width:55px; height:55px; line-height:45px; border-radius:50%; cursor:pointer; z-index:1000005; font-family:Arial, sans-serif; text-align:center; transition: background 0.2s;';

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '›';
    nextBtn.style.cssText = 'position:fixed; right:40px; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.6); color:#fff; border:none; font-size:50px; width:55px; height:55px; line-height:45px; border-radius:50%; cursor:pointer; z-index:1000005; font-family:Arial, sans-serif; text-align:center; transition: background 0.2s;';

    wrapper.appendChild(img);
    overlay.appendChild(wrapper);
    overlay.appendChild(closeBtn);
    
    if (galleryLinks.length > 1) {
        overlay.appendChild(prevBtn);
        overlay.appendChild(nextBtn);
    }
    
    document.body.appendChild(overlay);

    let currentIndex = 0;

    function showImage(index) {
        if (index < 0) index = galleryLinks.length - 1;
        if (index >= galleryLinks.length) index = 0;
        currentIndex = index;
        const targetSrc = galleryLinks[currentIndex].getAttribute('href');
        img.src = targetSrc;
    }

    galleryLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showImage(index);
            overlay.style.display = 'flex';
        });
    });

    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1); });

    const buttons = [closeBtn, prevBtn, nextBtn];
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => btn.style.background = '#111');
        btn.addEventListener('mouseleave', () => btn.style.background = 'rgba(0,0,0,0.6)');
    });

    closeBtn.addEventListener('click', () => overlay.style.display = 'none');
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target === wrapper) {
            overlay.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (overlay.style.display === 'flex') {
            if (e.key === 'Escape') overlay.style.display = 'none';
            if (e.key === 'ArrowRight') showImage(currentIndex + 1);
            if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        }
    });
});

// INTERSECTION OBSERVER - Premium Scroll-In Animacija
document.addEventListener("DOMContentLoaded", function () {
    // Definiramo postavke: animacija se pali kada je 15% elementa vidljivo na ekranu
    const observerOptions = {
        root: null,
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Ako je korisnik skrolao do elementa, dodajemo mu klasu .appear
            if (entry.isIntersecting) {
                entry.target.classList.add("appear");
                observer.unobserve(entry.target); // Isključujemo praćenje nakon što se jednom pojavi
            }
        });
    }, observerOptions);

    // Označavamo uvodnu sekciju za praćenje
    const brandIntro = document.querySelector(".brand-intro-container");
    if (brandIntro) observer.observe(brandIntro);

    // Označavamo sve vodoravne kartice plovila za praćenje
    const productCards = document.querySelectorAll(".product-row-card");
    productCards.forEach(card => observer.observe(card));
});

// Funkcija koja se pokreće klikom na gumbe HR ili EN u izborniku
function changeLanguage(lang) {
    // Blokiraj skakanje na vrh stranice zbog href="#"
    if (window.event) {
        window.event.preventDefault();
    }
    
    localStorage.setItem('selectedLanguage', lang);
    applyTranslations(lang);
    updateActiveButton(lang);
}


// Glavna funkcija koja učitava JSON i mijenja sadržaj na stranici
async function applyTranslations(lang) {
    // 1. Ako je odabran hrvatski, samo osvježi stranicu da se vrati originalni HTML tekst
    if (lang === 'hr') {
        if (sessionStorage.getItem('was_translated')) {
            sessionStorage.removeItem('was_translated');
            window.location.reload();
        }
        return;
    }

    // 2. Ako je odabran engleski, povuci en.json i zamijeni tekstove
    try {
        const response = await fetch(`./en.json`);
        if (!response.ok) throw new Error("Nije moguće učitati en.json datoteku.");
        const translations = await response.json();

        // Zabilježi da je stranica prevedena kako bi reload ispravno radio
        sessionStorage.setItem('was_translated', 'true');

        // Pronađi sve elemente na stranici koji imaju data-i18n atribut
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const rawKey = element.getAttribute('data-i18n');
            
            // Slučaj A: Prijevod HTML strukture (npr. html:contact_info)
            if (rawKey.startsWith('html:')) {
                const key = rawKey.replace('html:', '');
                if (translations[key]) {
                    element.innerHTML = translations[key];
                }
            } 
            // Slučaj B: Prijevod atributa (npr. form_name:placeholder)
            else if (rawKey.includes(':')) {
                const parts = rawKey.split(':');
                const key = parts[0];
                const attribute = parts[1];
                if (translations[key]) {
                    element.setAttribute(attribute, translations[key]);
                }
            } 
            // Slučaj C: Običan čisti tekst (npr. hero_title)
            else {
                if (translations[rawKey]) {
                    element.textContent = translations[rawKey];
                }
            }
        });
    } catch (error) {
        console.error("Greška pri učitavanju engleskog prijevoda:", error);
    }
}

// Funkcija koja vizualno podebljava gumb za jezik koji je trenutačno aktivan
function updateActiveButton(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.trim().toLowerCase() === lang.toLowerCase()) {
            btn.classList.add('active');
        }
    });
}

// Pokreni automatski provjeru čim se stranica učita u pregledniku
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'hr';
    updateActiveButton(savedLang);
    
    if (savedLang === 'en') {
        applyTranslations('en');
    }
});
