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

  it('should process frontmatter correctly', async () => {
    const cwd = '/mock/cwd';
    const file = 'mock/file.mdx';
    const basePath = '/';
    const frontmatter = {
      title: 'Mock Title',
    };

    frontmatterProcessor({ cwd, file, basePath, frontmatter });

    expect(frontmatter).toEqual({
      cwd,
      file,
      lastEdited,
      path: '/mock',
      route: '/mock/file',
      title: 'Mock Title',
    });
  });

  it('should process frontmatter that has missing title correctly', async () => {
    const cwd = '/mock/cwd';
    const file = 'mock/file.mdx';
    const basePath = '/';
    const frontmatter = {};

    frontmatterProcessor({ cwd, file, basePath, frontmatter });

    expect(frontmatter).toEqual({
      cwd,
      file,
      lastEdited,
      path: '/mock',
      route: '/mock/file',
      title: 'File',
    });
  });

  it('should process frontmatter taken from index file correctly', async () => {
    const cwd = '/mock/cwd';
    const file = 'mock/index.mdx';
    const frontmatter = {};
    const basePath = '/';

    frontmatterProcessor({ cwd, file, basePath, frontmatter });

    expect(frontmatter).toEqual({
      cwd,
      file,
      index: true,
      lastEdited,
      path: '/mock',
      route: '/mock',
      title: 'Mock',
    });
  });
});
