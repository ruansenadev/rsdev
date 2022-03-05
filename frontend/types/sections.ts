import { StrapiComp, StrapiDynamic } from "./api/rest";
import { ActionCard } from "./elements";

export interface SectionComponent<T> {
  data: StrapiDynamic<T>;
}

export type MainActions = {
  cards: StrapiComp<ActionCard>[];
};
