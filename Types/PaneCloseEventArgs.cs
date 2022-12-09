using IgniteUI.Blazor.Controls;

namespace IgbDockManagerDemo.Types;

public class PaneCloseEventArgs : EventArgs
{
    public IgbContentPane[]? Panes { get; set; }
}