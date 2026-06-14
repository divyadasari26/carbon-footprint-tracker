import type { MapLocation } from "@/types";

export const MOCK_LOCATIONS: MapLocation[] = [
  // Recycling Centers
  { id: "loc-001", name: "GreenCycle Recycling Hub", type: "recycling", lat: 40.7128, lng: -74.006, address: "123 Eco Street, New York, NY", description: "Full-service recycling center accepting plastics, metals, paper, and e-waste.", hours: "Mon-Sat 8AM-6PM", rating: 4.5 },
  { id: "loc-002", name: "EcoPoint Drop-Off", type: "recycling", lat: 40.7282, lng: -73.7949, address: "456 Green Ave, Queens, NY", description: "Community drop-off point for household recyclables and hazardous waste.", hours: "Daily 7AM-9PM", rating: 4.2 },
  { id: "loc-003", name: "ReNew Materials Center", type: "recycling", lat: 40.6892, lng: -74.0445, address: "789 Harbor Rd, Brooklyn, NY", description: "Specialized electronics and battery recycling facility.", hours: "Tue-Sun 9AM-5PM", rating: 4.7 },

  // Transit Hubs
  { id: "loc-004", name: "Central Transit Station", type: "transit", lat: 40.7527, lng: -73.9772, address: "Grand Central Terminal, Manhattan", description: "Major transit hub with subway, Metro-North, and bus connections.", hours: "24/7", rating: 4.3 },
  { id: "loc-005", name: "Green Line Express", type: "transit", lat: 40.7484, lng: -73.9967, address: "Penn Station, Manhattan", description: "Amtrak and NJ Transit connections for low-carbon intercity travel.", hours: "24/7", rating: 4.1 },
  { id: "loc-006", name: "Harbor Ferry Terminal", type: "transit", lat: 40.7002, lng: -74.0131, address: "Whitehall Terminal, Manhattan", description: "Free Staten Island Ferry — zero-cost, low-emission commuting.", hours: "24/7", rating: 4.8 },

  // Bike Share
  { id: "loc-007", name: "CitiBike Station — Union Sq", type: "bike-share", lat: 40.7359, lng: -73.9911, address: "Union Square East, Manhattan", description: "30-dock bike share station with e-bike availability.", hours: "24/7" },
  { id: "loc-008", name: "CitiBike Station — Central Park", type: "bike-share", lat: 40.7679, lng: -73.9718, address: "Central Park South, Manhattan", description: "Popular station near park entrance. 25 docks available.", hours: "24/7" },

  // EV Charging
  { id: "loc-009", name: "ChargePoint Station", type: "ev-charging", lat: 40.7411, lng: -74.0018, address: "Chelsea Market, Manhattan", description: "Level 2 and DC fast charging. 8 ports available.", hours: "6AM-11PM", rating: 4.4 },
  { id: "loc-010", name: "Tesla Supercharger", type: "ev-charging", lat: 40.758, lng: -73.9855, address: "Times Square Garage, Manhattan", description: "250kW Supercharger with 12 stalls.", hours: "24/7", rating: 4.6 },
];
