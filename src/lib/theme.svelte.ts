export function checkNightMode(): boolean {
    const nightMode = window.location.hash == "#night";
    const theme = nightMode ? "dark" : "light";
    // DaisyUI
    document.documentElement.dataset.theme = theme;
    if (nightMode) {
        // Standard Anki class
        document.documentElement.className = "night-mode";
        // Bootstrap
        document.documentElement.dataset.bsTheme = "dark";
    }
    return nightMode;
}

export interface ThemeInfo {
    isDark: boolean;
}

function getThemeFromRoot(): ThemeInfo {
    return {
        isDark: document.documentElement.classList.contains("night-mode"),
    };
}

export const pageTheme = $state(getThemeFromRoot());

const observer = new MutationObserver((_mutationsList, _observer) => {
    pageTheme.isDark = getThemeFromRoot().isDark;
});
observer.observe(document.documentElement, { attributeFilter: ["class"] });
