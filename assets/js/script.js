document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const links = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id]");

    /* ========================================
       MOBILNÉ MENU
    ======================================== */

    if (menuToggle && navLinks) {
        // Prepojenie tlačidla s navigáciou pre čítačky obrazovky
        menuToggle.setAttribute("aria-controls", "nav-links");
        menuToggle.setAttribute("aria-expanded", "false");

        if (!navLinks.hasAttribute("aria-label")) {
            navLinks.setAttribute("aria-label", "Hlavná navigácia");
        }

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

        function toggleMenu() {
            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        // Otvorenie a zatvorenie menu tlačidlom
        menuToggle.addEventListener("click", toggleMenu);

        // Zatvorenie menu po kliknutí na odkaz
        links.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Zatvorenie menu klávesom Escape
        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                menuToggle.getAttribute("aria-expanded") === "true"
            ) {
                closeMenu();
                menuToggle.focus();
            }
        });

        // Pri prechode na desktopové zobrazenie menu zatvoríme
        const desktopMedia = window.matchMedia("(min-width: 769px)");

        desktopMedia.addEventListener("change", (event) => {
            if (event.matches) {
                closeMenu();
            }
        });
    }

    /* ========================================
       ZVÝRAZŇOVANIE AKTÍVNEJ SEKcie
       Pomocou IntersectionObserver
    ======================================== */

    function setActiveLink(sectionId) {
        links.forEach((link) => {
            const target = link.getAttribute("href");
            const isActive = target === `#${sectionId}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    if ("IntersectionObserver" in window && sections.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                // Vyberieme sekciu, ktorá je najbližšie k hornej
                // časti viditeľnej oblasti stránky.
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => {
                        const referencePoint = window.innerHeight * 0.35;

                        return (
                            Math.abs(a.boundingClientRect.top - referencePoint) -
                            Math.abs(b.boundingClientRect.top - referencePoint)
                        );
                    });

                if (visibleSections.length > 0) {
                    const activeSection = visibleSections[0].target;
                    setActiveLink(activeSection.id);
                }
            },
            {
                root: null,
                rootMargin: "-20% 0px -65% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

        // Nastavenie aktívneho odkazu pri prvom načítaní stránky
        const initialSection = Array.from(sections).find((section) => {
            const rect = section.getBoundingClientRect();

            return rect.top <= window.innerHeight * 0.35 &&
                   rect.bottom > window.innerHeight * 0.35;
        });

        if (initialSection) {
            setActiveLink(initialSection.id);
        } else if (sections[0]) {
            setActiveLink(sections[0].id);
        }
    } else {
        // Jednoduchá záloha pre prehliadače bez IntersectionObserver
        window.addEventListener("scroll", () => {
            let currentSection = "";

            sections.forEach((section) => {
                const sectionTop =
                    section.getBoundingClientRect().top + window.scrollY;

                if (window.scrollY >= sectionTop - 150) {
                    currentSection = section.id;
                }
            });

            if (currentSection) {
                setActiveLink(currentSection);
            }
        }, { passive: true });
    }
});