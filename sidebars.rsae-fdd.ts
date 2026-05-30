import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "Introduction",
    },
    {
      type: "doc",
      id: "getting-started",
      label: "Getting Started",
    },
    {
      type: "doc",
      id: "authentication",
      label: "Authentication",
    },
    {
      type: "category",
      label: "Frontend",
      items: [
        {
          type: "doc",
          id: "frontend/frontend-overview",
          label: "Overview",
        },
        {
          type: "doc",
          id: "frontend/frontend-project-structure",
          label: "Project Structure",
        },
        {
          type: "doc",
          id: "frontend/frontend-website-layout",
          label: "Website Layout",
        },
        {
          type: "doc",
          id: "frontend/frontend-features",
          label: "Features",
        },
        {
          type: "doc",
          id: "frontend/frontend-deployment",
          label: "Deployment",
        },
      ],
    },
    {
      type: "category",
      label: "Backend",
      items: [
        {
          type: "doc",
          id: "backend/backend-overview",
          label: "Overview",
        },
        {
          type: "doc",
          id: "backend/backend-project-structure",
          label: "Project Structure",
        },
      ],
    },
    {
      type: "category",
      label: "Handoff Documentation",
      items: [
        {
          type: "doc",
          id: "handoff/handoff-overview",
          label: "Overview",
        },
      ],
    },
  ],
};

export default sidebar;
