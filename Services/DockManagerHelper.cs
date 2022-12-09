using Microsoft.JSInterop;

namespace IgbDockManagerDemo.Services;

/// <summary>
/// ドックマネージャーの操作・機能を提供します。
/// </summary>
public class DockManagerHelper : IAsyncDisposable
{
    private readonly IJSRuntime _JSRuntime;

    private IJSObjectReference? _JSModule;

    public DockManagerHelper(IJSRuntime jSRuntime)
    {
        this._JSRuntime = jSRuntime;
    }

    private async ValueTask<IJSObjectReference> GetHelperJsModuleAsync()
    {
        if (this._JSModule == null)
        {
            this._JSModule = await this._JSRuntime.InvokeAsync<IJSObjectReference>("import", "./dockmanager-helper.js");
        }
        return this._JSModule;
    }

    /// <summary>
    /// ドックマネージャーのレイアウトを、引数に指定したレイアウト情報で復元します。
    /// </summary>
    /// <param name="selector">対象のドックマネージャーを識別する CSS セレクター</param>
    /// <param name="layoutInfo">レイアウト情報</param>
    public async ValueTask RestoreLayoutAsync(string selector, string layoutInfo)
    {
        var module = await this.GetHelperJsModuleAsync();
        await module.InvokeVoidAsync("restoreLayout", selector, layoutInfo);
    }

    /// <summary>
    /// 引数に指定したスロットの要素を、ドックマネージャーのペインとして取り付けします。
    /// </summary>
    /// <param name="selector">対象のドックマネージャーを識別する CSS セレクター</param>
    /// <param name="id">ドックマネージャーに取り付けするスロット要素の ID</param>
    /// <param name="headerText">ペインのヘッダーに表示するテキスト</param>
    public async ValueTask AttachContentPaneAsync(string selector, string id, string headerText)
    {
        var module = await this.GetHelperJsModuleAsync();
        await module.InvokeVoidAsync("attachContentPane", selector, id, headerText);
    }

    public async ValueTask DisposeAsync()
    {
        if (this._JSModule != null) { await this._JSModule.DisposeAsync(); }
    }
}
