
import { Element } from './types';

export const PERIODIC_TABLE_DATA: Element[] = [
  { number: 1, symbol: "H", name: "Hydrogen", atomic_mass: 1.008, category: "diatomic nonmetal", phase: "Gas", xpos: 1, ypos: 1, summary: "Hydrogen is the chemical element with the symbol H and atomic number 1.", cpk_hex: "ffffff" },
  { number: 2, symbol: "He", name: "Helium", atomic_mass: 4.0026, category: "noble gas", phase: "Gas", xpos: 18, ypos: 1, summary: "Helium is a chemical element with symbol He and atomic number 2.", cpk_hex: "d9ffff" },
  { number: 3, symbol: "Li", name: "Lithium", atomic_mass: 6.94, category: "alkali metal", phase: "Solid", xpos: 1, ypos: 2, summary: "Lithium is a chemical element with symbol Li and atomic number 3.", cpk_hex: "cc80ff" },
  { number: 4, symbol: "Be", name: "Beryllium", atomic_mass: 9.0122, category: "alkaline earth metal", phase: "Solid", xpos: 2, ypos: 2, summary: "Beryllium is a chemical element with symbol Be and atomic number 4.", cpk_hex: "c2ff00" },
  { number: 5, symbol: "B", name: "Boron", atomic_mass: 10.81, category: "metalloid", phase: "Solid", xpos: 13, ypos: 2, summary: "Boron is a chemical element with symbol B and atomic number 5.", cpk_hex: "ffb5b5" },
  { number: 6, symbol: "C", name: "Carbon", atomic_mass: 12.011, category: "polyatomic nonmetal", phase: "Solid", xpos: 14, ypos: 2, summary: "Carbon is a chemical element with symbol C and atomic number 6.", cpk_hex: "909090" },
  { number: 7, symbol: "N", name: "Nitrogen", atomic_mass: 14.007, category: "diatomic nonmetal", phase: "Gas", xpos: 15, ypos: 2, summary: "Nitrogen is a chemical element with symbol N and atomic number 7.", cpk_hex: "3050f8" },
  { number: 8, symbol: "O", name: "Oxygen", atomic_mass: 15.999, category: "diatomic nonmetal", phase: "Gas", xpos: 16, ypos: 2, summary: "Oxygen is a chemical element with symbol O and atomic number 8.", cpk_hex: "ff0d0d" },
  { number: 9, symbol: "F", name: "Fluorine", atomic_mass: 18.998, category: "diatomic nonmetal", phase: "Gas", xpos: 17, ypos: 2, summary: "Fluorine is a chemical element with symbol F and atomic number 9.", cpk_hex: "90e050" },
  { number: 10, symbol: "Ne", name: "Neon", atomic_mass: 20.18, category: "noble gas", phase: "Gas", xpos: 18, ypos: 2, summary: "Neon is a chemical element with symbol Ne and atomic number 10.", cpk_hex: "b3e3f5" },
  { number: 11, symbol: "Na", name: "Sodium", atomic_mass: 22.99, category: "alkali metal", phase: "Solid", xpos: 1, ypos: 3, summary: "Sodium is a chemical element with symbol Na and atomic number 11.", cpk_hex: "ab5cf2" },
  { number: 12, symbol: "Mg", name: "Magnesium", atomic_mass: 24.305, category: "alkaline earth metal", phase: "Solid", xpos: 2, ypos: 3, summary: "Magnesium is a chemical element with symbol Mg and atomic number 12.", cpk_hex: "8aff00" },
  { number: 13, symbol: "Al", name: "Aluminium", atomic_mass: 26.982, category: "post-transition metal", phase: "Solid", xpos: 13, ypos: 3, summary: "Aluminium is a chemical element with symbol Al and atomic number 13.", cpk_hex: "bfa6a6" },
  { number: 14, symbol: "Si", name: "Silicon", atomic_mass: 28.085, category: "metalloid", phase: "Solid", xpos: 14, ypos: 3, summary: "Silicon is a chemical element with symbol Si and atomic number 14.", cpk_hex: "f0c8a0" },
  { number: 15, symbol: "P", name: "Phosphorus", atomic_mass: 30.974, category: "polyatomic nonmetal", phase: "Solid", xpos: 15, ypos: 3, summary: "Phosphorus is a chemical element with symbol P and atomic number 15.", cpk_hex: "ff8000" },
  { number: 16, symbol: "S", name: "Sulfur", atomic_mass: 32.06, category: "polyatomic nonmetal", phase: "Solid", xpos: 16, ypos: 3, summary: "Sulfur is a chemical element with symbol S and atomic number 16.", cpk_hex: "ffff30" },
  { number: 17, symbol: "Cl", name: "Chlorine", atomic_mass: 35.45, category: "diatomic nonmetal", phase: "Gas", xpos: 17, ypos: 3, summary: "Chlorine is a chemical element with symbol Cl and atomic number 17.", cpk_hex: "1ff01f" },
  { number: 18, symbol: "Ar", name: "Argon", atomic_mass: 39.948, category: "noble gas", phase: "Gas", xpos: 18, ypos: 3, summary: "Argon is a chemical element with symbol Ar and atomic number 18.", cpk_hex: "80d1ff" },
  { number: 20, symbol: "Ca", name: "Calcium", atomic_mass: 40.078, category: "alkaline earth metal", phase: "Solid", xpos: 2, ypos: 4, summary: "Calcium is a chemical element with symbol Ca and atomic number 20.", cpk_hex: "3dff00" },
  { number: 26, symbol: "Fe", name: "Iron", atomic_mass: 55.845, category: "transition metal", phase: "Solid", xpos: 8, ypos: 4, summary: "Iron is a chemical element with symbol Fe and atomic number 26.", cpk_hex: "e06633" },
  { number: 29, symbol: "Cu", name: "Copper", atomic_mass: 63.546, category: "transition metal", phase: "Solid", xpos: 11, ypos: 4, summary: "Copper is a chemical element with symbol Cu and atomic number 29.", cpk_hex: "c88033" },
  { number: 47, symbol: "Ag", name: "Silver", atomic_mass: 107.87, category: "transition metal", phase: "Solid", xpos: 11, ypos: 5, summary: "Silver is a chemical element with symbol Ag and atomic number 47.", cpk_hex: "c0c0c0" },
  { number: 79, symbol: "Au", name: "Gold", atomic_mass: 196.97, category: "transition metal", phase: "Solid", xpos: 11, ypos: 6, summary: "Gold is a chemical element with symbol Au and atomic number 79.", cpk_hex: "ffd123" }
];

export const CATEGORY_COLORS: Record<string, string> = {
  "diatomic nonmetal": "bg-blue-200 border-blue-400",
  "noble gas": "bg-purple-200 border-purple-400",
  "alkali metal": "bg-red-200 border-red-400",
  "alkaline earth metal": "bg-orange-200 border-orange-400",
  "metalloid": "bg-green-200 border-green-400",
  "polyatomic nonmetal": "bg-cyan-200 border-cyan-400",
  "post-transition metal": "bg-gray-200 border-gray-400",
  "transition metal": "bg-yellow-200 border-yellow-400"
};
