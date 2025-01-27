/**
 * TypeWriterPlus.js v1.0.0
 * A lightweight, customizable typing animation library
 * https://github.com/reddeath/typewriterplus
 *
 * Licensed under MIT License
 * Copyright (c) 2025 TypeWriterPlus
 */

class TypeWriterPlus {
    constructor(selector, options = {}) {
        this.selector = selector;
        this.elements = [];
        this.elementStates = new Map();
        this.speed = options.speed || 90;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.pauseBetweenSentences = options.pauseBetweenSentences || 1000;
        this.loop = options.loop !== undefined ? options.loop : true;
        this.cursor = options.cursor !== undefined ? options.cursor : true;
        this.cursorColor = options.cursorColor || "black";
        this.textColor = options.textColor || 'black';
        this.cursorSize = options.cursorSize || 'auto';
        this.textSize = options.textSize || 'auto';
    }

    initializeElement(element, texts) {
        this.elementStates.set(element, {
            texts: texts,
            textIndex: 0,
            charIndex: 0,
            currentText: '',
            mode: 'typing',
            typing: false,
            completed: false
        });
    }

    parseContent(element) {
        try {
            // Try parsing as JSON first
            const content = element.dataset.type;
            if (!content) return [];

            // If it starts with [ and ends with ], treat as JSON
            if (content.trim().startsWith('[') && content.trim().endsWith(']')) {
                return JSON.parse(content);
            }

            // Otherwise, split by comma
            return content.split(',').map(text => text.trim());
        } catch (e) {
            console.warn('TypeWriterPlus: Invalid data format. Using empty array.', e);
            return [];
        }
    }

    typeElement(element) {
        const state = this.elementStates.get(element);
        if (!state || state.typing || state.completed) return;

        state.typing = true;
        const currentText = state.texts[state.textIndex];

        if (state.mode === 'typing') {
            this.typeText(element, currentText);
        } else if (this.loop) {
            this.deleteText(element);
        }
    }

    typeText(element, text) {
        const state = this.elementStates.get(element);

        const intervalId = setInterval(() => {
            if (state.charIndex < text.length) {
                const char = text[state.charIndex];
                state.currentText += char;
                element.textContent = state.currentText;
                state.charIndex++;

                element.style.color = this.textColor;
                element.style.fontSize = this.textSize;

                if (this.cursor) this.addCursor(element);
            } else {
                clearInterval(intervalId);

                if (!this.loop && state.textIndex === state.texts.length - 1) {
                    state.completed = true;
                    state.typing = false;
                    if (this.cursor) this.addCursor(element);
                    return;
                }

                setTimeout(() => {
                    state.mode = 'deleting';
                    state.typing = false;
                    this.typeElement(element);
                }, this.pauseBetweenSentences);
            }
        }, this.speed);
    }

    deleteText(element) {
        const state = this.elementStates.get(element);

        const intervalId = setInterval(() => {
            if (state.currentText.length > 0) {
                state.currentText = state.currentText.slice(0, -1);
                element.textContent = state.currentText;
                if (this.cursor) this.addCursor(element);
            } else {
                clearInterval(intervalId);
                state.charIndex = 0;
                state.textIndex = (state.textIndex + 1) % state.texts.length;
                state.mode = 'typing';
                state.typing = false;
                this.typeElement(element);
            }
        }, this.deleteSpeed);
    }

    addCursor(element) {
        const existingCursor = element.querySelector('.typing-cursor');
        if (existingCursor) {
            existingCursor.remove();
        }

        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');
        cursor.textContent = '|';
        cursor.style.fontSize = this.cursorSize;
        element.appendChild(cursor);
    }

    create() {
        this.elements = document.querySelectorAll(this.selector);

        this.elements.forEach(element => {
            const texts = this.parseContent(element);
            this.initializeElement(element, texts);
            element.textContent = '';
        });

        const style = document.createElement('style');
        style.textContent = `
            .typing-cursor {
                opacity: 1;
                animation: blink 0.8s infinite;
                color: ${this.cursorColor};
                margin-left: 2px;
            }
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        this.elements.forEach(element => {
            this.typeElement(element);
        });

        return this;
    }

    static get version() {
        return '1.0.0';
    }

    static init(selector, options) {
        return new TypeWriterPlus(selector, options).create();
    }
}

// For CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TypeWriterPlus;
}

// For AMD environments
if (typeof define === 'function' && define.amd) {
    define('TypeWriterPlus', [], function() {
        return TypeWriterPlus;
    });
}

// For browser environments
if (typeof window !== 'undefined') {
    window.TypeWriterPlus = TypeWriterPlus;
}