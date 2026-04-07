export interface KPI {
  label: string;
  value: string;
}

export interface ChallengeCard {
  title: string;
  description?: string;
}

export interface StrategyStep {
  phase: string;
  title: string;
  description: string;
}

export interface ExecutionBlock {
  title: string;
  description: string;
}

export interface VideoItem {
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  platform?: string;
}

export interface ReelItem {
  title: string;
  embedId?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
}

export interface StaticItem {
  imageUrl: string;
  aspect?: string;
}

export interface GallerySection {
  title: string;
  items: (VideoItem | ReelItem | StaticItem)[];
  type: "video" | "reel" | "static";
}

export interface ResultMetric {
  label: string;
  value: string;
  context?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export interface Snapshot {
  industry: string;
  region: string;
  services: string[];
  channels?: string[];
  timeline: string;
  teamSize: string;
  tools: string[];
}

export interface WhatsNext {
  items: string[];
}

export interface NFTItem {
  id?: number;
  title: string;
  imageUrl: string;
  lore: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  heroVideoUrl?: string;
  heroVideoPoster?: string;
  heroImage?: string;
  kpis: KPI[];
  challengeIntro: string;
  challengeCards?: ChallengeCard[];
  strategy: StrategyStep[];
  strategicLevers?: string[];
  execution: ExecutionBlock[];
  gallery: GallerySection[];
  nftGallery?: NFTItem[];
  results: ResultMetric[];
  resultsSummary?: string;
  testimonial: Testimonial;
  snapshot: Snapshot;
  whatsNext: WhatsNext;
  ctaHeading?: string;
  ctaSubheading?: string;
  nextCaseStudy?: string;
}

export const caseStudies: Record<string, CaseStudy> = {
  airasia: {
    slug: "airasia",
    title: "AirAsia: 1.1 Million Reached at $0.06 CPL",
    subtitle:
      "A four-episode travel series turned into a full-funnel creative system — combining cinematic storytelling, short-form reels, and static performance assets that drove 6,000 booking requests in one month.",
    heroVideoUrl: "https://www.youtube.com/embed/UH5sOdyTEpo",
    heroImage:
      "https://thewidercollective.com/assets/airasia-cover-A6P9r8aC.png",
    kpis: [
      { label: "Reach", value: "1.1M" },
      { label: "Cost Per Lead", value: "$0.06" },
      { label: "Booking Requests", value: "6K (30 Days)" },
      { label: "Creatives Produced", value: "100+" },
    ],
    challengeIntro:
      "AirAsia's regional campaigns were losing steam. Static brand posts drove declining engagement, rising CPMs ate into budgets, and creative fatigue from overused visuals limited performance across markets.",
    challengeCards: [
      {
        title: "Declining Engagement",
        description: "Static brand posts were losing traction across audiences.",
      },
      {
        title: "Rising CPMs",
        description: "Regional campaigns faced escalating costs.",
      },
      {
        title: "Creative Fatigue",
        description: "Overused visuals were limiting ad performance.",
      },
    ],
    strategy: [
      {
        phase: "Top Funnel",
        title: "4 Cinematic Story Episodes",
        description:
          "Brand recall through creator-style cinematic storytelling that humanized the airline brand.",
      },
      {
        phase: "Mid Funnel",
        title: "6 Short Reels",
        description:
          "Hook-led narratives with CTA overlays to drive consideration and click-throughs.",
      },
      {
        phase: "Bottom Funnel",
        title: "Static Ad Variations",
        description:
          "Deal-focused, performance-optimized creatives for conversion.",
      },
    ],
    strategicLevers: [
      "Creator-style storytelling to humanize the airline brand",
      "Modular content structure for endless remixing",
      "Rapid ad testing (versioned assets across 5 hooks × 3 durations × 4 formats)",
    ],
    execution: [
      {
        title: "Travel Series (4 Episodes)",
        description:
          "Cinematic story-driven episodes capturing the emotional return to travel, coastal exploration, family trip montages, and the hero closing film.",
      },
      {
        title: "Short-Form Reels (6 Pieces)",
        description:
          "Instagram Reels averaging 3.5% engagement, 20% completion, and $0.06 CPL when retargeted.",
      },
      {
        title: "Static Content System",
        description:
          "Over 60 static creatives: destination carousels, deal-based ads, quote templates, and posterized stills with typography overlays.",
      },
      {
        title: "Content Pipeline",
        description:
          "Notion-based system for internal marketing to tag creatives by funnel stage, hook, audience, track versioning and performance KPIs.",
      },
    ],
    gallery: [
      {
        title: "Travel Series",
        type: "video",
        items: [
          {
            title: "The First Flight Back",
            videoUrl: "https://www.youtube.com/embed/UH5sOdyTEpo",
          } as VideoItem,
          {
            title: "Island Routes",
            videoUrl: "https://www.youtube.com/embed/6JsX2TzjMis",
          } as VideoItem,
          {
            title: "Sky Miles to Memories",
            videoUrl: "https://www.youtube.com/embed/jBljqpmJ1G0",
          } as VideoItem,
          {
            title: "Above & Beyond",
            videoUrl: "https://www.youtube.com/embed/x9o9eLg92Ms",
          } as VideoItem,
        ],
      },
      {
        title: "Short-Form Reels",
        type: "reel",
        items: [
          {
            title: "POV: Boarding again after 2 years",
            embedId: "C7-s-96NTkV",
          } as ReelItem,
          {
            title: "What's in your travel playlist?",
            embedId: "C8kEKLAOi3t",
          } as ReelItem,
          {
            title: "3 destinations under $100",
            embedId: "C9SKt9_O3s4",
          } as ReelItem,
          {
            title: "You + the window seat",
            embedId: "C9Z9RLXOfHS",
          } as ReelItem,
          {
            title: "Flying home hits different",
            embedId: "C9Pp0ugOX8F",
          } as ReelItem,
          {
            title: "The best part of travel isn't the destination",
            embedId: "C9XXar2u0uH",
          } as ReelItem,
        ],
      },
    ],
    results: [
      { label: "Reach", value: "1.1M", context: "Across 4 episodes + ad variants" },
      { label: "CPL", value: "$0.06", context: "Avg. across all funnel ads" },
      { label: "Bookings", value: "6,000", context: "Within 30 days" },
      { label: "Creatives", value: "100+", context: "Including static, video, reels" },
      { label: "Engagement", value: "+3×", context: "vs. baseline content" },
      { label: "CTR", value: "+28%", context: "Higher on short-form ads" },
      { label: "Search Queries", value: "+15%", context: "Lift in destination searches" },
    ],
    testimonial: {
      quote:
        "From strategy to execution, The Wider Collective's speed and clarity were unmatched. They turned our campaign into a content machine.",
      author: "Regional Marketing Lead",
      company: "AirAsia",
    },
    snapshot: {
      industry: "Aviation",
      region: "South & Southeast Asia",
      services: [
        "Strategy",
        "Film Production",
        "Short-Form Ads",
        "Static Design",
        "Ad Buying",
        "Campaign Management",
      ],
      channels: ["Meta", "Instagram", "Facebook Ads Manager"],
      timeline: "6 Weeks",
      teamSize: "7",
      tools: [
        "Premiere Pro",
        "After Effects",
        "Meta Ads",
        "Notion",
        "Google Drive",
      ],
    },
    whatsNext: {
      items: [
        "Build country-specific localized variants of each reel",
        "Introduce UGC remixes to further personalize",
        "Expand pipeline to TikTok and YouTube Shorts",
      ],
    },
    nextCaseStudy: "deathcorp",
  },

  deathcorp: {
    slug: "deathcorp",
    title: "Death Corp Piggies: Bureaucracy of the Afterlife.",
    subtitle:
      "We built a 3,333-piece NFT universe and staking ecosystem on Sui — a satirical corporate IP that fuses lore, art, and smart contracts for LegacyLink.",
    heroVideoUrl:
      "https://video.thewidercollective.com/Death%20Corp/mint",
    heroVideoPoster:
      "https://video.thewidercollective.com/deathcorp/hero.jpg",
    heroImage:
      "https://thewidercollective.com/assets/deathcorp-cover-BgPkz-vz.png",
    kpis: [
      { label: "NFTs Minted", value: "3,333" },
      { label: "Funds Raised", value: "$100K" },
      { label: "Staking Launch", value: "2 Weeks" },
      { label: "Creatives Produced", value: "2 Cinematic Videos" },
    ],
    challengeIntro:
      "LegacyLink needed an IP layer to embody its vision of digital afterlife management. The task: craft a satirical bureaucracy of death — an NFT world that made lore as tangible as code. Success meant not only minting 3,333 tokens but launching an ecosystem of story, staking, and identity.",
    strategy: [
      {
        phase: "Step 1",
        title: "Define the IP System",
        description:
          "Established Death Corp as a parody of afterlife bureaucracy. Designed 3,333 clay-styled Piggies as 'employees,' each with lore-based rarity and rank.",
      },
      {
        phase: "Step 2",
        title: "Build Digital Infrastructure",
        description:
          "Developed the mint website and staking dashboard on the Sui blockchain, integrating wallet auth, trait viewer, and reward multipliers.",
      },
      {
        phase: "Step 3",
        title: "Expand Through Storytelling",
        description:
          "Produced teaser, launch film, and two 2D animated lore shorts that introduced departments like the Bureau of Reincarnation and HR of Eternity.",
      },
    ],
    execution: [
      {
        title: "NFT Design & Generation",
        description:
          "3,333 clay busts with layered rarity and metadata optimized for Sui integration.",
      },
      {
        title: "Web Development",
        description:
          "Built mint and staking platforms with wallet login, real-time mint counter, and animated onboarding.",
      },
      {
        title: "Animation & Film",
        description:
          "Created teaser, 90s launch video, and two 2D lore shorts blending humor with dystopian corporate tone.",
      },
      {
        title: "Lore & Engagement",
        description:
          "Gamified worldbuilding through employee tiers, memos, and staking-linked narrative progression.",
      },
    ],
    gallery: [
      {
        title: "Films",
        type: "video",
        items: [
          {
            title: "Teaser Trailer",
            videoUrl:
              "https://video.thewidercollective.com/deathcorp/teaser.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/Death%20Corp/teaser_thumbnail",
          } as VideoItem,
          {
            title: "Launch Film",
            videoUrl:
              "https://video.thewidercollective.com/deathcorp/launch.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/Death%20Corp/mint_thumbnail",
          } as VideoItem,
        ],
      },
    ],
    nftGallery: [
      {
        id: 3297,
        title: "El Patron",
        imageUrl:
          "https://video.thewidercollective.com/Death%20Corp/el%20patron.png",
        lore: "The undisputed authority of the afterlife's underworld operations. El Patron oversees the shadow economy of Death Corp with an iron hoof.",
      },
      {
        id: 3290,
        title: "CEO",
        imageUrl:
          "https://video.thewidercollective.com/Death%20Corp/ceo.png",
        lore: "The face of Death Corp's corporate structure. Every policy, every memo, every eternity shift starts at this desk.",
      },
      {
        id: 2904,
        title: "McDeath Demon",
        imageUrl:
          "https://video.thewidercollective.com/Death%20Corp/demon_mcdeath.png",
        lore: "A demonic enforcer who ensures all corporate policies are followed to the letter, with hellfire and eternal consequences.",
      },
      {
        id: undefined,
        title: "Hellfire Insect",
        imageUrl:
          "https://video.thewidercollective.com/Death%20Corp/hellfire_insect.png",
        lore: "A creature of the afterlife's darker corridors, serving Death Corp's more mysterious departments.",
      },
      {
        id: undefined,
        title: "Hellfire Lizard",
        imageUrl:
          "https://video.thewidercollective.com/Death%20Corp/hellfire_lizard.png",
        lore: "An enigmatic entity that lurks in the shadows of Death Corp's bureaucratic machine.",
      },
      {
        id: undefined,
        title: "Octisquid",
        imageUrl:
          "https://video.thewidercollective.com/Death%20Corp/3222-octisquid.png",
        lore: "A multitasking specialist handling multiple departments simultaneously in the afterlife's corporate structure.",
      },
    ],
    results: [
      { label: "NFTs Minted", value: "3,333" },
      { label: "Funds Raised", value: "$100K" },
      { label: "Staking Launch", value: "2 Weeks" },
      { label: "Creatives", value: "2 Videos" },
    ],
    resultsSummary:
      "Death Corp established an enduring IP layer for LegacyLink — 3,333 NFTs minted, $100K raised, staking live in two weeks, and a loreverse that continues to evolve.",
    testimonial: {
      quote:
        "Death Corp is proof that lore can drive technology. TWC turned an idea into a full universe — from character design to smart contracts to cinematic storytelling.",
      author: "Founder",
      company: "LegacyLink",
    },
    snapshot: {
      industry: "Web3 / Digital Collectibles",
      region: "Global",
      services: [
        "NFT Design",
        "Smart Contract Development",
        "Animation",
        "Brand Storytelling",
        "Web Development",
      ],
      timeline: "6 Weeks",
      teamSize: "8",
      tools: [
        "Sui Blockchain",
        "Move",
        "After Effects",
        "Figma",
        "Blender",
        "Supabase",
      ],
    },
    whatsNext: {
      items: [
        "Develop DAO governance under LegacyLink",
        "Introduce trait evolution tied to staking behavior",
        "Expand lore into interactive visual novel",
      ],
    },
    ctaHeading: "Building Worlds That Outlive You.",
    ctaSubheading:
      "We design decentralized IP — where art, technology, and story converge into living ecosystems.",
    nextCaseStudy: "globalmission",
  },

  globalmission: {
    slug: "globalmission",
    title: "Global Mission Impact Institute: Changing the World for Good.",
    subtitle:
      "We built a complete brand framework and hero film combining AI visuals, motion graphics, and in-house footage to launch a purpose-driven global institute.",
    heroVideoUrl:
      "https://video.thewidercollective.com/GMI/GMI_video.mp4",
    heroImage:
      "https://thewidercollective.com/assets/gmi-cover-BRC-3QQX.png",
    kpis: [
      { label: "Brand Guideline V1", value: "100 Pages" },
      { label: "Hero Video", value: "90 Sec Film" },
      { label: "Impact Attributes", value: "6 Core Values" },
      { label: "Certification Mark", value: "3 Partners" },
    ],
    challengeIntro:
      "GMI sought a credible yet aspirational identity — a visual system that fused profitability with purpose and could certify enterprises worldwide. Their brand lacked cohesion, symbolism, and a flagship storypiece to express 'Changing the World for Good.'",
    strategy: [
      {
        phase: "Step 1",
        title: "Define the Core",
        description:
          "Mapped six impact attributes — Innovation, Mission, Purpose, Accelerate, Community, Trust — to anchor all design decisions.",
      },
      {
        phase: "Step 2",
        title: "Design Language System",
        description:
          "Created logo architecture, color hierarchy around Impact Red + Greys, and typographic pairing Inter + TT Hoves.",
      },
      {
        phase: "Step 3",
        title: "Brand Film",
        description:
          "Scripted and produced a 90s hero video using AI imagery, motion graphics, and real footage to visualize purpose → action → impact.",
      },
    ],
    execution: [
      {
        title: "Brand Guideline",
        description:
          "Delivered a comprehensive manual covering logo systems, color palette, art direction, and certification mark usage.",
      },
      {
        title: "Hero Brand Video",
        description:
          "Produced a cinematic film mixing AI visuals, motion graphics, and real footage to tell GMI's story of impact.",
      },
      {
        title: "Design System",
        description:
          "Built Figma components and templates for digital and print consistency.",
      },
    ],
    gallery: [
      {
        title: "Brand Assets",
        type: "video",
        items: [
          {
            title: "Hero Brand Video",
            videoUrl:
              "https://video.thewidercollective.com/GMI/GMI_video.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/GMI/thumbnail.png",
          } as VideoItem,
        ],
      },
      {
        title: "Brand Guidelines",
        type: "static",
        items: [
          {
            imageUrl:
              "https://video.thewidercollective.com/GMI/GMI_Logosystem%20(1)-11.png",
          } as StaticItem,
          {
            imageUrl:
              "https://video.thewidercollective.com/GMI/GMI_Logosystem%20(1)-10.png",
          } as StaticItem,
          {
            imageUrl:
              "https://video.thewidercollective.com/GMI/GMI_Colors-07.png",
          } as StaticItem,
          {
            imageUrl:
              "https://video.thewidercollective.com/GMI/GMI_Colors-10.png",
          } as StaticItem,
          {
            imageUrl:
              "https://video.thewidercollective.com/GMI/GMI_Colors-09.png",
          } as StaticItem,
          {
            imageUrl:
              "https://video.thewidercollective.com/GMI/GMI-Brand-Guidelines-Dec-2024-RGB-V1-48.png",
          } as StaticItem,
          {
            imageUrl:
              "https://video.thewidercollective.com/GMI/GMI-Brand-Guidelines-Dec-2024-RGB-V1-23.png",
          } as StaticItem,
          {
            imageUrl:
              "https://video.thewidercollective.com/GMI/GMI-Brand-Guidelines-Dec-2024-RGB-V1-37.png",
          } as StaticItem,
          {
            imageUrl:
              "https://video.thewidercollective.com/GMI/GMI-Brand-Guidelines-Dec-2024-RGB-V1-49.png",
          } as StaticItem,
          {
            imageUrl:
              "https://video.thewidercollective.com/GMI/GMI-Brand-Guidelines-Dec-2024-RGB-V1-50.png",
          } as StaticItem,
        ],
      },
    ],
    results: [
      { label: "Brand System", value: "Unified", context: "Across all channels" },
      {
        label: "Hero Film",
        value: "Launch Asset",
        context: "For certification program",
      },
      { label: "Adoption", value: "3 Partners", context: "Enterprise partners" },
      {
        label: "Consistency",
        value: "Global",
        context: "Visual cohesion achieved",
      },
    ],
    testimonial: {
      quote:
        "The new identity positioned GMI as a credible, inspiring force for impact-driven business.",
      author: "Leadership Team",
      company: "Global Mission Impact Institute",
    },
    snapshot: {
      industry: "Certification / Social Impact",
      region: "Global",
      services: [
        "Brand Strategy",
        "Visual Identity",
        "Motion Design",
        "Video Production",
      ],
      timeline: "8 Weeks",
      teamSize: "5",
      tools: [
        "After Effects",
        "Runway",
        "Figma",
        "Notion",
        "DaVinci Resolve",
      ],
    },
    whatsNext: {
      items: [
        "Extend brand system to digital certification platform UI",
        "Produce mini-documentary series on certified companies",
        "Develop interactive Impact Dashboard for stakeholders",
      ],
    },
    nextCaseStudy: "yoyoso",
  },

  yoyoso: {
    slug: "yoyoso",
    title: "Yoyoso: Turning Retail Aisles Into Shareable Moments.",
    subtitle:
      "We brought a lifestyle retail brand to life through influencer storytelling, aesthetic UGC, and in-store design — connecting online trends to real-world traffic.",
    heroVideoUrl:
      "https://video.thewidercollective.com/yoyoso/hero.mp4",
    heroVideoPoster:
      "https://video.thewidercollective.com/yoyoso/hero.jpg",
    heroImage:
      "https://thewidercollective.com/assets/yoyoso-cover-aHCgoYuI.png",
    kpis: [
      { label: "Influencer Reach", value: "2.5M+" },
      { label: "Creative Assets", value: "80+" },
      { label: "Campaign Length", value: "8 Weeks" },
      { label: "Footfall Growth", value: "+40%" },
    ],
    challengeIntro:
      "Yoyoso wanted to connect its vibrant in-store energy with a cohesive digital identity. The brand had loyal shoppers but scattered aesthetics — influencer work felt disjointed, and store visuals weren't reinforcing the online narrative. We set out to unify its look, its language, and its performance.",
    strategy: [
      {
        phase: "Step 1",
        title: "Hero Collaboration",
        description:
          "Partnered with a top lifestyle influencer (2.5M reach) to anchor the campaign with a 'Shop With Me' hero film that embodied Yoyoso's soft, joyful aesthetic.",
      },
      {
        phase: "Step 2",
        title: "UGC Series",
        description:
          "Activated six creators across lifestyle, beauty, and home goods. Each produced a shopping haul, review, and aesthetic placement — sustaining daily social momentum.",
      },
      {
        phase: "Step 3",
        title: "Visual Merchandising",
        description:
          "Designed in-store displays and signage matching the pastel palette and tone of the digital campaign, bridging online inspiration with physical retail.",
      },
    ],
    execution: [
      {
        title: "Influencer Hero Film",
        description:
          "A bright, lifestyle-driven 'Shop With Me' video combining handheld storytelling with cinematic in-store shots.",
      },
      {
        title: "UGC Creator Network",
        description:
          "6 creators × 3 formats each = 18 anchor videos (+ edits). Combined reach ≈ 2.5M, average engagement 5.1% (+32%).",
      },
      {
        title: "Aesthetic Reels + Static Ads",
        description:
          "Produced 80+ deliverables with pastel correction; CTR ↑ 22%, CPA ↓ 24% vs previous benchmark.",
      },
      {
        title: "In-Store Design System",
        description:
          "Developed modular POS kits and window visuals to create 'Instagrammable' shopping moments.",
      },
    ],
    gallery: [
      {
        title: "Hero Video",
        type: "video",
        items: [
          {
            title: "The Yoyoso CGI Reel",
            videoUrl:
              "https://video.thewidercollective.com/Yoyoso/yoyoso_cgi.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/Yoyoso/cgi_thumbnail",
          } as VideoItem,
        ],
      },
      {
        title: "Social Creatives",
        type: "video",
        items: [
          {
            title: "Reel 1",
            videoUrl:
              "https://video.thewidercollective.com/Yoyoso/yoyoso_vid1.mov",
            thumbnailUrl:
              "https://video.thewidercollective.com/Yoyoso/vid1thumbnail",
          } as VideoItem,
          {
            title: "Reel 2",
            videoUrl:
              "https://video.thewidercollective.com/Yoyoso/yoyoso_vid2.mov",
            thumbnailUrl:
              "https://video.thewidercollective.com/Yoyoso/vid2thumbnail",
          } as VideoItem,
          {
            title: "Reel 3",
            videoUrl:
              "https://video.thewidercollective.com/Yoyoso/yoyoso_vid3.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/Yoyoso/vid3thumbnail.png",
          } as VideoItem,
          {
            title: "Reel 4",
            videoUrl:
              "https://video.thewidercollective.com/Yoyoso/yoyoso_vid4.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/Yoyoso/vid4thumbnail",
          } as VideoItem,
          {
            title: "Reel 5",
            videoUrl:
              "https://video.thewidercollective.com/Yoyoso/yoyoso_vid5.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/Yoyoso/vid5thumbnail",
          } as VideoItem,
          {
            title: "Reel 6",
            videoUrl:
              "https://video.thewidercollective.com/Yoyoso/yoyoso_vid6.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/Yoyoso/vid6thumbnail",
          } as VideoItem,
        ],
      },
    ],
    results: [
      { label: "Influencer Reach", value: "2.5M+" },
      { label: "Engagement Rate", value: "+32%" },
      { label: "CTR Lift", value: "+22%" },
      { label: "CPA Improvement", value: "−24%" },
      { label: "Footfall Growth", value: "+40%" },
    ],
    resultsSummary:
      "In eight weeks Yoyoso grew footfall by 40%, boosted online engagement by 32%, and unified its brand from social feeds to storefronts through design consistency and creator authenticity.",
    testimonial: {
      quote:
        "TWC elevated Yoyoso into a lifestyle experience — not just a store. Their blend of influencer culture and design precision changed how we see retail marketing.",
      author: "Marketing Manager",
      company: "Yoyoso Bangladesh",
    },
    snapshot: {
      industry: "Retail / Lifestyle",
      region: "Bangladesh",
      services: [
        "Influencer Marketing",
        "UGC Production",
        "Social Ads",
        "In-Store Visual Merchandising",
      ],
      timeline: "8 Weeks",
      teamSize: "7",
      tools: ["Figma", "CapCut Pro", "Meta Ads", "Lightroom", "Notion"],
    },
    whatsNext: {
      items: [
        "Seasonal creator-led drops aligned with product themes",
        "UGC-to-Ad automation for social commerce",
        "Rollout of retail aesthetic guide to new stores",
      ],
    },
    nextCaseStudy: "manabay",
  },

  manabay: {
    slug: "manabay",
    title: "Mana Bay: 3.5 Million Impressions and 2× Footfall in 90 Days.",
    subtitle:
      "We built a 360° entertainment campaign for Bangladesh's largest water park — combining cinematic storytelling, influencer waves, and paid media to turn online reach into real-world crowds.",
    heroVideoUrl:
      "https://video.thewidercollective.com/Mana%20Bay/manabay_vid.mp4",
    heroVideoPoster:
      "https://video.thewidercollective.com/Mana%20Bay/thumbnail.png",
    kpis: [
      { label: "Impressions", value: "3.5M+" },
      { label: "Assets Created", value: "230+" },
      { label: "Influencers", value: "14" },
      { label: "Footfall Growth", value: "2× in 90 Days" },
    ],
    challengeIntro:
      "Mana Bay was thriving offline but under-performing online. Fragmented visuals, inconsistent messaging, and unstructured influencer efforts meant its digital energy didn't match the real-world experience. We needed to turn the park's excitement into a measurable content system.",
    strategy: [
      {
        phase: "Step 1",
        title: "Define Identity & Cadence",
        description:
          "Established a vibrant visual language built on sunlight, motion, and community. Created a Notion-based content calendar for daily execution.",
      },
      {
        phase: "Step 2",
        title: "Build Narrative System",
        description:
          "Structured content around three pillars — Cinematic Storytelling (90s hero film), Creator Waves (14 UGC influencers), and Social Momentum (ads & static posts).",
      },
      {
        phase: "Step 3",
        title: "Measure and Optimize",
        description:
          "Ran iterative ad tests across Meta and TikTok; tracked conversions via promo codes and footfall data.",
      },
    ],
    execution: [
      {
        title: "Hero Film",
        description:
          "90-second cinematic ad — energetic and family-friendly — color-graded in turquoise + sunset orange, repurposed into 6s and 15s variants.",
      },
      {
        title: "Influencer Program",
        description:
          "14 creators across travel and lifestyle generated 3.5M impressions; TWC handled briefing, editing, and whitelisting.",
      },
      {
        title: "Ad Campaign",
        description:
          "230+ assets across formats; CPA improved ≈28% vs previous self-run campaigns.",
      },
      {
        title: "Press & Community",
        description:
          "Lifestyle press features and on-site UGC loops bridged digital and physical engagement.",
      },
    ],
    gallery: [
      {
        title: "Hero Video",
        type: "video",
        items: [
          {
            title: "Dive Into The Magic of Mana Bay",
            videoUrl:
              "https://video.thewidercollective.com/Mana%20Bay/manabay_vid.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/Mana%20Bay/thumbnail.png",
          } as VideoItem,
        ],
      },
      {
        title: "Short-Form Reels",
        type: "video",
        items: [
          {
            title: "Magical Place",
            videoUrl:
              "https://video.thewidercollective.com/Mana%20Bay/magical_place.mov",
            thumbnailUrl:
              "https://video.thewidercollective.com/Mana%20Bay/magicalplace_thumbnail",
          } as VideoItem,
          {
            title: "Slide",
            videoUrl:
              "https://video.thewidercollective.com/Mana%20Bay/slide.mov",
            thumbnailUrl:
              "https://video.thewidercollective.com/Mana%20Bay/slide_thumbnail",
          } as VideoItem,
          {
            title: "Waterpark",
            videoUrl:
              "https://video.thewidercollective.com/Mana%20Bay/waterpark.mov",
            thumbnailUrl:
              "https://video.thewidercollective.com/Mana%20Bay/waterpark_thumbnail",
          } as VideoItem,
          {
            title: "Cabana Life",
            videoUrl:
              "https://video.thewidercollective.com/Mana%20Bay/cabanalife.mov",
            thumbnailUrl:
              "https://video.thewidercollective.com/Mana%20Bay/cabanalife_thumbnail",
          } as VideoItem,
        ],
      },
      {
        title: "UGC Stories",
        type: "video",
        items: [
          {
            title: "Fahad UGC",
            videoUrl:
              "https://video.thewidercollective.com/Mana%20Bay/fahad%20ugc.mov",
            thumbnailUrl:
              "https://video.thewidercollective.com/Mana%20Bay/fahad_thumbnail",
          } as VideoItem,
          {
            title: "Nebula",
            videoUrl:
              "https://video.thewidercollective.com/Mana%20Bay/nebula.mov",
            thumbnailUrl:
              "https://video.thewidercollective.com/Mana%20Bay/nebula_thumbnail",
          } as VideoItem,
        ],
      },
      {
        title: "Social Ads & Statics",
        type: "static",
        items: [
          { imageUrl: "https://video.thewidercollective.com/Mana%20Bay/mana1.png" } as StaticItem,
          { imageUrl: "https://video.thewidercollective.com/Mana%20Bay/mana2.png" } as StaticItem,
          { imageUrl: "https://video.thewidercollective.com/Mana%20Bay/mana3.png" } as StaticItem,
          { imageUrl: "https://video.thewidercollective.com/Mana%20Bay/mana4.png" } as StaticItem,
          { imageUrl: "https://video.thewidercollective.com/Mana%20Bay/mana5.png" } as StaticItem,
          { imageUrl: "https://video.thewidercollective.com/Mana%20Bay/mana6.png" } as StaticItem,
        ],
      },
    ],
    results: [
      { label: "Social Followers", value: "+900%" },
      { label: "Footfall Increase", value: "2× in 90 Days" },
      { label: "CPA Improvement", value: "−28%" },
      { label: "Engagement Rate", value: "+172%" },
    ],
    resultsSummary:
      "In just three months Mana Bay became a national movement — 3.5M impressions, hundreds of UGC tags, and real-world growth driven by a systematic creative engine.",
    testimonial: {
      quote:
        "TWC is the best company we've ever worked with — incredible communication, seamless execution, and creative vision that understood our audience better than we did.",
      author: "Marketing Manager",
      company: "Mana Bay Water Park",
    },
    snapshot: {
      industry: "Entertainment / Hospitality",
      region: "Bangladesh",
      services: [
        "Creative Strategy",
        "Influencer Marketing",
        "Paid Media",
        "Video Production",
        "Press Distribution",
      ],
      timeline: "3 Months",
      teamSize: "6",
      tools: [
        "Meta Ads Manager",
        "CapCut Pro",
        "After Effects",
        "Notion",
        "Google Analytics",
      ],
    },
    whatsNext: {
      items: [
        "Launch Season 2 creator program with international influencers",
        "Develop membership and loyalty initiatives through UGC",
        "Integrate AI-assisted campaign forecasting for next summer",
      ],
    },
    nextCaseStudy: "gendergp",
  },

  gendergp: {
    slug: "gendergp",
    title: "GenderGP: Building a Human Brand in Digital Healthcare",
    subtitle:
      "How we reshaped communication for a global telehealth provider — combining storytelling, video podcasts, and brand design to make gender-affirming care more accessible, safe, and seen.",
    heroImage:
      "https://video.thewidercollective.com/GenderGP/ggp_vid2thumbnail.png",
    kpis: [
      { label: "Audience Growth", value: "+78%" },
      { label: "Engagement Increase", value: "+40%" },
      { label: "Video Series", value: "10+" },
      { label: "Global Reach", value: "30+ Countries" },
    ],
    challengeIntro:
      "GenderGP had an incredible mission — but their communication was fragmented. Different formats, tones, and visual languages created confusion and limited reach.",
    challengeCards: [
      {
        title: "Brand Inconsistency",
        description:
          "Long-form videos lacked brand consistency.",
      },
      {
        title: "Poor Discoverability",
        description:
          "Educational content wasn't being surfaced to new audiences.",
      },
      {
        title: "Visual Mismatch",
        description:
          "Visual identity didn't match the empathy of their message.",
      },
      {
        title: "Fragmented Structure",
        description:
          "No unified structure linking podcasts, teasers, and brand reels.",
      },
    ],
    strategy: [
      {
        phase: "Phase 1",
        title: "Unify the Brand Voice",
        description:
          "Created a communication playbook defining tone, typography, and motion language. Introduced soft gradients, organic shapes, and inclusive imagery.",
      },
      {
        phase: "Phase 2",
        title: "Build a Video Ecosystem",
        description:
          "Launched GenderGP Podcasts as anchor content. Produced video teasers (15–30s) per episode for socials. Designed looping motion templates for scalable production.",
      },
      {
        phase: "Phase 3",
        title: "Expand the System",
        description:
          "Repurposed long-form into educational clips, FAQ reels, and quote cards. Developed Notion-based asset tracker for internal teams to deploy content globally.",
      },
    ],
    execution: [
      {
        title: "Video Podcasts",
        description:
          "Produced 12 episodes featuring clinicians, activists, and parents. Each video cut into 3 shorts → 36 clips total for distribution.",
      },
      {
        title: "Teaser Reels",
        description:
          "Motion-graphic overlays with key quotes + captioning for accessibility. Optimized for vertical (9:16) and square (1:1) formats.",
      },
      {
        title: "Visual Identity",
        description:
          "Built a modular design kit: color gradients, logo spacing, lower-third system, title cards, and social templates. Typography chosen for readability and compassion.",
      },
      {
        title: "Community Engagement",
        description:
          "Aligned release cadence with global observances (Trans Awareness Week, Pride Month). Story-driven posts drove increases in comments + saves.",
      },
    ],
    gallery: [
      {
        title: "Testimonial Reels",
        type: "video",
        items: [
          {
            title: "Testimonial 1",
            videoUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_vid2.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_vid2thumbnail.png",
          } as VideoItem,
          {
            title: "Testimonial 2",
            videoUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_vid6.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_vid6thumbnail",
          } as VideoItem,
          {
            title: "Finch",
            videoUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_finch.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_finchthumbnail.png",
          } as VideoItem,
          {
            title: "Shiv",
            videoUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_shiv.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_shivthumbnail.png",
          } as VideoItem,
        ],
      },
      {
        title: "Community Voices",
        type: "video",
        items: [
          {
            title: "Community Voice 1",
            videoUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_tpt1.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_tpt1thumbnail.jpg",
          } as VideoItem,
          {
            title: "Community Voice 2",
            videoUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_vid7.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_vid7thumbnail.png",
          } as VideoItem,
        ],
      },
      {
        title: "UGC Stories",
        type: "video",
        items: [
          {
            title: "UGC Story 1",
            videoUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_vid3.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_vid3thumbnail",
          } as VideoItem,
          {
            title: "UGC Story 2",
            videoUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_vid4.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_vid4thumbnail.png",
          } as VideoItem,
        ],
      },
      {
        title: "Podcast Shorts",
        type: "video",
        items: [
          {
            title: "Podcast Highlight — Spotify",
            videoUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_pd1.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_pdcthumbnail.png",
            platform: "Spotify",
          } as VideoItem,
          {
            title: "Podcast Highlight — YouTube",
            videoUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_pdc2.mp4",
            thumbnailUrl:
              "https://video.thewidercollective.com/GenderGP/ggp_pdc2thumbnail",
            platform: "YouTube",
          } as VideoItem,
        ],
      },
      {
        title: "Social & Brand Statics",
        type: "static",
        items: [
          {
            imageUrl:
              "https://video.thewidercollective.com/GenderGP/Screenshot%202025-11-06%20at%2012.10.29%E2%80%AFAM.png",
          } as StaticItem,
          {
            imageUrl:
              "https://video.thewidercollective.com/GenderGP/Screenshot%202025-11-06%20at%2012.09.45%E2%80%AFAM.png",
          } as StaticItem,
          {
            imageUrl:
              "https://video.thewidercollective.com/GenderGP/Screenshot%202025-11-06%20at%2012.09.20%E2%80%AFAM.png",
          } as StaticItem,
          {
            imageUrl:
              "https://video.thewidercollective.com/GenderGP/Screenshot%202025-11-06%20at%2012.08.26%E2%80%AFAM.png",
          } as StaticItem,
          {
            imageUrl:
              "https://video.thewidercollective.com/GenderGP/Screenshot%202025-11-06%20at%2012.08.08%E2%80%AFAM.png",
          } as StaticItem,
          {
            imageUrl:
              "https://video.thewidercollective.com/GenderGP/Screenshot%202025-11-06%20at%2012.07.28%E2%80%AFAM.png",
          } as StaticItem,
          {
            imageUrl:
              "https://video.thewidercollective.com/GenderGP/Screenshot%202025-11-06%20at%2012.06.35%E2%80%AFAM.png",
          } as StaticItem,
        ],
      },
    ],
    results: [
      { label: "Community Reach", value: "+320%", context: "Across YouTube, TikTok, and Instagram in 3 months" },
      { label: "Engagement Depth", value: "2×", context: "Higher average watch and listen times" },
      { label: "Conversation Volume", value: "4.1×", context: "Increase in comments, shares, and saves" },
      { label: "Global Impact", value: "5+ Countries", context: "Localized content in 3 languages" },
      { label: "Conversion Rate", value: "+42%", context: "Improvement in patient onboarding" },
      { label: "CPA Efficiency", value: "−27%", context: "Emotion converts efficiently" },
    ],
    resultsSummary:
      "Visibility grew — but so did empathy. The campaign didn't just perform — it connected.",
    testimonial: {
      quote:
        "The Wider Collective helped us express who we are — not just what we do. Our content finally feels as compassionate as our care.",
      author: "Communications Lead",
      company: "GenderGP",
    },
    snapshot: {
      industry: "Healthcare / Telemedicine",
      region: "Global",
      services: [
        "Brand Communication",
        "Podcast Production",
        "Video Editing",
        "Visual Identity",
        "Motion Graphics",
        "Social Design",
      ],
      channels: [
        "YouTube",
        "Spotify",
        "Instagram",
        "Website",
        "Email",
      ],
      timeline: "4 Months",
      teamSize: "6",
      tools: [
        "Premiere Pro",
        "After Effects",
        "Figma",
        "Descript",
        "Notion",
      ],
    },
    whatsNext: {
      items: [
        "Scale podcast to bi-weekly cadence with guest rotation",
        "Launch branded educational series for healthcare providers",
        "Develop patient journey content mapped to onboarding funnel",
      ],
    },
    nextCaseStudy: "airasia",
  },
};

export const caseStudyOrder = [
  "airasia",
  "deathcorp",
  "globalmission",
  "yoyoso",
  "manabay",
  "gendergp",
];
