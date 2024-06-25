const dark_theme = "dark-theme";

const darktheme_setup = () => {
  if (get_current_theme() === "dark_mode") {
    document.getElementById("toggle").checked = true;
  } else {
    document.getElementById("toggle").checked = false;
  }
};

const get_current_theme = () =>
  document.body.classList.contains(dark_theme) ? "dark_mode" : "light_mode";

const selected_theme = localStorage.getItem("selected-theme");
if (selected_theme === "dark_mode") {
  document.body.classList[selected_theme === "dark_mode" ? "add" : "remove"](
    dark_theme
  );
  darktheme_setup();
}

const theme_button = document.getElementById("toggle");
theme_button.addEventListener("change", () => {
  document.body.classList.toggle(dark_theme);
  localStorage.setItem("selected-theme", get_current_theme());
  darktheme_setup();
});