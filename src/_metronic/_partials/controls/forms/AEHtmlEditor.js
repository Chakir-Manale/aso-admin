import React, {useCallback, useMemo} from 'react'
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate  } from 'slate-react'
import { Editor, Transforms, createEditor, Node, Text } from 'slate'
import { withHistory } from 'slate-history'

import escapeHtml from 'escape-html'
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {AEIcon} from "../../../../_ae/components/svg";
import {Element, Leaf} from "../../../../_ae/components/SlateEditor";
import {useIntl} from "react-intl";
import {AEButton} from "../../../../_ae/components/buttons";
const plugins = []

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  })

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}






const Button = ({ format, icon, block, useFontAwesome = false, title }) => {
  const editor = useSlate();
  let active = block ? isBlockActive(editor, format) : isMarkActive(editor, format);
  let Icon = (
    <AEIcon
      path={icon}
      variant={active ? "primary" :""}
      size={active ? "primary" :""}
    />
  )
  if(useFontAwesome){
    Icon = <li className={` ${icon} ${active ? "text-primary" :"text-muted"}`} />
  }

  return (
    <OverlayTrigger
      overlay={<Tooltip id="specs-edit-tooltip">{title}</Tooltip>}
    >
      <ButtonRef
        active={active}
        onMouseDown={event => {
          event.preventDefault()
          block ? toggleBlock(editor, format) : toggleMark(editor, format)
        }}
      >
        {Icon}
      </ButtonRef>
    </OverlayTrigger>
  )
}

export const ButtonRef = React.forwardRef(({ className, active, reversed, ...props }, ref) => {
  return (
    <AEButton
      variant={'light'}
      icon
      size={'sm'}
      {...props}
      ref={ref}
      className={className}
    />
  )
})

export const toHtml = nodes => {
  return nodes.map(node=>{
    if (Text.isText(node)) {
      let string = escapeHtml(node.text)
      if (node.bold) {
        string = `<strong>${string}</strong>`
      }
      return string
    }

    const children = toHtml(node.children)

    switch (node.type) {
      case 'paragraph':
        return `<p>${children}</p>`
      case 'bold':
        return `<strong>${children}</strong>`
      case 'code':
        return `<code>${children}</code>`
      case 'italic':
        return `<em>${children}</em>`
      case 'mark':
        return `<mark>${children}</mark>`
      case 'del':
        return `<del>${children}</del>`
      case 'small':
        return `<small>${children}</small>`

      default:
        return children
    }
  }).join("")

}



const toPlaintext = nodes => {
  return nodes.map(n => Node.string(n)).join('\n')
}

export const isEmpty = nodes => toPlaintext(nodes).length === 0



/* TODO
*  Validation
* */
export function AEEditor({
  field: {name, value}, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldError, setFieldTouched, setFieldValue, setError }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  validation = true,
  type = "text",
  ...props
}) {
  const {formatMessage} = useIntl()
  label = formatMessage({id:label})

  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  // const nodes = JSON.parse(value || '[]');

  console.log(toHtml(value))

  return (
    <>
      <Slate
        editor={editor}
        value={value}
        onChange={value => {
          if(!touched[name]) setFieldTouched(name, true);
          setFieldValue(name, value)
        }}
      >
        <div className="example w-100">
          <div className="example-preview border-2 p-2 d-flex align-items-center justify-content-center">
            <div className={'btn-group'}>
              <Button format="bold" icon="/Text/Bold.svg" title={"Bold"}/>
              <Button format="italic" icon="/Text/Itallic.svg"  title={"Italic"}/>
              <Button format="underline" icon="/Text/Underline.svg"  title={"Underline"}/>
              <Button format="code" icon="/Text/Code.svg" title={"Code"}/>
              <Button format="mark" icon="/Text/Edit-text.svg" title={"Mark"}/>
              <Button format="del" icon="/Text/Strikethrough.svg" title={"Del"}/>
              <Button format="small" icon="/Design/Anchor-left-down.svg" title={"Small"}/>
              <Button format="ae-separator" icon="/Navigation/Minus.svg" block title={"Separator"}/>
              <Button format="h1" icon="/Text/H1.svg" block title={"Header 1"}/>
              <Button format="h2" icon="/Text/H2.svg" block title={"Header 2"}/>
              <Button format="ae-blockquote" icon="/Text/Quote2.svg" block title={"Quote"}/>
              <Button format="numbered-list" icon="fas fa-list-ol" block useFontAwesome title={"Numbered List"}/>
              <Button format="bulleted-list" icon="fas fa-list-ul" block useFontAwesome title={"Bulleted List"}/>
            </div>
          </div>
          <div className="example-code border-left border-bottom border-right bg-white border-3 border-light">
            {/*<span className="example-copy" data-toggle="tooltip" title="" data-original-title="Copy code"/>*/}
            <div className="example-highlight px-2 pb-0 pt-4">
              <Editable
                plugins={plugins}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder={label && formatMessage( {id:"VALIDATION.MIXED.UNTOUCHED"}, {type:'text', path:label} )}
                spellCheck
                autoFocus
                onKeyDown={event => {
                  for (const hotkey in HOTKEYS) {
                    // condition always false
                    if (isHotkey(hotkey, event)) {
                      event.preventDefault()
                      const mark = HOTKEYS[hotkey]
                      toggleMark(editor, mark)
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
        {/*...*/}
        {/*<div className="card card-custom card-border w-100">*/}
        {/*  <div className="card-header min-h-1px">*/}
        {/*    <div className="card-title">*/}
        {/*      <Button format="bold" icon="/Text/Bold.svg" title={"Bold"}/>*/}
        {/*      <Button format="italic" icon="/Text/Itallic.svg"  title={"Italic"}/>*/}
        {/*      <Button format="underline" icon="/Text/Underline.svg"  title={"Underline"}/>*/}
        {/*      <Button format="code" icon="/Text/Code.svg" title={"Code"}/>*/}
        {/*      <Button format="mark" icon="/Text/Edit-text.svg" title={"Mark"}/>*/}
        {/*      <Button format="del" icon="/Text/Strikethrough.svg" title={"Del"}/>*/}
        {/*      <Button format="small" icon="/Design/Anchor-left-down.svg" title={"Small"}/>*/}
        {/*      <Button format="ae-separator" icon="/Navigation/Minus.svg" block title={"Separator"}/>*/}
        {/*      <Button format="h1" icon="/Text/H1.svg" block title={"Header 1"}/>*/}
        {/*      <Button format="h2" icon="/Text/H2.svg" block title={"Header 2"}/>*/}
        {/*      <Button format="ae-blockquote" icon="/Text/Quote2.svg" block title={"Quote"}/>*/}
        {/*      <Button format="numbered-list" icon="fas fa-list-ol" block useFontAwesome title={"Numbered List"}/>*/}
        {/*      <Button format="bulleted-list" icon="fas fa-list-ul" block useFontAwesome title={"Bulleted List"}/>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="card-body pb-4">*/}
        {/*    <Editable*/}
        {/*      renderElement={renderElement}*/}
        {/*      renderLeaf={renderLeaf}*/}
        {/*      placeholder={label && `Please enter ${label}`}*/}
        {/*      spellCheck*/}
        {/*      autoFocus*/}
        {/*      onKeyDown={event => {*/}
        {/*        for (const hotkey in HOTKEYS) {*/}
        {/*          // condition always false*/}
        {/*          if (isHotkey(hotkey, event)) {*/}
        {/*            event.preventDefault()*/}
        {/*            const mark = HOTKEYS[hotkey]*/}
        {/*            toggleMark(editor, mark)*/}
        {/*          }*/}
        {/*        }*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </Slate>
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[name]}
          // error={errors[name]}
          type={type}
          touched={touched[name]}
          label={label}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
