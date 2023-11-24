import { useState } from "react";
import "./App.css";

function App() {
  const [files, setFiles] = useState([]);
  const handleCancel = () => console.log("CANCELLED");

  const handleSuccess = (files) => {
    console.log(
      "SUCCESS: ",
      files.value.map((doc) => doc)
    );
    setFiles((prevState) => [
      ...prevState,
      ...files.value.map((doc) => doc.webUrl),
    ]);
  };

  const handleError = (err) => console.log("ERROR: ", err);

  const clickHandler = (
    oneDriveApplicationId,
    action,
    multiSelect,
    advancedOptions
  ) => {
    return new Promise(function () {
      var odOptions = {
        clientId: oneDriveApplicationId,
        action: action || "download",
        multiSelect: multiSelect || true,
        openInNewWindow: true,
        advanced: advancedOptions || {},
        success: function (files) {
          handleSuccess(files);
        },
        cancel: function () {
          handleCancel();
        },
        error: function (e) {
          handleError(e);
        },
      };
      // eslint-disable-next-line no-undef
      OneDrive.open(odOptions);
    });
  };
  return (
    <>
      <button onClick={() => clickHandler("{KEY}", "share")}>Secelim</button>
      <div>
        {files?.map((file) => (
          <div key={file}>
            <img src={file} alt="file" />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
