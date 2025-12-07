GitHub Pages is an excellent way to host static websites for free. In this post, I'll walk you through the process of deploying a simple blog like this one.

## Step 1: Create a Repository

First, create a new repository on GitHub. You can name it anything you like, but if you want it to be accessible at `username.github.io`, name it exactly `username.github.io`.

## Step 2: Push Your Files

Clone the repository locally, add your HTML, CSS, and JavaScript files, then push them to GitHub:

```bash
git clone https://github.com/username/username.github.io.git
cd username.github.io
# Add your files
git add .
git commit -m "Initial commit"
git push origin main
```

## Step 3: Enable GitHub Pages

Go to your repository settings, scroll down to the "Pages" section, and select the branch you want to deploy (usually `main`). Your site will be live in a few minutes!

That's it! Your blog is now live on the internet. You can access it at `https://username.github.io`.

