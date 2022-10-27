//載入react需要用的依賴項
import React, { useState } from 'react'
// 引入slate的編輯工廠
import { createEditor } from 'slate'
//引入slate的component和react的plugin
import { Slate, Editable, withReact } from 'slate-react'
function App() {
  const [editor] = useState(() => withReact(createEditor()))
  const initialValue = [{
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },]


  //建立一個Slate component就像提供了一個context面對底下每個component可以共享value
  //添加onKeyDown的事件處理器能像使用react組件一樣
  return (
    <Slate editor={editor} value={initialValue}>
      <Editable onKeyDown={(event) => {
        console.log(event.key);
      }}
      />
    </Slate>
  )
}

export default App
