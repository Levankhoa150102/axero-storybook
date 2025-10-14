import React from 'react';
import { Tags } from './Tags.jsx';
import { action } from '@storybook/addon-actions';

export default {
    title: 'UI Components/Tags',
    component: Tags,
    parameters: {
        layout: 'centered',
    },
};

export const Default = {
    args: {
        tags: ['rocket', 'sale'],
        editMode: false,
        variant: 'label',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default tags in label variant.',
            },
            source: {
                code: `<div class="tags-cp-container">
  <span class="tag-cp label">
    <span class="tag-cp-text">rocket</span>
  </span>
  <span class="tag-cp label">
    <span class="tag-cp-text">sale</span>
  </span>
</div>`,
            },
        },
    },
};

export const EditMode = {
  render: function(args) {
    const [tags, setTags] = React.useState(args.tags);
    
    const handleRemove = (tagIndex, tagValue) => {
      setTags(prevTags => prevTags.filter((_, index) => index !== tagIndex));
    };
    
    return React.createElement(Tags, {
      ...args,
      tags: tags,
      onRemove: handleRemove
    });
  },
  args: {
    tags: ['rocket', 'sale'],
    editMode: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tags in edit mode show remove buttons (x) that allow users to delete tags.',
      },
      source: {
        code: `<div class="tags-cp-container edit-mode">
  <span class="tag-cp label">
    <span class="tag-cp-text">rocket</span>
    <span class="tag-cp-remove" title="Remove tag" aria-label="Remove rocket tag">
      <i class="fas fa-times"></i>
    </span>
  </span>
  <span class="tag-cp label">
    <span class="tag-cp-text">sale</span>
    <span class="tag-cp-remove" title="Remove tag" aria-label="Remove sale tag">
      <i class="fas fa-times"></i>
    </span>
  </span>
</div>`,
      },
    },
  },
};