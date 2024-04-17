const customHeaders = {
  'X-SimpleLocalize-Token': `${import.meta.env.VITE_SIMPLELOCALIZE_API_KEY}`,
};

export async function fetchLanguageData() {
  const response = await fetch(import.meta.env.VITE_SIMPLELOCALIZE_URL, { headers: customHeaders });
  return response.json();
}