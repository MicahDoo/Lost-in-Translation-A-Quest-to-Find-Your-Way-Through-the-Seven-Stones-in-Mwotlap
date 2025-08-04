// story-renderer.js - Updated story rendering engine with transparent percentage-based speech bubbles
class StoryRenderer {
    constructor(storyData) {
        this.data = storyData;
        this.currentStoryLang = 'en';
        this.currentPuzzleLang = 'mwt';
    }
    
    renderScene(sceneId, language = this.currentStoryLang) {
        const scene = this.data.scenes.find(s => s.id === sceneId);
        if (!scene) return '';
        
        const content = scene.content[language];
        if (!content) return '';
        
        let html = `<div class="story-scene" data-scene="${sceneId}">`;
        html += `<div class="scene-narration" data-story-lang="${language}">`;
        
        content.forEach(item => {
            switch (item.type) {
                case 'paragraph':
                    const style = item.style ? ` style="${item.style}"` : '';
                    html += `<p${style}>${item.text}</p>`;
                    break;
                    
                case 'comic':
                    html += this.renderComic(item);
                    break;
            }
        });
        
        html += '</div></div>';
        return html;
    }
    
    renderComic(comicData) {
        let html = '<div class="scene-comic">';
        html += `<img src="${comicData.image}" alt="${comicData.alt}" class="comic-panel" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">`;
        html += `<span class="comic-placeholder" style="display: none;">[Comic: ${comicData.alt}]</span>`;
        
        // Add speech bubble overlays with visible text
        comicData.speechBubbles.forEach((bubble, index) => {
            html += `<div class="speech-bubble-overlay" 
                          data-bubble-index="${index}"
                          data-text="${bubble.text}"
                          style="left: ${bubble.left}%; top: ${bubble.top}%; width: ${bubble.width}%; height: ${bubble.height}%;"
                          title="${bubble.text}">
                          <span class="speech-text">${bubble.text}</span>
                     </div>`;
        });
        
        html += '</div>';
        return html;
    }
    
    renderChallenge(challengeId, language = this.currentPuzzleLang) {
        const challenge = this.data.challenges.find(c => c.id === challengeId);
        if (!challenge) return '';
        
        const content = challenge.content[language];
        if (!content) return '';
        
        let html = `<div class="story-scene" data-scene="${challengeId}">`;
        html += `<div class="challenge-box" data-puzzle-lang="${language}">`;
        html += `<h3>${challenge.title[language]}</h3>`;
        html += `<p>${content.question}</p>`;
        
        if (content.hint) {
            html += `<p><em>Hint: ${content.hint}</em></p>`;
        }
        
        // Answer section
        html += '<div class="answer-section">';
        html += '<p style="text-align: center; margin-top: 25px;">';
        html += `<button class="answer-toggle-btn" data-target="answer-${challengeId}-${language}">🗝️ Reveal Answer</button>`;
        html += '</p>';
        html += `<div id="answer-${challengeId}-${language}" class="answer-content">`;
        html += '<div class="answer-item">';
        html += `<p><strong>Answer:</strong> ${content.answer}</p>`;
        html += '</div></div></div>';
        
        html += '</div></div>';
        return html;
    }
    
    renderAllContent() {
        let html = '';
        
        // Render all scenes in order
        this.data.scenes.forEach(scene => {
            html += this.renderScene(scene.id, this.currentStoryLang);
            
            // Insert challenges after specific scenes
            if (scene.id === 'tragic-accident') {
                html += this.renderChallenge('challenge-1', this.currentPuzzleLang);
            } else if (scene.id === 'transition-1') {
                html += this.renderChallenge('challenge-2', this.currentPuzzleLang);
            } else if (scene.id === 'asking-residents') {
                html += this.renderChallenge('challenge-3', this.currentPuzzleLang);
            }
        });
        
        return html;
    }
    
    updateLanguage(type, newLang) {
        if (type === 'story') {
            this.currentStoryLang = newLang;
        } else if (type === 'puzzle') {
            this.currentPuzzleLang = newLang;
        }
        this.refreshContent();
    }
    
    refreshContent() {
        const container = document.getElementById('story-container');
        if (container) {
            container.innerHTML = this.renderAllContent();
            this.initializeSpeechBubbles();
            this.initializeAnswerButtons();
        }
    }
    
    initializeSpeechBubbles() {
        // Initialize transparent speech bubble overlays
        document.querySelectorAll('.speech-bubble-overlay').forEach(overlay => {
            // Add hover effects for debugging/accessibility
            overlay.addEventListener('mouseenter', function() {
                if (this.dataset.debug !== 'false') {
                    this.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                    this.style.border = '1px solid rgba(255, 0, 0, 0.3)';
                }
            });
            
            overlay.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                this.style.border = 'none';
            });
        });
    }
    
    initializeAnswerButtons() {
        // Initialize answer button states
        document.querySelectorAll('.answer-content').forEach(content => {
            content.style.display = 'none';
        });
        
        document.querySelectorAll('.answer-toggle-btn').forEach(btn => {
            btn.innerHTML = '🗝️ Reveal Answer';
            btn.style.background = 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)';
        });
    }
    
    // Utility methods for debugging speech bubbles
    toggleSpeechBubbleDebug(enable = true) {
        document.querySelectorAll('.speech-bubble-overlay').forEach(overlay => {
            if (enable) {
                overlay.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
                overlay.style.border = '2px dashed rgba(0, 255, 0, 0.5)';
                overlay.dataset.debug = 'true';
            } else {
                overlay.style.backgroundColor = 'transparent';
                overlay.style.border = 'none';
                overlay.dataset.debug = 'false';
            }
        });
    }
    
    // Utility methods
    getCurrentStoryLanguage() {
        return this.currentStoryLang;
    }
    
    getCurrentPuzzleLanguage() {
        return this.currentPuzzleLang;
    }
    
    getSceneCount() {
        return this.data.scenes.length;
    }
    
    getChallengeCount() {
        return this.data.challenges.length;
    }
    
    // Advanced rendering options
    renderSceneOnly(sceneId, language) {
        return this.renderScene(sceneId, language);
    }
    
    renderChallengeOnly(challengeId, language) {
        return this.renderChallenge(challengeId, language);
    }
    
    // Debug methods
    logSceneStructure() {
        console.log('Available scenes:', this.data.scenes.map(s => ({
            id: s.id,
            languages: Object.keys(s.content),
            items: Object.entries(s.content).map(([lang, content]) => ({
                [lang]: content.length + ' items'
            }))
        })));
    }
    
    logChallengeStructure() {
        console.log('Available challenges:', this.data.challenges.map(c => ({
            id: c.id,
            languages: Object.keys(c.content)
        })));
    }
    
    logSpeechBubbleData() {
        console.log('Speech bubble data across all scenes:');
        this.data.scenes.forEach(scene => {
            Object.entries(scene.content).forEach(([lang, content]) => {
                content.forEach(item => {
                    if (item.type === 'comic' && item.speechBubbles.length > 0) {
                        console.log(`Scene: ${scene.id} (${lang})`, {
                            image: item.image,
                            bubbles: item.speechBubbles.map((bubble, index) => ({
                                index,
                                text: bubble.text,
                                position: `${bubble.left}%, ${bubble.top}%`,
                                size: `${bubble.width}% x ${bubble.height}%`
                            }))
                        });
                    }
                });
            });
        });
    }
}
