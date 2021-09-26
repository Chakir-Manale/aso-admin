import React, {useMemo, useCallback} from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

export const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    /* CUSTOM based on https://preview.keenthemes.com/metronic/demo1/features/bootstrap/typography.html
    * TODO*/
    case 'ae-separator':
      return (
        <React.Fragment>
          {children}
          <div {...attributes} className="separator separator-solid separator-border-2 mt-3 mb-3"/>
        </React.Fragment>
      )
    case 'ae-blockquote':
      return (
        <blockquote className="blockquote border-left border-left-light-primary border-5" {...attributes}>
          <p className="pl-3">{children}</p>
        </blockquote>)
    /**/
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'h1':
      return <h1 {...attributes}>{children}</h1>
    case 'h2':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}
export const Leaf = ({ attributes, children, leaf }) => {

  switch (true) {
    case leaf.bold:
      children = <strong>{children}</strong>
      break;
    case leaf.code:
      children = <code>{children}</code>
      break;
    case leaf.italic:
      children = <em>{children}</em>
      break;
    case leaf.underline:
      children = <u>{children}</u>
      break;
    case leaf.mark:
      children = <mark>{children}</mark>
      break;
    case leaf.del:
      children = <del>{children}</del>
      break;
    case leaf.small:
      children = <small>{children}</small>
      break;
  }


  return <span {...attributes}>{children}</span>
}

export const SlateEditorPreview = ({value}) => {
  // const [value, setValue] = useState<Node[]>(value)
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withReact(createEditor()), [])
  return (
    <Slate editor={editor} value={value} onChange={value => {
      // setValue(value)
    }}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly
        />
    </Slate>
  )
}


