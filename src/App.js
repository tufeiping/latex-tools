import React, { useState } from "react";
import MathJax from 'react-mathjax2'

const Context = MathJax.Context;
const Node = MathJax.Node;

const App = () => {
  const [expression, setExpression] = useState("");

  const handleClick = (e) => {
    const mathType = e.target.id;
    setExpression(generateExpression(mathType));
  };

  const generateExpression = (mathType) => {
    const expressions = {
      sum: "x + y",
      difference: "x - y",
      product: "x \cdot y",
      quotient: "x / y",
      integration: "\\int f(x)dx",
    };
    return expressions[mathType];
  };

  return (
    <>
      <div>
        <button id="sum" onClick={handleClick}><Context><Node inline>{'\\sum_{a}^{b}x'}</Node></Context></button>
        <button id="difference" onClick={handleClick}>Difference</button>
        <button id="product" onClick={handleClick}>Product</button>
        <button id="quotient" onClick={handleClick}>Quotient</button>
        <button id="integration" onClick={handleClick}><Context><Node inline>{'\\int f(x)dx'}</Node></Context></button>
        {/* <span dangerouslySetInnerHTML={{ __html: expression }} /> */}
      </div>
      <Context><Node inline>{expression}</Node>
      </Context></>
  );
};

export default App;
