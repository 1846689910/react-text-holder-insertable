import $ from "jquery";
import { get } from "lodash";
export default class TextHolder {
  /**
   *
   * @param {String} label
   * @param {Object} options
   * @param {Boolean} options.withCancel
   * @param {Object} options.textHolderStyle
   * @param {Object} options.textHolderLabelStyle
   * @param {Object} options.textHolderCancelStyle
   */
  constructor(label, options = {}) {
    this.label = label;
    this.options = options;
  }
  /**
   * @returns {JQuery}
   */
  getJq = () => {
    const holderLabel = $("<span/>")
      .addClass("text-holder-label")
      .css(this.options.textHolderLabelStyle || {})
      .html(this.label);
    const jq = $("<span/>")
      .addClass("text-holder")
      .css(this.options.textHolderStyle || {})
      .attr("contenteditable", "false")
      .append(holderLabel);
    if (this.options.withCancel) {
      const holderCancel = $("<span/>")
        .addClass("text-holder-cancel")
        .css(this.options.textHolderCancelStyle || {})
        .html("x");
      jq.append(holderCancel);
    }
    return jq;
  };
  /**
   * @returns {HTMLElement}
   */
  getEl = () => this.getJq()[0];

  /**
   * @returns {String}
   */
  getHolderOuterHTML = () => this.getEl().outerHTML;

  /**
   * @param {Number} anchorOffset
   * @param {Function} setHtml
   * @param {Object} boxRef
   */
  insert = (anchorOffset, setHtml, boxRef) => {
    const inputBox = get(boxRef, "current.el.current");
    if (anchorOffset >= 0 && anchorOffset !== null && inputBox) {
      let __html = $(inputBox).html();
      const front = __html.substring(0, anchorOffset);
      const latter = __html.substring(anchorOffset);
      const inserted = this.getEl().outerHTML;
      __html = `${front}${inserted}${latter}`;
      setHtml(__html);
    }
  };
}
