/*
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS team_members_id_seq;

-- Table Definition
CREATE TABLE "public"."team_members" (
    "id" int8 NOT NULL DEFAULT nextval('team_members_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "role" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "photo_path" varchar(255),
    "category" varchar(255) NOT NULL DEFAULT 'Members'::character varying CHECK ((category)::text = ANY ((ARRAY['Executive Board'::character varying, 'System Leads'::character varying, 'Advisors'::character varying, 'Alumni'::character varying, 'Members'::character varying])::text[])),
    "created_at" timestamp(0),
    "updated_at" timestamp(0),
    PRIMARY KEY ("id")
);
*/

type TeamMemberCategory = 'Executive Board' | 'System Leads' | 'Advisors' | 'Alumni' | 'Members';

interface TeamMember {
  [x: string]: any;
  id: number;
  name: string;
  role: string;
  email: string;
  photoPath: string;
  category: TeamMemberCategory;
  createdAt: Date;
  updatedAt: Date;
}

export type {
  TeamMemberCategory,
  TeamMember,
};
