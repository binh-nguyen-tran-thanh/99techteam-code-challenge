export function getIconUrl(currency?: string | null): string {
  if (!currency) return '/placeholder-token-image.png';
  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;
}
