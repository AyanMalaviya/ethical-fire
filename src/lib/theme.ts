export type Theme = 'light' | 'dark' | 'gold';

export const themes = {
  light: {
    bg: 'bg-gray-50',
    card: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-gray-200',
    primary: 'bg-blue-600 hover:bg-blue-700',
    input: 'bg-white border-gray-300',
  },
  dark: {
    bg: 'bg-gray-900',
    card: 'bg-gray-800',
    text: 'text-white',
    textSecondary: 'text-gray-400',
    border: 'border-gray-700',
    primary: 'bg-blue-600 hover:bg-blue-700',
    input: 'bg-gray-700 border-gray-600 text-white',
  },
  gold: {
    bg: 'bg-black',
    card: 'bg-zinc-900',
    text: 'text-amber-400',
    textSecondary: 'text-amber-200',
    border: 'border-amber-600',
    primary: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
    input: 'bg-zinc-800 border-amber-600 text-amber-100 placeholder-amber-700',
  },
};
