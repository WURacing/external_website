type SponsorTier = "Diamond" | "Platinum" | "Gold" | "Silver" | "Bronze";

/*
Sponsor interface should match the following table definition:

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS sponsors_id_seq;

-- Table Definition
CREATE TABLE "public"."sponsors" (
    "id" int8 NOT NULL DEFAULT nextval('sponsors_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "tier" varchar(255) NOT NULL CHECK ((tier)::text = ANY ((ARRAY['Diamond'::character varying, 'Platinum'::character varying, 'Gold'::character varying, 'Silver'::character varying, 'Bronze'::character varying])::text[])),
    "link" varchar(255) NOT NULL,
    "image_path" varchar(255),
    "created_at" timestamp(0),
    "updated_at" timestamp(0),
    PRIMARY KEY ("id")
);
*/

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
