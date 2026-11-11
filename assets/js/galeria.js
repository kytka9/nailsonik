
document.addEventListener("DOMContentLoaded", () => {

    /* ========================================
       MOBILNÉ MENU
    ======================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        function openMenu() {
            menuToggle.classList.add("active");
            navLinks.classList.add("active");

            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Zavrieť menu");
        }

        function closeMenu() {
            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Otvoriť menu");
        }

        menuToggle.addEventListener("click", () => {
            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            isOpen ? closeMenu() : openMenu();
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", event => {
            if (
                event.key === "Escape" &&
                menuToggle.getAttribute("aria-expanded") === "true"
            ) {
                closeMenu();
            }
        });

        window.matchMedia("(min-width: 769px)")
            .addEventListener("change", event => {
                if (event.matches) closeMenu();
            });
    }


    /* ========================================
       GALÉRIA – LIGHTBOX
    ======================================== */

    const galleryItems = Array.from(
        document.querySelectorAll(".gallery-item")
    );

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");
    const lightboxCounter = document.getElementById("lightbox-counter");

    if (
        !lightbox ||
        !lightboxImage ||
        galleryItems.length === 0
    ) {
        return;
    }

    let currentIndex = 0;
    let previousFocus = null;
    let touchStartX = 0;
    let touchEndX = 0;

    function showImage(index) {

        // Cyklické prechádzanie fotografií
        currentIndex =
            (index + galleryItems.length) % galleryItems.length;

        const selectedImage = galleryItems[currentIndex]
            .querySelector("img");

        const imageSource =
            galleryItems[currentIndex].getAttribute("href");

        lightboxImage.src = imageSource;
        lightboxImage.alt = selectedImage
            ? selectedImage.alt
            : "Fotografia z galérie Nailsonik";

        lightboxCounter.textContent =
            `${currentIndex + 1} / ${galleryItems.length}`;
    }

    function openLightbox(index) {
        previousFocus = document.activeElement;

        showImage(index);

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        lightboxClose.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        lightboxImage.src = "";

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    function nextImage() {
        showImage(currentIndex + 1);
    }

    function previousImage() {
        showImage(currentIndex - 1);
    }

    // Kliknutie na fotografiu
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", event => {
            event.preventDefault();
            openLightbox(index);
        });
    });

    // Ovládacie tlačidlá
    lightboxClose.addEventListener("click", closeLightbox);
    lightboxNext.addEventListener("click", nextImage);
    lightboxPrev.addEventListener("click", previousImage);

    // Kliknutie na tmavé pozadie zatvorí lightbox
    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Klávesnica
    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("active")) {
            return;
        }

        switch (event.key) {
            case "Escape":
                closeLightbox();
                break;

            case "ArrowRight":
                nextImage();
                break;

            case "ArrowLeft":
                previousImage();
                break;
        }
    });

    // Dotykové ovládanie na mobiloch
    lightbox.addEventListener("touchstart", event => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener("touchend", event => {
        touchEndX = event.changedTouches[0].screenX;

        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) < 50) {
            return;
        }

        if (difference > 0) {
            nextImage();
        } else {
            previousImage();
        }
    }, { passive: true });

});
