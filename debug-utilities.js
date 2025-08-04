// debug-utilities.js - Helper functions for developing speech bubble positioning
// Add this to your project for easier development and debugging

/**
 * Debug utilities for speech bubble development
 * These functions help you position and test speech bubbles during development
 */
class SpeechBubbleDebugger {
    constructor() {
        this.isDebugMode = false;
        this.setupDebugControls();
    }
    
    /**
     * Toggle debug mode to visualize speech bubble areas
     */
    toggleDebugMode() {
        this.isDebugMode = !this.isDebugMode;
        const body = document.body;
        
        if (this.isDebugMode) {
            body.classList.add('debug-mode');
            console.log('🔍 Speech bubble debug mode ENABLED');
            this.logAllBubblePositions();
        } else {
            body.classList.remove('debug-mode');
            console.log('🔍 Speech bubble debug mode DISABLED');
        }
    }
    
    /**
     * Log all current speech bubble positions and data
     */
    logAllBubblePositions() {
        const bubbles = document.querySelectorAll('.speech-bubble-overlay');
        console.log(`Found ${bubbles.length} speech bubbles:`);
        
        bubbles.forEach((bubble, index) => {
            const rect = bubble.getBoundingClientRect();
            const parent = bubble.closest('.scene-comic');
            const parentRect = parent ? parent.getBoundingClientRect() : null;
            
            console.log(`Bubble ${index}:`, {
                text: bubble.dataset.text || bubble.title,
                cssPosition: {
                    left: bubble.style.left,
                    top: bubble.style.top,
                    width: bubble.style.width,
                    height: bubble.style.height
                },
                actualPosition: {
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height
                },
                relativeToParent: parentRect ? {
                    x: ((rect.left - parentRect.left) / parentRect.width * 100).toFixed(1) + '%',
                    y: ((rect.top - parentRect.top) / parentRect.height * 100).toFixed(1) + '%',
                    width: (rect.width / parentRect.width * 100).toFixed(1) + '%',
                    height: (rect.height / parentRect.height * 100).toFixed(1) + '%'
                } : 'No parent found'
            });
        });
    }
    
    /**
     * Create a visual overlay helper for positioning bubbles
     */
    createPositioningHelper(comicSelector = '.comic-panel') {
        const comics = document.querySelectorAll(comicSelector);
        
        comics.forEach((comic, comicIndex) => {
            const helper = document.createElement('div');
            helper.className = 'positioning-helper';
            helper.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 20;
                background: 
                    linear-gradient(to right, rgba(255,0,0,0.1) 0%, transparent 1%, transparent 99%, rgba(255,0,0,0.1) 100%),
                    linear-gradient(to bottom, rgba(255,0,0,0.1) 0%, transparent 1%, transparent 99%, rgba(255,0,0,0.1) 100%);
                background-size: 10% 100%, 100% 10%;
                display: none;
            `;
            
            const parent = comic.closest('.scene-comic');
            if (parent) {
                parent.style.position = 'relative';
                parent.appendChild(helper);
                
                // Add click handler to comic to toggle helper
                comic.addEventListener('click', () => {
                    const isVisible = helper.style.display !== 'none';
                    helper.style.display = isVisible ? 'none' : 'block';
                    console.log(`Grid helper for comic ${comicIndex}: ${isVisible ? 'hidden' : 'shown'}`);
                });
            }
        });
        
        console.log('📐 Positioning helpers created. Click on comic panels to toggle grid overlay.');
    }
    
    /**
     * Generate speech bubble data from mouse clicks
     * Click on a comic panel to set speech bubble positions interactively
     */
    enableInteractivePositioning(comicSelector = '.comic-panel') {
        const comics = document.querySelectorAll(comicSelector);
        
        comics.forEach((comic, comicIndex) => {
            const parent = comic.closest('.scene-comic');
            if (!parent) return;
            
            let isPositioning = false;
            let bubbleData = [];
            
            // Add positioning mode toggle
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = '📍 Position Bubbles';
            toggleBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: #007bff;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 12px;
                z-index: 25;
            `;
            
            parent.style.position = 'relative';
            parent.appendChild(toggleBtn);
            
            toggleBtn.addEventListener('click', () => {
                isPositioning = !isPositioning;
                toggleBtn.textContent = isPositioning ? '✅ Finish' : '📍 Position Bubbles';
                toggleBtn.style.background = isPositioning ? '#28a745' : '#007bff';
                
                if (!isPositioning && bubbleData.length > 0) {
                    console.log(`Speech bubble data for comic ${comicIndex}:`, bubbleData);
                    this.displayBubbleCode(bubbleData);
                }
            });
            
            // Handle click positioning
            parent.addEventListener('click', (e) => {
                if (!isPositioning) return;
                
                const rect = comic.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
                const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
                
                const text = prompt('Enter speech bubble text:');
                if (!text) return;
                
                const width = prompt('Enter bubble width (%):', '20');
                const height = prompt('Enter bubble height (%):', '8');
                
                const bubbleInfo = {
                    text: text,
                    left: parseFloat(x),
                    top: parseFloat(y),
                    width: parseFloat(width) || 20,
                    height: parseFloat(height) || 8
                };
                
                bubbleData.push(bubbleInfo);
                
                // Create visual preview
                const preview = document.createElement('div');
                preview.style.cssText = `
                    position: absolute;
                    left: ${x}%;
                    top: ${y}%;
                    width: ${width}%;
                    height: ${height}%;
                    background: rgba(0, 255, 0, 0.3);
                    border: 2px solid green;
                    pointer-events: none;
                    z-index: 15;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    color: #2c1810;
                    font-weight: bold;
                    font-family: 'Comic Sans MS', cursive, sans-serif;
                    text-align: center;
                    border-radius: 5px;
                `;
                
                const textSpan = document.createElement('span');
                textSpan.textContent = text;
                textSpan.style.cssText = `
                    text-shadow: 
                        1px 1px 0 rgba(255, 255, 255, 0.8),
                        -1px -1px 0 rgba(255, 255, 255, 0.8),
                        1px -1px 0 rgba(255, 255, 255, 0.8),
                        -1px 1px 0 rgba(255, 255, 255, 0.8);
                    word-wrap: break-word;
                    max-width: 100%;
                `;
                
                preview.appendChild(textSpan);
                parent.appendChild(preview);
                
                console.log('Added bubble:', bubbleInfo);
            });
        });
        
        console.log('🖱️ Interactive positioning enabled. Click "Position Bubbles" then click on comics to add speech bubbles.');
    }
    
    /**
     * Display generated bubble code for copying
     */
    displayBubbleCode(bubbleData) {
        const code = `speechBubbles: [
${bubbleData.map(bubble => `    {
        text: "${bubble.text}",
        left: ${bubble.left},
        top: ${bubble.top},
        width: ${bubble.width},
        height: ${bubble.height}
    }`).join(',\n')}
]`;
        
        console.log('Generated speech bubble code:');
        console.log(code);
        
        // Also create a modal with the code for easy copying
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 9999;
            max-width: 500px;
            width: 90%;
        `;
        
        modal.innerHTML = `
            <h3>Generated Speech Bubble Code</h3>
            <textarea style="width: 100%; height: 200px; font-family: monospace; font-size: 12px;">${code}</textarea>
            <div style="margin-top: 10px; text-align: right;">
                <button onclick="this.parentElement.parentElement.remove()" style="padding: 5px 15px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
                <button onclick="navigator.clipboard.writeText(this.parentElement.previousElementSibling.value); alert('Copied to clipboard!')" style="padding: 5px 15px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 5px;">Copy</button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    /**
     * Setup debug control panel
     */
    setupDebugControls() {
        // Only add controls in development
        if (window.location.hostname === 'localhost' || window.location.hostname.includes('dev')) {
            const controls = document.createElement('div');
            controls.id = 'speech-bubble-debug-controls';
            controls.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 10px;
                border-radius: 5px;
                z-index: 10000;
                font-size: 12px;
                display: none;
            `;
            
            controls.innerHTML = `
                <strong>Speech Bubble Debug</strong><br>
                <button onclick="speechBubbleDebugger.toggleDebugMode()">Toggle Debug Mode</button><br>
                <button onclick="speechBubbleDebugger.logAllBubblePositions()">Log Positions</button><br>
                <button onclick="speechBubbleDebugger.createPositioningHelper()">Show Grid</button><br>
                <button onclick="speechBubbleDebugger.enableInteractivePositioning()">Interactive Mode</button><br>
                <button onclick="document.getElementById('speech-bubble-debug-controls').style.display='none'">Hide Panel</button>
            `;
            
            document.body.appendChild(controls);
            
            // Show controls when pressing Ctrl+Shift+D
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                    controls.style.display = controls.style.display === 'none' ? 'block' : 'none';
                }
            });
        }
    }
}

// Initialize debugger
const speechBubbleDebugger = new SpeechBubbleDebugger();

// Make it globally accessible for console use
window.speechBubbleDebugger = speechBubbleDebugger;

console.log('🛠️ Speech Bubble Debugger loaded! Press Ctrl+Shift+D to show debug controls.');
console.log('Available methods:', Object.getOwnPropertyNames(SpeechBubbleDebugger.prototype));
