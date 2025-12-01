export interface Herb {
  id: number;
  name: string;
  scientificName: string;
  image: string;
  category: string;
  uses: string[];
  toxicity: 'safe' | 'caution' | 'toxic';
  preparation: string[];
  description: string;
  growingZone: string;
}

export const herbs: Herb[] = [
  { id: 1, name: 'Lavender', scientificName: 'Lavandula', image: 'https://d64gsuwffb70l.cloudfront.net/692d017b59ea7bffdb8f7d78_1764557268137_e43c6ab8.webp', category: 'Calming', uses: ['Sleep', 'Anxiety', 'Skin'], toxicity: 'safe', preparation: ['Tea', 'Oil', 'Sachet'], description: 'Calming herb for relaxation and sleep support.', growingZone: '5-9' },
  { id: 2, name: 'Chamomile', scientificName: 'Matricaria chamomilla', image: 'https://d64gsuwffb70l.cloudfront.net/692d017b59ea7bffdb8f7d78_1764557269075_08f4c80d.webp', category: 'Calming', uses: ['Sleep', 'Digestion', 'Stress'], toxicity: 'safe', preparation: ['Tea', 'Tincture'], description: 'Gentle herb for relaxation and digestive support.', growingZone: '3-9' },
  { id: 3, name: 'Peppermint', scientificName: 'Mentha piperita', image: 'https://d64gsuwffb70l.cloudfront.net/692d017b59ea7bffdb8f7d78_1764557269958_dc50befd.webp', category: 'Digestive', uses: ['Digestion', 'Headache', 'Energy'], toxicity: 'safe', preparation: ['Tea', 'Oil', 'Fresh'], description: 'Refreshing herb for digestive and respiratory support.', growingZone: '3-11' },
  { id: 4, name: 'Echinacea', scientificName: 'Echinacea purpurea', image: 'https://d64gsuwffb70l.cloudfront.net/692d017b59ea7bffdb8f7d78_1764557270838_d6802190.webp', category: 'Immune', uses: ['Immunity', 'Cold', 'Infection'], toxicity: 'safe', preparation: ['Tea', 'Tincture', 'Capsule'], description: 'Powerful immune-boosting herb.', growingZone: '3-8' },
  { id: 5, name: 'Ginger', scientificName: 'Zingiber officinale', image: 'https://d64gsuwffb70l.cloudfront.net/692d017b59ea7bffdb8f7d78_1764557271693_10c1b46c.webp', category: 'Digestive', uses: ['Nausea', 'Inflammation', 'Circulation'], toxicity: 'safe', preparation: ['Tea', 'Fresh', 'Powder'], description: 'Warming root for digestion and inflammation.', growingZone: '9-12' },
  { id: 6, name: 'Turmeric', scientificName: 'Curcuma longa', image: 'https://d64gsuwffb70l.cloudfront.net/692d017b59ea7bffdb8f7d78_1764557272588_e05a3c27.webp', category: 'Anti-inflammatory', uses: ['Inflammation', 'Pain', 'Immunity'], toxicity: 'safe', preparation: ['Powder', 'Fresh', 'Capsule'], description: 'Golden root with powerful anti-inflammatory properties.', growingZone: '8-11' },
  { id: 7, name: 'Rosemary', scientificName: 'Salvia rosmarinus', image: 'https://d64gsuwffb70l.cloudfront.net/692d017b59ea7bffdb8f7d78_1764557281979_5b2c5057.webp', category: 'Cognitive', uses: ['Memory', 'Circulation', 'Hair'], toxicity: 'safe', preparation: ['Tea', 'Oil', 'Fresh'], description: 'Aromatic herb for memory and circulation.', growingZone: '7-10' },
  { id: 8, name: 'Aloe Vera', scientificName: 'Aloe barbadensis', image: 'https://d64gsuwffb70l.cloudfront.net/692d017b59ea7bffdb8f7d78_1764557283052_16f665d7.webp', category: 'Skin', uses: ['Burns', 'Skin', 'Digestion'], toxicity: 'caution', preparation: ['Gel', 'Juice'], description: 'Succulent plant for skin healing and burns.', growingZone: '9-11' }
];
