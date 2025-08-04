// story-renderer.js - Story rendering engine for JSON-based content
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
        
        // Add speech bubbles
        comicData.speechBubbles.forEach(bubble => {
            html += `<div class="speech-bubble" data-position="${bubble.position}">${bubble.text}</div>`;
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
        // Position speech bubbles based on data-position attribute
        document.querySelectorAll('.speech-bubble[data-position]').forEach(bubble => {
            const position = bubble.getAttribute('data-position');
            const [horizontal, xPercent, vertical, yPercent] = position.split('-');
            
            bubble.style.position = 'absolute';
            bubble.style[horizontal] = xPercent + '%';
            bubble.style[vertical] = yPercent + '%';
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
}
