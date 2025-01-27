const TypeWriterPlus = require('../src/index.js');

// Mocking the DOM
document.body.innerHTML = `
  <div class="typewriter" data-type='["Hello, World!", "Testing TypeWriterPlus"]'></div>
`;

describe('TypeWriterPlus Library', () => {
    let typewriter;

    beforeEach(() => {
        // Reset the DOM and initialize TypeWriterPlus before each test
        typewriter = new TypeWriterPlus('.typewriter', {
            speed: 10,
            deleteSpeed: 5,
            pauseBetweenSentences: 100,
            loop: false,
            cursor: true,
            cursorColor: 'red',
            textColor: 'blue',
            textSize: '16px',
        }).create();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should initialize with correct settings', () => {
        expect(typewriter.speed).toBe(10);
        expect(typewriter.deleteSpeed).toBe(5);
        expect(typewriter.pauseBetweenSentences).toBe(100);
        expect(typewriter.loop).toBe(false);
        expect(typewriter.cursor).toBe(true);
        expect(typewriter.cursorColor).toBe('red');
        expect(typewriter.textColor).toBe('blue');
        expect(typewriter.textSize).toBe('16px');
    });

    test('should parse the data-type attribute correctly', () => {
        const element = document.querySelector('.typewriter');
        const texts = typewriter.parseContent(element);
        expect(texts).toEqual(['Hello, World!', 'Testing TypeWriterPlus']);
    });

    test('should initialize element states correctly', () => {
        const element = document.querySelector('.typewriter');
        typewriter.initializeElement(element, ['Hello, World!']);

        const state = typewriter.elementStates.get(element);
        expect(state.texts).toEqual(['Hello, World!']);
        expect(state.textIndex).toBe(0);
        expect(state.charIndex).toBe(0);
        expect(state.currentText).toBe('');
        expect(state.mode).toBe('typing');
        expect(state.typing).toBe(false);
        expect(state.completed).toBe(false);
    });

    test('should add a cursor to the element', () => {
        const element = document.querySelector('.typewriter');
        typewriter.addCursor(element);

        const cursor = element.querySelector('.typing-cursor');
        expect(cursor).not.toBeNull();
    });

    test('should stop typing when loop is false and all texts are typed', async () => {
        const element = document.querySelector('.typewriter');
        typewriter.initializeElement(element, ['Hello']);

        typewriter.typeElement(element);

        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for typing to finish

        const state = typewriter.elementStates.get(element);
        expect(state.completed).toBe(true);
    });

    test('should loop through texts when loop is true', async () => {
        typewriter.loop = true; // Enable looping

        const element = document.querySelector('.typewriter');
        typewriter.initializeElement(element, ['Hello', 'World']);

        typewriter.typeElement(element);

        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for typing to loop

        const state = typewriter.elementStates.get(element);
        expect(state.textIndex).toBe(0); // Should have moved to the next text
    });
});
