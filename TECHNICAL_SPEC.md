# PetBeacon Technical Specification

This document describes what PetBeacon needs to do and the constraints it must operate within. Implementation details are left to the developer.

---

## Overview

PetBeacon is a mobile app that helps reunite lost pets with their owners through community coordination.

### Core User Types

1. **Pet Owner**: Registers pets, reports them lost, receives sighting updates
2. **Community Member**: Receives nearby alerts, reports sightings of lost pets
3. **Helper**: Volunteer with a microchip scanner who can verify found pets

---

## Tech Stack (Required)

| Component | Technology | Reason |
|-----------|------------|--------|
| Mobile App | React Native + Expo | Cross-platform, developer has no Mac for native iOS |
| Backend | Supabase | Managed PostgreSQL, auth, storage, realtime, edge functions |
| Push Notifications | Expo Notifications | Works with Expo managed workflow |
| Maps | React Native Maps | Display helpers and sightings |

---

## Functional Requirements

### Authentication

- Users sign in via email magic link (passwordless)
- No passwords stored
- Session persists until explicit sign-out

### Pet Registration

- User can register a pet with: photo, microchip number (required), name, species (dog/cat/other), breed, colour, description
- Microchip number must be unique across the system
- Photos stored in cloud storage with non-guessable URLs

### Lost Pet Alerts

- Owner can report a registered pet as lost
- System captures owner's current location at time of report
- Push notification sent to all users within approximately 5 miles (8km)
- Alert includes pet photo, name, species, and approximate location
- Owner can add description of where/when last seen

### Sighting Reports

- Any authenticated user can report a sighting of an active lost pet alert
- Sighting captures: current location, timestamp, optional description, optional photo
- Owner sees all sightings as a chronological timeline
- Sightings should appear on a map

### Helper Network

- Users can mark themselves as having a microchip scanner
- Users with scanners can toggle "available to help"
- Available helpers appear on a map for other users to locate
- Helpers shown as approximate location only (within ~1km), not exact address

### Alert Resolution

- Owner can mark alert as "Found" (reunited) or "Cancel" (other reason)
- Resolved alerts no longer appear in feeds or send notifications
- Historical data retained for the owner

---

## Privacy Requirements (Critical)

### Location Privacy

The app must never store precise user locations in the database. Instead:

- Store locations as approximate grid cells (roughly 1km squares)
- Achieved by truncating coordinates to 2 decimal places
- Example: 52.4862, -1.8904 becomes grid cell "52.48_-1.89"
- When displaying other users (helpers, sighting locations), show grid cell centre, not actual position
- Precise coordinates may be used transiently (in memory, for distance calculations) but never persisted

### Data Minimisation

- No permanent user profiles beyond what's needed for the app
- Alert data can be ephemeral (deleted after resolution + grace period) - not required for MVP but design with this in mind
- Pet photos use randomised filenames, not indexed by search engines

---

## Database Requirements

### Tables Needed

**profiles**: Extends auth users - display name, grid cell, helper status, scanner ownership, availability

**pets**: Owner reference, microchip number, name, species, breed, colour, description, photo URL, lost status

**alerts**: Pet reference, owner reference, status (active/found/cancelled), last seen grid cell, description, timestamps

**sightings**: Alert reference, reporter reference, grid cell, description, photo URL, timestamp

**push_tokens**: User reference, expo push token, platform, grid cell (for radius queries)

### Security

- Row Level Security (RLS) on all tables
- Users can only modify their own data
- Active alerts and lost pets are publicly readable
- Sightings readable by authenticated users

---

## Screen Requirements

### Auth Screens
- Login: Email input, send magic link button
- Verify: "Check your email" confirmation

### Main Tabs (4 tabs)
- **Home**: Feed of nearby active lost pet alerts
- **Map**: Visual display of helpers and active alerts
- **My Pets**: List of user's registered pets with status
- **Profile**: Settings, helper toggles, sign out

### Pet Screens
- Register new pet (form with photo upload)
- Pet details (view, with "Report Lost" action if not already lost)
- Report lost (confirm location, add description, submit)

### Alert Screens
- Alert details (pet info, sighting timeline, map of sightings)
- Report sighting (description, optional photo, submit)

---

## Notification Requirements

When a pet is reported lost:
1. System identifies all users within radius based on grid cells
2. Push notification sent via Expo Push API
3. Notification includes pet name and approximate distance
4. Tapping notification opens the alert details

Implementation note: This likely requires a Supabase Edge Function that queries push tokens by grid cell and calls Expo's push API.

---

## UI/UX Guidelines

- Clean, minimal interface
- Obvious primary actions
- Loading states for all async operations
- Helpful empty states ("No lost pets nearby" is good news)
- Error messages in plain English
- Generous touch targets (48px minimum)

### Colour Suggestions
- Primary action colour (buttons, links)
- Success/positive (found, helpers available, pet home)
- Alert/urgent (lost, needs attention)
- Neutral backgrounds and text

---

## What to Defer (Not MVP)

Do not implement these features yet:

- Payment processing (Stripe)
- AI image moderation
- In-app messaging between users
- Helper ratings or reputation
- Expanding radius over time
- Background location tracking
- Multi-pet discounts
- Social sharing

Focus purely on: Register → Report Lost → Alert Nearby → Sightings → Found

---

## Development Notes

### No Mac Available
Developer only has Windows (ARM). iOS testing via:
- Expo Go app on physical iPhone
- EAS Build for eventual App Store submission (cloud-based, no Mac needed)

### Supabase Setup
Before running the app:
1. Create Supabase project
2. Set up database tables (migration or SQL editor)
3. Create storage bucket for pet photos (public, for URL access)
4. Configure auth for magic links

### Environment Variables
App needs:
- Supabase URL
- Supabase anon key

---

## Success Criteria

MVP is complete when:

1. User can sign up/in via email magic link
2. User can register a pet with photo and microchip number
3. User can report their pet as lost
4. Nearby users receive push notification
5. Users can report sightings of lost pets
6. Owner sees sightings on timeline and map
7. Owner can mark pet as found
8. Users can register as helpers with scanners
9. Available helpers appear on map

Keep it simple. Make it work. Ship it.
