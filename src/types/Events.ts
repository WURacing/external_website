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
 * Represents the details of a competition event.
 */
interface EventDetail {
    id: number;
    history_id: number;
    events: CompetitionEvent[];
    created_at?: string;
    updated_at?: string;
  }

/**
 * Represents the details of a competition.
 */
export interface EventDetails {
id: number;
competition_year: number;
place: number;
description: string;
gallery: string[];
eventDetails: EventDetail[];
created_at?: string;
updated_at?: string;
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
