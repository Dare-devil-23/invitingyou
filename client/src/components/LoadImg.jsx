import { getBaseUrl } from "../axios";

export default function LoadImg({ src, ...rest }) {
  src = src && src.includes('https://')
    ? src
    : `${getBaseUrl()}/uploads/` + src;
  return (
    <img {...rest} src={src} alt={''} />
  );
}