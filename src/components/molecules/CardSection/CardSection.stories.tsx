import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardSection } from './CardSection';
import { Paragraph } from '../../atoms/Typography/Paragraph';
import { Heading } from '../../atoms/Typography/Heading';
import { colors } from '../../../tokens';

const meta = {
  title: 'Molecules/CardSection',
  component: CardSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CardSection>;

export default meta;
type Story = StoryObj<typeof CardSection>;

export const Default: Story = {

  render: () => (
    <CardSection>
      <Paragraph>This is a card with content inside.</Paragraph>
    </CardSection>
  ),
};

export const WithHeader: Story = {
  args: { header: '' },
  render: () => (
    <CardSection
      header={<Heading level={3}>Card Header</Heading>}
    >
      <Paragraph>This card has a header section.</Paragraph>
    </CardSection>
  ),
};

export const WithFooter: Story = {
  args: { footer: '' },
  render: () => (
    <CardSection
      footer={<Paragraph size="sm">© 2024 Card Footer</Paragraph>}
    >
      <Paragraph>This card has a footer section.</Paragraph>
    </CardSection>
  ),
};

export const WithHeaderAndFooter: Story = {
  args: { header: '', footer: '' },
  render: () => (
    <CardSection
      header={<Heading level={3}>Title</Heading>}
      footer={<Paragraph size="sm">Updated 2 hours ago</Paragraph>}
    >
      <Paragraph>This card has both header and footer sections.</Paragraph>
    </CardSection>
  ),
};

export const Elevated: Story = {

  render: () => (
    <CardSection
      variant="elevated"
      header={<Heading level={3}>Elevated Card</Heading>}
    >
      <Paragraph>This card has an elevated shadow effect.</Paragraph>
    </CardSection>
  ),
};

export const VotingResults: Story = {

  render: () => (
    <CardSection
      header={<Heading level={2}>Voting Results</Heading>}
      footer={
        <Paragraph size="sm" color="muted">
          100 votes total
        </Paragraph>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Paragraph>👧 Team Pink: 62 votes (62%)</Paragraph>
        <Paragraph>👦 Team Blue: 38 votes (38%)</Paragraph>
      </div>
    </CardSection>
  ),
};

export const EventInfo: Story = {

  render: () => (
    <CardSection
      header={<Heading level={3}>Gender Reveal Party</Heading>}
      footer={
        <Paragraph size="sm" color="muted">
          📍 Saturday, March 15 at 2:00 PM
        </Paragraph>
      }
    >
      <Paragraph>Join us for an exciting gender reveal celebration!</Paragraph>
      <Paragraph size="sm" color="muted">
        Casual dress • Refreshments provided
      </Paragraph>
    </CardSection>
  ),
};

export const PaddingSmall: Story = {

  render: () => (
    <CardSection
      padding="sm"
      header={<Heading level={4}>Compact</Heading>}
    >
      <Paragraph size="sm">Minimal padding version.</Paragraph>
    </CardSection>
  ),
};

export const PaddingMedium: Story = {

  render: () => (
    <CardSection
      padding="md"
      header={<Heading level={4}>Standard</Heading>}
    >
      <Paragraph>Standard padding version.</Paragraph>
    </CardSection>
  ),
};

export const PaddingLarge: Story = {

  render: () => (
    <CardSection
      padding="lg"
      header={<Heading level={4}>Spacious</Heading>}
    >
      <Paragraph>Extra spacious padding version.</Paragraph>
    </CardSection>
  ),
};

export const CustomHeaderColor: Story = {

  render: () => (
    <CardSection
      header={<Heading level={3}>Custom Header</Heading>}
      headerBackground={colors.light.primary}
    >
      <Paragraph>This card has a custom header background color.</Paragraph>
    </CardSection>
  ),
};

export const AllVariations: Story = {

  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
      <div>
        <h3>Default Variant</h3>
        <CardSection header={<Heading level={4}>Default</Heading>}>
          <Paragraph size="sm">Border only, no shadow.</Paragraph>
        </CardSection>
      </div>
      <div>
        <h3>Elevated Variant</h3>
        <CardSection variant="elevated" header={<Heading level={4}>Elevated</Heading>}>
          <Paragraph size="sm">Border + shadow effect.</Paragraph>
        </CardSection>
      </div>
      <div>
        <h3>With All Sections</h3>
        <CardSection
          header={<Heading level={4}>Complete</Heading>}
          footer={<Paragraph size="sm">Footer text</Paragraph>}
        >
          <Paragraph size="sm">Content goes here.</Paragraph>
        </CardSection>
      </div>
    </div>
  ),
};
