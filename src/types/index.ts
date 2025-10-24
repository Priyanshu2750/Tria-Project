export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  // Optional avatar: base64 data URL or external URL
  avatar?: string | null;
  // Optional tags for grouping (e.g. "family", "work")
  tags?: string[];
}