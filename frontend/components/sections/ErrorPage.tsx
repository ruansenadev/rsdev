import { Alert, AlertDescription, Box, AlertTitle, Flex, FlexProps } from "@chakra-ui/react";

interface ErrorPageProps extends FlexProps {}

export function ErrorPage({ ...rest }: ErrorPageProps) {
  return (
    <Flex justifyContent="center" align="center" w="full" {...rest}>
      <Alert
        w="min-intrinsic"
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Box fontSize="3xl">😕</Box>
        <AlertTitle mt={4} mb={1} fontSize="xl">
          404
        </AlertTitle>
        <AlertDescription maxWidth="sm" fontSize="lg">
          Esta página não existe.
        </AlertDescription>
      </Alert>
    </Flex>
  );
}
