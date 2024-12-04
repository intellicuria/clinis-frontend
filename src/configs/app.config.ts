export type AppConfig = {
  apiPrefix: string;
  noPrefix: string;
  authenticatedEntryPath: string;
  unAuthenticatedEntryPath: string;
  tourPath: string;
  onBoard: string;
  verifyOTP: string;
  locale: string;
  enableMock: boolean;
};

const appConfig: AppConfig = {
  apiPrefix: "/api",
  noPrefix: "/",
  authenticatedEntryPath: "/start",
  unAuthenticatedEntryPath: "/sign-in",
  tourPath: "/app/account/kyc-form",
  onBoard: "/pages/welcome",
  verifyOTP: "/verify-otp",
  locale: "en",
  enableMock: false,
};
// /verify-otp

export default appConfig;
