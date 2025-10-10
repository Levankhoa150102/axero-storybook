import { Rating } from './Rating';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI Components/Rating',
  component: Rating,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // Remove autodocs tag to avoid conflict with custom MDX documentation
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    initialRating: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
    },
    numberOfStars: {
      control: { type: 'number', min: 1, max: 10 },
    },
    averageRating: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
    },
    totalVotes: {
      control: { type: 'number', min: 0 },
    },
    enableHalfStar: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    showValues: {
      control: 'boolean',
    },
    showAverageTotal: {
      control: 'boolean',
    },
    ratingMode: {
      control: { type: 'select' },
      options: ['default', 'vote', 'self'],
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    initialRating: 0,
    numberOfStars: 5,
    enableHalfStar: true,
    readonly: false,
    averageRating: 0,
    totalVotes: 0,
    showValues: false,
    showAverageTotal: true,
  },
  parameters: {
    docs: {
      source: {
        code: Rating.generateHTML({
          initialRating: 0,
          numberOfStars: 5,
          enableHalfStar: true,
          readonly: false,
          ratingMode: 'default',
          averageRating: 3.8,
          totalVotes: 128,
          showValues: false,
          showAverageTotal: true,
        }),
        language: 'html',
      },
    },
  },
};

export const SelfRatingMode = {
  args: {
    initialRating: 4,
    numberOfStars: 5,
    enableHalfStar: true,
    readonly: false,
    ratingMode: 'self',
    averageRating: 4,
    totalVotes: 1,
    showValues: false,
    showAverageTotal: true,
  },
  parameters: {
    docs: {
      source: {
        code: Rating.generateHTML({
          initialRating: 4,
          numberOfStars: 5,
          enableHalfStar: true,
          readonly: false,
          ratingMode: 'self',
          averageRating: 4,
          totalVotes: 1,
          showValues: false,
          showAverageTotal: true,
        }),
        language: 'html',
      },
    },
  },
};
