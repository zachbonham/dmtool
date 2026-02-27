## MODIFIED Requirements

### Requirement: Form Components
The system SHALL include survey-specific form components for archetype-based questions and response collection.

#### Scenario: Survey question components render
- **WHEN** survey contains archetype questions
- **THEN** appropriate input types are displayed (radio buttons, sliders)
- **AND** questions are clearly labeled with archetype context

#### Scenario: Survey form validation works
- **WHEN** user interacts with survey form
- **THEN** real-time validation provides feedback
- **AND** required questions prevent submission until answered

#### Scenario: Survey submission handles data
- **WHEN** survey form is submitted
- **THEN** all responses are collected in structured format
- **AND** data is ready for archetype scoring and storage