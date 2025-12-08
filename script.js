// Language support
const translations = {
    en: {
        'blog-title': 'My Blog',
        'blog-subtitle': 'Sharing thoughts and ideas',
        'footer-text': '© 2024 My Blog. Built with ❤️ for GitHub Pages.',
        'back-to-posts': '← Back to all posts',
        'read-more': 'Read more →',
        'post-not-found': 'Post not found',
        'loading-error': 'Error loading post',
        'loading-error-desc': 'The post could not be loaded. Please make sure the Markdown file exists.'
    },
    ru: {
        'blog-title': 'Мой Блог',
        'blog-subtitle': 'Делимся мыслями и идеями',
        'footer-text': '© 2024 Мой Блог. Создано с ❤️ для GitHub Pages.',
        'back-to-posts': '← Назад ко всем постам',
        'read-more': 'Читать далее →',
        'post-not-found': 'Пост не найден',
        'loading-error': 'Ошибка загрузки поста',
        'loading-error-desc': 'Пост не удалось загрузить. Убедитесь, что файл Markdown существует.'
    }
};

// Get current language from localStorage or default to 'en'
function getCurrentLanguage() {
    return localStorage.getItem('blog-language') || 'en';
}

// Set current language
function setCurrentLanguage(lang) {
    localStorage.setItem('blog-language', lang);
    document.documentElement.lang = lang;
    updateTranslations();
    initializeBlog();
}

// Update all translations on the page
function updateTranslations() {
    const lang = getCurrentLanguage();
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Blog posts metadata with multilingual support
// Write your posts as separate .md files in the posts/ directory
// Use format: post-id.en.md and post-id.ru.md
const blogPosts = [
    {
        id: 'welcome-to-my-blog',
        date: '2024-01-15',
        title: {
            en: 'Welcome to My Blog',
            ru: 'Добро пожаловать в мой блог'
        },
        excerpt: {
            en: 'This is the first post on my new blog. I\'m excited to share my thoughts and ideas with you.',
            ru: 'Это первый пост в моем новом блоге. Я рад поделиться с вами своими мыслями и идеями.'
        }
    },
    {
        id: 'getting-started-with-github-pages',
        date: '2024-01-20',
        title: {
            en: 'Getting Started with GitHub Pages',
            ru: 'Начало работы с GitHub Pages'
        },
        excerpt: {
            en: 'Learn how to deploy your static website to GitHub Pages in just a few simple steps.',
            ru: 'Узнайте, как развернуть статический сайт на GitHub Pages всего за несколько простых шагов.'
        }
    },
    {
        id: 'building-a-simple-blog',
        date: '2024-01-25',
        title: {
            en: 'Building a Simple Blog',
            ru: 'Создание простого блога'
        },
        excerpt: {
            en: 'A guide to creating a clean, modern blog using just HTML, CSS, and vanilla JavaScript.',
            ru: 'Руководство по созданию чистого, современного блога с использованием только HTML, CSS и ванильного JavaScript.'
        }
    }
];

// Initialize the blog
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    const lang = getCurrentLanguage();
    document.documentElement.lang = lang;
    
    // Initialize language switcher
    initializeLanguageSwitcher();
    
    // Update translations
    updateTranslations();
    
    // Wait for marked.js to load if needed
    if (typeof marked === 'undefined') {
        // If marked.js hasn't loaded yet, wait a bit and try again
        setTimeout(initializeBlog, 100);
    } else {
        initializeBlog();
    }
});

// Initialize language switcher buttons
function initializeLanguageSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setCurrentLanguage(lang);
        });
    });
}

// Handle hash changes for navigation
window.addEventListener('hashchange', function() {
    initializeBlog();
});

function initializeBlog() {
    // Check if we're on a post page (using hash routing)
    const postId = getPostIdFromHash();
    
    if (postId) {
        displayPost(postId);
    } else {
        displayPostList();
    }
}

function getPostIdFromHash() {
    // Extract post ID from hash like #post-id
    const hash = window.location.hash;
    if (hash && hash.startsWith('#')) {
        return hash.substring(1); // Remove the #
    }
    return null;
}

function displayPostList() {
    const container = document.getElementById('blog-posts');
    
    if (!container) return;
    
    const lang = getCurrentLanguage();
    
    // Sort posts by date (newest first)
    const sortedPosts = [...blogPosts].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    container.innerHTML = sortedPosts.map(post => `
        <article class="post-card">
            <h2><a href="#${post.id}">${post.title[lang] || post.title.en}</a></h2>
            <div class="post-meta">
                <span>📅 ${formatDate(post.date, lang)}</span>
            </div>
            <p class="post-excerpt">${post.excerpt[lang] || post.excerpt.en}</p>
            <a href="#${post.id}" class="read-more" data-i18n="read-more">${translations[lang]['read-more']}</a>
        </article>
    `).join('');
}

async function displayPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    const lang = getCurrentLanguage();
    
    if (!post) {
        const langText = translations[lang];
        document.body.innerHTML = `<div class="container"><h1>${langText['post-not-found']}</h1><a href="#" class="back-link">${langText['back-to-posts']}</a></div>`;
        return;
    }
    
    const container = document.getElementById('blog-posts');
    if (!container) return;
    
    const postTitle = post.title[lang] || post.title.en;
    const langText = translations[lang];
    
    // Show loading state
    container.innerHTML = `
        <a href="#" class="back-link">${langText['back-to-posts']}</a>
        <div class="post-content">
            <h1>${postTitle}</h1>
            <div class="post-meta">
                <span>📅 ${formatDate(post.date, lang)}</span>
            </div>
            <article>Loading...</article>
        </div>
    `;
    
    try {
        // Load Markdown file based on language (e.g., post-id.en.md or post-id.ru.md)
        const markdownPath = `posts/${postId}.${lang}.md`;
        const response = await fetch(markdownPath);
        
        if (!response.ok) {
            // Fallback to English if language-specific file doesn't exist
            const fallbackPath = `posts/${postId}.en.md`;
            const fallbackResponse = await fetch(fallbackPath);
            if (!fallbackResponse.ok) {
                throw new Error('Post not found');
            }
            const markdown = await fallbackResponse.text();
            const htmlContent = typeof marked !== 'undefined' 
                ? marked.parse(markdown) 
                : markdown;
            
            container.innerHTML = `
                <a href="#" class="back-link">${langText['back-to-posts']}</a>
                <div class="post-content">
                    <h1>${postTitle}</h1>
                    <div class="post-meta">
                        <span>📅 ${formatDate(post.date, lang)}</span>
                    </div>
                    <article>
                        ${htmlContent}
                    </article>
                </div>
            `;
            return;
        }
        
        const markdown = await response.text();
        
        // Parse Markdown content to HTML
        const htmlContent = typeof marked !== 'undefined' 
            ? marked.parse(markdown) 
            : markdown; // Fallback if marked.js hasn't loaded yet
        
        container.innerHTML = `
            <a href="#" class="back-link">${langText['back-to-posts']}</a>
            <div class="post-content">
                <h1>${postTitle}</h1>
                <div class="post-meta">
                    <span>📅 ${formatDate(post.date, lang)}</span>
                </div>
                <article>
                    ${htmlContent}
                </article>
            </div>
        `;
    } catch (error) {
        container.innerHTML = `
            <a href="#" class="back-link">${langText['back-to-posts']}</a>
            <div class="post-content">
                <h1>${langText['loading-error']}</h1>
                <p>${langText['loading-error-desc']}</p>
            </div>
        `;
    }
}

function formatDate(dateString, lang = 'en') {
    const date = new Date(dateString);
    const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
    return date.toLocaleDateString(locale, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

