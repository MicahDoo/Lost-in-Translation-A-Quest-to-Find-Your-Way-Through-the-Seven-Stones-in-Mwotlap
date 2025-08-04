/**
 * Mwotlap Treasure Hunt - Application Logic
 * Enhanced with JSON-based story rendering
 */

class MwotlapTreasureHunt {
    constructor() {
        this.storyLanguage = 'en';
        this.puzzleLanguage = 'mwt';
        this.storyRenderer = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateLanguageLabels('story', false);
        this.updateLanguageLabels('puzzle', false);
        
        // Initialize story renderer if data is available
        if (typeof storyData !== 'undefined') {
            this.storyRenderer = new StoryRenderer(storyData);
            this.renderStoryContent();
        }
    }

    renderStoryContent() {
        if (!this.storyRenderer) return;
        
        const container = document.getElementById('story-container');
        if (container) {
            // Show loading message briefly
            setTimeout(() => {
                container.innerHTML = this.storyRenderer.renderAllContent();
                this.storyRenderer.initializeSpeechBubbles();
                this.storyRenderer.initializeAnswerButtons();
            }, 100);
        }
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

        // Answer reveal buttons - use event delegation for dynamically generated content
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
        
        // Update with JSON renderer if available
        if (this.storyRenderer) {
            this.storyRenderer.updateLanguage('story', newLang);
        } else {
            // Fallback to old method
            this.switchLanguageElements(this.storyLanguage, newLang, 'data-story-lang');
        }
        
        this.storyLanguage = newLang;
        this.updateLanguageLabels('story', checkbox.checked);
    }

    togglePuzzleLanguage() {
        const checkbox = document.getElementById('puzzleLang');
        if (!checkbox) return;
        
        checkbox.checked = !checkbox.checked;
        const newLang = checkbox.checked ? 'adv' : 'mwt';
        
        console.log('Puzzle toggle clicked! New language:', newLang);
        
        // Update with JSON renderer if available
        if (this.storyRenderer) {
            this.storyRenderer.updateLanguage('puzzle', newLang);
        } else {
            // Fallback to old method
            this.switchLanguageElements(this.puzzleLanguage, newLang, 'data-puzzle-lang');
        }
        
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

    toggleAnswer(button, targetId) {
        const answerContent = document.getElementById(targetId);
        if (!answerContent) return;
        
        const isHidden = answerContent.style.display === 'none' || answerContent.style.display === '';
        
        if (isHidden) {
            answerContent.style.display = 'block';
            answerContent.classList.add('show');
            button.innerHTML = '🔒 Hide Answer';
            button.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
        } else {
            answerContent.style.display = 'none';
            answerContent.classList.remove('show');
            button.innerHTML = '🗝️ Reveal Answer';
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
        
        // Reset with renderer or fallback
        if (this.storyRenderer) {
            this.storyRenderer.updateLanguage('story', 'en');
            this.storyRenderer.updateLanguage('puzzle', 'mwt');
        } else {
            this.switchLanguageElements('zh', 'en', 'data-story-lang');
            this.switchLanguageElements('adv', 'mwt', 'data-puzzle-lang');
        }
        
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

// Smart Comic Layout System - Add to your app.js or create new file
class SmartComicLayout {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM and images to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupLayouts());
        } else {
            this.setupLayouts();
        }
    }

    setupLayouts() {
        // Find all comic containers and make them smart
        this.createSmartContainers();
        
        // Set up image load listeners
        this.setupImageLoadListeners();
        
        // Handle resize events
        window.addEventListener('resize', () => this.debounce(() => this.recalculateLayouts(), 250));
    }

    createSmartContainers() {
        // Find groups of consecutive comics
        const allComics = document.querySelectorAll('.scene-comic, .inline-comic');
        let currentGroup = [];
        let containers = [];

        allComics.forEach((comic, index) => {
            currentGroup.push(comic);
            
            // Check if this is the last comic or if the next comic is not immediately following
            const nextComic = allComics[index + 1];
            const isEndOfGroup = !nextComic || 
                                !this.areConsecutiveSiblings(comic, nextComic);
            
            if (isEndOfGroup && currentGroup.length > 1) {
                containers.push([...currentGroup]);
                currentGroup = [];
            } else if (isEndOfGroup) {
                currentGroup = [];
            }
        });

        // Create smart containers for each group
        containers.forEach(group => this.wrapInSmartContainer(group));
    }

    areConsecutiveSiblings(elem1, elem2) {
        // Check if elements are siblings and consecutive
        if (elem1.parentNode !== elem2.parentNode) return false;
        
        let current = elem1.nextElementSibling;
        while (current && current !== elem2) {
            // Skip text nodes and non-comic elements
            if (current.classList.contains('scene-comic') || 
                current.classList.contains('inline-comic')) {
                return false;
            }
            current = current.nextElementSibling;
        }
        return current === elem2;
    }

    wrapInSmartContainer(comics) {
        if (comics.length < 2) return;

        // Create smart container
        const container = document.createElement('div');
        container.className = 'adaptive-comic-container';
        
        // Insert container before first comic
        comics[0].parentNode.insertBefore(container, comics[0]);
        
        // Move all comics into container
        comics.forEach(comic => {
            container.appendChild(comic);
        });

        // Analyze and set up the container
        this.analyzeContainer(container);
    }

    analyzeContainer(container) {
        const comics = container.querySelectorAll('.scene-comic, .inline-comic');
        
        comics.forEach(comic => {
            const img = comic.querySelector('.comic-panel');
            if (img) {
                if (img.complete && img.naturalWidth && img.naturalHeight) {
                    this.processImage(img, comic);
                } else {
                    img.addEventListener('load', () => this.processImage(img, comic));
                }
            }
        });
    }

    processImage(img, comic) {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        const isWide = aspectRatio > 1.4; // 6:4 = 1.5, 3:4 = 0.75
        const isTall = aspectRatio < 0.8;
        
        // Determine column span
        let columnSpan = 1;
        if (isWide && !isTall) {
            columnSpan = 2; // Wide panels (like 6x4) take 2 columns
        }
        
        // Set CSS custom property
        comic.style.setProperty('--column-span', columnSpan);
        
        // Add classes for styling
        comic.classList.remove('tall-panel', 'wide-panel', 'normal-panel');
        if (columnSpan === 2) {
            comic.classList.add('wide-panel');
        } else if (isTall) {
            comic.classList.add('tall-panel');
        } else {
            comic.classList.add('normal-panel');
        }

        // Store dimensions for debugging
        comic.dataset.aspectRatio = aspectRatio.toFixed(2);
        comic.dataset.dimensions = `${img.naturalWidth}x${img.naturalHeight}`;
    }

    recalculateLayouts() {
        // Recalculate all smart containers
        document.querySelectorAll('.adaptive-comic-container').forEach(container => {
            this.analyzeContainer(container);
        });
    }

    // Utility function for debouncing resize events
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Manual override methods for specific cases
    setComicSpan(comicElement, span) {
        comicElement.style.setProperty('--column-span', span);
    }

    // Debug method to log all comic dimensions
    debugComicDimensions() {
        document.querySelectorAll('.scene-comic, .inline-comic').forEach((comic, index) => {
            const img = comic.querySelector('.comic-panel');
            if (img && img.complete) {
                console.log(`Comic ${index + 1}:`, {
                    src: img.src,
                    dimensions: `${img.naturalWidth}x${img.naturalHeight}`,
                    aspectRatio: (img.naturalWidth / img.naturalHeight).toFixed(2),
                    columnSpan: comic.style.getPropertyValue('--column-span') || 1
                });
            }
        });
    }

    // Method to force re-analysis
    refresh() {
        this.recalculateLayouts();
    }
}

// Initialize when DOM is ready
const smartComicLayout = new SmartComicLayout();

// Expose globally for debugging
window.smartComicLayout = smartComicLayout;

// Integration with existing app
if (typeof MwotlapTreasureHunt !== 'undefined') {
    // Add to existing app initialization
    const originalRenderStoryContent = MwotlapTreasureHunt.prototype.renderStoryContent;
    MwotlapTreasureHunt.prototype.renderStoryContent = function() {
        // Call original method
        originalRenderStoryContent.call(this);
        
        // Then set up smart layouts
        setTimeout(() => {
            smartComicLayout.refresh();
        }, 100);
    };
}
