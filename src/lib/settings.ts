export const ITEM_PER_PAGE = 5


export const routeAccessMap: Record<string, ("admin" | "therapist" | "parent")[]> = {
  "/list/announcements": ["admin", "therapist", "parent"],
  "/list/event": ["admin", "therapist"],
  "/list/parents": ["admin", "therapist"],
  "/list/session": ["admin", "therapist"],
  "/list/students": ["admin", "therapist"],
  "/list/therapist": ["admin"],
};
