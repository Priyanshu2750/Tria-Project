# Tria Contacts 👥

A modern contact management application built with React, TypeScript, and Tailwind CSS, demonstrating best practices in modern web development with a focus on clean UI/UX and accessibility.

[![Deployment Status](https://img.shields.io/badge/Deployment-Live-success)](https://tria-project-cgzi.vercel.app/)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Quick Start

### Live Demo
Experience the application live at: [https://tria-project-cgzi.vercel.app/](https://tria-project-cgzi.vercel.app/)

### Local Development
```bash
# Clone the repository
git clone https://github.com/Priyanshu2750/Tria-Project.git

# Navigate to the project directory
cd Tria-Project

# Install dependencies
npm install

# Start the development server
npm run dev
```

## ✨ Features

- View a list of contacts with their details
- Search contacts by name
- Add new contacts
- Responsive two-column layout (sidebar + main content)
- Custom styling with Tailwind CSS
- Accessible components using Radix UI primitives

## 🛠️ Tech Stack

### Core Technologies
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Deployment**: Vercel

### Key Dependencies
```json
{
   "react": "^18.2.0",
   "typescript": "^4.9.5",
   "tailwindcss": "^3.3.0",
   "@radix-ui/react-dialog": "^1.0.4",
   "@radix-ui/react-scroll-area": "^1.0.4",
   "@radix-ui/react-label": "^2.0.2"
}
```

## 🏗️ Architecture

- React 18 + TypeScript
- Vite for dev + build
- Tailwind CSS for styling
- Radix UI primitives (Dialog, ScrollArea, Label)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173

### Building for Production

To create a production build:

```bash
npm run build
```

## Design Decisions


## Project Structure

```plaintext
src/
  ├── components/          # React components
  │   ├── ui/             # Reusable UI components
  │   ├── ContactCard.tsx # Contact display component
  │   ├── EmptyState.tsx  # Empty state component
  │   └── AddContactDialog.tsx # New contact dialog
  ├── types/              # TypeScript type definitions
  └── App.tsx            # Main application component
```
   # This line is removed to eliminate the closing markdown fence
## Notable Features

### Component Overview

1. **Contact Cards**: Each contact is displayed in a card with:
   - Colored avatar with initials
   - Name, email, and phone number
   - Responsive layout

2. **Search**: Real-time search functionality filters contacts as you type

3. **Add Contact**: Modal dialog for adding new contacts with:
   - Form validation
   - Required field handling
   - Clean form reset after submission

### Recent features (what's new)

These features were added to improve usability and make the demo feel closer to a production contact manager.

- Local persistence (localStorage)
   - Contacts you add are persisted in your browser using localStorage under the key `tria_contacts_v1`.
   - This means contacts survive page reloads and browser restarts on the same machine and browser profile.
   - Implementation notes: data is serialized to JSON. If the stored data cannot be parsed it falls back to sample contacts.

- Dark mode / Theme toggle
   - A small theme toggle is available in the header area. It toggles a `dark` class on the `html` element.
   - The preference is persisted to localStorage under the key `tria_theme` and applied before React mounts to avoid UI flash.

- Sorting & advanced search
   - Search now matches name, email, or phone.
   - Sort options: Name A→Z, Name Z→A, Recently added (desc) and Oldest first.
   - Search, tag filters and sorting work together.

- Groups / Tags & Bulk Actions
   - Contacts can have comma-separated tags (e.g. `family, work`).
   - Tags appear as chips on contact cards and are aggregated in the sidebar as filter buttons.
   - Select contacts using the checkbox on each card; bulk actions include Delete Selected, Export Selected (JSON), Select All Visible and Clear Selection.

- Avatar upload + fallback avatar
   - When adding a contact you can upload an avatar image (client-side only). Uploaded images are stored as base64 data URLs in localStorage (demo-only).
   - If no avatar is provided the app uses an initials-based avatar generator (DiceBear) as a fallback.
   - Notes: storing base64 images in localStorage is convenient for demos but not recommended for production because of size limits and performance — consider uploading to a CDN or server and storing URLs.

## Assumptions

## 📝 Implementation Details

1. Data persistence is not required for this demo
2. Contact phone numbers can be in various formats
3. Email validation uses HTML5 built-in validation
4. Contacts are stored in memory during the session

## 🔧 Configuration

### Environment Requirements
- Node.js version: ≥ 16.0.0
- npm version: ≥ 7.0.0

### Available Scripts
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck
```

## 🚀 Deployment

This project is deployed on Vercel. The deployment process is automatically triggered when changes are pushed to the `main` branch.

### Deployment Configuration
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js Version: 16.x

## 📈 Future Improvements

1. **Data Persistence**
   - Implement backend API integration
   - Add local storage support

2. **Enhanced Features**
   - Contact groups/categories
   - Contact import/export
   - Dark mode support

3. **Performance Optimization**
   - Implement virtualization for large contact lists
   - Add image optimization for avatars
   - Implement service worker for offline support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

Created by Priyanshu ([GitHub](https://github.com/Priyanshu2750))

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Priyanshu2750/Tria-Project/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the blazing fast build tool
*** End Patch

## Libraries Used

- **React**: UI library
- **TypeScript**: Type safety and improved development experience
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Vite**: Build tool and development server