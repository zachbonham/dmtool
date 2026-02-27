## Context

The GM Campaign Preference Tool currently has placeholder pages for survey creation and completion, but lacks the core functionality to create, share, and manage surveys. This design addresses the need for GMs to generate shareable survey links that players can use to provide campaign preferences. The system must handle survey lifecycle management, secure link generation, and response collection while maintaining the existing Nuxt.js/Supabase architecture.

## Goals / Non-Goals

**Goals:**
- Enable GMs to create archetype-based surveys through a user-friendly interface
- Generate unique, shareable URLs for survey distribution
- Allow anonymous survey completion via shared links
- Store and organize responses by survey and GM
- Provide GMs with survey management and results viewing capabilities

**Non-Goals:**
- User authentication or account management
- Advanced survey customization beyond archetype questions
- Survey analytics or detailed reporting beyond basic results
- Integration with external survey platforms
- Survey scheduling or automated distribution

## Decisions

**Database Schema: Relational Structure with UUIDs**
- Use Supabase PostgreSQL with tables: surveys, survey_responses, survey_questions
- Generate UUIDs for survey IDs to create unguessable URLs
- Alternative: Simple incrementing IDs - rejected for security (predictable URLs)
- Enables secure, anonymous survey access while maintaining data relationships

**URL Structure: /survey/[uuid]**
- Clean, RESTful URLs that hide implementation details
- UUID-based routing prevents enumeration attacks
- Alternative: Query parameter approach (/take-survey?id=uuid) - rejected for SEO and shareability
- Server-side route handling in Nuxt for dynamic survey pages

**Survey Creation: Guided Wizard Interface**
- Step-by-step survey creation with archetype-based question templates
- Client-side form validation with real-time feedback
- Alternative: Single-page form - rejected for complex survey structure
- Progressive enhancement with local storage for draft saving

**Response Storage: Denormalized for Performance**
- Store complete survey responses as JSON in survey_responses table
- Include survey metadata for efficient querying
- Alternative: Fully normalized question/response tables - rejected for query complexity
- Balances read performance with data integrity

**Link Generation: Server-Side UUID Creation**
- Generate UUIDs server-side to prevent client manipulation
- Return shareable URLs immediately after survey creation
- Alternative: Client-side generation - rejected for security concerns
- Ensures URL uniqueness and prevents conflicts

## Risks / Trade-offs

**URL Security vs Shareability** → UUID-based URLs prevent guessing but require careful link management
**Anonymous Responses vs Data Quality** → No authentication simplifies sharing but limits response validation
**JSON Storage vs Query Performance** → Denormalized responses simplify storage but complicate analytics
**Client-Side Complexity vs Server Load** → Rich wizard interface reduces server requests but increases bundle size

## Migration Plan

1. Create database tables and indexes
2. Implement survey creation API endpoints
3. Build survey management UI components
4. Add dynamic routing for survey access
5. Update existing placeholder pages
6. Test end-to-end survey creation and completion flow

**Rollback**: Remove new database tables and revert routing changes (no data loss since feature is additive)