/**
 * MASTER-BUS & GLOBAL LISTENER
 * Logic: Multi-Level XP Tracking & Orb Mapping
 */
export const GlobalState = {
  xp: 0,
  diamonds: 0,
  streak: 0,
  // MAPPING: The 11 Sovereign Orbs
  orbs: [
    'social', 'club-arena', 'diamond-arena', 'training', 
    'memory-games', 'trivia', 'assistant', 'arcade', 
    'bankroll', 'near-me', 'marketplace'
  ],
  // XP PROTECTION: XP can never be lost
  updateXP(amount) {
    if (amount > 0) this.xp += amount;
  }
};
