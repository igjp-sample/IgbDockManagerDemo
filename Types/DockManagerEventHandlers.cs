using Microsoft.AspNetCore.Components;

namespace IgbDockManagerDemo.Types;

[EventHandler("onpaneclose", typeof(PaneCloseEventArgs), enableStopPropagation: true, enablePreventDefault: true)]
[EventHandler("onlayoutchange", typeof(LayoutChangeEventArgs), enableStopPropagation: true, enablePreventDefault: true)]
public static class EventHandlers
{
}