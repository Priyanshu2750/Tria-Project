# Tria Contacts
A modern contact management demo built with React, TypeScript, and Tailwind CSS.

This repository contains a single-page app that demonstrates a clean contact list UI with search and the ability to add contacts.

## Live Demo

The application is deployed and can be accessed at: [https://tria-project-cgzi.vercel.app/](https://tria-project-cgzi.vercel.app/)

## Features

- View a list of contacts with their details
- Search contacts by name
- Add new contacts
- Responsive two-column layout (sidebar + main content)
- Custom styling with Tailwind CSS
- Accessible components using Radix UI primitives

## Tech stack

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

```
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

1. **Contact Cards**: Each contact is displayed in a card with:
   - Colored avatar with initials
   - Name, email, and phone number
   - Responsive layout

2. **Search**: Real-time search functionality filters contacts as you type

3. **Add Contact**: Modal dialog for adding new contacts with:
   - Form validation
   - Required field handling
   - Clean form reset after submission

## Assumptions

1. Data persistence is not required for this demo
2. Contact phone numbers can be in various formats
3. Email validation uses HTML5 built-in validation
4. Contacts are stored in memory during the session

## Libraries Used

- **React**: UI library
- **TypeScript**: Type safety and improved development experience
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Vite**: Build tool and development server