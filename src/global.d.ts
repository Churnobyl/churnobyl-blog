declare global {
  interface Window {
    Kakao: any;
    algoliasearchNetlify: (options: {
      appId: string;
      apiKey: string;
      siteId: string;
      branch: string;
      selector: string;
    }) => void;
  }
}

export {};
