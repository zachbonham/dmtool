## ADDED Requirements

### Requirement: Unique URL Generation
The system SHALL generate unique, unguessable URLs for each survey.

#### Scenario: URL created on survey save
- **WHEN** survey is successfully created
- **THEN** a base64url-encoded GUID token is generated
- **AND** URL follows format /survey/[token]
- **AND** URL is stored with survey record

#### Scenario: URLs are unique
- **WHEN** multiple surveys are created
- **THEN** each receives a different base64url-encoded GUID token
- **AND** no URL collisions occur

### Requirement: Link Sharing Interface
The system SHALL provide easy methods for GMs to copy and share survey links.

#### Scenario: Copy link button works
- **WHEN** GM clicks copy link button
- **THEN** full URL is copied to clipboard
- **AND** success notification appears
- **AND** link includes full domain

#### Scenario: Link preview shows correctly
- **WHEN** GM views survey details
- **THEN** shareable link is displayed
- **AND** link is clickable for testing
- **AND** QR code option is available

### Requirement: Link Persistence
The system SHALL maintain link validity until survey is explicitly deleted.

#### Scenario: Links remain active
- **WHEN** survey exists in database
- **THEN** its shareable link continues to work
- **AND** players can access survey anytime

#### Scenario: Deleted survey links fail
- **WHEN** survey is deleted
- **THEN** its link returns 404 error
- **AND** no survey data is accessible