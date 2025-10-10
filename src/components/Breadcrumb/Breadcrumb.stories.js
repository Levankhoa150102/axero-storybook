import React from 'react';
import Breadcrumb from './Breadcrumb';

// Sample title name items data based on the provided HTML structure
const sampleTitleNameItems = [
  {
    id: 1,
    name: '01 Anh Private Space',
    href: '/spaces/988/01-anh-private-space',
    title: '01 Anh Private Space'
  },
  {
    id: 2,
    name: 'Articles',
    href: '/spaces/988/01-anh-private-space/articles',
    title: 'Articles'
  }
];

const sampleSpaceInfo = {
  type: 'Private Space',
  manageLink: {
    name: 'Manage Space',
    href: '/spaces/988/01-anh-private-space/manage/default'
  }
};

// Alternative title name items examples
const homeTitleNameItems = [
  {
    id: 1,
    name: 'Home',
    href: '/',
    title: 'Home'
  }
];

const deepTitleNameItems = [
  {
    id: 1,
    name: 'Marketing Team',
    href: '/spaces/123/marketing-team',
    title: 'Marketing Team'
  },
  {
    id: 2,
    name: 'Projects',
    href: '/spaces/123/marketing-team/projects',
    title: 'Projects'
  },
  {
    id: 3,
    name: 'Q4 Campaign',
    href: '/spaces/123/marketing-team/projects/q4-campaign',
    title: 'Q4 Campaign'
  },
  {
    id: 4,
    name: 'Assets',
    href: '/spaces/123/marketing-team/projects/q4-campaign/assets',
    title: 'Assets'
  }
];

const publicSpaceInfo = {
  type: 'Public Space',
  manageLink: {
    name: 'Manage Space',
    href: '/spaces/123/marketing-team/manage/default'
  }
};

export default {
  title: 'UI Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    titleNameItems: {
      description: 'Array of title name items to display in the navigation path',
      control: { type: 'object' },
    },
    spaceInfo: {
      description: 'Space information object containing type and optional manage link',
      control: { type: 'object' },
    },
  },
};

export const Default = {
  args: {
    titleNameItems: sampleTitleNameItems,
    spaceInfo: sampleSpaceInfo,
  },
  parameters: {
    docs: {
      description: {
        story: `The default breadcrumb navigation showing a path from "01 Anh Private Space" to "Articles" with space information and manage link.

**Rendered HTML Structure:**
\`\`\`html
<div class="axero-space-header-title">
  <div class="axero-space-header-main">
  <div class="axero-space-header-title-name">
    <a title="01 Anh Private Space" href="/spaces/988/01-anh-private-space" class="axero-breadcrumb-link">01 Anh Private Space</a>&nbsp;<i class="icon-caret-right"></i>&nbsp;<a title="Articles" href="/spaces/988/01-anh-private-space/articles" class="axero-breadcrumb-link">Articles</a>
  </div>
  <div class="axero-space-header-title-info">
    Private Space<span class="manage-space"><span class="dot">&nbsp;&nbsp;·&nbsp;&nbsp;</span><a href="/spaces/988/01-anh-private-space/manage/default">Manage Space</a></span>
  </div>
</div>
\`\`\``,
      },
      source: {
        code: `<div class="axero-space-header-title">
  <div class="axero-space-header-main">
    <div class="axero-space-header-title-name">
      <a title="01 Anh Private Space" href="/spaces/988/01-anh-private-space" class="axero-breadcrumb-link">01 Anh Private Space</a>&nbsp;<i class="icon-caret-right"></i>&nbsp;<a title="Articles" href="/spaces/988/01-anh-private-space/articles" class="axero-breadcrumb-link">Articles</a>
    </div>
    <div class="axero-space-header-title-info">
      Private Space<span class="manage-space"><span class="dot">&nbsp;&nbsp;·&nbsp;&nbsp;</span><a href="/spaces/988/01-anh-private-space/manage/default">Manage Space</a></span>
    </div>
  </div>
</div>`
      }
    }
  }
};


export const WithoutManageLink = {
  args: {
    titleNameItems: sampleTitleNameItems,
    spaceInfo: {
      type: 'Private Space'
    },
  },
  parameters: {
    docs: {
      description: {
        story: `Breadcrumb with space information but without the manage space link.

**Rendered HTML Structure:**
\`\`\`html
<div class="axero-space-header-title">
  <div class="axero-space-header-main">
  <div class="axero-space-header-title-name">
    <a title="01 Anh Private Space" href="/spaces/988/01-anh-private-space" class="axero-breadcrumb-link">01 Anh Private Space</a>&nbsp;<i class="icon-caret-right"></i>&nbsp;<a title="Articles" href="/spaces/988/01-anh-private-space/articles" class="axero-breadcrumb-link">Articles</a>
  </div>
  <div class="axero-space-header-title-info">
    Private Space
  </div>
</div>
\`\`\``,
      },
      source: {
        code: `<div class="axero-space-header-title">
  <div class="axero-space-header-main">
    <div class="axero-space-header-title-name">
      <a title="01 Anh Private Space" href="/spaces/988/01-anh-private-space" class="axero-breadcrumb-link">01 Anh Private Space</a>&nbsp;<i class="icon-caret-right"></i>&nbsp;<a title="Articles" href="/spaces/988/01-anh-private-space/articles" class="axero-breadcrumb-link">Articles</a>
    </div>
    <div class="axero-space-header-title-info">
      Private Space
    </div>
  </div>
</div>`
      }
    },
  },
};

// Example with mixed href and non-href items
const mixedTitleNameItems = [
  {
    id: 1,
    name: 'Home',
    href: '/',
    title: 'Home'
  },
  {
    id: 2,
    name: 'Current Page',
    title: 'Current Page (no link)'
  }
];

export const WithMixedItems = {
  args: {
    titleNameItems: mixedTitleNameItems,
    spaceInfo: {
      type: 'Public Space'
    },
  },
  parameters: {
    docs: {
      description: {
        story: `Breadcrumb showing mixed items - some with href (rendered as links) and some without href (rendered as plain text in div).

**Rendered HTML Structure:**
\`\`\`html
<div class="axero-space-header-title">
  <div class="axero-space-header-main">
  <div class="axero-space-header-title-name">
    <a title="Home" href="/" class="axero-breadcrumb-link">Home</a>&nbsp;<i class="icon-caret-right"></i>&nbsp; Current Page
  </div>
  <div class="axero-space-header-title-info">
    Public Space
  </div>
</div>
\`\`\``,
      },
      source: {
        code: `<div class="axero-space-header-title">
  <div class="axero-space-header-main">
    <div class="axero-space-header-title-name">
      <a title="Home" href="/" class="axero-breadcrumb-link">Home</a>&nbsp;<i class="icon-caret-right"></i>&nbsp; Current Page
    </div>
    <div class="axero-space-header-title-info">
      Public Space
    </div>
  </div>
</div>`
      }
    },
  },
};

// Example with all non-href items
const nonLinkTitleNameItems = [
  {
    id: 1,
    name: 'Static Item 1',
    title: 'Static Item 1'
  },
  {
    id: 2,
    name: 'Static Item 2',
    title: 'Static Item 2'
  }
];

export const WithNonLinkItems = {
  args: {
    titleNameItems: nonLinkTitleNameItems,
    spaceInfo: {
      type: 'Static Space'
    },
  },
  parameters: {
    docs: {
      description: {
        story: `Breadcrumb with items that have no href - these are rendered as plain text within div elements instead of links.

**Rendered HTML Structure:**
\`\`\`html
<div class="axero-space-header-title">
  <div class="axero-space-header-main">
  <div class="axero-space-header-title-name">
    Static Item 1 &nbsp;<i class="icon-caret-right"></i>&nbsp; Static Item 2
  </div>
  <div class="axero-space-header-title-info">
    Static Space
  </div>
</div>
\`\`\``,
      },
      source: {
        code: `<div class="axero-space-header-title">
  <div class="axero-space-header-main">
    <div class="axero-space-header-title-name">
      Static Item 1 &nbsp;<i class="icon-caret-right"></i>&nbsp; Static Item 2
    </div>
    <div class="axero-space-header-title-info">
      Static Space
    </div>
  </div>
</div>`
      }
    },
  },
};

export const DeepNavigation = {
  args: {
    titleNameItems: deepTitleNameItems,
    spaceInfo: publicSpaceInfo,
  },
  parameters: {
    docs: {
      description: {
        story: `Example of a deep navigation breadcrumb with multiple levels.

**Rendered HTML Structure:**
\`\`\`html
<div class="axero-space-header-title">
  <div class="axero-space-header-main">
  <div class="axero-space-header-title-name">
    <a title="Marketing Team" href="/spaces/123/marketing-team" class="axero-breadcrumb-link">Marketing Team</a>&nbsp;<i class="icon-caret-right"></i>&nbsp;<a title="Projects" href="/spaces/123/marketing-team/projects" class="axero-breadcrumb-link">Projects</a>&nbsp;<i class="icon-caret-right"></i>&nbsp;<a title="Q4 Campaign" href="/spaces/123/marketing-team/projects/q4-campaign" class="axero-breadcrumb-link">Q4 Campaign</a>&nbsp;<i class="icon-caret-right"></i>&nbsp;<a title="Assets" href="/spaces/123/marketing-team/projects/q4-campaign/assets" class="axero-breadcrumb-link">Assets</a>
  </div>
  <div class="axero-space-header-title-info">
    Public Space<span class="manage-space"><span class="dot">&nbsp;&nbsp;·&nbsp;&nbsp;</span><a href="/spaces/123/marketing-team/manage/default">Manage Space</a></span>
  </div>
</div>
\`\`\``,
      },
      source: {
        code: `<div class="axero-space-header-title">
  <div class="axero-space-header-main">
    <div class="axero-space-header-title-name">
      <a title="Marketing Team" href="/spaces/123/marketing-team" class="axero-breadcrumb-link">Marketing Team</a>&nbsp;<i class="icon-caret-right"></i>&nbsp;<a title="Projects" href="/spaces/123/marketing-team/projects" class="axero-breadcrumb-link">Projects</a>&nbsp;<i class="icon-caret-right"></i>&nbsp;<a title="Q4 Campaign" href="/spaces/123/marketing-team/projects/q4-campaign" class="axero-breadcrumb-link">Q4 Campaign</a>&nbsp;<i class="icon-caret-right"></i>&nbsp;<a title="Assets" href="/spaces/123/marketing-team/projects/q4-campaign/assets" class="axero-breadcrumb-link">Assets</a>
    </div>
    <div class="axero-space-header-title-info">
      Public Space<span class="manage-space"><span class="dot">&nbsp;&nbsp;·&nbsp;&nbsp;</span><a href="/spaces/123/marketing-team/manage/default">Manage Space</a></span>
    </div>
  </div>
</div>`
      }
    },
  },
};

export const SingleItem = {
  args: {
    titleNameItems: homeTitleNameItems,
    spaceInfo: {
      type: 'Home Space'
    },
  },
  parameters: {
    docs: {
      description: {
        story: `Simple breadcrumb with a single item.

**Rendered HTML Structure:**
\`\`\`html
<div class="axero-space-header-title">
  <div class="axero-space-header-main">
  <div class="axero-space-header-title-name">
    <a title="Home" href="/" class="axero-breadcrumb-link">Home</a>
  </div>
  <div class="axero-space-header-title-info">
    Home Space
  </div>
</div>
\`\`\``,
      },
      source: {
        code: `<div class="axero-space-header-title">
  <div class="axero-space-header-main">
    <div class="axero-space-header-title-name">
      <a title="Home" href="/" class="axero-breadcrumb-link">Home</a>
    </div>
    <div class="axero-space-header-title-info">
      Home Space
    </div>
  </div>
</div>`
      }
    },
  },
};
