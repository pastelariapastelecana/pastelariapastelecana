# AI Rules for this Application

This document outlines the technical stack and guidelines for developing this application.

## Tech Stack Overview

*   **Frontend Framework:** React.js for building interactive user interfaces.
*   **Language:** TypeScript for type safety and improved code quality across the entire codebase.
*   **Build Tool:** Vite for a fast development experience and optimized builds.
*   **Styling:** Tailwind CSS for utility-first styling, ensuring responsive and consistent designs.
*   **UI Components:** shadcn/ui, built on top of Radix UI, for a collection of accessible and customizable UI components.
*   **Routing:** React Router DOM for declarative client-side routing.
*   **State Management:** Custom React Contexts (e.g., `CartContext`) for managing application-specific global state.
*   **HTTP Client:** Axios for making API requests from both the frontend and backend.
*   **Icons:** Lucide React for a comprehensive set of SVG icons.
*   **Toast Notifications:** Sonner for elegant and non-blocking toast messages.
*   **Backend:** Node.js with Express.js for handling server-side logic, API endpoints, and integrations.
*   **Payment Gateway:** Mercado Pago SDK for processing online payments.
*   **Mapping Services:** Google Maps API (accessed via backend) for location-based services like delivery fee calculation.

## Library Usage Guidelines

To maintain consistency and leverage the strengths of each library, please adhere to the following rules:

*   **React & TypeScript:** Always use React with TypeScript for all new frontend components and logic.
*   **Styling:** All styling must be done using Tailwind CSS classes. Avoid inline styles or separate CSS files unless absolutely necessary for global styles in `src/index.css`.
*   **UI Components (shadcn/ui):**
    *   Prioritize using existing shadcn/ui components for common UI elements (buttons, inputs, dialogs, etc.).
    *   Do NOT modify the `src/components/ui/` files directly. If a shadcn/ui component needs customization beyond its props, create a new component that wraps or extends the shadcn/ui component.
*   **Routing:** Use `react-router-dom` for all navigation. Define routes exclusively in `src/App.tsx`.
*   **API Calls:** Use `axios` for all HTTP requests to the backend or external APIs.
*   **Icons:** Use icons from `lucide-react` for all visual iconography.
*   **Toast Notifications:** For displaying success, error, or informational messages to the user, use `sonner`.
*   **Backend Development:** Use Node.js with Express.js for any server-side functionality.
*   **Payment Integration:** Utilize the Mercado Pago SDK for all payment-related functionalities.
*   **Maps/Location:** Any functionality requiring geographical data or distance calculations should be handled through the backend's Google Maps API service.
*   **Context API:** For global state management that is not complex enough to warrant a dedicated state management library, use React's Context API (e.g., `CartContext`).