Building a blog doesn't have to be complicated. Sometimes, the simplest solutions are the best. In this post, I'll explain the approach I took to build this blog.

## Why Keep It Simple?

There are many blog frameworks and CMS options available, but sometimes you just want something lightweight and fast. This blog uses:

- Plain HTML for structure
- CSS for styling
- Vanilla JavaScript for interactivity

## Key Features

The blog includes:

- Responsive design that works on all devices
- Clean, modern styling
- Easy-to-add blog posts (just add to the JavaScript array)
- Fast loading times
- **Markdown support** for writing posts

## Adding New Posts

To add a new blog post, simply add an object to the `blogPosts` array in `script.js`. Each post needs:

- `id`: A unique identifier (used in the URL)
- `title`: The post title
- `date`: Publication date
- `excerpt`: A short preview
- `content`: The full post content in **Markdown format**

## Writing in Markdown

You can now write your posts in Markdown! This makes it much easier to format your content. Here are some examples:

- **Bold text** with `**bold**`
- *Italic text* with `*italic*`
- Code blocks with triple backticks
- Lists, headings, links, and more

It's that simple! No database, no complex setup, just pure web technologies.

