/*
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS histories_id_seq;

-- Table Definition
CREATE TABLE "public"."histories" (
    "id" int8 NOT NULL DEFAULT nextval('histories_id_seq'::regclass),
    "competition_year" int4 NOT NULL,
    "place" int4 NOT NULL,
    "description" text,
    "created_at" timestamp(0),
    "updated_at" timestamp(0),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS event_details_id_seq;

-- Table Definition
CREATE TABLE "public"."event_details" (
    "id" int8 NOT NULL DEFAULT nextval('event_details_id_seq'::regclass),
    "history_id" int8 NOT NULL,
    "events" jsonb,
    "created_at" timestamp(0),
    "updated_at" timestamp(0),
    CONSTRAINT "event_details_history_id_foreign" FOREIGN KEY ("history_id") REFERENCES "public"."histories"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

// All of the following events listed below are objects that contain the following keys:
// 'event_type' (string): The type of event (e.g. 'Design Event', 'Autocross', etc.)
// 'points' (float): The number of points earned in the event
// 'time' (float): The time of the event (if applicable)
// 'placement' (int): The team's placement in the event

// There are the following events as keys in the 'events' object:
// 'overall_placement': The team's overall placement
// 'design_event': The team's design event score
// 'cost_event': The team's cost event score
// 'presentation_score': The team's presentation score
// 'skidpad': The team's skidpad score
// 'autocross': The team's autocross score
// 'acceleration': The team's acceleration score
// 'endurance': The team's endurance score
// 'efficiency_score': The team's efficiency score

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HistoryResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'competition_year' => $this->competition_year,
            'place' => $this->place,
            'description' => $this->description,
            'gallery' => $this->getMedia('gallery')->map(function ($media) {
                return $media->getUrl('thumb');
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

Example JSON response:
{
    "data": [
        {
            "id": 9,
            "competition_year": 2022,
            "place": 37,
            "description": "After a 2 year hiatus due to COIVD-19, WashU Racing was finally back in Michigan! The WUFR-22 branding #120 broke through several WashU Racing milestones for both design and performance. This year's team scored a total of 425.7 points to place 37th overall competing against 100 other teams around the country and the world. The overall placement was greatly impacted by a heartbreaking early retirement in the Endurance event. Nevertheless, this is the best placement that this program has seen to date with a promising outlook for years to come.",
            "gallery": [
                "http://wuracing-api.test/storage/29/conversions/driving-thumb.webp",
                "http://wuracing-api.test/storage/30/conversions/machineshop-1-thumb.webp",
                "http://wuracing-api.test/storage/31/conversions/machineshop-2-thumb.webp",
                "http://wuracing-api.test/storage/32/conversions/comp-lab-1-thumb.webp",
                "http://wuracing-api.test/storage/33/conversions/sponsorship_packet2023-thumb.webp",
                "http://wuracing-api.test/storage/34/conversions/testing-stcharlesfamilyarena-thumb.webp",
                "http://wuracing-api.test/storage/35/conversions/testing-emerson-thumb.webp"
            ],
            "created_at": "2024-01-22T00:00:18.000000Z",
            "updated_at": "2024-01-22T00:00:18.000000Z"
        }
    ],
    "links": {
        "first": "https://wuracing-api.test/api/v1/histories?page=1",
        "last": "https://wuracing-api.test/api/v1/histories?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "active": false
            },
            {
                "url": "https://wuracing-api.test/api/v1/histories?page=1",
                "label": "1",
                "active": true
            },
            {
                "url": null,
                "label": "Next &raquo;",
                "active": false
            }
        ],
        "path": "https://wuracing-api.test/api/v1/histories",
        "per_page": 4,
        "to": 1,
        "total": 1
    }
}
*/

/**
 * Represents a specific competition event.
 */
interface CompetitionEvent {
    event_type: string; // The type of event (e.g. 'Design Event', 'Autocross', etc.)
    points: number; // The number of points earned in the event
    time?: number; // The time of the event (if applicable)
    placement: number; // The team's placement in the event
}

/**
 * Represents the events in a competition.
 */
interface Events {
    [key: string]: CompetitionEvent; // The key is the event name (e.g. 'design_event', 'cost_event', etc.)
}

/**
 * Represents the details of a competition event.
 */
export interface EventDetails {
    id: number;
    history_id: number;
    events: Events;
    created_at?: Date;
    updated_at?: Date;
}

/**
 * Represents a specific competition.
 */
export interface History {
    id: number;
    competition_year: number;
    place: number;
    description: string;
    gallery: string[];
    created_at?: Date;
    updated_at?: Date;
}

/**
 * Represents a specific competition with pagination.
 */
export interface PaginatedHistory {
    data: History[];
    links: {
        first: string;
        last: string;
        prev: string;
        next: string;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
            url: string;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}
