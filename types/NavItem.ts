type FrontMatterKeys = 'title' | 'path' | 'route';
type OptionalFrontMatterKeys = 'description' | 'order';
export type NavItem = Record<FrontMatterKeys, string> &
  Partial<Record<OptionalFrontMatterKeys, string>>;
