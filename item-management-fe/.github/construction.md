# **Project Blueprint: E-commerce UI Construction Guide**

**Project Goal:** Construct a modern, animated, and feature-rich user interface for a high-end e-commerce application.

**Technology Stack:**
*   **Framework:** ReactJS (using JSX)
*   **Styling:** Tailwind CSS
*   **State Management:** Redux Toolkit
*   **Form Handling:** React Hook Form
*   **Animations:** Framer Motion
*   **HTTP Client:** Axios
*   **Routing:** React Router DOM

---

### **I. Core Architectural Principles**

Before generating any code, adhere to these guiding principles:

1.  **Component-Based Architecture:** Decompose all UI elements into small, reusable components located in `src/components`. Examples: `Button`, `Input`, `Card`, `Modal`.
2.  **Mobile-First Responsive Design:** All styling must be mobile-first. Style for the smallest viewport by default, then use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) to adapt for larger screens.
3.  **Centralized State Management Strategy:**
    *   **Redux Toolkit:** Use for global state that is shared across many components or needs to persist. This includes: user authentication status, user profile, shopping cart, and global notifications.
    *   **Component State (`useState`, `useReducer`):** Use for state that is local to a single component or its direct children. This includes: form input values, modal visibility, and UI toggles.
4.  **Seamless User Experience with Animations:**
    *   Utilize **Framer Motion** to enhance user interactions.
    *   Apply animations to: page transitions, modal pop-ups, button click feedback, item appearance in lists, and hover effects.

---

### **II. Project Structure Scaffolding**

Please create the following folder and file structure inside the `src` directory.

```
/src
|-- /api                // Centralized Axios instance and API call functions
|   |-- axiosClient.js
|   |-- authApi.js
|   |-- productApi.js
|   |-- orderApi.js
|-- /app                // Redux store configuration
|   |-- store.js
|-- /assets             // Static assets like images, logos, fonts
|-- /components         // Shared, reusable UI components
|   |-- /ui             // Basic elements: Button.jsx, Input.jsx, Spinner.jsx, Modal.jsx
|   |-- /layout         // Layout components: Header.jsx, Footer.jsx, AdminSidebar.jsx
|   |-- ProductCard.jsx
|-- /features           // Redux Toolkit slices (state logic)
|   |-- authSlice.js
|   |-- productSlice.js
|   |-- cartSlice.js
|   |-- orderSlice.js
|-- /hooks              // Custom React hooks
|   |-- useAuth.js
|-- /pages              // Page-level components
|   |-- /admin          // Admin-only pages
|   |   |-- AdminDashboard.jsx
|   |   |-- ProductManagement.jsx
|   |   |-- OrderManagement.jsx
|   |-- HomePage.jsx
|   |-- ProductDetailPage.jsx
|   |-- CartPage.jsx
|   |-- LoginPage.jsx
|   |-- RegisterPage.jsx
|   |-- ProfilePage.jsx
|-- /routes             // Routing configuration
|   |-- AppRoutes.jsx
|   |-- ProtectedRoute.jsx
|   |-- AdminRoute.jsx
|-- /utils              // Utility functions (e.g., formatCurrency)
|-- App.jsx
|-- main.jsx
```

---

### **III. Step-by-Step Implementation Plan**

Execute the following steps sequentially.

#### **Step 1: Foundational Logic & Routing Setup**

1.  **API Layer (`/api`):**
    *   In `axiosClient.js`, create and configure a global Axios instance. Implement a request interceptor to automatically attach the JWT Bearer token from the Redux state to the `Authorization` header of all outgoing requests.
    *   Create separate files (`authApi.js`, `productApi.js`, etc.) to house functions that perform specific API calls using the configured Axios client.

2.  **Redux Store (`/features` & `/app`):**
    *   **`authSlice.js`:** Manage `user`, `token`, `isAuthenticated`, `role`, and loading/error states. Create async thunks for `login`, `register`, and `fetchUserProfile`.
    *   **`productSlice.js`:** Manage product lists, single product details, and loading/error states. Create async thunks for `fetchAllProducts` and `fetchProductById`. For admin purposes, add thunks for `createProduct`, `updateProduct`, and `deleteProduct`.
    *   **`cartSlice.js`:** Manage cart items and status.
    *   **`orderSlice.js`:** Manage user's orders and, for admins, all orders.
    *   **`store.js`:** Configure the Redux store by combining all the slice reducers.

3.  **Routing (`/routes` & `App.jsx`):**
    *   **`ProtectedRoute.jsx`:** Create a component that checks if a user is authenticated (via `authSlice`). If not, redirect to `/login`.
    *   **`AdminRoute.jsx`:** Create a component that checks if the authenticated user has the `ADMIN` role. If not, redirect to the home page or an "unauthorized" page.
    *   **`AppRoutes.jsx`:** Define all application routes using `react-router-dom`. Wrap user-specific routes with `ProtectedRoute` and admin-specific routes with `AdminRoute`.
    *   **`App.jsx`:** Set up the main application component to render the `Header`, `Footer`, and the `AppRoutes`.

#### **Step 2: Core UI & Shared Components (`/components`)**

1.  **Layout:**
    *   **`Header.jsx`:** Implement the main navigation. It should conditionally display links for Login/Register or a user profile dropdown (with a link to Profile and a Logout button) based on authentication state. Include a link to the cart with an item count badge.
    *   **`Footer.jsx`:** Implement the site footer.

2.  **UI Elements (`/components/ui`):**
    *   Create a set of generic, reusable UI components.
    *   **`Button.jsx`:** Should accept variants (primary, secondary, danger) and handle loading states. Integrate a subtle `whileTap` scale animation from **Framer Motion**.
    *   **`Input.jsx`:** A styled input component that integrates with **React Hook Form**.
    *   **`Modal.jsx`:** A reusable modal component. Use **Framer Motion** to animate its entry and exit (e.g., fade in, scale up).
    *   **`Spinner.jsx`:** A loading spinner animation.

#### **Step 3: Public & User-Facing Pages (`/pages`)**

1.  **`HomePage.jsx`:**
    *   Dispatch the `fetchAllProducts` thunk on component mount.
    *   Display a loading state (using the `Spinner` component) or an error message based on the status from `productSlice`.
    *   Render the fetched products in a responsive grid using the `ProductCard.jsx` component.

2.  **`LoginPage.jsx` & `RegisterPage.jsx`:**
    *   Build the forms using **React Hook Form** for efficient state management and validation.
    *   Use the reusable `Input` and `Button` components.
    *   On form submission, dispatch the appropriate async thunk from `authSlice` and handle loading/error feedback.

3.  **`ProductDetailPage.jsx`:**
    *   Fetch the specific product details using its ID from the URL parameters.
    *   Display product images, name, description, and price.
    *   Include a form to select quantity and an "Add to Cart" button that dispatches an action to `cartSlice`.

4.  **`ProfilePage.jsx`:**
    *   Fetch and display the current user's information from `authSlice`.
    *   Include a section to display the user's order history by fetching data via `orderSlice`.

#### **Step 4: Admin-Facing Pages (`/pages/admin`)**

1.  **`ProductManagement.jsx`:**
    *   Display all products in a table with columns for image, name, price, and actions.
    *   Implement a "Create Product" button that opens the `Modal` component containing a form.
    *   The form for creating/editing products must use **React Hook Form**.
    *   Provide "Edit" and "Delete" buttons for each product, which trigger corresponding actions.

2.  **`OrderManagement.jsx`:**
    *   Display all orders from all users in a table.
    *   Include functionality to view the details of each order and to update the order status (e.g., Pending, Shipped, Delivered) via a dropdown or buttons.

This structured plan will guide the creation of a robust and professional e-commerce application UI. Please proceed with the implementation step-by-step.