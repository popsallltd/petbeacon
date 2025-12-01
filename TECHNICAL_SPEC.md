# PetBeacon Technical Specification

This document describes what PetBeacon needs to do and the constraints it must operate within. Implementation details are left to the developer.

---

## Overview

PetBeacon is a mobile app that helps reunite lost pets with their owners through a distributed helper network and community coordination.

### Core User Types

1. **Pet Owner**: Registers pets (£10, 100% to charity), reports them lost, receives instant notifications when pet is scanned
2. **Community Helper**: Free volunteer with a microchip scanner who can verify found pets
3. **Service Provider (Basic)**: £20/month - Business listing visible within 5 miles, optional helper status
4. **Service Provider (Featured)**: £40/month - Enhanced listing visible within 10 miles, top placement
5. **Vet Clinic**: Free listing with exact location, "Safe Haven" status

---

## Tech Stack (Required)

| Component | Technology | Reason |
|-----------|------------|--------|
| Mobile App | React Native + Expo | Cross-platform, developer has no Mac for native iOS |
| Backend | Supabase | Managed PostgreSQL, auth, storage, realtime, edge functions |
| Push Notifications | Firebase Cloud Messaging | Reliable delivery, works with Expo |
| Maps | React Native Maps | Display helpers, alerts, and sightings |
| Payments | Stripe | Service provider subscriptions and pet registration fees |

---

## Functional Requirements

### Authentication

- Users sign in via email magic link (passwordless)
- No passwords stored
- Session persists until explicit sign-out

### Pet Registration

- User can register a pet with: photo, microchip number (required), name, species (dog/cat/other), breed, colour, description
- Registration costs £10 one-time
- User selects a local rescue centre to receive 100% of their fee
- Microchip number must be unique across the system
- Photos stored in cloud storage with non-guessable URLs

#### Microchip Validation

- Must be 15-digit ISO format
- Check digit algorithm verification
- Reject sequential/obviously fake numbers (e.g., 123456789012345)

### Lost Pet Alerts

- Owner can report a registered pet as lost
- System captures owner's current location at time of report
- Push notification sent to all users within approximately 5 miles (8km)
- Alert includes pet photo, name, species, and approximate location
- Owner can add description of where/when last seen

### Found Pet Alerts (Fallback)

- If no chip readable or no helper available, finder can post Found Pet Alert
- Captures: photo, description, location, timestamp
- Broadcasts to all pet owners in radius
- Enables photo matching for non-chipped pets

### Sighting Reports

- Any authenticated user can report a sighting of an active lost pet alert
- Sighting captures: current location, timestamp, optional description, optional photo
- Owner sees all sightings as a chronological timeline
- Sightings should appear on a map

### Helper Network

- Users can mark themselves as having a microchip scanner
- Scanner types: Basic (ISO only, ~90% coverage) or Universal (all frequencies)
- Users with scanners can toggle "available to help"
- Available helpers appear on a map for other users to locate
- Helpers shown as approximate location only (within ~1km), not exact address

#### Helper Scan Flow

1. Helper scans found pet
2. Chip number entered in app (mandatory in-app process)
3. Owner receives instant push notification with helper location
4. In-app secure messaging connects helper and owner
5. After reunion, owner receives "Was your pet safely returned?" confirmation

### Service Provider Listings

#### Basic Tier (£20/month or £200/year)
- Business profile with photos
- Customer reviews and ratings
- Direct messaging from pet owners
- Optional helper status (if they have a scanner)
- Visible to pet owners within 5 miles

#### Featured Tier (£40/month or £400/year)
- Everything in Basic
- Top of search results
- "Featured Provider" badge
- Visible within 10 miles (2x reach)
- Priority support

#### Vet Clinics (Free)
- Exact location shown on map (not approximate)
- "Safe Haven" status indicator
- Always shown as trustworthy fallback option

### Alert Resolution

- Owner can mark alert as "Found" (reunited) or "Cancel" (other reason)
- Resolved alerts no longer appear in feeds or send notifications
- Historical data retained for the owner

---

## Trust & Safety System

### Helper Map Display Indicators

| Icon | Type | Description |
|------|------|-------------|
| ⭐ | Paid + Universal Scanner | Service provider with full-frequency scanner |
| 🌟 | Paid + Basic Scanner | Service provider with ISO scanner (90% coverage) |
| 🔵 | Community Helper | Free volunteer (any scanner) |
| 📍 | Vet Clinic | Professional location (exact address, always safe) |

### Trust Sources (What IS Shown)

- Business reviews (from real customers)
- Proximity (distance from user)
- Scanner capability (universal vs basic)
- Time in community (account age)

### Anti-Gaming (What is NOT Shown)

- ❌ No reunion count displayed
- ❌ No leaderboards
- ❌ No "Helper of the Month"
- ❌ No public statistics
- ❌ No badges for helping

### Fraud Prevention

1. **Chip Number Validation**: 15-digit ISO format, check digit verification
2. **Mandatory In-App Process**: All scans logged, no "leave pet with me" scenario
3. **Owner Confirmation**: "Was your pet safely returned?" sent after reunion
   - If NO: helper flagged for review
   - Pattern of NOs = account banned
4. **Community Reporting**: "Report Issue" on every helper profile
   - 2+ reports = manual review
   - 5+ reports = auto-suspend

---

## Privacy Requirements (Critical)

### Location Privacy

The app must never store precise user locations in the database. Instead:

- Store locations as approximate grid cells (roughly 1km squares)
- Achieved by truncating coordinates to 2 decimal places
- Example: 52.4862, -1.8904 becomes grid cell "52.48_-1.89"
- When displaying other users (helpers, sighting locations), show grid cell centre, not actual position
- Precise coordinates may be used transiently (in memory, for distance calculations) but never persisted
- **Exception**: Vet clinics show exact location (they are public businesses)

### Data Minimisation

- No permanent user profiles beyond what's needed for the app
- Alert data can be ephemeral (deleted after resolution + grace period) - not required for MVP but design with this in mind
- Pet photos use randomised filenames, not indexed by search engines

---

## Database Requirements

### Tables Needed

**profiles**: Extends auth users - display name, grid cell, helper status, scanner type (none/basic/universal), availability, account type (free/basic/featured/vet)

**pets**: Owner reference, microchip number, name, species, breed, colour, description, photo URL, lost status

**alerts**: Pet reference, owner reference, status (active/found/cancelled), last seen grid cell, description, timestamps

**found_pet_alerts**: Reporter reference, photo URL, description, grid cell, status, timestamps

**sightings**: Alert reference, reporter reference, grid cell, description, photo URL, timestamp

**push_tokens**: User reference, push token, platform, grid cell (for radius queries)

**service_providers**: User reference, business name, description, photos, services offered, subscription tier, subscription status, visibility radius

**reviews**: Service provider reference, reviewer reference, rating (1-5), text, timestamp

**subscriptions**: User reference, stripe customer ID, stripe subscription ID, tier, status, current period end

**rescue_centres**: Name, location, bank details for donations

**donations**: Pet registration reference, rescue centre reference, amount, stripe transfer ID, timestamp

**helper_reports**: Reporter reference, helper reference, reason, status, timestamps

**reunion_confirmations**: Alert reference, helper reference, confirmed (boolean), timestamp

### Security

- Row Level Security (RLS) on all tables
- Users can only modify their own data
- Active alerts and lost pets are publicly readable
- Sightings readable by authenticated users
- Service provider listings publicly readable
- Reviews only writable by authenticated users who aren't the provider

---

## Screen Requirements

### Auth Screens
- Login: Email input, send magic link button
- Verify: "Check your email" confirmation

### Main Tabs (5 tabs)
- **Home**: Feed of nearby active lost pet alerts
- **Map**: Visual display of helpers, vets, and active alerts
- **Services**: Directory of local pet service providers
- **My Pets**: List of user's registered pets with status
- **Profile**: Settings, helper toggles, subscription management, sign out

### Pet Screens
- Register new pet (form with photo upload, rescue centre selection, £10 payment)
- Pet details (view, with "Report Lost" action if not already lost)
- Report lost (confirm location, add description, submit)

### Alert Screens
- Alert details (pet info, sighting timeline, map of sightings)
- Report sighting (description, optional photo, submit)
- Found pet alert (for finders - photo, description, location)

### Service Provider Screens
- Provider directory (list view, filterable)
- Provider profile (photos, reviews, services, contact)
- Become a provider (subscription selection, Stripe checkout)
- Manage listing (edit profile, view analytics)

### Helper Screens
- Helper map (find nearby helpers by scanner type)
- Helper profile (scanner type, availability, reviews if provider)
- Scan result entry (chip number input, owner notification)
- In-app messaging (secure chat between helper and owner)

---

## Notification Requirements

### Lost Pet Alert
1. System identifies all users within radius based on grid cells
2. Push notification sent via Firebase Cloud Messaging
3. Notification includes pet name and approximate distance
4. Tapping notification opens the alert details

### Pet Scanned
1. Helper enters chip number in app
2. System matches to registered pet
3. Owner receives instant push notification
4. Notification includes helper location and contact option

### Found Pet Alert
1. Finder posts found pet with photo
2. All registered pet owners in radius notified
3. Notification includes photo thumbnail

Implementation note: Requires Supabase Edge Functions that query push tokens by grid cell and call Firebase Cloud Messaging API.

---

## Payment Requirements

### Pet Registration (£10 one-time)
- Stripe Checkout for payment
- 100% transferred to selected rescue centre (minus Stripe fees ~2.5%)
- Donation tracked and reported to rescue centre

### Service Provider Subscriptions
- Basic: £20/month or £200/year (save £40)
- Featured: £40/month or £400/year (save £80)
- Stripe Billing for recurring payments
- Grace period on failed payments before downgrade
- Prorated upgrades from Basic to Featured

---

## UI/UX Guidelines

- Clean, minimal interface
- Obvious primary actions
- Loading states for all async operations
- Helpful empty states ("No lost pets nearby" is good news)
- Error messages in plain English
- Generous touch targets (48px minimum)

### Trust Indicators
- Featured providers shown first with ⭐ badge
- Scanner type clearly visible (Universal/Basic)
- Vet clinics always shown as safe fallback
- Distance shown prominently (closest first)

### Colour Suggestions
- Primary action colour (buttons, links)
- Success/positive (found, helpers available, pet home)
- Alert/urgent (lost, needs attention)
- Featured/premium (gold/yellow for featured badge)
- Neutral backgrounds and text

---

## What to Defer (Not MVP)

Do not implement these features yet:

- AI image moderation
- Expanding radius over time
- Background location tracking
- Multi-pet discounts
- Social sharing
- Sponsored posts / special offer highlights
- Helper analytics dashboard

Focus on: Register → Report Lost → Alert Nearby → Helper Scan → Instant Notification → Reunion

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
5. Set up Edge Functions for push notifications

### Stripe Setup
1. Create Stripe account
2. Configure products: Pet Registration (£10), Basic (£20/mo), Featured (£40/mo)
3. Set up Connect for rescue centre payouts
4. Configure webhooks for subscription events

### Environment Variables
App needs:
- Supabase URL
- Supabase anon key
- Stripe publishable key
- Firebase project config

---

## Success Criteria

MVP is complete when:

1. User can sign up/in via email magic link
2. User can register a pet with photo, microchip number, and £10 payment
3. User can select rescue centre to receive their donation
4. User can report their pet as lost
5. Nearby users receive push notification
6. Users can report sightings of lost pets
7. Users can post Found Pet Alerts with photos
8. Owner sees sightings on timeline and map
9. Owner can mark pet as found
10. Users can register as helpers with scanner type
11. Available helpers appear on map with trust indicators
12. Helper can enter scanned chip → owner gets instant notification
13. In-app messaging connects helper and owner
14. Service providers can subscribe (Basic/Featured)
15. Service providers appear in directory and on helper map
16. Pet owners can review service providers
17. Vets appear on map as safe havens

Keep it simple. Make it work. Ship it.
