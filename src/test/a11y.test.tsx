/**
 * Accessibility smoke tests — every component is rendered in representative
 * configurations and checked with the sa11y `toBeAccessible` matcher
 * (axe-core, WCAG 2.1 A/AA base ruleset) under jsdom.
 *
 * jsdom has no layout engine, so colour-contrast rules do not run here — those
 * are covered per-story by `@storybook/addon-a11y` (`color-contrast-enhanced`,
 * AAA) in the `storybook` project. These tests guard the structural side of
 * accessibility: roles, names, label associations and ARIA wiring.
 */
import type { ReactElement } from 'react';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import { Badge } from '../components/atoms/Badge';
import { Button } from '../components/atoms/Button';
import { Card } from '../components/atoms/Card';
import { Checkbox } from '../components/atoms/Checkbox';
import { Input } from '../components/atoms/Input';
import { Radio } from '../components/atoms/Radio';
import { Tags } from '../components/atoms/Tags';
import { Toggle } from '../components/atoms/Toggle';
import { Heading, Paragraph, Text } from '../components/atoms/Typography';

import { ButtonGroup } from '../components/molecules/ButtonGroup';
import { CardSection } from '../components/molecules/CardSection';
import { CheckboxGroup } from '../components/molecules/CheckboxGroup';
import { FormField } from '../components/molecules/FormField';
import { RadioGroup } from '../components/molecules/RadioGroup';

import { ConfirmationPanel } from '../components/organisms/ConfirmationPanel';
import { CountdownPanel } from '../components/organisms/CountdownPanel';
import { EventHero } from '../components/organisms/EventHero';
import { QRBlock } from '../components/organisms/QRBlock';
import { ResultsPanel } from '../components/organisms/ResultsPanel';
import { VotePanel } from '../components/organisms/VotePanel';

/** Render `ui`, then assert the whole document has no axe violations. */
async function expectAccessible(ui: ReactElement) {
  render(ui);
  await expect(document.body).toBeAccessible();
}

describe('atoms — accessibility', () => {
  it('Button — every variant has an accessible name', async () => {
    await expectAccessible(
      <>
        <Button variant="primary">Play</Button>
        <Button variant="secondary">Pause</Button>
        <Button variant="accent">Insert coin</Button>
        <Button variant="destructive">Reset</Button>
        <Button disabled>Locked</Button>
      </>,
    );
  });

  it('Badge — informative text', async () => {
    await expectAccessible(
      <>
        <Badge>New</Badge>
        <Badge variant="destructive">Sold out</Badge>
      </>,
    );
  });

  it('Card / CardSection — landmark-free content containers', async () => {
    await expectAccessible(
      <Card>
        <Paragraph>Card body copy.</Paragraph>
      </Card>,
    );
  });

  it('Input — labelled control', async () => {
    await expectAccessible(
      <>
        <label htmlFor="player-name">Player name</label>
        <Input id="player-name" />
        <Input aria-label="Search" size="lg" />
      </>,
    );
  });

  it('Checkbox — with and without the built-in label', async () => {
    await expectAccessible(
      <>
        <Checkbox label="Remember me" />
        <Checkbox aria-label="Select row" />
        <Checkbox label="Disabled option" disabled />
      </>,
    );
  });

  it('Radio — labelled options', async () => {
    await expectAccessible(
      <>
        <Radio name="team" value="a" label="Team A" />
        <Radio name="team" value="b" label="Team B" />
      </>,
    );
  });

  it('Toggle — switch role with an accessible name', async () => {
    await expectAccessible(
      <>
        <Toggle label="Dark mode" />
        <Toggle aria-label="Sound" checked readOnly />
      </>,
    );
  });

  it('Tags — plain and removable', async () => {
    await expectAccessible(
      <>
        <Tags label="React" />
        <Tags label="Vite" removable onRemove={() => {}} />
      </>,
    );
  });

  it('Typography — headings, paragraphs and inline text', async () => {
    await expectAccessible(
      <>
        <Heading level={1}>Page title</Heading>
        <Heading level={2}>Section</Heading>
        <Paragraph>Body paragraph.</Paragraph>
        <Text>Inline text</Text>
      </>,
    );
  });
});

describe('molecules — accessibility', () => {
  it('ButtonGroup — grouped actions', async () => {
    await expectAccessible(
      <ButtonGroup aria-label="Vote">
        <Button>Yes</Button>
        <Button>No</Button>
      </ButtonGroup>,
    );
  });

  it('CardSection — header / body / footer bands', async () => {
    await expectAccessible(
      <CardSection header={<Heading level={3}>Ballot</Heading>} footer={<Text>Closes soon</Text>}>
        <Paragraph>Pick one option below.</Paragraph>
      </CardSection>,
    );
  });

  it('FormField — label, required marker, hint and error', async () => {
    await expectAccessible(
      <>
        <FormField label="Email" required hint="We never share it">
          <Input aria-label="Email" type="email" />
        </FormField>
        <FormField label="Nickname" error="Already taken">
          <Input aria-label="Nickname" />
        </FormField>
      </>,
    );
  });

  it('CheckboxGroup — grouped multi-select', async () => {
    await expectAccessible(
      <CheckboxGroup
        aria-label="Toppings"
        options={[
          { value: 'a', label: 'Pepperoni' },
          { value: 'b', label: 'Mushroom' },
          { value: 'c', label: 'Pineapple', disabled: true },
        ]}
        values={['a']}
        onChange={() => {}}
      />,
    );
  });

  it('RadioGroup — grouped single-select', async () => {
    await expectAccessible(
      <RadioGroup
        name="color"
        aria-label="Reveal colour"
        options={[
          { value: 'pink', label: 'Pink' },
          { value: 'blue', label: 'Blue' },
        ]}
        value="pink"
        onChange={() => {}}
      />,
    );
  });
});

describe('organisms — accessibility', () => {
  it('EventHero — with and without the optional level/tags/kicker', async () => {
    await expectAccessible(
      <>
        <EventHero
          title="GENDER REVEAL"
          kicker="Insert coin"
          tagline="Pick a team before the cabinet calls it."
          level={1}
          tags={['Dec 14', '4:00 PM', 'Valle Dorado']}
        />
        <EventHero title="Baby shower" ground="paper" />
      </>,
    );
  });

  it('CountdownPanel — running and expired', async () => {
    await expectAccessible(
      <>
        <CountdownPanel target="2099-01-01T00:00:00Z" caption="January 1, 2099" />
        <CountdownPanel target="2000-01-01T00:00:00Z" expiredSlot={<span>Voting is open</span>} />
      </>,
    );
  });

  it('VotePanel — locked, unlocked and in error', async () => {
    const options = [
      { id: 'girl', label: 'TEAM GIRL', variant: 'primary' as const },
      { id: 'boy', label: 'TEAM BOY', variant: 'secondary' as const },
    ];
    await expectAccessible(
      <>
        <VotePanel options={options} onVote={() => {}} />
        <VotePanel options={options} onVote={() => {}} name="Danna" />
        <VotePanel options={options} onVote={() => {}} error="Something went wrong" />
      </>,
    );
  });

  it('ResultsPanel — empty, in progress and with a leader', async () => {
    await expectAccessible(
      <>
        <ResultsPanel
          tallies={[
            { id: 'girl', label: 'Team girl', count: 0, variant: 'primary' },
            { id: 'boy', label: 'Team boy', count: 0, variant: 'secondary' },
          ]}
        />
        <ResultsPanel
          tallies={[
            { id: 'girl', label: 'Team girl', count: 28, variant: 'primary' },
            { id: 'boy', label: 'Team boy', count: 20, variant: 'secondary' },
          ]}
        />
      </>,
    );
  });

  it('ConfirmationPanel — saved and failed', async () => {
    await expectAccessible(
      <>
        <ConfirmationPanel voterName="Danna" choiceLabel="Team Girl" onReset={() => {}} />
        <ConfirmationPanel status="failed" onRetry={() => {}} />
      </>,
    );
  });

  it('QRBlock — full block, compact aside and expired', async () => {
    await expectAccessible(
      <>
        <QRBlock url="https://example.com/live" caption="Watching from abroad?" destination="Opens the livestream." />
        <QRBlock url="https://example.com/live" size="sm" caption="Scan to join live" />
        <QRBlock url="https://example.com/live" expired="The stream has ended." />
      </>,
    );
  });
});
