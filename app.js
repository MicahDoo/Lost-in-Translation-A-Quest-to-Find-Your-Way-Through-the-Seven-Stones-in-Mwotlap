/**
 * Mwotlap Treasure Hunt - Application Logic
 * Separated from HTML for better maintainability
 */

class MwotlapTreasureHunt {
    constructor() {
        this.storyLanguage = 'en';
        this.puzzleLanguage = 'mwt';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateLanguageLabels('story', false);
        this.updateLanguageLabels('puzzle', false);
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const tabName = e.target.closest('.tab-trigger').dataset.tab;
                this.showTab(tabName);
            });
        });

        // Close sidebar
        document.querySelector('.close-sidebar')?.addEventListener('click', () => {
            this.closeSidebar();
        });

        // Language toggles - target the switch containers, not the switches themselves
        const storyLanguageSwitch = document.querySelector('.language-switch .switch');
        const puzzleLanguageSwitch = document.querySelectorAll('.language-switch .switch')[1];
        
        if (storyLanguageSwitch) {
            storyLanguageSwitch.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleStoryLanguage();
            });
        }
        
        if (puzzleLanguageSwitch) {
            puzzleLanguageSwitch.addEventListener('click', (e) => {
                e.preventDefault();
                this.togglePuzzleLanguage();
            });
        }

        // Answer reveal buttons - use event delegation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('answer-toggle-btn')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('data-target');
                if (targetId) {
                    this.toggleAnswer(e.target, targetId);
                }
            }
        });
    }

    showTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active state from all triggers
        document.querySelectorAll('.tab-trigger').forEach(trigger => {
            trigger.classList.remove('active');
        });
        
        // Show selected tab
        const targetContent = document.getElementById(tabName + '-content');
        const targetTrigger = document.querySelector(`[data-tab="${tabName}"]`);
        
        if (targetContent && targetTrigger) {
            targetContent.classList.add('active');
            targetTrigger.classList.add('active');
        }
        
        // Open sidebar
        this.openSidebar();
    }

    openSidebar() {
        document.getElementById('sidebar')?.classList.add('expanded');
        document.querySelector('.content-area')?.classList.add('sidebar-open');
    }

    closeSidebar() {
        document.getElementById('sidebar')?.classList.remove('expanded');
        document.querySelector('.content-area')?.classList.remove('sidebar-open');
    }

    toggleStoryLanguage() {
        const checkbox = document.getElementById('storyLang');
        if (!checkbox) return;
        
        checkbox.checked = !checkbox.checked;
        const newLang = checkbox.checked ? 'zh' : 'en';
        
        console.log('Story toggle clicked! New language:', newLang);
        
        this.switchLanguageElements(this.storyLanguage, newLang, 'data-story-lang');
        this.storyLanguage = newLang;
        this.updateLanguageLabels('story', checkbox.checked);
    }

    togglePuzzleLanguage() {
        const checkbox = document.getElementById('puzzleLang');
        if (!checkbox) return;
        
        checkbox.checked = !checkbox.checked;
        const newLang = checkbox.checked ? 'adv' : 'mwt';
        
        console.log('Puzzle toggle clicked! New language:', newLang);
        
        this.switchLanguageElements(this.puzzleLanguage, newLang, 'data-puzzle-lang');
        this.puzzleLanguage = newLang;
        this.updateLanguageLabels('puzzle', checkbox.checked);
    }

    switchLanguageElements(oldLang, newLang, attribute) {
        // Hide old language elements
        document.querySelectorAll(`[${attribute}="${oldLang}"]`).forEach(el => {
            el.style.display = 'none';
        });
        
        // Show new language elements
        document.querySelectorAll(`[${attribute}="${newLang}"]`).forEach(el => {
            el.style.display = 'block';
        });
    }

    updateLanguageLabels(type, isChecked) {
        const lang1 = document.getElementById(type + 'Lang1');
        const lang2 = document.getElementById(type + 'Lang2');
        
        if (!lang1 || !lang2) return;
        
        if (isChecked) {
            lang1.style.opacity = '0.5';
            lang1.style.fontWeight = 'normal';
            lang2.style.opacity = '1';
            lang2.style.fontWeight = 'bold';
        } else {
            lang1.style.opacity = '1';
            lang1.style.fontWeight = 'bold';
            lang2.style.opacity = '0.5';
            lang2.style.fontWeight = 'normal';
        }
    }

    toggleAnswers(button) {
        const answerSection = document.getElementById('answer-section');
        if (!answerSection) return;
        
        const isHidden = answerSection.style.display === 'none';
        
        if (isHidden) {
            answerSection.style.display = 'block';
            button.innerHTML = '🔒 Hide Answer Keys';
            button.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
        } else {
            answerSection.style.display = 'none';
            button.innerHTML = '🗝️ Reveal Answer Keys';
            button.style.background = 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)';
        }
    }

    // Utility methods for future expansion
    getCurrentStoryLanguage() {
        return this.storyLanguage;
    }

    getCurrentPuzzleLanguage() {
        return this.puzzleLanguage;
    }

    resetToDefaults() {
        this.storyLanguage = 'en';
        this.puzzleLanguage = 'mwt';
        
        // Reset checkboxes
        const storyCheckbox = document.getElementById('storyLang');
        const puzzleCheckbox = document.getElementById('puzzleLang');
        
        if (storyCheckbox) storyCheckbox.checked = false;
        if (puzzleCheckbox) puzzleCheckbox.checked = false;
        
        // Reset displays
        this.switchLanguageElements('zh', 'en', 'data-story-lang');
        this.switchLanguageElements('adv', 'mwt', 'data-puzzle-lang');
        
        // Reset labels
        this.updateLanguageLabels('story', false);
        this.updateLanguageLabels('puzzle', false);
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new MwotlapTreasureHunt();
    
    // Expose app instance globally for debugging
    window.treasureHuntApp = app;
});

// Legacy function support (for any remaining inline calls)
function showTab(tabName) {
    if (window.treasureHuntApp) {
        window.treasureHuntApp.showTab(tabName);
    }
}

function closeSidebar() {
    if (window.treasureHuntApp) {
        window.treasureHuntApp.closeSidebar();
    }
}

function toggleStoryLanguage() {
    if (window.treasureHuntApp) {
        window.treasureHuntApp.toggleStoryLanguage();
    }
}

function togglePuzzleLanguage() {
    if (window.treasureHuntApp) {
        window.treasureHuntApp.togglePuzzleLanguage();
    }
}

function showAnswers() {
    if (window.treasureHuntApp) {
        window.treasureHuntApp.toggleAnswers(event.target);
    }
}
