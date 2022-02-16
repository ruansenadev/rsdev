import { AxiosError, AxiosResponse } from "axios";

export type StrapiEntryAttr<T> = T & { createdAt: string; updatedAt: string; publishedAt?: string; locale?: string };

export type StrapiEntry<T> = {
  id: number | string;
  attributes: StrapiEntryAttr<T>;
  meta?: any;
};

export type StrapiData<T> = {
  data?: StrapiEntry<T>;
};
export type StrapiDataList<T> = {
  data: StrapiEntry<T>[];
};

export type StrapiResponseData<T> = StrapiData<T> & {
  meta?: any;
  error?: any;
};
export type StrapiResponseDataList<T> = StrapiDataList<T> & {
  meta?: any;
  error?: any;
};

export type StrapiResponse<T = any> = AxiosResponse<StrapiResponseData<T>>;
export type StrapiResponseList<T = any> = AxiosResponse<StrapiResponseDataList<T>>;

export type StrapiError = AxiosError<StrapiResponseData<{}> & { error: any }>;
