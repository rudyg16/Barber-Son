# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a full-stack web application for Barber-Son, a pressure washing service business. The project uses a monorepo structure with separate frontend and backend components:

- **frontend/**: React + TypeScript application using Vite, React Router, and Tailwind CSS
- **backend/**: Node.js MongoDB form handler (AWS Lambda function), only in project for zipping to console, not deplying via CI/CD or anything, just to keep the code somewhere
- **netlify/functions/**: Netlify serverless functions for API endpoints
- **netlify.toml**: Netlify deployment configuration with redirects and build settings

## Architecture Overview

The application follows a JAMstack architecture:
- Frontend is a single-page React application with client-side routing
- Backend uses serverless functions (Netlify Functions + AWS Lambda) for API endpoints
- MongoDB is used for data storage (form submissions)
- Deployed on Netlify with custom domain redirects

## Common Commands

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production (TypeScript compilation + Vite build)
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend/src/mongo-form-handler
# No specific build commands - deployed as Lambda function
```

### Netlify Functions
```bash
cd netlify/functions
# Functions are deployed automatically with Netlify
```

## Key Technologies

- **Frontend**: React 19, TypeScript, Vite, React Router, Tailwind CSS, React Hook Form
- **Backend**: Node.js, MongoDB, AWS SDK (Secrets Manager), Netlify Functions
- **Deployment**: Netlify with custom domain (barberpressure.com)

## API Endpoints

- `/api/formsubmissions` - Form submission handling (proxied to Netlify Functions)

## File Structure Notes

- Pages are in `frontend/src/pages/` (Home, About, Contact, Quote, Services)
- Shared components in `frontend/src/components/` (Footer, Form, Navbar)
- TypeScript types in `frontend/src/types/`
- Static assets in `frontend/public/`
- MongoDB form handler is a standalone Lambda function in `backend/src/mongo-form-handler/`