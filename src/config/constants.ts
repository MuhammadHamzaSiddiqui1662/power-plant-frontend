export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://power-plant-2a6a23ab8691.herokuapp.com/api/v1"
    : "http://localhost:3001/api/v1";

export const BACKEND_SOCKET_URL =
  process.env.NODE_ENV === "production"
    ? "https://power-plant-2a6a23ab8691.herokuapp.com"
    : "http://localhost:3001";

export const CATEGORIES = {
  Patents: ["Utility Patents", "Design Patents", "Plant Patents"],
  Trademarks: ["Word Marks", "Design Marks", "Sound Marks"],
  Copyrights: ["Literary Works", "Musical Works", "Artistic Works", "Software"],
  "Trade Secrets": ["Formulas", "Processes", "Methods"],
  "Industrial Designs": ["Product Designs", "Graphic Symbols", "GUI Designs"],
  "Geographical Indications": ["Food and Drink", "Crafts"],
  "Plant Varieties": ["Agricultural Crops", "Horticultural Varieties"],
  "Domain Names": [
    "Generic Top-Level Domains (gTLDs)",
    "Country Code Top-Level Domains (ccTLDs)",
  ],
  "Integrated Circuit Layout Designs": [
    "Semiconductor Chip Designs",
    "Mask Works",
  ],
  "Business Methods": ["E-commerce Methods", "Financial Services Methods"],
  Software: ["Application Software", "System Software"],
  Multimedia: ["Video Games", "Digital Art"],
  "Technical Know-how": ["Engineering Techniques", "Scientific Research"],
  Franchises: ["Business Models", "Brand Licenses"],
  "Open Source Projects": [
    "Software Libraries",
    "Collaborative Hardware Designs",
  ],
};
