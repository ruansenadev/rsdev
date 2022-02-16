export type MediaField = {
  name: string;
  url: string;
  width: number;
  height: number;
  mime: string;
};

export type ImageField = MediaField & {
  alternativeText?: string;
  formats: {
    [key: string]: ImageField;
  };
};
