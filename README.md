# PetBeacon

**Guiding Pets Home** — A community-powered lost pet recovery network

## What is PetBeacon?

PetBeacon connects lost pets with their owners through a three-layer system:

- **Distributed Helper Network**: Dog walkers, groomers, and volunteers carry microchip scanners. Found pets get scanned in minutes, not hours.
- **Instant Owner Notification**: Helper scans → Owner gets immediate push notification with location → Reunion in hours instead of days.
- **Found Pet Alerts**: If no chip or helper available, finder posts photo + description. Broadcasts to all pet owners in radius—works even for non-chipped pets.

## The Problem

UK has 18-20 million microchipped pets, yet only 52% of dogs and 38% of cats are returned when lost.

The current system fails because:
1. **Finder friction**: Must travel to vet during business hours → most people don't bother
2. **Time delay**: Finder → Vet → Registry → Owner = 24-48 hours → pet wanders off, trail goes cold
3. **No alerts**: Owners can't notify community, finders don't know pet is being searched for

## The Solution

PetBeacon creates a distributed network of community helpers with microchip scanners. Every path leads home:

```
Found Pet → Try Helper (Basic Scanner) → Try Helper (Universal Scanner) 
→ Post Found Pet Alert → Owner Recognizes Pet → Reunion
```

## Business Model

| User Type | Price | What They Get |
|-----------|-------|---------------|
| **Pet Owners** | £10 one-time | **100% donated to chosen local rescue centre** + instant alerts if pet scanned, Lost/Found pet alerts, access to services directory |
| **Service Providers - Basic** | £20/month | Business listing, reviews, messaging, helper status, visible within 5 miles |
| **Service Providers - Featured** | £40/month | Everything in Basic + top placement, Featured badge, visible within 10 miles |
| **Community Helpers** | Free | Volunteer status, appear on helper map |
| **Vets** | Free | Exact location on map, "Safe Haven" status |

## Documentation

- [Technical Specification](docs/TECHNICAL_SPEC.md) - Requirements, constraints, and architecture decisions

## Project Status

🚧 MVP in development

---

*100% of pet registration fees are donated to the owner's chosen local rescue centre.*
