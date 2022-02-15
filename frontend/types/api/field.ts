export type ImageField = {
  name: string;
  alternativeText: string;
  url: string;
  width: number;
  height: number;
  formats: {
    [key: string]: ImageField;
  };
  mime: string;
}