type SponsorTier = "Diamond" | "Platinum" | "Gold" | "Silver" | "Bronze";

interface Sponsor {
    id: number;
    name: string;
    tier: SponsorTier;
    link: string;
    image_path: string;
    created_at: Date;
    updated_at: Date;
}

export type { SponsorTier, Sponsor };
