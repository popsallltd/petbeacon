# PetBeacon - Business Plan v2.0

**Guiding Pets Home**  
petbeacon.org

---

## Executive Summary

**The Problem**: 18-20 million UK pets are microchipped, yet nearly half are never returned when lost. The current system fails because finders must travel to vets during business hours—a barrier that stops most people from helping.

**The Solution**: PetBeacon creates a distributed network of community helpers with microchip scanners. Found pets are scanned within minutes, owners get instant notifications, and reunions happen in hours instead of days. If scanning fails, the "Found Pet Alert" system broadcasts photos to local owners—working even for non-chipped pets.

**Business Model**: 
- Pet owners: £10 one-time registration (**100% donated to their chosen local rescue centre**)
- Service providers: £20/month Basic (5 mile reach) or £40/month Featured (10 mile reach + top placement)
- Community helpers: Free (volunteer status)

**The Charity Multiplier**: Donating 100% of pet registrations to rescue centres creates shelter partnerships (free marketing), massive PR story, higher conversion rates, and a mission-driven moat.

**Traction Target**: 
- Year 1: £11,500 profit + £6k to charity, 1 city
- Year 3: £175,000 profit + £150k to charity, 8 cities, 9 hours/week maintenance

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
| **Pet Owners** | £10 one-time | **100% donated to chosen local rescue centre** + instant alerts if pet scanned, Lost/Found pet alerts, access to services directory |
| **Service Providers - Basic** | £20/month or £200/year | Business listing with photos, reviews, messaging, helper status (optional), visible to pet owners within 5 miles |
| **Service Providers - Featured** | £40/month or £400/year | Everything in Basic + top of search results, "Featured Provider" badge, **visible within 10 miles** (2x reach), priority support |
| **Community Helpers** | Free | Volunteer status, appear on helper map, personal satisfaction |
| **Vets** | Free | Exact location on map, "Safe Haven" status, community goodwill |

**Add-ons available:** Sponsored posts, special offer highlights (pricing TBD)

### Three-Year Projections

| Year | Cities | Pet Owners | Providers | Service Revenue | Charity Donations | Your Profit | Hours/Week |
|------|--------|------------|-----------|-----------------|-------------------|-------------|------------|
| 1 | 1 | 600 | 50 | £12,000 | £6,000 | £11,532 | 10h |
| 2 | 3 | 3,500 | 250 | £60,000 | £35,000 | £55,325 | 8h |
| 3 | 8 | 15,000 | 600 | £180,000 | £150,000 | £175,000 | 9h |

**Year 3 breakdown:** 450 Basic (£108k) + 150 Featured (£72k) = £180k service revenue

**Key Insight**: 100% of pet registrations fund rescue centres (generating massive goodwill + free marketing from shelters). Revenue comes entirely from B2B service providers who get hyper-targeted access to local pet owners. Featured tier provides 2x geographic reach (10 miles vs 5 miles).

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
┌──────────────────────────────┐
│ Find Helper Near You      [i]│
├──────────────────────────────┤
│      🗺️ MAP VIEW             │
│   📍 Your Location           │
│                              │
│ 📍 24hr Vet - 0.2 mi        │
│    Exact location shown      │
│                              │
│ ⭐ FEATURED                  │
│ Sarah - Dog Walker           │
│    0.3 mi | Universal        │
│    4.9★ (23 reviews)         │
│    Visible within 10 miles   │
│                              │
│ 🔵 Tom - Volunteer           │
│    0.8 mi | Basic            │
│                              │
│ Emma - Groomer               │
│    1.2 mi | Basic            │
│    4.8★ (45 reviews)         │
│    Visible within 5 miles    │
└──────────────────────────────┘
```

### Service Provider Comparison
```
┌──────────────────────────────┐
│ BASIC LISTING                │
│ £20/month or £200/year       │
├──────────────────────────────┤
│ ✓ Business profile + photos  │
│ ✓ Reviews and ratings        │
│ ✓ Direct messaging           │
│ ✓ Helper status (optional)   │
│ ✓ Shown within 5 miles       │
└──────────────────────────────┘

┌──────────────────────────────┐
│ ⭐ FEATURED LISTING           │
│ £40/month or £400/year       │
├──────────────────────────────┤
│ ✓ Everything in Basic        │
│ ✓ Top of search results      │
│ ✓ "Featured" badge           │
│ ✓ Shown within 10 miles (2x) │
│ ✓ Priority support           │
└──────────────────────────────┘
```

### Pet Registration Flow
```
┌──────────────────────────────┐
│ Register Your Pet         £10│
├──────────────────────────────┤
│ Choose your local rescue     │
│ centre to support:           │
│                              │
│ ○ Manchester Dogs' Home      │
│ ○ RSPCA Manchester           │
│ ○ Hope Rescue                │
│ ○ Other...                   │
│                              │
│ 100% of your £10 goes to     │
│ your chosen rescue centre    │
│                              │
│ You get:                     │
│ ✓ Instant alerts if scanned  │
│ ✓ Lost/Found pet broadcasts  │
│ ✓ Access to local services   │
│                              │
│ [Continue to Payment]        │
└──────────────────────────────┘
```

**Key Principles:**
- Featured providers get 2x geographic reach (10 miles vs 5 miles)
- 100% of pet registration displayed clearly
- Vets always shown as safe option
- Proximity shown first (distance matters most)

---

## Financial Details

### Costs (Year 1)
- Hosting (Supabase + Firebase): £300
- Domain & tools: £30
- Payment processing (2.5% on services): £138
- **Total: £468**

### Revenue Breakdown

**Year 1 - Manchester** (600 owners, 50 providers)
- Service listings: 50 × £240/year (avg) = £12,000
- Pet registrations: 600 × £10 = **£6,000 donated to shelters**
- **Your profit: £11,532** | **Charity donations: £6,000**

**Year 2 - 3 Cities** (3,500 owners, 250 providers)
- Service listings: 200 Basic + 50 Featured = £60,000
- Pet registrations: 3,500 × £10 = **£35,000 donated to shelters**
- Costs: £4,675
- **Your profit: £55,325** | **Charity donations: £35,000**

**Year 3 - 8 Cities** (15,000 owners, 600 providers)
- Service listings: 450 Basic (£108k) + 150 Featured (£72k) = £180,000
- Pet registrations: 15,000 × £10 = **£150,000 donated to shelters**
- Costs: £5,000
- **Your profit: £175,000** | **Charity donations: £150,000**

### Unit Economics
- Customer Acquisition Cost: £2-5 (organic + shelter partnerships)
- Lifetime Value (Basic provider): £240/year
- Lifetime Value (Featured provider): £480/year
- Pet owner value: £10 (100% to charity, drives platform growth)
- Margins: 97% (after minimal hosting costs)

### The Charity Multiplier
**100% of pet registrations to rescue centres creates:**
- Shelter partnerships = free marketing to their mailing lists
- Press coverage ("donated £150k to rescues")
- Higher conversion rates (charity + safety = compelling)
- Larger pet owner base = more service provider value
- Mission-driven brand = defensible moat

---

## Market & Competition

**UK Market**: 25M pets, 18-20M microchipped, £7B pet care industry. Lost pet problem affects 200,000+ pets/year.

**Competition**:
- Microchip registries (PetLog): Passive databases, no alerts → **PetBeacon adds instant notifications + 100% to charity**
- GPS trackers (Tractive): £100+ upfront + £10/month, battery dependent → **PetBeacon: £10 one-time (100% to rescue centres)**
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
- Seed 200 pet owners (Facebook groups, shelter partnerships)
- Recruit 30 service providers (direct outreach)
- Onboard 15 helpers (provide scanners to first 5)
- Target: First successful reunion = viral moment

### Year 1 Growth
- Manchester only: 600 owners, 50 providers
- Strategy: Shelter partnerships, local press, word of mouth
- Service revenue: £12k | Charity donations: £6k | Your profit: £11.5k

### Year 2-3 Expansion
- Scale to 8 cities using proven playbook
- Year 2: £60k service revenue + £35k charity | Your profit: £55k
- Year 3: £180k service revenue + £150k charity | Your profit: £175k
- Maintenance: 8-9 hours/week at steady state

---

## Why Build This?

**It works**: Half of chipped pets aren't returned. This fixes that.  
**It scales**: Clone city-by-city, B2B SaaS model compounds.  
**It matters**: £150k donated to rescue centres by Year 3 + real social impact = viral reunion stories.  
**It exits**: Pet insurance, GPS trackers, vets all want this (£2-10M range).

**Year 3: £175k profit, 9 hours/week. Perfect portfolio business.**

**The charity multiplier**: 100% of pet registrations to rescue centres = free marketing from shelters + massive PR story + higher conversion rates + mission-driven moat.

---

*Document Version: 2.0 | Last Updated: December 2024*
