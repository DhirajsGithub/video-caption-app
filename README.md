# 🎬 Video Caption App

## 🚀 Overview
Video Caption App is a simple web application that allows users to add captions to a hosted video. Users can enter a video URL, add captions with timestamps, and view the video with synchronized captions.

## 🌐 Hosted Version
Check out the live version here: [Video Caption App](https://video-caption-app-nk4u.vercel.app/)

## ✨ Features
- 🎥 Enter a URL for a hosted video
- 📝 Provide captions and specify timestamps
- ⏯ Play/Pause the video
- ✏️ Edit or delete captions easily
- 📜 View captions synchronized with video playback
- 📱 Responsive and user-friendly UI

## 🛠 Tech Stack
- **Frontend:** React, TypeScript, Vite
- **State Management:** React Context API
- **Styling:** CSS (No Tailwind)

## 📂 Folder Structure
```
/src
  /components
    /VideoPlayer
      VideoPlayer.tsx
      VideoPlayer.css
    /CaptionEditor
      CaptionEditor.tsx
      CaptionEditor.css
    /CaptionTimeline
      CaptionTimeline.tsx
      CaptionTimeline.css
  /types
    index.ts
  /context
    AppContext.tsx
  /utils
    timeFormat.ts
  /hooks
    useVideoTime.ts
  App.tsx
  main.tsx
  index.css
```

## ⚡ Setup Instructions
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 🏗 Local Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/DhirajsGithub/video-caption-app.git
   cd video-caption-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open the app in your browser:
   ```sh
   http://localhost:5173
   ```


## 🔍 Technical Decisions & Trade-offs
- **Vite & TypeScript**: Chosen for fast builds, optimized performance, and type safety.
- **Context API**: Used for global state management to keep track of captions and video metadata.
- **CSS Modules**: Ensures component-level styling without conflicts.
- **No Tailwind**: Styled using pure CSS for a structured approach as per requirements.
- **Component Modularity**: VideoPlayer, CaptionEditor, and CaptionTimeline are separate components for better maintainability.

## 🔮 Future Enhancements
- 🎛 Drag-and-drop caption timeline editor for better UX
- 🌍 Support for multiple caption tracks
- 🤖 Auto-caption generation using AI
- 🌙 Dark mode support

## 🏭 Running in Production
To build and serve the app:
```sh
npm run build
npm run preview
```
