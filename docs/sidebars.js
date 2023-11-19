/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

const backToHomeLink = {
  /** @type {"ref"} */
  type: "ref",
  id: "homepage",
  label: "Back to home",
  className: "menu__list-item--home",
  customProps: {
    icon: "TbArrowBackUp",
    iconSize: 20,
  },
};

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [{ type: "autogenerated", dirName: ".",  }],
  frontendSidebar: [
    backToHomeLink,
    { type: "autogenerated", dirName: "contributor/frontend" },
  ],
  backendSidebar: [
    backToHomeLink,
    { type: "autogenerated", dirName: "contributor/server" },
  ],
  userSidebar:[
    backToHomeLink,
    { type: "autogenerated", dirName: "user-guide", },
  ]
};

module.exports = sidebars;