## ADDED Requirements

### Requirement: Archetype Definition
The system SHALL define four campaign archetypes for scoring: Combat-Focused, Story-Driven, Sandbox, and Tactical.

#### Scenario: Archetypes are defined
- **WHEN** scoring logic is initialized
- **THEN** all four archetypes are available
- **AND** each has a clear description and characteristics

### Requirement: Scoring Algorithm
The system SHALL provide a scoring function that evaluates survey responses against archetypes.

#### Scenario: Survey responses are scored
- **WHEN** survey data is provided
- **THEN** each archetype receives a score from 0-100
- **AND** scores reflect preference alignment

#### Scenario: Highest score determines primary archetype
- **WHEN** all archetypes are scored
- **THEN** the archetype with highest score is identified
- **AND** secondary archetypes are ranked

### Requirement: Score Persistence
The system SHALL store scoring results for later retrieval.

#### Scenario: Scores are saved
- **WHEN** scoring completes
- **THEN** results are stored in database
- **AND** associated with the survey response

#### Scenario: Scores are retrievable
- **WHEN** results are needed
- **THEN** stored scores can be fetched
- **AND** maintain accuracy