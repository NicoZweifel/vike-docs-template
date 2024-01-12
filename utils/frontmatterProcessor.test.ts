import { vi, describe, it, expect, afterEach } from 'vitest';
import { frontmatterProcessor } from './frontmatterProcessor';

const lastEdited = 'Mock Date';

vi.mock('fs', async () => ({
  default: {
    statSync: vi.fn(() => ({ mtime: { toDateString: () => lastEdited } })),
  },
}));

describe('processFrontmatter', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('processes frontmatter correctly', async () => {
    const cwd = '/mock/cwd';
    const file = 'mock/file.mdx';
    const frontmatter = {
      title: 'Mock Title',
    };

    frontmatterProcessor(cwd, file, frontmatter);

    expect(frontmatter).toEqual({
      cwd,
      file,
      headings: [],
      lastEdited,
      path: '/mock',
      route: '/mock/file',
      title: 'Mock Title',
    });
  });

  it('processes frontmatter with missing title correctly', async () => {
    const cwd = '/mock/cwd';
    const file = 'mock/file.mdx';
    const frontmatter = {};

    frontmatterProcessor(cwd, file, frontmatter);

    expect(frontmatter).toEqual({
      cwd,
      file,
      headings: [],
      lastEdited,
      path: '/mock',
      route: '/mock/file',
      title: 'File',
    });
  });

  it('processes frontmatter from index file correctly', async () => {
    const cwd = '/mock/cwd';
    const file = 'mock/index.mdx';
    const frontmatter = {};

    frontmatterProcessor(cwd, file, frontmatter);

    expect(frontmatter).toEqual({
      cwd,
      file,
      headings: [],
      lastEdited,
      path: '/mock',
      route: '/mock',
      title: 'Mock',
    });
  });
});
