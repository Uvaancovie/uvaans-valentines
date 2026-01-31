<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1QkOzIScJFyFwyXEhjPrb8BsYitOXYttA

## Run Locally

**Prerequisites:**  Node.js v20.19+ or v22.12+


1. Install dependencies:
   `npm install`
2. Set the `VITE_GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository in [Vercel](https://vercel.com/new)
3. Add `VITE_GEMINI_API_KEY` as an environment variable in the Vercel project settings
4. Deploy! Vercel will automatically detect the Angular configuration

Or use the Vercel CLI:
```bash
npm i -g vercel
vercel
```

The project is configured with:
- `.nvmrc` file for Node.js v20.19.0
- `vercel.json` with Angular build settings
- Automatic routing configuration
