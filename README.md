# Simple Blog for GitHub Pages

A clean, modern, and lightweight blog built with vanilla HTML, CSS, and JavaScript, designed to be easily deployed on GitHub Pages.

## Features

- 🎨 Modern, responsive design
- ⚡ Fast loading times (no frameworks or dependencies)
- 📱 Mobile-friendly
- ✨ Easy to customize
- 📝 **Write posts in Markdown** - No HTML required!
- 🚀 Ready for GitHub Pages deployment

## Project Structure

```
blog/
├── index.html          # Main blog homepage (handles all routing)
├── styles.css          # All styling
├── script.js           # Blog functionality and post metadata
├── posts/              # Blog posts (Markdown files only)
│   ├── welcome-to-my-blog.md
│   ├── getting-started-with-github-pages.md
│   └── building-a-simple-blog.md
└── README.md           # This file
```

## Adding New Blog Posts

To add a new blog post:

1. Create a new Markdown file in the `posts/` directory named `your-post-id.md`
2. Write your post content in Markdown format in that file
3. Open `script.js` and add a new object to the `blogPosts` array:

```javascript
{
    id: 'your-post-id',
    title: 'Your Post Title',
    date: '2024-01-30',
    excerpt: 'A short preview of your post...'
}
```

That's it! The Markdown content will be automatically loaded from the `.md` file when someone views the post. Posts are accessed via hash routing (e.g., `index.html#your-post-id`).

### Writing in Markdown

All blog posts are written in Markdown format, which makes it much easier to write and format your content. Here are some common Markdown syntax examples:

- **Bold text**: `**bold**` or `__bold__`
- *Italic text*: `*italic*` or `_italic_`
- Headings: `# H1`, `## H2`, `### H3`
- Links: `[link text](https://example.com)`
- Images: `![alt text](image-url.jpg)`
- Code: `` `inline code` ``
- Code blocks: Use triple backticks with optional language identifier
- Lists: Use `-` or `*` for unordered, numbers for ordered
- Blockquotes: `> quote text`
- Horizontal rule: `---` or `***`

The blog uses [marked.js](https://marked.js.org/) to parse Markdown into HTML automatically.

## Deployment to GitHub Pages

### Option 1: Repository named `username.github.io`

1. Create a new repository on GitHub named `username.github.io` (replace `username` with your GitHub username)

2. Clone the repository:
   ```bash
   git clone https://github.com/username/username.github.io.git
   cd username.github.io
   ```

3. Copy all files from this blog into the repository

4. Commit and push:
   ```bash
   git add .
   git commit -m "Initial blog setup"
   git push origin main
   ```

5. Your blog will be live at `https://username.github.io` in a few minutes!

### Option 2: Repository with a different name

1. Create a new repository on GitHub with any name

2. Clone and add your files (same as above)

3. Go to your repository **Settings** → **Pages**

4. Under "Source", select the branch (usually `main`) and folder (`/ (root)`)

5. Click **Save**

6. Your blog will be live at `https://username.github.io/repository-name`

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --secondary-color: #1e40af;    /* Darker shade */
    --text-color: #1f2937;         /* Main text color */
    /* ... */
}
```

### Changing the Blog Title

Update the `<h1>` in `index.html`.

### Styling

All styles are in `styles.css`. Feel free to modify colors, fonts, spacing, and layout to match your preferences.

## Browser Support

This blog works in all modern browsers that support:
- CSS Grid and Flexbox
- ES6 JavaScript
- CSS Custom Properties (variables)

## License

Feel free to use this blog template for your own projects!

