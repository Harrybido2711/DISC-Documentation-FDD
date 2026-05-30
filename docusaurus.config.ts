import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "RSAE-FDD Documentation",
  tagline: "Fund Donation Dashboard — Reparations Stakeholders Authority of Evanston",
  favicon: "img/favicon.ico",

  url: "https://docs.discnu.org",
  baseUrl: "/",

  organizationName: "Harrybido2711",
  projectName: "DISC-Documentation-FDD",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs/rsae-fdd",
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.rsae-fdd.ts"),
          editUrl:
            "https://github.com/Harrybido2711/DISC-Documentation-FDD/tree/main",
        },
        blog: false,
        pages: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "RSAE Fund Donation Dashboard",
      logo: {
        alt: "DISC Logo",
        src: "img/disc-logo.png",
        href: "https://disc-nu.github.io/disc-website/",
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://github.com/Harrybido2711/DISC-Documentation-FDD",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            { label: "Introduction", to: "/" },
            { label: "Getting Started", to: "/getting-started" },
            { label: "Authentication", to: "/authentication" },
            { label: "Frontend", to: "/frontend/frontend-overview" },
            { label: "Backend", to: "/backend/backend-overview" },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "DISC Website",
              href: "https://disc-nu.github.io/disc-website/",
            },
            {
              label: "GitHub",
              href: "https://github.com/Harrybido2711/DISC-Documentation-FDD",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Develop and Innovate for Social Change`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
