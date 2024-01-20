type SponsorTier = 'Diamond' | 'Platinum' | 'Gold' | 'Silver' | 'Bronze';

interface Sponsor {
  id: string;
  name: string;
  tier: SponsorTier;
  link: string;
}

export type {
  SponsorTier,
  Sponsor,
};
