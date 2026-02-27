## ADDED Requirements

### Requirement: Survey Creation Interface
The system SHALL provide a user interface for GMs to create new surveys with archetype-based questions.

#### Scenario: Survey creation form loads
- **WHEN** GM navigates to survey creation page
- **THEN** form displays with campaign title field
- **AND** archetype selection options are available
- **AND** survey preview shows question structure

#### Scenario: Survey saves successfully
- **WHEN** GM completes form and submits
- **THEN** survey is stored in database
- **AND** unique shareable link is generated
- **AND** GM is redirected to survey management page

### Requirement: Survey Management Dashboard
The system SHALL display a list of created surveys with their status and actions.

#### Scenario: Dashboard shows survey list
- **WHEN** GM views survey management page
- **THEN** all their surveys are displayed
- **AND** each shows title, creation date, and response count
- **AND** action buttons for view, copy link, and delete

#### Scenario: Survey deletion works
- **WHEN** GM clicks delete on a survey
- **THEN** confirmation dialog appears
- **AND** survey and responses are removed from database
- **AND** shareable link becomes invalid

### Requirement: Survey Results Viewing
The system SHALL allow GMs to view aggregated results from completed surveys.

#### Scenario: Results page displays data
- **WHEN** GM clicks view results on a survey
- **THEN** response count is shown
- **AND** archetype preference distribution is displayed
- **AND** individual responses can be browsed

#### Scenario: Results update in real-time
- **WHEN** new responses are submitted
- **THEN** results page reflects updated counts
- **AND** charts update without page refresh