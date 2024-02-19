import { vi, describe, it, expect, afterEach } from 'vitest';
import { navGenerator } from './navGenerator';
import { Frontmatter } from '../types/Frontmatter';

const defaultValues = {
  path: '/',
  route: '/',
  lastEdited: '',
  file: '',
  cwd: '',
  hidden: false,
};

describe('navProcessor', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should process nav', async () => {
    const frontmatter: Frontmatter[] = [
      {
        ...defaultValues,
        title: 'Mock another unsorted Page',
        route: '/unsorted',
      },
      {
        ...defaultValues,
        title: 'Mock Title',
      },
    ];
    const expectedNavItems = [
      {
        ...defaultValues,
        title: 'Mock another unsorted Page',
        route: '/unsorted',
      },
      {
        ...defaultValues,
        title: 'Mock Title',
      },
    ];

    const res = navGenerator(frontmatter);

    expect(res).toEqual({
      navItems: expectedNavItems,
      navTree: [
        {
          name: '',
          navItems: expectedNavItems,
          path: '/',
          children: [
            {
              children: [],
              name: 'unsorted',
              navItems: [],
              path: '/unsorted',
            },
            {
              children: [],
              name: '',
              navItems: [],
              path: '/',
            },
          ],
        },
      ],
    });
  });
});
