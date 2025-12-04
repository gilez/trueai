# BK21 Ewha TRUEAI Website

This is the website for the BK21 Ewha TRUEAI Education Research Group, built with React and Tailwind CSS.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  **Build for production:**
    ```bash
    npm run build
    ```

## Content Management

The website content is managed via a JSON file to allow for easy updates without modifying the code.

**Content File:** `src/data/content.json`

### How to Update Content

1.  Open `src/data/content.json`.
2.  **General Info**: Update `general.title` or `general.footerText`.
3.  **Menu**: Modify the `menu` array to change navigation labels or structure.
4.  **Pages**: Update the `pages` object.
    - `greeting`, `vision`, `personnel`, etc., contain HTML content. You can write standard HTML tags (like `<p>`, `<ul>`, `<h2>`) inside the content strings.
    - `professors` contains a list of professor objects.
5.  **News**: Add or edit items in the `news` array.
    - `category`: 'notice', 'seminar', or 'achievement'.
    - `date`: YYYY-MM-DD format.
    - `summary`: Short description shown on the homepage and list.
6.  **Labs**: Update the `labs` array for the homepage cards.

## Project Structure

-   `src/components`: Reusable UI components (Layout, Navbar, Footer).
-   `src/pages`: Page components (Home, SubPage, NewsPage).
-   `src/data`: Content data files.
-   `src/App.jsx`: Main application component and routing configuration.
