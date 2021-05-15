import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";
import $ from "jquery";
import "./text-holder.css";


export default function TextHolderInsertable({
  html,
  onChange,
  initialAnchorOffset,
  onAnchorOffsetChange,
  onTextChange,
  boxRef,
}) {
  const [__anchorOffset, __setAnchorOffset] = useState(initialAnchorOffset || 0);
  const [__html, __setHtml] = useState(html || "");

  const handleChange = (e) => {
    onChange(e);
    __setHtml(e.target.value);
  };

  useEffect(() => {
    onAnchorOffsetChange(__anchorOffset);
  }, [__anchorOffset, onAnchorOffsetChange]);

  useEffect(() => {
    __setHtml(html);
  }, [html]);

  useEffect(() => {
    onTextChange && onTextChange(getText());
  }, [__html]);

  function getText() {
    const jq = $("<div/>").html(__html);
    jq.find(".text-holder-cancel").each((_, ele) => $(ele).remove());
    return jq.text();
  }

  function getTextActualStartOffset(startContainer) {
    const prevSib = startContainer.previousSibling;

    if (!prevSib) return 0;
    const prevSibContentLen =
      prevSib.nodeType === 1 ? prevSib.outerHTML.length : prevSib.textContent.length;
    return prevSibContentLen + getTextActualStartOffset(prevSib);
  }

  const updateAnchorOffset = (e) => {
    const sel = window.getSelection();
    const jq = $(e.target);

    if (
      ["text-holder", "text-holder-label", "text-holder-cancel"].every(
        (className) => !jq.hasClass(className),
      )
    ) {
      __setAnchorOffset(
        getTextActualStartOffset(sel.getRangeAt(0).startContainer) + sel.anchorOffset,
      );
    }
  };

  const handleClick = (e) => {
    if ($(e.target).hasClass("text-holder-cancel")) {
      const box = e.target.parentNode.parentNode;
      $(e.target.parentNode).remove();
      __setHtml($(box).html());
    }
    updateAnchorOffset(e);
  };

  const handleKeyUp = (e) => {
    updateAnchorOffset(e);
  };

  return (
    <ContentEditable
      ref={boxRef}
      html={__html} // innerHTML of the editable div
      disabled={false} // use true to disable edition
      onChange={handleChange} // handle innerHTML change
      onClick={handleClick}
      onKeyUp={handleKeyUp}
    />
  );
}

TextHolderInsertable.propTypes = {
  ref: PropTypes.object,
  html: PropTypes.string,
  onChange: PropTypes.func,
  onTextChange: PropTypes.func,
  initialAnchorOffset: PropTypes.number,
  onAnchorOffsetChange: PropTypes.func,
};
