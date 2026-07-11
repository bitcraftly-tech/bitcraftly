import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/typography";

export function FooterSection() {
  return (
    <footer
      id="footer"
      className="bg-background text-foreground py-[var(--space-6)]"
    >
      <Container>
        <Text as="span" size="sm" muted>
          Footer
        </Text>
        {/* TODO: HP-012 Homepage footer */}
      </Container>
    </footer>
  );
}
