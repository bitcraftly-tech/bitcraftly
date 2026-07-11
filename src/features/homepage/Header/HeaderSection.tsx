import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/typography";

export function HeaderSection() {
  return (
    <header
      id="header"
      className="bg-background text-foreground py-[var(--space-4)]"
    >
      <Container>
        <Text as="span" size="sm" muted>
          Header
        </Text>
        {/* TODO: HP-001 Homepage header */}
      </Container>
    </header>
  );
}
