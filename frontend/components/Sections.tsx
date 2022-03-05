import { VStack } from "@chakra-ui/react";
import { ElementType } from "react";
import { StrapiDynamic } from "../types/api/rest";
import { IHomePage } from "../types/page";
import { MainActions } from "./sections/MainActions";

// Map Strapi sections to section components
const sectionComponents: { [key: string]: ElementType } = {
  "sections.main-actions": MainActions,
};

interface SectionProps {
  sectionData: StrapiDynamic<Partial<IHomePage["contentSections"][0]>>;
}
// Display a section individually
function Section({ sectionData }: SectionProps) {
  // Prepare the component
  const SectionComponent = sectionComponents[sectionData.__component];

  if (!SectionComponent) {
    return null;
  }

  // Display the section
  return <SectionComponent data={sectionData} />;
}

interface SectionsProps {
  sections: IHomePage["contentSections"];
}
// Display the list of sections
export function Sections({ sections }: SectionsProps) {
  return (
    <VStack w="full">
      {/* Show the actual sections */}
      {sections.map((section) => (
        <Section sectionData={section} key={`${section.__component}${section.id}`} />
      ))}
    </VStack>
  );
}
