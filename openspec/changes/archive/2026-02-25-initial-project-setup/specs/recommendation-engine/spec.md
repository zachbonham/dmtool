## ADDED Requirements

### Requirement: Recommendation Generation
The system SHALL generate campaign recommendations based on archetype scores.

#### Scenario: Primary recommendation is created
- **WHEN** archetype scores are available
- **THEN** a primary campaign theme is recommended
- **AND** includes tone and style guidance

#### Scenario: Multiple archetypes are considered
- **WHEN** scores show mixed preferences
- **THEN** recommendations balance competing archetypes
- **AND** suggest compromises or phases

### Requirement: Actionable Advice
The system SHALL provide specific, actionable advice for GMs.

#### Scenario: Advice is practical
- **WHEN** recommendation is generated
- **THEN** it includes concrete session zero activities
- **AND** preparation suggestions

#### Scenario: Advice is customizable
- **WHEN** GM has specific constraints
- **THEN** recommendations can be adjusted
- **AND** alternatives are provided

### Requirement: Recommendation Storage
The system SHALL persist recommendations for future reference.

#### Scenario: Recommendations are saved
- **WHEN** generated
- **THEN** stored with survey data
- **AND** linked to participant responses

#### Scenario: Historical recommendations accessible
- **WHEN** GM reviews past surveys
- **THEN** previous recommendations are available
- **AND** can inform future campaigns