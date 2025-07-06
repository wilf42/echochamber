# Solo RPG Companion Application - User Stories (Campaign Focus)

**Version:** 2.0
**Date:** July 5, 2025

## 1. Campaign Creation & Management

*   **User Story:** As a player, I would like to create a new campaign with a name and description, so that I can define the scope and tone of the adventure.
    *   **Acceptance Criteria:**
        *   The application provides fields for entering a campaign name and description.
        *   The campaign data is saved persistently.
        *   A new campaign object is created.

*   **User Story:** As a player, I would like to define a starting scene for my campaign, so that I can immediately begin the adventure.
    *   **Acceptance Criteria:**
        *   The application allows specifying a scene title and description for the initial scene.
        *   The scene data is saved persistently.
        *   A new scene object is created and associated with the campaign.

*   **User Story:** As a player, I would like to add details to my campaign (e.g., setting, themes, overall goals), so I have a better understanding of the story I’m building.
    *   **Acceptance Criteria:**
       *   The application provides a flexible field for adding campaign notes and details.

## 2. Campaign Maintenance & Evolution

*   **User Story:** As a player, I would like to add new scenes to my campaign as the story progresses, so I can track the adventure’s unfolding.
    *   **Acceptance Criteria:**
        *   The application allows adding scene titles and descriptions.
        *   The new scene data is automatically linked to the existing campaign.

*   **User Story:** As a player, I would like to edit existing scenes – changing the description, adding notes, or adjusting details – so that I can refine the story as it evolves.
    *   **Acceptance Criteria:**
        *   The application allows editing scene titles and descriptions.
        *   The updated scene data is saved and linked to the campaign.

*   **User Story:** As a player, I would like to mark a scene as “completed” or “resolved”, so I can track which parts of the story have been dealt with.
    *   **Acceptance Criteria:**
        *   The application provides a mechanism to mark scenes as completed.
        *   The completed status is persistently stored.

*   **User Story:** As a player, I would like to view a chronological list of all scenes in my campaign, so I can easily navigate the adventure's timeline.
    *   **Acceptance Criteria:**
        *   The application presents a list of scenes in the campaign, sorted by creation date or play order (configurable).

## 3. Character Creation & Management

*   **User Story:** As a player, I would like to create a new character, so that I can start playing the game.
    *   **Acceptance Criteria:**
        *   The application provides fields for entering a character name, description, and optional stats/skills.
        *   Data is saved persistently (e.g., to a JSON file).
        *   A new character object is created with the entered data.
*   **User Story:** As a player, I would like to import my character sheet from a PDF, so that I don’t have to manually enter all the information.
    *   **Acceptance Criteria:**
        *   The application allows uploading a PDF file (supported formats – PDF).
        *   The PDF is rendered within the application’s UI.
        *   Text fields are automatically created on the UI corresponding to the text content of the PDF.
*   **User Story:** As a player, I would like to annotate the PDF character sheet within the application, so that I can highlight important details or make notes.
    *   **Acceptance Criteria:**
        *   The application provides a drawing tool (pen/pencil).
        *   The user can select text within the PDF and change its color.
        *   Annotations are visually tied to the corresponding text in the PDF.
*   **User Story:** As a player, I would like to edit my character’s stats and abilities, so that I can keep them up-to-date as the game progresses.
    *   **Acceptance Criteria:**
        *   The application provides editable fields for character stats and abilities.
        *   Changes made are reflected immediately in the UI and saved persistently.

## 4. Scene Management

*   **User Story:** As a player, I would like to create a new scene, so that I can define the setting for the game.
    *   **Acceptance Criteria:** The application provides a form to enter scene title and description.  A new scene object is created.
*   **User Story:** As a player, I would like to add Non-Player Characters (NPCs) to a scene, so that I can interact with them.
    *   **Acceptance Criteria:** The application allows for adding NPC names and descriptions.  NPC objects are created and associated with the scene.
*   **User Story:** As a player, I would like to define the events and triggers within a scene, so that the game can react appropriately.
    *   **Acceptance Criteria:** (This is more complex – for now, support a simple “if/then” scenario, e.g., “If the player says ‘examine the door,’ then the scene description should change.”)
*   **User Story:** As a player, I would like to branch out scenes based on player choices, so that the game is dynamic and responsive.
    *   **Acceptance Criteria:** (Currently, a simple “if/then” scenario is supported.  More complex branching will be developed later.)

## 5. Dice Rolling

*   **User Story:** As a player, I would like to roll dice quickly and easily, so that I can resolve actions in the game.
    *   **Acceptance Criteria:** The application provides buttons for common dice rolls (d4, d6, d20).  Roll results are displayed.
*   **User Story:** As a player, I would like to add modifiers to my dice rolls, so that I can account for character abilities or situational effects.
    *   **Acceptance Criteria:** The application allows for entering modifiers (positive or negative).  The total roll result is calculated and displayed.

## 6. PDF Import & Annotation

*   **User Story:** As a player, I would like to upload a PDF character sheet, so that I don’t have to manually enter all the information.
    *   **Acceptance Criteria:** The application allows uploading a PDF file (supported formats – PDF). The PDF is rendered within the application’s UI.
*   **User Story:** As a player, I would like the application to accurately render the PDF within the UI, so that I can view it clearly.
    *   **Acceptance Criteria:** The PDF is displayed with appropriate scaling and font sizes.
*   **User Story:** As a player, I would like to highlight text within the PDF, so that I can visually emphasize key details.
    *   **Acceptance Criteria:** The user can select text within the PDF and change its color.
*   **User Story:** As a player, I would like to add freeform notes to the PDF within the application, so that I can capture my thoughts and ideas.
     *  **Acceptance Criteria:** The application allows for adding notes to specific sections of the PDF.

## 7. General Application Functionality

*   **User Story:** As a player, I would like to save my game progress, so that I can continue playing later. (Data persistence)
    *   **Acceptance Criteria:** The application saves the current state of the game (character data, scene data) to a persistent storage location.
*   **User Story:** As a player, I would like to load a previously saved game, so that I can pick up where I left off.
    *   **Acceptance Criteria:** The application loads the data from the previously saved game file.
*   **User Story:** As a user, I would like the application to be responsive and easy to use, so that I can focus on playing the game.
     * **Acceptance Criteria:** (Subjective – focus on UI/UX considerations – clear navigation, intuitive controls).