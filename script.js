// ==========================================================================
// PIXEL ART PORTFOLIO - THEME CONTROLLER & INTERACTIVITY
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to get current effective theme
    const getEffectiveTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme;
        }
        // Fallback to CSS Media Query detection
        return colorSchemeMediaQuery.matches ? 'dark' : 'light';
    };

    // Function to update the toggle button appearance
    const updateToggleButton = (theme) => {
        if (!themeToggleBtn) return;
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = '☀️ <span class="toggle-text">LIGHT MODE</span>';
            themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
            themeToggleBtn.title = 'Switch to Light Mode';
        } else {
            themeToggleBtn.innerHTML = '🌙 <span class="toggle-text">NIGHT MODE</span>';
            themeToggleBtn.setAttribute('aria-label', 'Switch to Night Mode');
            themeToggleBtn.title = 'Switch to Night Mode';
        }
    };

    // Initialize theme based on preference or stored value
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateToggleButton(savedTheme);
    } else {
        // No explicit user selection yet: Rely on CSS media query, update button icon accordingly
        updateToggleButton(colorSchemeMediaQuery.matches ? 'dark' : 'light');
    }

    // Toggle button click handler
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = getEffectiveTheme();
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleButton(newTheme);
        });
    }

    // React dynamically to OS / browser preference changes if the user hasn't set a manual override
    colorSchemeMediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const systemTheme = e.matches ? 'dark' : 'light';
            updateToggleButton(systemTheme);
        }
    });
});
