using Toolbelt.Text.Json.Serialization;

namespace IgbDockManagerDemo;

/// <summary>
/// "画面上に表示されているコンポーネント" の 1 つ 1 つを表すレコードクラス
/// </summary>
/// <param name="Id">表示している個々のコンポーネントインスタンスを一意に識別する Id 文字列</param>
/// <param name="ComponentName">表示するコンポーネントの名前</param>
/// <param name="Parameters">表示するコンポーネントに引き渡すパラメータ</param>
public record ComponentDescriptor
(
    string Id,
    string ComponentName,
    [property: DictionaryStringObjectJsonConverter]
    Dictionary<string, object?> Parameters
);


