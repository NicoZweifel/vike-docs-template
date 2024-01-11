type FrontMatterKeys =
  | 'title'
  | 'path'
  | 'route'
  | 'file'
  | 'cwd'
  | 'lastEdited';

type OptionalFrontMatterKeys = 'description' | 'order';

export type NavItem = Record<FrontMatterKeys, string> &
  Partial<Record<OptionalFrontMatterKeys, string>>;
