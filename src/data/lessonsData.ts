import { Lesson } from '../types';

export const lessonsData: Lesson[] = [
  {
    id: 'paddy-basics',
    title: 'Commercial Paddy Cycle (3-Month)',
    subtitle: 'DOA Certified Crop Calendar',
    category: 'Paddy',
    icon: '🌾',
    readTime: '6 min read',
    completed: false,
    content: [
      {
        heading: 'Phase 1: Land Preparation & Nursery Management (Days 1–15)',
        text: 'Paddy requires thorough ploughing followed by impounding water for at least 7 days to decay weed biomass. Apply basal fertilizer mixture (15-15-15 or DOA recommendation) 24 hours before broadcast sowing or transplanting.',
        bullets: [
          'First ploughing: 20–25 cm depth to turn over soil structure.',
          'Puddling & leveling: Essential for uniform standing water depth (2–5 cm).',
          'Pre-germination: Soak seeds for 24h, incubate in gunny bags for 36–48h until radical emergence.'
        ]
      },
      {
        heading: 'Phase 2: Vegetative Growth & Water Management (Days 16–50)',
        text: 'Maintain standing water at 3–5 cm. Conduct first weeding between days 14–21. Apply top-dressing of Urea in split applications according to Department of Agriculture Leaf Color Chart (LCC) readings.',
        bullets: [
          'Day 21: First top dressing (Urea 35 kg/ha).',
          'Day 35: Panicle initiation stage - ensure zero drought stress.',
          'Scouting: Inspect weekly for Brown Planthopper (BPH) and Gall Midge at water level.'
        ]
      },
      {
        heading: 'Phase 3: Reproductive Phase, Grain Filling & Harvesting (Days 51–90)',
        text: 'Drain field water 10–14 days prior to harvest to encourage uniform grain maturation and provide firm traction for combine harvesters. Harvest when 85% of panicles turn golden straw color.',
        bullets: [
          'Moisture target for storage: Sun dry on clean canvas until grain moisture reaches 12–14%.',
          'Storage sanitation: Treat storage bags with neem leaves or approved organic deterrents.'
        ]
      }
    ],
    keyTakeaways: [
      'Maintain 2–5 cm water layer; drain 10 days before harvest.',
      'Use certified BG-series seeds (BG 300, BG 352, BG 358) for maximum yield.',
      'Follow split urea timing based on actual leaf color charts to prevent blast disease.'
    ]
  },
  {
    id: 'organic-shift',
    title: 'Shifting to Organic Farming',
    subtitle: 'Composting & natural crop protection',
    category: 'Organic',
    icon: '♻️',
    readTime: '8 min read',
    completed: false,
    content: [
      {
        heading: 'Soil Health & In-situ Compost Production',
        text: 'The transition to organic cultivation begins by restoring soil microbiome balance. Use aerobic heap composting with a 30:1 Carbon to Nitrogen ratio.',
        bullets: [
          'Brown layer (Carbon): Dry paddy straw, fallen leaves, coconut coir dust (60%).',
          'Green layer (Nitrogen): Fresh cow dung, Gliricidia sepium leaves, kitchen scraps (40%).',
          'Turn heap every 14 days; optimal internal temperature should reach 55–65°C to pasteurize weed seeds.'
        ]
      },
      {
        heading: 'Natural Pest & Disease Deterrents',
        text: 'Eliminate synthetic agrochemicals by utilizing botanical preparations that boost crop immunity without leaving toxic residues.',
        bullets: [
          'Neem seed kernel extract (NSKE 5%): Broad-spectrum repellent against sucking pests.',
          'Panchagavya foliar spray (3%): Enhances chlorophyll production and microbial activity.',
          'Trichoderma viride inoculation: Prevents fungal damping-off and root rot.'
        ]
      },
      {
        heading: 'Certification & Premium Market Realization',
        text: 'Obtain SLSI 1324 Organic Standards certification to sell at premium organic markets in Colombo, Kandy, and export channels.',
        bullets: [
          'Maintain 2–3 year conversion records in the ZFARM Ledger.',
          'Create a 3-meter buffer zone along field borders adjacent to conventional farms.'
        ]
      }
    ],
    keyTakeaways: [
      'Gliricidia and cow dung provide high-potency organic nitrogen.',
      'Neem extracts provide effective pest management without pollinator toxicity.',
      'Certified organic crops command 30–50% price premiums in retail markets.'
    ]
  },
  {
    id: 'home-garden',
    title: 'Vegetables Home Gardening',
    subtitle: 'High yield in small residential spaces',
    category: 'Horticulture',
    icon: '🍅',
    readTime: '5 min read',
    completed: false,
    content: [
      {
        heading: 'Container Selection & Potting Media',
        text: 'Home gardening in urban or peri-urban Sri Lankan plots thrives when utilizing UV-treated grow bags or vertical trellises. Mix 1 part topsoil, 1 part compost, and 1 part coir dust.',
        bullets: [
          'Potting mixture: Ensure proper drainage holes at base of all containers.',
          'Companion planting: Plant marigolds next to tomatoes to deter root-knot nematodes.',
          'Sunlight: Minimum 5–6 hours of direct morning sun required for fruiting crops.'
        ]
      },
      {
        heading: 'Top Crops for Fast Harvesting',
        text: 'Select resilient vegetable varieties suited to year-round production in both wet and dry zones.',
        bullets: [
          'Gotukola & Kangkong: Harvestable in 21 days; regrows continuously.',
          'Chili (M2 / Kochchi): High return per square foot; fruit bearing for 9+ months.',
          'Bush Beans & Tomato: Vertical climbing utilizes vertical space efficiently.'
        ]
      },
      {
        heading: 'Water-Saving Micro Irrigation',
        text: 'Gravity-fed drip systems using recycled bottles or affordable 4mm drip tubing cut water consumption by 70% while keeping foliage dry to prevent fungal leaf spot.',
        bullets: [
          'Water early in the morning before 8:00 AM.',
          'Mulch container surface with dry straw to reduce evaporation.'
        ]
      }
    ],
    keyTakeaways: [
      'Use 1:1:1 topsoil, compost, and coir dust for ideal aeration and water retention.',
      'Companion planting marigolds naturalizes nematode defense.',
      'Drip irrigation conserves water and prevents fungal blight.'
    ]
  }
];
