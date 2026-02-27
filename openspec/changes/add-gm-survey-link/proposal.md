## Why

Game Masters need an easy way to create and share surveys with their players to gather campaign preferences before session zero. Currently, the application has placeholder pages for survey creation and taking, but lacks the core functionality to generate shareable links and manage survey distribution. Without this capability, GMs cannot effectively use the tool to align their gaming groups.

## What Changes

- Implement survey creation interface with archetype-based questions
- Add survey management system for GMs to view and manage their surveys
- Generate unique, shareable links for each survey
- Enable survey access and completion via shared links
- Store survey responses and associate them with the originating GM

## Capabilities

### New Capabilities
- `survey-management`: GM interface for creating, viewing, and managing surveys
- `link-generation`: Generate unique, shareable URLs for surveys
- `survey-access`: Allow players to access and complete surveys via shared links
- `response-collection`: Store and organize survey responses by GM and survey

### Modified Capabilities
- `survey-interface`: Extend the existing UI components to support actual survey creation and completion workflows

## Impact

- New database tables for surveys, responses, and GM-player relationships
- Enhanced UI components for survey creation and management
- New API endpoints for survey CRUD operations and link generation
- Updated routing to support dynamic survey access via generated links