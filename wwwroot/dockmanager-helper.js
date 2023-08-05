/**
 * Obtains the DockManager body element implemented in WebComponents.
 * However, the DockManager body element is hidden in the Shadow DOM as a child element of the element drawn with the Blazor component tag,
 * so it is retrieved by carefully traversing the DOM hierarchy.
 * 
 * @param {string} dockManagerContainerSelector
 * @returns {HTMLElement & {layout:any} | null}
 */
const getDockManagerInternal = (dockManagerContainerSelector) => {
  const dockManagerContainer = document.querySelector(dockManagerContainerSelector);
  const dockManager =
    // for v.22.2 or later
    dockManagerContainer?.querySelector("igc-dockmanager") ||
    // for v.22.1
    dockManagerContainer
      ?.querySelector("igc-component-renderer-container")
      ?.shadowRoot
      ?.querySelector("igc-dockmanager");
  return dockManager || null;
}

/**
 * Ensure the DockManagerf instance is ready.
 * 
 * @param {string} dockManagerContainerSelector
 * @returns {HTMLElement & {layout:any}}
 */
const getDockManager = async (dockManagerContainerSelector) => {

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  for (let i = 0; i < 500; i++) {
    const dockManager = getDockManagerInternal(dockManagerContainerSelector);
    if (dockManager !== null) return dockManager;
    await delay(10);
  }
  throw new Error(`Dock Manager could not found: selecter = "${dockManagerContainerSelector}"`);
}

/**
 * Attaches a content pane to the DockManager.
 * @param {string} dockManagerContainerSelector
 * @param {string} contentId
 * @param {string} header
 */
export const attachContentPane = async (dockManagerContainerSelector, contentId, header) => {

  const dockManager = await getDockManager(dockManagerContainerSelector);

  // Create a slot element corresponding to the pane to be added this time and add it as a child element of DockManager.
  const slot = document.createElement("slot");
  slot.name = contentId;
  slot.slot = contentId;
  dockManager.appendChild(slot)

  // Create layout information corresponding to the pane to be added this time and add it to the layout property of DockManager.
  const newPane = {
    type: "contentPane",
    contentId: contentId,
    header: header
  };
  dockManager.layout.rootPane.panes.push(newPane);

  // However, this is not enough for the DockManager to notice the change in layout information.
  // So we duplicate the layout information and reassign the layout property as an object with a different reference.
  // The DockManager will then detect the change in the layout property and the pane will be added.
  dockManager.layout = { ...dockManager.layout };
}

/**
 * Restore the layout of the DockManager
 * @param {string} dockManagerContainerSelector
 * @param {any} layout
 */
export const restoreLayout = async (dockManagerContainerSelector, layout) => {
  const dockManager = await getDockManager(dockManagerContainerSelector);
  dockManager.layout = JSON.parse(layout);
}
