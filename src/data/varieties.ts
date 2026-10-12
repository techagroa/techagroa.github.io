export interface VarietyItem {
  value: string;
  label: string;
}

export const varieties: Record<string, VarietyItem[]> = {
  paddy: [
    { value: "Paddy (Nadu BG 366)", label: "Paddy (Nadu BG 366)" },
    { value: "Paddy (Samba BG 358)", label: "Paddy (Samba BG 358)" },
    { value: "Paddy (Red Basmati)", label: "Paddy (Red Basmati)" },
    { value: "Paddy (Traditional Suwandel)", label: "Paddy (Traditional Suwandel)" }
  ],
  vegetables: [
    { value: "Tomato (Keells Hybrid)", label: "Tomato (Keells Hybrid)" },
    { value: "Brinjal (Padagoda)", label: "Brinjal (Padagoda)" },
    { value: "Chili (M2)", label: "Chili (M2)" },
    { value: "Carrot (New Kuroda)", label: "Carrot (New Kuroda)" },
    { value: "Beans (Lanka Butter)", label: "Beans (Lanka Butter)" },
    { value: "Cabbage (Green Coronet)", label: "Cabbage (Green Coronet)" }
  ],
  fruits: [
    { value: "Banana (Ambul)", label: "Banana (Ambul)" },
    { value: "Mango (Karutha Kolumban)", label: "Mango (Karutha Kolumban)" },
    { value: "Papaya (Red Lady)", label: "Papaya (Red Lady)" },
    { value: "Pineapple (Mauritius)", label: "Pineapple (Mauritius)" },
    { value: "Passion Fruit", label: "Passion Fruit" }
  ],
  livestock: [
    { value: "Dairy Cattle (Friesian Cross)", label: "Dairy Cattle (Friesian Cross)" },
    { value: "Poultry (Layer - Lohmann)", label: "Poultry (Layer - Lohmann)" },
    { value: "Poultry (Broiler - Cobb 500)", label: "Poultry (Broiler - Cobb 500)" },
    { value: "Goat (Jamunapari)", label: "Goat (Jamunapari)" },
    { value: "Swine (Large White)", label: "Swine (Large White)" }
  ]
};
