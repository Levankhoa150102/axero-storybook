import React from 'react';
import LeftSidebarNavigation from './LeftSidebarNavigation';

// Sample navigation data - main navigation items
const sampleNavigationItems = [
  {
    id: -1,
    name: 'Activity Stream',
    href: '',
    title: 'Activity Stream',
    icon: 'icon-list',
    customClass: 'ax-space-menu-activitystream',
    tabType: 1,
    entityType: 10,
    contentType: 0,
    contentId: 0,
    sortOrder: 1,
    resourceKey: 'GlobalActivityStreamText'
  },
  {
    id: -3,
    name: 'Info',
    href: '',
    title: 'Info',
    icon: 'icon-info-sign',
    customClass: 'ax-space-menu-info',
    tabType: 7,
    entityType: 13,
    contentType: 0,
    contentId: 0,
    sortOrder: 2,
    resourceKey: 'GlobalInfoText'
  },
  {
    id: -4,
    name: 'People',
    href: '',
    title: 'People',
    icon: 'icon-group',
    customClass: 'ax-space-menu-people',
    tabType: 1,
    entityType: 15,
    contentType: 0,
    contentId: 0,
    sortOrder: 3,
    resourceKey: 'HeaderMenuPeopleText'
  },
  {
    id: -5,
    name: 'Search',
    href: '',
    title: 'Search',
    icon: 'icon-search',
    customClass: 'ax-space-menu-search',
    tabType: 8,
    entityType: 0,
    contentType: 0,
    contentId: 0,
    sortOrder: 4,
    resourceKey: 'GlobalSearchMainText'
  }
];

// Content group items - will be rendered under "Content" group
const sampleContentGroupItems = [
  {
    id: -8,
    name: 'Articles',
    href: '',
    title: 'Articles',
    icon: 'icon-file',
    customClass: 'ax-space-menu-articles',
    tabType: 1,
    entityType: 3,
    contentType: 0,
    contentId: 0,
    sortOrder: 1,
    resourceKey: 'ArticleManageArticlesText'
  },
  {
    id: -9,
    name: 'Blogs',
    href: '',
    title: 'Blogs',
    icon: 'icon-copy',
    customClass: 'ax-space-menu-blogs',
    tabType: 1,
    entityType: 4,
    contentType: 0,
    contentId: 0,
    sortOrder: 2,
    resourceKey: 'HomePageBlogsText'
  },
  {
    id: -10,
    name: 'Calendar',
    href: '',
    title: 'Calendar',
    icon: 'icon-calendar',
    customClass: 'ax-space-menu-calendar',
    tabType: 1,
    entityType: 5,
    contentType: 0,
    contentId: 0,
    sortOrder: 3,
    resourceKey: 'EventCalendarViewText'
  }
];

// Space options - bottom section actions
const sampleSpaceOptions = [
  {
    id: 'stop-email',
    name: 'Stop Activity Email',
    icon: 'icon-remove-sign',
    onClick: () => console.log('Stop Activity Email clicked')
  },
  {
    id: 'create-subspace',
    name: 'Create Sub Space',
    icon: 'icon-sitemap',
    onClick: () => console.log('Create Sub Space clicked')
  },
  {
    id: 'copy-space',
    name: 'Copy Space',
    icon: 'icon-cogs',
    onClick: () => console.log('Copy Space clicked')
  }
];

export default {
  title: 'Navigation/LeftSidebarNavigation',
  component: LeftSidebarNavigation,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    navigationItems: {
      description: 'Array of main navigation items to display in the sidebar',
      control: { type: 'object' },
    },
    contentGroupItems: {
      description: 'Array of content items to display under the Content group',
      control: { type: 'object' },
    },
    spaceOptions: {
      description: 'Array of space option items to display at the bottom',
      control: { type: 'object' },
    },
    onEditToggle: {
      description: 'Callback function when edit navigation is clicked',
      action: 'edit-toggle',
    },
    onItemClick: {
      description: 'Callback function when a navigation item is clicked',
      action: 'item-click',
    },
  },
};

export const Default = {
  args: {
    navigationItems: sampleNavigationItems,
    contentGroupItems: sampleContentGroupItems,
    spaceOptions: sampleSpaceOptions,
  },
  parameters: {
    docs: {
      description: {
        story: `The default left sidebar navigation with sample navigation items including Activity Stream, Info, People, Search, and content items like Articles, Blogs, and Calendar.

**Rendered HTML Structure:**
\`\`\`html
<div class="axero-space-menu">
  <div id="axero-space-nav" class="axero-space-nav-container">
    <div class="axero-space-navigation">
      <ul id="sortable">
        <li id="id_-1" class="axero-space-navigation-item sortable ax-space-menu-activitystream item-not-header">
          <div>
            <a href="" target="_self" title="Activity Stream" class="axero-space-navigation-link">
              <div class="axero-space-navigation-item-icon">
                <span class="icon-list"></span>
              </div>
              <div class="axero-space-navigation-item-name">Activity Stream</div>
            </a>
          </div>
        </li>
        <!-- Additional navigation items... -->
      </ul>
    </div>
    <ul class="axero-space-tab-options visible-desktop">
      <li>
        <a class="axero-space-add-tab-link" id="EditSpaceTabOrderLink">Edit Navigation</a>
      </li>
    </ul>
  </div>
  <div id="options">
    <ul class="axero-space-page-options">
      <li><a><span class="icon-remove-sign"></span> Stop Activity Email</a></li>
      <li><a><span class="icon-sitemap"></span> Create Sub Space</a></li>
      <li><a><span class="icon-cogs"></span> Copy Space</a></li>
    </ul>
  </div>
</div>
\`\`\``,
      },
      source: {
        code: `<div class="axero-space-menu">
  <div id="axero-space-nav" class="axero-space-nav-container">
    <div class="axero-space-navigation">
      <ul id="sortable">
        <!-- Main Navigation Items -->
        <li id="id_-1" data-tab-type="1" data-entity-type="10" data-content-type="0" data-content-id="0" data-custom-class="ax-space-menu-activitystream" data-sort-order="1" class="axero-space-navigation-item sortable ax-space-menu-activitystream item-not-header">
          <div>
            <a href="" target="_self" title="Activity Stream" class="axero-space-navigation-link">
              <div class="axero-space-navigation-item-icon">
                <span class="icon-list"></span>
              </div>
              <div class="axero-space-navigation-item-name" data-resourcekey="GlobalActivityStreamText">Activity Stream</div>
            </a>
          </div>
        </li>
        
        <li id="id_-3" data-tab-type="7" data-entity-type="13" data-content-type="0" data-content-id="0" data-custom-class="ax-space-menu-info" data-sort-order="2" class="axero-space-navigation-item sortable ax-space-menu-info item-not-header">
          <div>
            <a href="" target="_self" title="Info" class="axero-space-navigation-link">
              <div class="axero-space-navigation-item-icon">
                <span class="icon-info-sign"></span>
              </div>
              <div class="axero-space-navigation-item-name" data-resourcekey="GlobalInfoText">Info</div>
            </a>
          </div>
        </li>
        
        <li id="id_-4" data-tab-type="1" data-entity-type="15" data-content-type="0" data-content-id="0" data-custom-class="ax-space-menu-people" data-sort-order="3" class="axero-space-navigation-item sortable ax-space-menu-people item-not-header">
          <div>
            <a href="" target="_self" title="People" class="axero-space-navigation-link">
              <div class="axero-space-navigation-item-icon">
                <span class="icon-group"></span>
              </div>
              <div class="axero-space-navigation-item-name" data-resourcekey="HeaderMenuPeopleText">People</div>
            </a>
          </div>
        </li>
        
        <li id="id_-5" data-tab-type="8" data-entity-type="0" data-content-type="0" data-content-id="0" data-custom-class="ax-space-menu-search" data-sort-order="4" class="axero-space-navigation-item sortable ax-space-menu-search item-not-header">
          <div>
            <a href="" target="_self" title="Search" class="axero-space-navigation-link">
              <div class="axero-space-navigation-item-icon">
                <span class="icon-search"></span>
              </div>
              <div class="axero-space-navigation-item-name" data-resourcekey="GlobalSearchMainText">Search</div>
            </a>
          </div>
        </li>
        
        <!-- Content Group -->
        <li id="id_-7" data-tab-type="2" data-entity-type="0" data-content-type="0" data-content-id="0" data-custom-class="ax-space-menu-content" data-sort-order="7" class="axero-space-navigation-item sortable ax-space-menu-content item-header item-expanded header-no-icon header-no-name">
          <div>
          </div>
          <ul>
            <li id="id_-8" data-tab-type="1" data-entity-type="3" data-content-type="0" data-content-id="0" data-custom-class="ax-space-menu-articles" data-sort-order="1" class="axero-space-navigation-item sortable ax-space-menu-articles item-not-header">
              <div>
                <a href="" target="_self" title="Articles" class="axero-space-navigation-link">
                  <div class="axero-space-navigation-item-icon">
                    <span class="icon-file"></span>
                  </div>
                  <div class="axero-space-navigation-item-name" data-resourcekey="ArticleManageArticlesText">Articles</div>
                </a>
              </div>
            </li>
            
            <li id="id_-9" data-tab-type="1" data-entity-type="4" data-content-type="0" data-content-id="0" data-custom-class="ax-space-menu-blogs" data-sort-order="2" class="axero-space-navigation-item sortable ax-space-menu-blogs item-not-header">
              <div>
                <a href="" target="_self" title="Blogs" class="axero-space-navigation-link">
                  <div class="axero-space-navigation-item-icon">
                    <span class="icon-copy"></span>
                  </div>
                  <div class="axero-space-navigation-item-name" data-resourcekey="HomePageBlogsText">Blogs</div>
                </a>
              </div>
            </li>
            
            <li id="id_-10" data-tab-type="1" data-entity-type="5" data-content-type="0" data-content-id="0" data-custom-class="ax-space-menu-calendar" data-sort-order="3" class="axero-space-navigation-item sortable ax-space-menu-calendar item-not-header">
              <div>
                <a href="" target="_self" title="Calendar" class="axero-space-navigation-link">
                  <div class="axero-space-navigation-item-icon">
                    <span class="icon-calendar"></span>
                  </div>
                  <div class="axero-space-navigation-item-name" data-resourcekey="EventCalendarViewText">Calendar</div>
                </a>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    
    <!-- Edit Navigation Options -->
    <ul class="axero-space-tab-options visible-desktop">
      <li>
        <a class="axero-space-add-tab-link" href="#" id="EditSpaceTabOrderLink">Edit Navigation</a>
      </li>
    </ul>
  </div>

  <!-- Space Options -->
  <div id="options">
    <ul class="axero-space-page-options">
      <li>
        <a>
          <span class="icon-remove-sign"></span> Stop Activity Email
        </a>
      </li>
      <li>
        <a>
          <span class="icon-sitemap"></span> Create Sub Space
        </a>
      </li>
      <li>
        <a>
          <span class="icon-cogs"></span> Copy Space
        </a>
      </li>
    </ul>
  </div>
</div>`
      }
    }
  }
};
