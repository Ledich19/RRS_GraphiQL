export type NotifyType = { type: string | null; text: string | null };

export type LangState = { currentLang: string; visibilityLangBox: boolean };

export type ValidationType = {
  isEmpty: boolean;
  minLength: number;
  reGex?: {
    value: RegExp;
    text: string;
  };
};

