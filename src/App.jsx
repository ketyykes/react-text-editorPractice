import { useState, useCallback } from "react";
//從Slate引入Transforms
import { Editor, Transforms, createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }]
  }
];

const App = () => {
  const [editor] = useState(() => withReact(createEditor()))


  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])
  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        renderElement={renderElement}
        onKeyDown={event => {
          if (event.key === '`' && event.ctrlKey) {
            //如果按下的按鍵是`和ctrl的話
            event.preventDefault()
            // 將該區段變成程式碼的區段
            const [match] = Editor.nodes(editor, {
              match: n => n.type === 'code',
            })
            Transforms.setNodes(
              editor,
              //如果type是符合則使用paragraph 否則使用code的react component
              { type: match ? 'paragraph' : 'code' },
              { match: n => Editor.isBlock(editor, n) }
            )
          }
        }}
      />
    </Slate>
  )
}

const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

export default App;

