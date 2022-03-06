import { Menu, MenuButton, MenuList, MenuItem, IconButton, Center, Box } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { ActiveLink } from "./elements/Links/ActiveLink";
import Cookies from "js-cookie";
import { getLocalizedPage, localizePath } from "../utils/strapi";
import { IPageContext } from "../types/page";

interface LocaleSwitchProps {
  pageContext: IPageContext;
}

export function LocaleSwitch({ pageContext }: LocaleSwitchProps) {
  const isMounted = useRef(false);
  const router = useRouter();
  const [locale, setLocale] = useState<string>();

  const handleLocaleChange = async (selectedLocale: string) => {
    // Persist the user's language preference
    // https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
    Cookies.set("NEXT_LOCALE", selectedLocale);
    setLocale(selectedLocale);
  };

  const handleLocaleChangeRef = useRef(handleLocaleChange);

  useEffect(() => {
    const localeCookie = Cookies.get("NEXT_LOCALE");
    if (!localeCookie) {
      handleLocaleChangeRef.current(router.locale);
    }

    const checkLocaleMismatch = async () => {
      if (!isMounted.current && localeCookie && localeCookie !== pageContext.locale) {
        // Redirect to locale page if locale mismatch
        const localePage = await getLocalizedPage(localeCookie, pageContext);

        router.push(`${localizePath({ ...pageContext, ...localePage })}`, `${localizePath({ ...pageContext, ...localePage })}`, {
          locale: localePage.locale,
        });
      }
    };

    setLocale(localeCookie || router.locale);
    checkLocaleMismatch();

    return () => {
      isMounted.current = true;
    };
  }, [locale, router, pageContext]);

  return (
    <Box>
      <Menu placement="bottom-end">
        <MenuButton
          as={IconButton}
          icon={
            <Center w="full" h="full">
              🌎
            </Center>
          }
          fontSize="xl"
          variant="outline"
          aria-label="Idioma do site"
        />
        <MenuList minW="28">
          {pageContext.localizedPaths &&
            pageContext.localizedPaths.map(({ href, locale, flag }) => {
              return (
                <ActiveLink href={href} key={locale} locale={locale}>
                  <MenuItem icon={<Center>{flag}</Center>} onClick={() => handleLocaleChange(locale)} key={locale}>
                    {locale}
                  </MenuItem>
                </ActiveLink>
              );
            })}
        </MenuList>
      </Menu>
    </Box>
  );
}
