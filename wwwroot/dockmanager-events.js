(() => {

  Blazor.registerCustomEventType("layoutchange", {
    browserEventName: 'layoutChange',
    createEventArgs: (e) => ({ layout: JSON.stringify(e.srcElement.layout) })
  });

  Blazor.registerCustomEventType("paneclose", {
    browserEventName: 'paneClose',
    createEventArgs: (e) => ({ panes: e.detail.panes })
  });

})()