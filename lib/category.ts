export const CATEGORY_LABELS: Record<string, string> = {
  STOUT: "Stout",
  RTD: "RTD",
  LAGERS: "Lagers",
  BITTERS: "Bitters",
  GIN: "Gin",
  LIQUEUR: "Liqueur",
  RUM: "Rum",
  TEQUILA: "Tequila",
  VODKA: "Vodka",
  SINGLE_MALT_WHISKY: "Single malt whisky",
  WHISKY: "Whisky",
  BEER: "Beer",
  WINE: "Wine",
  SPIRITS: "Spirits",
  COCKTAIL: "Cocktail",
  SOFTDRINK: "Soft drink",
  JUICE: "Juice",
  MOCKTAIL: "Mocktail",
  WATER: "Water",
};

export function labelForCategory(value?: string | null) {
  if (!value) return "";
  return CATEGORY_LABELS[value] ?? value.replace(/_/g, " ").toLowerCase().replace(/(^|\s)\S/g, (t) => t.toUpperCase());
}

export function allCategoryValues(): string[] {
  return Object.keys(CATEGORY_LABELS);
}
