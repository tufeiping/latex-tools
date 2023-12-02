import React, { useState, useRef } from "react";
import MathJax from 'react-mathjax2'
import "./App.css";

const Context = MathJax.Context;
const Node = MathJax.Node;

const TOOL_BAR_STYLE = {
  height: 60,
  display: 'flex',
  padding: '4px 10px',
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

const App = () => {
  const [expression, setExpression] = useState("");
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

  const generateExpression = (mathType) => {
    const expressions = {
      sum: "\\sum_{a}^{b}x",
      difference: "x - y",
      product: "x \\cdot y",
      quotient: "\\frac{x}{y}",
      integration: "\\int f(x)dx",
    };
    return expressions[mathType];
  };

  const handleClick = (e) => {
    const mathType = e.currentTarget.id;
    let v = generateExpression(mathType);
    insertTextAtCursor(v);
  };

  return (
    <>
      <div style={TOOL_BAR_STYLE}>
        <button style={TOOL_BTN_STYLE} id="sum" onClick={handleClick}><Context><Node inline>{'\\sum_{a}^{b}x'}</Node></Context></button>
        <button style={TOOL_BTN_STYLE} id="difference" onClick={handleClick}><Context><Node inline>{'x-y'}</Node></Context></button>
        <button style={TOOL_BTN_STYLE} id="product" onClick={handleClick}><Context><Node inline>{'x \\cdot y'}</Node></Context></button>
        <button style={TOOL_BTN_STYLE} id="quotient" onClick={handleClick}><Context><Node inline>{'\\frac{x}{y}'}</Node></Context></button>
        <button style={TOOL_BTN_STYLE} id="integration" onClick={handleClick}><Context><Node inline>{'\\int f(x)dx'}</Node></Context></button>
      </div>
      <div>
        <textarea style={INPUT_MEMO_STYLE} ref={textareaRef} onChange={(e) => setExpression(e.target.value)} type="text" value={expression} />
      </div>
      <div id="preview"><Context><Node inline>{expression}</Node></Context></div>
    </>
  );
};

export default App;
