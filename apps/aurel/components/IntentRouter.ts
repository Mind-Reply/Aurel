export type Intent = {
  route: string | null;
  hint?: string;
  label?: string;
}

const RULES: { match: RegExp; route: string; label: string }[] = [
  { match: /\b(scent|perfume|accord|fragrance|atelier|liquid|silver)\b/i, route: '/scent', label: 'Scent' },
  { match: /\b(metal|armor|couture|sculpt|material|rock|wet)\b/i, route: '/metal', label: 'Metal' },
  { match: /\b(system|network|router|connectivity|wifi|private|assessment|blueprint)\b/i, route: '/system', label: 'System' },
];

export const IntentRouter = {
  resolve(query: string): Intent {
    const q = query.trim();
    if (!q) return { route: null, hint: 'Type anything — a mood, a material, a need.' };

    for (const rule of RULES) {
      if (rule.match.test(q)) {
        return { route: rule.route, label: rule.label };
      }
    }

    // Soft fallback: if it reads like browsing, send to scent as the entry door.
    if (/\b(browse|look|see|show|gallery|explore|wander)\b/i.test(q)) {
      return { route: '/scent', label: 'Browse' };
    }

    return {
      route: null,
      hint: 'No door matched. Try scent, metal, or system — or say browse.',
    };
  },
}
