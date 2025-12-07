// Blog posts metadata
// Write your posts as separate .md files in the posts/ directory
// The content will be loaded from the .md file automatically
const blogPosts = [
    {
        id: 'welcome-to-my-blog',
        title: 'Welcome to My Blog',
        date: '2024-01-15',
        excerpt: 'This is the first post on my new blog. I\'m excited to share my thoughts and ideas with you.'
    },
    {
        id: 'getting-started-with-github-pages',
        title: 'Getting Started with GitHub Pages',
        date: '2024-01-20',
        excerpt: 'Learn how to deploy your static website to GitHub Pages in just a few simple steps.'
    },
    {
        id: 'building-a-simple-blog',
        title: 'Building a Simple Blog',
        date: '2024-01-25',
        excerpt: 'A guide to creating a clean, modern blog using just HTML, CSS, and vanilla JavaScript.'
    }
];

// Initialize the blog
document.addEventListener('DOMContentLoaded', function() {
    // Wait for marked.js to load if needed
    if (typeof marked === 'undefined') {
        // If marked.js hasn't loaded yet, wait a bit and try again
        setTimeout(initializeBlog, 100);
    } else {
        initializeBlog();
    }
});

function initializeBlog() {
    const path = window.location.pathname;
    
    // Check if we're on a post page
    const postId = getPostIdFromPath(path);
    
    if (postId) {
        displayPost(postId);
    } else {
        displayPostList();
    }
}

function getPostIdFromPath(path) {
    // Extract post ID from path like /posts/post-id.html or /post-id.html
    const match = path.match(/\/(?:posts\/)?([^\/]+)\.html$/);
    return match ? match[1] : null;
}

function displayPostList() {
    const container = document.getElementById('blog-posts');
    
    if (!container) return;
    
    // Sort posts by date (newest first)
    const sortedPosts = [...blogPosts].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    container.innerHTML = sortedPosts.map(post => `
        <article class="post-card">
            <h2><a href="posts/${post.id}.html">${post.title}</a></h2>
            <div class="post-meta">
                <span>📅 ${formatDate(post.date)}</span>
            </div>
            <p class="post-excerpt">${post.excerpt}</p>
            <a href="posts/${post.id}.html" class="read-more">Read more →</a>
        </article>
    `).join('');
}

async function displayPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    
    if (!post) {
        const isInPostsDir = window.location.pathname.includes('/posts/');
        const backLink = isInPostsDir ? '../index.html' : '/';
        document.body.innerHTML = `<div class="container"><h1>Post not found</h1><a href="${backLink}">Back to home</a></div>`;
        return;
    }
    
    const container = document.getElementById('blog-posts');
    if (!container) return;
    
    // Determine the correct path for back link and markdown file
    const isInPostsDir = window.location.pathname.includes('/posts/');
    const backLink = isInPostsDir ? '../index.html' : '/';
    const markdownPath = isInPostsDir ? `${postId}.md` : `posts/${postId}.md`;
    
    // Show loading state
    container.innerHTML = `
        <a href="${backLink}" class="back-link">← Back to all posts</a>
        <div class="post-content">
            <h1>${post.title}</h1>
            <div class="post-meta">
                <span>📅 ${formatDate(post.date)}</span>
            </div>
            <article>Loading...</article>
        </div>
    `;
    
    try {
        // Load Markdown file
        const response = await fetch(markdownPath);
        if (!response.ok) {
            throw new Error('Post not found');
        }
        const markdown = await response.text();
        
        // Parse Markdown content to HTML
        const htmlContent = typeof marked !== 'undefined' 
            ? marked.parse(markdown) 
            : markdown; // Fallback if marked.js hasn't loaded yet
        
        container.innerHTML = `
            <a href="${backLink}" class="back-link">← Back to all posts</a>
            <div class="post-content">
                <h1>${post.title}</h1>
                <div class="post-meta">
                    <span>📅 ${formatDate(post.date)}</span>
                </div>
                <article>
                    ${htmlContent}
                </article>
            </div>
        `;
    } catch (error) {
        container.innerHTML = `
            <a href="${backLink}" class="back-link">← Back to all posts</a>
            <div class="post-content">
                <h1>Error loading post</h1>
                <p>The post could not be loaded. Please make sure the Markdown file exists at <code>${markdownPath}</code>.</p>
            </div>
        `;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

