export const OWNER_EMAILS = ["admin@atendia.ai", "info@citendia.com"] as const;

export function isOwnerEmail(email: string | null | undefined) {
  if (!email) {
    return false;
  }

  return OWNER_EMAILS.includes(email as (typeof OWNER_EMAILS)[number]);
}
