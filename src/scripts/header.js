const lightButton = document.getElementById("lightButton");
const darkButton = document.getElementById("darkButton");

function setTheme(theme) {

    const darkMode = theme === "dark";

    // Change body theme
    document.body.classList.toggle("dark", darkMode);

    // Change scrollbar color
    document.documentElement.style.scrollbarColor = darkMode ? "#00e5ff transparent" : "#2e7d32 transparent";

    // Change active button
    lightButton?.classList.toggle("active", !darkMode);
    darkButton?.classList.toggle("active", darkMode);

    // Save selected theme
    localStorage.setItem("city-theme", theme);
}


// Light button
lightButton?.addEventListener("click", () => { setTheme("light"); });


// Dark button
darkButton?.addEventListener("click", () => { setTheme("dark"); });


// Load saved theme
const savedTheme = localStorage.getItem("city-theme");

if (savedTheme === "dark") {
    setTheme("dark");
} else if (savedTheme === "light") {
    setTheme("light");
} else {
    // Use system preference
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    setTheme(prefersDark ? "dark" : "light");
}