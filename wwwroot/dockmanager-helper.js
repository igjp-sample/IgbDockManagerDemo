
// Obtains the DockManager body element implemented in WebComponents.
// However, the DockManager body element is hidden in the Shadow DOM as a child element of the element drawn with the Blazor component tag,
// so it is retrieved by carefully traversing the DOM hierarchy.
function getDockManagerInternal(dockManagerContainerSelector) {
  const dockManagerContainer = document.querySelector(dockManagerContainerSelector);
  const dockManager =
    // for v.22.2
    dockManagerContainer?.querySelector("igc-dockmanager") ||
    // for v.22.1
    dockManagerContainer
    ?.querySelector("igc-component-renderer-container")
    ?.shadowRoot
    ?.querySelector("igc-dockmanager");
  return dockManager || null;
}

// Ensure the DockManagerf instance is ready.
function getDockManager(dockManagerContainerSelector) {

  return new Promise((resolve, reject) => {
    const dockManager = getDockManagerInternal(dockManagerContainerSelector);
    if (dockManager !== null) {
      resolve(dockManager);
    }
    else {
      let counter = 0;
      const timerId = setInterval(() => {
        counter++;
        const dockManager = getDockManagerInternal(dockManagerContainerSelector);
        if (dockManager !== null) {
          clearInterval(timerId);
          resolve(dockManager);
        }
        else if (counter > (5000 / 10)) {
          clearInterval(timerId);
          reject();
        }
      }, 10)
    }
  });
}

export async function attachContentPane(dockManagerContainerSelector, contentId, header) {

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

export async function restoreLayout(dockManagerContainerSelector, layout) {
  const dockManager = await getDockManager(dockManagerContainerSelector);
  dockManager.layout = JSON.parse(layout);
}
