(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector(".menu-toggle");
  const menuLabel = document.querySelector("[data-menu-label]");
  const navigation = document.querySelector("#site-navigation");
  const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));

  const setMenu = (open, returnFocus = false) => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    if (menuLabel) menuLabel.textContent = open ? "Close menu" : "Open menu";
    if (returnFocus) menuButton.focus();
  };

  menuButton?.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((candidate) => candidate.removeAttribute("aria-current"));
      link.setAttribute("aria-current", "true");
      setMenu(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
      setMenu(false, true);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      menuButton?.getAttribute("aria-expanded") === "true" &&
      event.target instanceof Node &&
      !navigation?.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      setMenu(false);
    }
  });

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const observedSections = ["work", "capabilities", "experience", "about"]
    .map((id) => document.getElementById(id))
    .filter(Boolean)
    .sort((a, b) => a.offsetTop - b.offsetTop);

  const updateActiveNavigation = () => {
    if (!observedSections.length) return;
    const marker = window.scrollY + Math.min(window.innerHeight * 0.3, 240);
    const current = observedSections.reduce(
      (active, section) => (section.offsetTop <= marker ? section : active),
      null
    );
    navLinks.forEach((link) => {
      const active = current && link.getAttribute("href") === `#${current.id}`;
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };
  updateActiveNavigation();
  window.addEventListener("scroll", updateActiveNavigation, { passive: true });

  const desktopQuery = window.matchMedia("(min-width: 901px)");
  desktopQuery.addEventListener?.("change", (event) => {
    if (event.matches) setMenu(false);
  });
})();
