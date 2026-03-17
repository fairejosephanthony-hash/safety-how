const toggle = document.getElementById('menuToggle');
const menu = document.getElementById('actionMenu');

toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('show');
});

document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== toggle) {
        menu.classList.remove('show');
    }
});

// Navigation active state toggle
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const text = link.textContent.trim().toLowerCase();
        if (text === 'home' || text === 'feeds') {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            // Return to feed if in write section
            showSection('mainFeed');
        }
    });
});

// Write Question Form Logic
const shareBtn = Array.from(document.querySelectorAll('.popout-menu li')).find(li => li.textContent.includes('Share Question'));
const mainFeed = document.getElementById('mainFeed');
const writeSection = document.getElementById('writeQuestionSection');
const saveBtn = document.getElementById('saveQuestion');
const cancelBtn = document.getElementById('cancelForm');
const goBackBtn = document.getElementById('goBackBtn');
const questionList = document.getElementById('questionList');

// Persistence Logic
const STORAGE_KEY = 'safety_how_questions';

function getSavedQuestions() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
}

function saveQuestionToStorage(question) {
    const questions = getSavedQuestions();
    questions.unshift(question); // Newest first
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
}

function createQuestionHTML(title, desc, keywords, time = 'Just now') {
    const article = document.createElement('article');
    article.className = 'question-card';

    let tagsHtml = '';
    if (keywords) {
        keywords.split(' ').forEach(tag => {
            const cleanTag = tag.trim().startsWith('#') ? tag.trim() : '#' + tag.trim();
            tagsHtml += `<span class="tag">${cleanTag}</span> `;
        });
    }

    article.innerHTML = `
        <div class="question-header">
            <div class="icon">💬</div>
            <h3>${title}</h3>
        </div>
        <p class="question-body">${desc}</p>
        <div class="tags">${tagsHtml}</div>
        <div class="question-meta">
            <span><i class="fa-regular fa-clock"></i> ${time}</span>
            <span><i class="fa-regular fa-comment"></i> 0 Comments</span>
            <span><i class="fa-regular fa-thumbs-up"></i> 0 Likes</span>
        </div>
        <div class="question-actions">
            <button class="view-btn">View full question</button>
            <button class="bookmark-btn">Bookmark</button>
        </div>
    `;
    return article;
}

function loadAndRenderQuestions() {
    const questions = getSavedQuestions();
    questions.forEach(q => {
        const card = createQuestionHTML(q.title, q.desc, q.keywords, q.time || 'Recently');
        questionList.appendChild(card);
    });
}

// Initialize saved questions on load
loadAndRenderQuestions();

function showSection(sectionId) {
    if (sectionId === 'mainFeed') {
        mainFeed.style.display = 'block';
        writeSection.style.display = 'none';
    } else {
        mainFeed.style.display = 'none';
        writeSection.style.display = 'block';
        window.scrollTo(0, 0);
    }
}

shareBtn.addEventListener('click', () => {
    menu.classList.remove('show');
    showSection('writeQuestionSection');
});

cancelBtn.addEventListener('click', () => showSection('mainFeed'));
goBackBtn.addEventListener('click', () => showSection('mainFeed'));

saveBtn.addEventListener('click', () => {
    const title = document.getElementById('questionTitle').value.trim();
    const desc = document.getElementById('questionDesc').value.trim();
    const keywords = document.getElementById('questionKeywords').value.trim();

    if (!title || !desc) {
        alert("It has to be something written before it will be posted. Both Question and Description are required.");
        return;
    }

    // Show loading transition
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'flex';

    // Simulate loading for 3 seconds
    setTimeout(() => {
        const newQuestion = {
            title,
            desc,
            keywords,
            time: 'Just now'
        };

        // Save to persistence
        saveQuestionToStorage(newQuestion);

        // Prepend to UI
        const newCard = createQuestionHTML(title, desc, keywords);
        questionList.insertBefore(newCard, questionList.firstChild);

        // Clear form and return
        document.getElementById('questionTitle').value = '';
        document.getElementById('questionDesc').value = '';
        document.getElementById('questionKeywords').value = '';

        // Hide loading and show feed
        loadingOverlay.style.display = 'none';
        showSection('mainFeed');

        // Scroll to the new question
        window.scrollTo(0, 0);
    }, 3000);
});
