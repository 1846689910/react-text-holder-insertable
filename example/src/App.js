import React, { useRef, useState, Fragment } from "react";

import "./App.css";
import TextHolderInsertable, { TextHolder } from "tested-lib";
// import "tested-lib/dist/index.css";

const userName = new TextHolder("$USER_NAME$", { withCancel: true });
const runTime = new TextHolder("$RUN_TIME$", {
  withCancel: true,
});
const version = new TextHolder("$VERSION$", { withCancel: false });

export default function App() {
  const boxRef = useRef("");
  const [html, setHtml] = useState(
    `/user/${userName.getHolderOuterHTML()}/dir1/dir2_${runTime.getHolderOuterHTML()}/dir3`,
  );
  const [text, setText] = useState("");
  const [anchorOffset, setAnchorOffset] = useState(0);
  return (
    <Fragment>
      <TextHolderInsertable
        boxRef={boxRef}
        html={html}
        onChange={(e) => setHtml(e.target.value)}
        onTextChange={setText}
        initialAnchorOffset={anchorOffset}
        onAnchorOffsetChange={setAnchorOffset}
      />
      <div style={{ margin: "10px 0", textAlign: "center" }}>
        the plain text path: <code>{text}</code>
      </div>
      <div style={{ margin: "10px 0", textAlign: "center" }}>
        <button onClick={() => userName.insert(anchorOffset, setHtml, boxRef)}>
          insert {userName.label}
        </button>
        <button onClick={() => runTime.insert(anchorOffset, setHtml, boxRef)}>
          insert {runTime.label}
        </button>
        <button onClick={() => version.insert(anchorOffset, setHtml, boxRef)}>
          insert {version.label}
        </button>
      </div>
    </Fragment>
  );
};
