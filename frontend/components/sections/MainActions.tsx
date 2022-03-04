import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";
import { SectionComponent, MainActions } from "../../types/sections";
import { ActionCard } from "../elements/ActionCard";

export function MainActions({ data, ...rest }: SimpleGridProps & SectionComponent<MainActions>) {
  return (
    <SimpleGrid columns={[1, null, 2]} spacing={["10", null, "20", "32"]} my="auto" {...rest}>
      {data?.cards.map((card) => (
        <ActionCard key={card.button.text + card.id} data={card} />
      ))}
    </SimpleGrid>
  );
}
