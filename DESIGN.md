# Design Brief

## Direction

Aquatic Luxury — Premium mineral water brand reflecting Gangetic/Bihar heritage with luxurious water-inspired gradients and refined typography.

## Tone

Sophisticated, elegant, calming. Deep indigo Gangetic blue with cool teals and mineral silvers convey purity, heritage, and premium quality without appearing corporate.

## Differentiation

Water-flow gradients transitioning from deep indigo (Gangetic origins) to teals and silvers, paired with serif typography (Lora), subtle wave-pattern footer, and mineral-inspired card layouts create a distinctive identity beyond generic water brands.

## Color Palette

| Token      | OKLCH             | Role                                     |
| ---------- | ----------------- | ---------------------------------------- |
| background | 0.98 0.008 230    | Cream off-white, cool undertone          |
| foreground | 0.18 0.015 240    | Deep ocean blue-black for text           |
| primary    | 0.38 0.16 240     | Deep Gangetic indigo, hero/buttons       |
| accent     | 0.6 0.15 170      | Cool teal mineral accent                 |
| card       | 0.99 0.005 230    | Pure white for elevated content          |
| muted      | 0.93 0.01 230     | Light grey for secondary info            |
| border     | 0.9 0.008 230     | Subtle dividers                          |

## Typography

- Display: Lora — elegant serif for hero, section headings, brand authority
- Body: Satoshi — refined sans-serif for paragraphs, UI labels, readable at all sizes
- Scale: hero `text-5xl md:text-7xl`, headings `text-3xl md:text-5xl`, labels `text-sm uppercase`, body `text-base`

## Elevation & Depth

Cards elevated via subtle shadows (shadow-subtle/shadow-elevated), clear background hierarchy (cream content on card, card on background). Navigation anchored top with semi-transparent backdrop. Layered depth through z-index without overbearing opacity.

## Structural Zones

| Zone    | Background           | Border              | Notes                                          |
| ------- | -------------------- | ------------------- | ---------------------------------------------- |
| Header  | primary/semi-opaque  | border-b subtle     | Fixed, brand logo left, nav links right        |
| Hero    | gradient-water       | —                   | Full-width gradient indigo→teal, centered text |
| Content | background/card      | —                   | Alternating sections: background/card-bg      |
| Footer  | primary-dark         | border-t subtle     | Wave-pattern accent, contact/hours info       |

## Spacing & Rhythm

64px section gaps (gap-16), 32px card internal padding (p-8), 16px component spacing (gap-4). Spacious layout respects content breathing room. Mobile-first responsive: scales down to 32px gaps, 16px padding on small screens.

## Component Patterns

- Buttons: primary indigo, white text, rounded-lg hover, shadow-elevated on hover, transition-smooth
- Cards: bg-card, rounded-lg, shadow-subtle, border border-border/10
- Product tiles: 2-col mobile / 4-col desktop, gradient accent on hover, price label in gold-warm accent

## Motion

- Entrance: fade-in on scroll via intersection observer (200ms)
- Hover: buttons lift with shadow-elevated, scale-105, transition-smooth
- Decorative: subtle floating animation on hero image/gradient, no bouncing

## Constraints

- Max 2 accent colors (primary indigo + teal) across page
- No neon or over-saturated colors; maintain premium refined aesthetic
- Typography hierarchy through size/weight, not color alone
- Avoid stock water imagery; use generated gradients and custom patterns

## Signature Detail

Aquatic flow: Hero gradient flows from deep indigo (top-left) to bright teal (bottom-right), mirroring water's visual purity and movement. Repeated subtly in accent gradients throughout product cards and footer wave pattern, tying the brand identity together.
