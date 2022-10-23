def render: [(.[] | .text)//""] | join("─");

{
    render: render
}[$method // "render"]