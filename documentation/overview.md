# Echochamber - Solo RPG Companion Application - Overview Document

**Version:** 2.0
**Date:** October 26, 2023

## 1. Overview

This document outlines the requirements and technology stack for a solo tabletop RPG companion application. The application's goal is to provide a flexible, user-friendly environment for playing RPGs without requiring a specific system.  It will allow users to create characters, manage scenes, import PDF character sheets, and annotate them directly within the application. The application will be deployable as a Spring Boot WAR file.

## 2. Feature Specification

### 2.1 Core Game Management

*   **Campaign Creation:**
    *   Campaign Name
    *   Campaign Description
    *   Starting Scene
*   **Character Creation:**
    *   Character Name
    *   Character Description (Text Input –  capturing all relevant character information)
    *   PDF Character Sheet Import:
        *   File Upload
        *   PDF Rendering
        *   Interactive PDF Annotation:
            *   Drawing Tool (Pen/Pencil)
            *   Text Input Fields (linked to PDF)
    *   (Stats, Skills, Equipment - manually entered or linked to PDF data)
*   **Scene Management:**
    *   Scene List
    *   Scene Editor:
        *   Scene Description
        *   NPC List:
            *   NPC Name
            *   NPC Description
            *   (Stats - optionally linked to PDF)
        *   Events/Triggers
        *   Branching Options

### 2.4 Dice Rolling

*   Robust dice rolling functionality (d4, d6, d8, d10, d12, d20) with modifiers.

## 3. Future Enhancements (Beyond Version 2.0)

*   OCR (Optical Character Recognition) for automated PDF data extraction.
*   Random Encounter Generation.
*   Collaboration Features (multiple users working on a campaign).
*   Import/Export functionality (JSON format).



---

**Note:** This document serves as a high-level overview. Detailed design and implementation details will be fleshed out during the development process.