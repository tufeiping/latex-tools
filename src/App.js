import React, { useState, useRef } from "react";
import MathJax from 'react-mathjax2'
import ExpressionDefinitions from "./expressions";
import "./App.css";

const Context = MathJax.Context;
const Node = MathJax.Node;

const TOOL_BAR_STYLE = {
  height: 60,
  display: 'flex',
  padding: '4px 10px',
  overflow: 'auto',
};

const TOOL_BTN_STYLE = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #000',
  borderRadius: '5px',
  backgroundColor: '#f8f8f8',
  color: '#000',
  fontSize: '16px',
  padding: '10px 20px',
  margin: '0 2px',
  textDecoration: 'none',
  transition: '0.3s',
  ':hover': {
    backgroundColor: '#e8e8e8',
    cursor: 'pointer',
  },
};

const INPUT_MEMO_STYLE = {
  width: 'calc(100% - 20px)',
  height: 200,
  margin: '10px 10px',
};

const App = (props) => {
  const [expression, _setExpression] = useState("");
  const textareaRef = useRef();

  const insertTextAtCursor = (text) => {
    const { selectionStart, selectionEnd } = textareaRef.current;
    const textBefore = textareaRef.current.value.substring(0, selectionStart);
    const textAfter = textareaRef.current.value.substring(selectionEnd);
    let full_text = textBefore + text + textAfter;
    textareaRef.current.value = full_text
    // 设置焦点位置在插入的文本之后
    textareaRef.current.selectionEnd = selectionStart + text.length;
    textareaRef.current.selectionStart = full_text;
    setExpression(full_text);
  };

  const setExpression = (text) => {
    _setExpression(text);
    if (props.setGetExpression) {
      props.setGetExpression((obj) => {
        obj.getExpression = () => {
          return text;
        }
      });
    }
  }

  const generateExpression = (mathType) => {
    return ExpressionDefinitions[mathType];
  };

  const handleClick = (e) => {
    const mathType = e.currentTarget.id;
    let v = generateExpression(mathType);
    insertTextAtCursor(v);
  };

  return (
    <>
      <div style={TOOL_BAR_STYLE}>
        {Object.keys(ExpressionDefinitions).map(key => (
          <button
            style={TOOL_BTN_STYLE}
            id={key}
            onClick={handleClick}
          >
            <Context>
              <Node inline>{ExpressionDefinitions[key]}</Node>
            </Context>
          </button>
        ))}
      </div>
      <div>
        <textarea style={INPUT_MEMO_STYLE} ref={textareaRef} onChange={(e) => setExpression(e.target.value)} type="text" value={expression} />
      </div>
      <div id="preview"><Context><Node inline>{expression}</Node></Context></div>
    </>
  );
};

export default App;
