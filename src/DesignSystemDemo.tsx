import { Button, Input, Card } from './components';

export default function DesignSystemDemo() {
  return (
    <div style={{ padding: 32, fontFamily: 'sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: 24 }}>Pika UI Design System Demo</h1>
      <Card padding="lg" style={{ marginBottom: 24 }}>
        <h2>Button</h2>
        <Button style={{ marginRight: 8 }}>Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </Card>
      <Card padding="lg" style={{ marginBottom: 24 }}>
        <h2>Input</h2>
        <Input placeholder="Type here..." style={{ marginRight: 8 }} />
        <Input size="lg" placeholder="Large input" />
      </Card>
      <Card padding="lg">
        <h2>Card</h2>
        <p>This is a card component with padding and shadow.</p>
      </Card>
    </div>
  );
}
