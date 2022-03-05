import { ISocial } from "../../types/elements";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { ElementType } from "react";
import { Icon, IconProps, Link } from "@chakra-ui/react";

const SocialIcon: { [Key in ISocial["social"]]: ElementType } = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
  facebook: FaFacebook,
};

interface SocialProps extends IconProps {
  data: ISocial;
}

export function Social({ data, ...rest }: SocialProps) {
  return (
    <Link href={data.url} isExternal>
      <Icon aria-label={data.social} as={SocialIcon[data.social]} {...rest} />
    </Link>
  );
}
