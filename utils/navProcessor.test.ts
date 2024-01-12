import { vi, describe, it, expect, afterEach } from 'vitest';
import { navProcessor } from './navProcessor';
import { Frontmatter } from '../types/Frontmatter';

const defaultValues = {
  path: '',
  route: '',
  lastEdited: '',
  file: '',
  cwd: '',
  headings: [],
  hidden: false,
};

describe('navProcessor', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should process nav order by sort property', async () => {
    const frontmatter: Frontmatter[] = [
      {
        ...defaultValues,
        order: '1',
        title: 'Mock Unsorted Page',
        route: '/unsorted',
      },
      {
        ...defaultValues,
        route: '/',
        path: '',
        order: '0',
        title: 'Mock Title',
      },
    ];
    const expectedNavItems = [
      {
        ...defaultValues,
        order: '0',
        title: 'Mock Title',
        route: '/',
      },
      {
        ...defaultValues,
        order: '1',
        title: 'Mock Unsorted Page',
        route: '/unsorted',
      },
    ];

    const res = navProcessor(frontmatter);

    expect(res).toEqual({
      navItems: expectedNavItems,
      navTree: [
        {
          name: '',
          children: [],
          path: '/',
          navItems: expectedNavItems,
        },
      ],
    });
  });

  it('should process nav order correctly by slug count', async () => {
    const frontmatter: Frontmatter[] = [
      {
        ...defaultValues,
        title: 'Mock another unsorted Page',
        route: '/unsorted',
      },
      {
        ...defaultValues,
        route: '/',
        path: '',
        title: 'Mock Title',
      },
    ];
    const expectedNavItems = [
      {
        ...defaultValues,
        order: undefined,
        title: 'Mock Title',
        route: '/',
      },
      {
        ...defaultValues,
        order: undefined,
        title: 'Mock another unsorted Page',
        route: '/unsorted',
      },
    ];

    const res = navProcessor(frontmatter);

    expect(res).toEqual({
      navItems: expectedNavItems,
      navTree: [
        {
          name: '',
          children: [],
          navItems: expectedNavItems,
          path: '/',
        },
      ],
    });
  });
});
