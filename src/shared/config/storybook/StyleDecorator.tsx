import { Story } from '@storybook/react';

import '@/app/styles/index.scss';

export const StyleDecorator = (StoryComponent: Story) => (
  <div style={{ padding: 20 }}>
    <StoryComponent />
  </div>
);
