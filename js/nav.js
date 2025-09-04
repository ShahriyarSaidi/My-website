
    document.addEventListener("DOMContentLoaded", () => {
      const menuNav = document.querySelector(".menu-nav");
      const navLinks = [...document.querySelectorAll(".menu-nav-link")];
      const sections = navLinks.map(link => document.querySelector(link.getAttribute("href")));

      // ======================
      // 🔹 Drag ilə scroll (mouse ilə tutub sürükləmək)
      // ======================
      let isDragging = false;
      let startX, scrollStart;

      const startDrag = (e) => {
        isDragging = true;
        startX = e.pageX;
        scrollStart = menuNav.scrollLeft;
        menuNav.style.cursor = "grabbing";
      };

      const stopDrag = () => {
        isDragging = false;
        menuNav.style.cursor = "grab";
      };

      const doDrag = (e) => {
        if (!isDragging) return;
        const deltaX = e.pageX - startX;
        menuNav.scrollLeft = scrollStart - deltaX * 1.5; // sürət 1.5x
      };

      menuNav.addEventListener("mousedown", startDrag);
      menuNav.addEventListener("mouseup", stopDrag);
      menuNav.addEventListener("mouseleave", stopDrag);
      menuNav.addEventListener("mousemove", doDrag);

      // ======================
      // 🔹 Scroll zamanı aktiv link
      // ======================
      const activateLinkOnScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset;

        sections.forEach((section, i) => {
          if (!section) return;
          const sectionTop = section.offsetTop - 100; // navbar offset
          const sectionBottom = sectionTop + section.offsetHeight;

          const link = navLinks[i];
          if (scrollY >= sectionTop && scrollY < sectionBottom) {
            navLinks.forEach(l => l.classList.remove("w--current"));
            link.classList.add("w--current");

            // 🔹 Menyu scroll → aktiv link ortada görünsün
            const linkLeft = link.offsetLeft;
            const linkWidth = link.offsetWidth;
            const containerWidth = menuNav.offsetWidth;
            const scrollTo = linkLeft - (containerWidth / 2) + (linkWidth / 2);

            menuNav.scrollTo({ left: scrollTo, behavior: "smooth" });
          }
        });
      };

      window.addEventListener("scroll", activateLinkOnScroll);
      activateLinkOnScroll();

      // ======================
      // 🔹 Kliklənəndə smooth scroll
      // ======================
      navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = link.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            const navbarHeight = 100; // navbar hündürlüyü
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });
          }
        });
      });
    });

  