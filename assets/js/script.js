'use strict';

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn?.addEventListener("click", () => {
  const open = sidebar.classList.toggle("active");
  sidebarBtn.setAttribute("aria-expanded", String(open));
});

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const setSelectOpen = (open) => {
  if (!select) return;
  select.classList.toggle("active", open);
  select.setAttribute("aria-expanded", String(open));
};

const applyFilter = (value, label) => {
  if (selectValue) selectValue.textContent = label;
  filterItems.forEach((item) => {
    item.classList.toggle("active", value === "all" || item.dataset.category === value);
  });
  filterBtns.forEach((btn) => {
    const current = btn.dataset.filterBtn === value;
    btn.classList.toggle("active", current);
    if (current) btn.setAttribute("aria-pressed", "true");
    else btn.setAttribute("aria-pressed", "false");
  });
};

select?.addEventListener("click", () => setSelectOpen(!select.classList.contains("active")));

selectItems.forEach((item) => {
  item.addEventListener("click", () => {
    applyFilter(item.dataset.selectItem, item.textContent.trim());
    setSelectOpen(false);
    select.focus();
  });
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => applyFilter(btn.dataset.filterBtn, btn.textContent.trim()));
});

document.addEventListener("click", (event) => {
  if (select && !select.parentElement.contains(event.target)) setSelectOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (select?.classList.contains("active")) {
    setSelectOpen(false);
    select.focus();
  }
});

const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const showPage = (name) => {
  pages.forEach((page) => page.classList.toggle("active", page.dataset.page === name));
  navLinks.forEach((link) => {
    const current = link.dataset.navLink === name;
    link.classList.toggle("active", current);
    if (current) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
};

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    showPage(link.dataset.navLink);
    window.scrollTo(0, 0);
  });
});
