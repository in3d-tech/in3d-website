import { useTranslation } from "react-i18next";

export function t(text) {
  if (!text || typeof text != "string") {
    return "";
  }

  const { t: translate } = useTranslation();

  return translate(text);
}
