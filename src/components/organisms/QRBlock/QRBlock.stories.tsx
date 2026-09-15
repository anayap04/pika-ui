import type { Meta, StoryObj } from '@storybook/react-vite';
import { QRBlock } from './QRBlock';

const meta = {
  title: 'Organisms/QRBlock',
  component: QRBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Moves a viewer to a second device. A QR at a whole-pixel module size, a caption saying where it goes, and — always — a tappable fallback link for the person already holding the phone. The pattern shown is a documented placeholder; a real code needs a runtime dependency (`qrcode.react` or equivalent) not yet added to this library.',
      },
    },
  },
} satisfies Meta<typeof QRBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: 'https://example.com/live',
    caption: 'Watching from abroad?',
    destination: 'Opens the livestream. 7:00 PM Mexico City · 8:00 PM Bogotá.',
  },
};

export const Compact: Story = {
  args: {
    url: 'https://example.com/live',
    size: 'sm',
    caption: 'Scan to join live',
  },
};

export const Expired: Story = {
  args: {
    url: 'https://example.com/live',
    caption: 'Watching from abroad?',
    expired: 'The stream has ended. The recording lands here tomorrow.',
  },
};

export const CompactExpired: Story = {
  args: {
    url: 'https://example.com/live',
    size: 'sm',
    expired: true,
  },
};

export const Night: Story = {
  args: {
    url: 'https://example.com/live',
    caption: 'Watching from abroad?',
    destination: 'Opens the livestream.',
  },
  parameters: {
    globals: { theme: 'dark' },
  },
};
