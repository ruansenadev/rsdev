import { ButtonProps as ChakraButtonProps, Button as ChakraButton, Box } from "@chakra-ui/react";
import { IButton } from "../../../types/elements";

interface CustomButtonProps extends ChakraButtonProps {
  button: IButton;
}

export function CustomButton({ button, ...rest }: CustomButtonProps) {
  return (
    <ChakraButton
      variant={button.variant}
      leftIcon={button.leftGlyph ? <Box>{button.leftGlyph}</Box> : null}
      rightIcon={button.rightGlyph ? <Box>{button.rightGlyph}</Box> : null}
      {...rest}
    >
      {button.text}
    </ChakraButton>
  );
}
