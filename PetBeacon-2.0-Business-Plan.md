# PetBeacon - Business Plan v2.0

**Guiding Pets Home**  
petbeacon.org

---

## Executive Summary

**The Problem**: 18-20 million UK pets are microchipped, yet nearly half are never returned when lost. The current system fails because finders must travel to vets during business hours—a barrier that stops most people from helping.

**The Solution**: PetBeacon creates a distributed network of community helpers with microchip scanners. Found pets are scanned within minutes, owners get instant notifications, and reunions happen in hours instead of days. If scanning fails, the "Found Pet Alert" system broadcasts photos to local owners—working even for non-chipped pets.

**Business Model**: 
- Service providers (dog walkers, groomers, trainers): £5/month for business listing
- Pet owners: £5 one-time to register microchip for instant alerts
- Community helpers: Free (volunteer status)

**Traction Target**: 
- Year 1: £5,500 revenue, 1 city
- Year 3: £64,000 revenue, 8 cities, 8 hours/week maintenance

**Exit**: Pet insurance, GPS tracker companies, or vet chains (£2-10M range)

---

## The Problem: Half of Chipped Pets Aren't Returned

**UK has 18-20 million microchipped pets, yet only 52% of dogs and 38% of cats are returned when lost.**

**Why the system fails:**
1. **Finder friction**: Must travel to vet during business hours → most people don't bother
2. **Time delay**: Finder → Vet → Registry → Owner = 24-48 hours → pet wanders off, trail goes cold
3. **No alerts**: Owners can't notify community, finders don't know pet is being searched for

**The gap**: Microchips work, but the discovery-to-owner process is broken. PetBeacon fixes the "last mile" problem.

---

## The Solution: Three-Layer System

**1. Distributed Helper Network**
- Dog walkers, groomers, volunteers carry £50-300 microchip scanners
- Shown on in-app map by proximity and scanner type
- Finder gets pet scanned in minutes, not hours

**2. Instant Owner Notification**
- Helper scans → Owner gets immediate push notification with location
- In-app secure messaging connects all parties
- Reunion in hours instead of days

**3. Found Pet Alerts (Fallback)**
- If no chip/helper available: Finder posts photo + description
- Broadcasts to all pet owners in radius
- Photo matching works even for non-chipped pets

**The Failsafe Chain:**
```
Found Pet → Try Helper (Basic Scanner) → Try Helper (Universal Scanner) 
→ Post Found Pet Alert → Owner Recognizes Pet → Reunion
```

Every path leads home.

---

## Business Model

### Revenue Streams

| User Type | Price | What They Get |
|-----------|-------|---------------|
| **Pet Owners** | £5 one-time | Instant alerts if pet scanned, Lost/Found pet alerts, access to services directory |
| **Service Providers** | £5/month | Business listing with photos, reviews, messaging, optional helper status |
| **Community Helpers** | Free | Volunteer status, appear on helper map, personal satisfaction |
| **Vets** | Free | Exact location on map, "Safe Haven" status, community goodwill |

### Three-Year Projections

| Year | Cities | Pet Owners | Providers | Revenue | Profit | Hours/Week |
|------|--------|------------|-----------|---------|--------|------------|
| 1 | 1 | 500 | 50 | £5,500 | £5,032 | 10h |
| 2 | 3 | 2,000 | 150 | £19,000 | £17,325 | 8h |
| 3 | 8 | 8,000 | 400 | £68,000 | £63,300 | 9h |

**Key Insight**: Two-sided marketplace where service providers pay monthly (recurring) and pet owners pay once (customer acquisition). Helper status is free add-on that builds trust for service providers.

---

## Security & Trust System

### Simple Trust Indicators (No Gamification)

**Helper Map Display:**
- ⭐ **Paid + Universal Scanner** - Service provider with full-frequency scanner
- 🌟 **Paid + Basic Scanner** - Service provider with ISO scanner (90% coverage)
- 🔵 **Community Helper** - Free volunteer (any scanner)
- 📍 **Vet Clinic** - Professional location (exact address, always safe)

**Trust comes from:**
1. Business reviews (from real customers, can't be faked)
2. Proximity (closest is usually best choice)
3. Scanner capability (universal vs basic)
4. Time in community (how long they've been active)

**What's REMOVED (all fakeable):**
- ❌ No reunion count displayed
- ❌ No leaderboards
- ❌ No "Helper of the Month"
- ❌ No public statistics
- ❌ No badges for helping

### Fraud Prevention

**Built-in Safeguards:**

1. **Chip Number Validation**
   - 15-digit ISO format required
   - Check digit algorithm verification
   - Reject sequential/fake numbers

2. **Mandatory In-App Process**
   - Helper scans → chip entered in app → owner notified automatically
   - No "leave pet with me" scenario
   - All communication logged
   - Paper trail for every interaction

3. **Owner Confirmation**
   - "Was your pet safely returned?" message sent
   - If NO: helper flagged for review
   - Pattern of NOs = account banned

4. **Community Reporting**
   - "Report Issue" on every helper profile
   - 2+ reports = manual review
   - 5+ reports = auto-suspend

5. **Vet Network as Safe Fallback**
   - Vets listed with exact locations (free)
   - Always trustworthy option
   - Open 24/7 (emergency vets)

**Why This Works:**
- Attackers can't build fake trust (no public metrics to game)
- Service providers earn trust through real business reviews
- Multiple verification layers catch patterns
- Transparent process protects everyone

---

## How It Works (UI Examples)

### Helper Map View
```
┌──────────────────────────┐
│ Find Helper Near You  [i]│
├──────────────────────────┤
│      🗺️ MAP VIEW         │
│   📍 Your Location       │
│                          │
│ 📍 24hr Vet - 0.2 mi    │
│    Exact location shown  │
│                          │
│ ⭐ Sarah - Dog Walker    │
│    0.3 mi | Universal    │
│    4.9★ (23 reviews)     │
│                          │
│ 🔵 Tom - Volunteer       │
│    0.8 mi | Basic        │
│                          │
│ 🌟 Emma - Groomer        │
│    1.2 mi | Basic        │
│    4.8★ (45 reviews)     │
└──────────────────────────┘
```

### Helper Detail Card
```
┌──────────────────────────┐
│ Sarah's Dog Walking ⭐    │
│ Paid Member              │
├──────────────────────────┤
│ Scanner: Universal       │
│ Distance: 0.3 miles      │
│ Rating: 4.9★ (23 reviews)│
│ Member since: Aug 2024   │
│                          │
│ [Request Scan] [View]    │
│                          │
│ Recent Review:           │
│ "Professional and quick" │
│ - Michael, 2 days ago    │
└──────────────────────────┘
```

**Key Principles:**
- Proximity shown first (distance matters most)
- Scanner type clearly indicated
- Business reviews visible (if service provider)
- Vets always shown as safe option
- No reunion counts (can't be gamed)

---

## Financial Details

### Costs (Year 1)
- Hosting (Supabase + Firebase): £300
- Domain & tools: £30
- Payment processing (2.5%): £138
- **Total: £468**

### Revenue Breakdown

**Year 1 - Manchester** (500 owners, 50 providers, 45 helpers)
- Service listings: 50 × £60/year = £3,000
- Pet registrations: 500 × £5 = £2,500
- **Profit: £5,032**

**Year 2 - 3 Cities** (2,000 owners, 150 providers)
- Service listings: 150 × £60/year = £9,000
- Pet registrations: 2,000 × £5 = £10,000
- Costs: £1,675
- **Profit: £17,325**

**Year 3 - 8 Cities** (8,000 owners, 400 providers)
- Service listings: 400 × £60/year = £24,000
- Pet registrations: 8,000 × £5 = £40,000
- Featured listings (new): 30 × £120/year = £3,600
- Costs: £4,700
- **Profit: £63,300**

### Unit Economics
- Customer Acquisition Cost: £2-5 (organic + word of mouth)
- Lifetime Value (provider): £60/year (low churn)
- Lifetime Value (pet owner): £5 (one-time)
- Margins: 85-90%

---

## Market & Competition

**UK Market**: 25M pets, 18-20M microchipped, £7B pet care industry. Lost pet problem affects 200,000+ pets/year.

**Competition**:
- Microchip registries (PetLog): Passive databases, no alerts → **PetBeacon adds instant notifications**
- GPS trackers (Tractive): £100+ upfront + £10/month, battery dependent → **PetBeacon: £5 one-time**
- Facebook groups: Unstructured, limited reach → **PetBeacon: Structured alerts + verification**
- Nextdoor: General purpose → **PetBeacon: Pet-focused with scanner network**

**Unique Value**: Only solution combining instant chip-to-owner notification + distributed scanner network + community alerts + pet services marketplace.

**Exit Opportunities** (Year 3-4, £2-10M range):
- Pet insurance companies (reduce claim payouts)
- GPS tracker companies (complementary product)
- Vet chain operators (community goodwill + customer acquisition)
- Microchip manufacturers (value-add to existing product)

---

## Execution Plan

### Build (8-10 Weeks)
- **Tech**: React Native, Supabase, Firebase, Stripe
- **Features**: Pet registration, helper map, alerts, messaging, payments
- **Timeline**: 200-250 hours with Claude Code assistance

### Launch (Month 3)
- Seed 200 pet owners (Facebook groups, vet partnerships)
- Recruit 30 service providers (direct outreach, first month free)
- Onboard 15 helpers (provide scanners to first 5)
- Target: First successful reunion = viral moment

### Year 1 Growth
- Manchester only: 500 owners, 50 providers, 45 helpers
- Strategy: Local press, vet partnerships, word of mouth
- Revenue: £5,500 | Profit: £5,032

### Year 2-3 Expansion
- Scale to 8 cities using proven playbook
- Revenue: Year 2 = £19k, Year 3 = £68k
- Maintenance: 8-10 hours/week at steady state

---

## Why Build This?

**It works**: Half of chipped pets aren't returned. This fixes that.  
**It scales**: Clone city-by-city, 2-sided marketplace compounds.  
**It matters**: Real social impact + viral reunion stories.  
**It exits**: Pet insurance, GPS trackers, vets all want this (£2-10M range).

**Year 3: £63k profit, 9 hours/week. Perfect portfolio business.**

---

*Document Version: 2.0 | Last Updated: December 2024*

Total Length: ~15,000 words  
Format: Markdown  
Version: 2.0  
Date: December 2024
