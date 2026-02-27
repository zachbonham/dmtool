## ADDED Requirements

### Requirement: Public Survey Access
The system SHALL allow anyone with a valid survey link to access the survey.

#### Scenario: Valid link loads survey
- **WHEN** user visits /survey/[valid-uuid]
- **THEN** survey questions are displayed
- **AND** no authentication is required
- **AND** survey title and description appear

#### Scenario: Invalid link shows error
- **WHEN** user visits /survey/[invalid-uuid]
- **THEN** 404 error page is displayed
- **AND** message indicates survey not found

### Requirement: Survey Completion Flow
The system SHALL guide users through survey completion with validation.

#### Scenario: Survey form validates input
- **WHEN** user attempts to submit incomplete survey
- **THEN** required field errors are shown
- **AND** submission is prevented

#### Scenario: Survey submission succeeds
- **WHEN** user completes all questions and submits
- **THEN** response is saved to database
- **AND** thank you message appears
- **AND** duplicate submissions are prevented

### Requirement: Survey State Management
The system SHALL handle survey completion state appropriately.

#### Scenario: Completed survey shows thank you
- **WHEN** user returns to already completed survey
- **THEN** thank you message is shown
- **AND** no resubmission is allowed

#### Scenario: Survey remains accessible
- **WHEN** survey is active
- **THEN** it accepts new responses indefinitely
- **AND** GM can close survey when needed