"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MOCK_LOCATIONS } from "@/data/mock-locations";
import type { LocationType, MapLocation } from "@/types";
import { Star, MapPin, Compass, Clock, Check } from "lucide-react";

// Fix standard Leaflet prototype bug in Next.js/bundler environments
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom categorised icons using inline SVG inside L.divIcon
const getCategoryIcon = (type: LocationType) => {
  const colorMap = {
    recycling: "#2D6A4F", // Leaf Green
    transit: "#2A7459",   // Teal Green
    "bike-share": "#D4A373", // Earth Sand
    "ev-charging": "#40A07A", // Sage Green
  };
  const color = colorMap[type] || "#2D6A4F";

  return L.divIcon({
    html: `
      <div class="flex items-center justify-center rounded-full border-2 border-white shadow-md" style="background-color: ${color}; width: 32px; height: 32px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    `,
    className: "custom-leaflet-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export function LocalHubMap() {
  const [filter, setFilter] = useState<LocationType | "all">("all");

  const filteredLocations = MOCK_LOCATIONS.filter(
    (loc) => filter === "all" || loc.type === filter
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Category Filter Controls */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Eco Map Filters">
        {(["all", "recycling", "transit", "bike-share", "ev-charging"] as const).map(
          (category) => {
            const label = {
              all: "All Infrastructure",
              recycling: "Recycling Hubs",
              transit: "Transit Hubs",
              "bike-share": "Bike Shares",
              "ev-charging": "EV Chargers",
            }[category];

            const active = filter === category;

            return (
              <button
                key={category}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(category)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold shadow-sm transition-all duration-150 active:scale-95 border ${
                  active
                    ? "bg-leaf-500 text-white border-leaf-500"
                    : "bg-white text-charcoal-500 border-mist-300 hover:bg-mist-50 dark:bg-carbon-card dark:text-carbon-text dark:border-carbon-surface dark:hover:bg-carbon-surface"
                }`}
              >
                {active && <Check className="h-3.5 w-3.5" />}
                {label}
              </button>
            );
          }
        )}
      </div>

      {/* Leaflet Map Area */}
      <div className="h-[450px] w-full overflow-hidden rounded-2xl border border-mist-200 shadow-sm dark:border-carbon-surface">
        <MapContainer
          center={[40.73, -73.99]} // Centered in New York
          zoom={12.5}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredLocations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={getCategoryIcon(loc.type)}
            >
              <Popup className="custom-popup">
                <div className="p-1 max-w-[220px]">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span
                      className={`inline-block w-2.5 h-2.5 rounded-full ${
                        {
                          recycling: "bg-emerald-600",
                          transit: "bg-blue-600",
                          "bike-share": "bg-amber-600",
                          "ev-charging": "bg-teal-600",
                        }[loc.type]
                      }`}
                    />
                    <h4 className="font-bold text-sm text-charcoal-700 m-0 leading-tight">
                      {loc.name}
                    </h4>
                  </div>
                  <p className="text-xs text-charcoal-400 m-0 mb-2 leading-relaxed">
                    {loc.description}
                  </p>
                  <div className="flex flex-col gap-1 text-[11px] text-charcoal-500 border-t border-mist-100 pt-2">
                    <div className="flex items-center gap-1 font-medium">
                      <MapPin className="h-3 w-3 flex-shrink-0 text-charcoal-400" />
                      <span className="truncate">{loc.address}</span>
                    </div>
                    {loc.hours && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 flex-shrink-0 text-charcoal-400" />
                        <span>Hours: {loc.hours}</span>
                      </div>
                    )}
                    {loc.rating && (
                      <div className="flex items-center gap-1 font-semibold text-amber-500">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span>{loc.rating} / 5.0 rating</span>
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
