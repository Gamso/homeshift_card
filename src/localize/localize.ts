import en from './en.json';
import fr from './fr.json';

type Dict = Record<string, any>;

const languages: Record<string, Dict> = {
  en,
  fr
};

function get(hass: any): string {
  const code = hass?.locale?.language || hass?.language || 'en';
  const short = String(code).split('-')[0];
  return languages[code] ? code : languages[short] ? short : 'en';
}

function resolveKey(obj: Dict, path: string): any {
  return path.split('.').reduce((acc: any, k: string) => (acc && acc[k] != null ? acc[k] : undefined), obj);
}

export function localize(hass: any, key: string, params?: Record<string, string>): string {
  const lang = get(hass);
  const dict = languages[lang] || languages.en;
  let text = resolveKey(dict, key) as string | undefined;
  if (!text) return key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => (text = (text as string).replace(`{${k}}`, v)));
  }
  return text as string;
}
