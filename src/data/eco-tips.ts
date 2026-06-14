import type { EcoTip } from "@/types";

export const ECO_TIPS: EcoTip[] = [
  { id: "tip-01", category: "transport", title: "Try a Walking Meeting", body: "Next time you have a one-on-one, take it outside! Walking meetings boost creativity by 60% and produce zero emissions.", impact: "medium", icon: "👟" },
  { id: "tip-02", category: "transport", title: "Optimize Your Route", body: "Using GPS to find the shortest route can reduce fuel consumption by up to 15%. Even better — carpool with a colleague!", impact: "medium", icon: "🗺️" },
  { id: "tip-03", category: "energy", title: "The Phantom Load", body: "Devices on standby still draw power. Unplugging chargers and appliances when not in use can save up to 10% on your electricity bill.", impact: "low", icon: "🔌" },
  { id: "tip-04", category: "energy", title: "Smart Thermostat Savings", body: "Lowering your thermostat by just 1°C can reduce heating bills by 10% and save around 300 kg CO₂ per year.", impact: "high", icon: "🌡️" },
  { id: "tip-05", category: "food", title: "The Flexitarian Effect", body: "Reducing meat consumption by half can lower your food-related carbon footprint by 35%. Start with one meatless day per week!", impact: "high", icon: "🥗" },
  { id: "tip-06", category: "food", title: "Buy Local, Think Global", body: "Locally sourced food travels an average of 100 miles vs 1,500 for conventional. That's 5–17x less transport emissions!", impact: "medium", icon: "🌽" },
  { id: "tip-07", category: "waste", title: "Compost Magic", body: "Composting food scraps diverts waste from landfills where it would produce methane — a greenhouse gas 80x more potent than CO₂.", impact: "high", icon: "🪱" },
  { id: "tip-08", category: "waste", title: "The Refill Revolution", body: "Switching to refillable water bottles and coffee cups eliminates ~167 single-use plastic bottles per person per year.", impact: "medium", icon: "🫗" },
  { id: "tip-09", category: "water", title: "Shower Smart", body: "Cutting your shower by just 2 minutes saves 40 liters of water and 0.2 kg CO₂ per shower. That's 73 kg CO₂ per year!", impact: "medium", icon: "🚿" },
  { id: "tip-10", category: "shopping", title: "Second Life Fashion", body: "Buying secondhand clothing reduces its carbon footprint by 82%. Thrift stores, online resale, and clothing swaps are your friends.", impact: "high", icon: "👔" },
  { id: "tip-11", category: "energy", title: "LED the Way", body: "LED bulbs use 75% less energy than incandescent and last 25x longer. Switching your whole home saves ~400 kg CO₂/year.", impact: "high", icon: "💡" },
  { id: "tip-12", category: "transport", title: "E-Bike Revolution", body: "E-bikes produce 22x less CO₂ per km than cars. They're faster than driving in urban areas for trips under 8 km!", impact: "high", icon: "🚲" },
];
