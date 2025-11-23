# Contributing to RegainFlow

Welcome to the RegainFlow project! We're excited to have you contribute. This document provides a comprehensive guide to our project's architecture, design system, and contribution workflow to help us scale effectively.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Design System](#design-system)
- [Contribution Workflow](#contribution-workflow)

---

## Overview

RegainFlow is an enterprise engineering RAG (Retrieval-Augmented Generation) solution designed to streamline workflows and enhance productivity. We aim to build a robust, scalable, and visually stunning application.

---

## Architecture

We follow the **Bulletproof React** architecture to ensure scalability, maintainability, and a clean codebase.

### Directory Structure

Most of the code lives in the `src` folder and is organized as follows:

```sh
src
|
+-- app               # Application layer (routes, app.tsx, providers)
+-- assets            # Static assets (images, fonts, etc.)
+-- components        # Shared components used across the entire application
+-- config            # Global configurations and environment variables
+-- features          # Feature-based modules (The core of our architecture)
+-- hooks             # Shared hooks
+-- lib               # Reusable libraries preconfigured for the application
+-- stores            # Global state stores
+-- types             # Shared TypeScript types
+-- utils             # Shared utility functions
```

### Feature-Based Architecture

For easy scalability, we organize most code within the `features` folder. Each feature should be self-contained:

```sh
src/features/awesome-feature
|
+-- api         # API request declarations and hooks specific to the feature
+-- assets      # Assets specific to the feature
+-- components  # Components scoped to the feature
+-- hooks       # Hooks scoped to the feature
+-- stores      # State stores for the feature
+-- types       # Types used within the feature
+-- utils       # Utility functions for the feature
```

**Key Principles:**
- **Unidirectional Flow**: Shared -> Features -> App.
    - `features` can import from `shared` (components, hooks, utils, etc.).
    - `app` can import from `features` and `shared`.
    - `features` should NOT import from other `features` directly (compose them at the app level).
- **Colocation**: Keep things as close as possible to where they are used.

---

## Design System

RegainFlow uses a **Glass Morphism + Neon Aesthetic** design system.

### Core Principles
- **Dark Backgrounds**: Deep, rich dark backgrounds (`#121213`).
- **Glass Morphism**: Frosted glass overlays for cards and containers.
- **Neon Accents**: Subtle cyan (`#00d6cb`) neon accents for highlights and CTAs.
- **Clean Typography**: `Exo 2` for primary text, `Montserrat` for logos, `JetBrains Mono` for code.

### Color Palette

| Name | Value | Description |
| :--- | :--- | :--- |
| `primary` | `#00d6cb` | Main brand cyan |
| `primary-light` | `#00ffff` | Bright highlights |
| `secondary` | `#121213` | Dark background base |
| `text-primary` | `#ffffff` | Main white text |
| `text-secondary` | `#a6a6a6` | Muted gray text |

### CSS Variables & Utilities

All design tokens are defined in `app/styles/variables.css`. Use CSS variables instead of hardcoded values.

**Common Utilities:**
- `.glass-card`: Standard glass background with blur.
- `.neon-button-glass`: Primary CTA with neon glow.
- `.text-highlight`: Cyan text highlight.
- `.gradient-text`: Gradient text effect.

**Spacing Scale:**
Use the defined spacing scale (e.g., `--space-4` for 1rem, `--space-8` for 2rem).

**Z-Index:**
Follow the z-index scale defined in `variables.css` (e.g., `--z-dropdown`, `--z-modal`).

### Icons
We use **Phosphor Icons Duotone** (`react-icons/pi`).
- Feature grids: 48px
- Section headers: 32px
- Card icons: 20-24px

---

## Contribution Workflow

1.  **Fork & Clone**: Fork the repository and clone it locally.
2.  **Branch**: Create a new branch for your feature or fix (`git checkout -b feature/amazing-feature`).
3.  **Code**: Implement your changes following the architecture and design guidelines.
4.  **Commit**: Write clear, descriptive commit messages.
5.  **Pull Request**: Push your branch and open a Pull Request against the `main` branch. Describe your changes and link any relevant issues.

### Best Practices

- **Do** use CSS variables from `variables.css`.
- **Do** follow the feature-based directory structure.
- **Don't** hardcode colors or magic numbers.
- **Don't** mix icon libraries.

Thank you for contributing to RegainFlow!
