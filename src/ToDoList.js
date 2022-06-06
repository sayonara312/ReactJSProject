import { useState, useRef } from "react";

function ToDoList() {
  const inputRef = useRef();
  const [listjob, setListjob] = useState(() => {
    const localstoragejob = JSON.parse(localStorage.getItem("listjob"));
    return localstoragejob ?? [];
  });
  const [job, setjob] = useState("");

  const handleAddjob = () => {
    setListjob((prev) => {
      const newlistjob = [...prev, job];

      //Save local storage
      const jsonlistjob = JSON.stringify(newlistjob);
      localStorage.setItem("listjob", jsonlistjob);

      return newlistjob;
    });

    setjob("");
    inputRef.current.focus();
  };
  const handleClearjob = () => {
    localStorage.clear();
    setListjob([]);
  };
  const handleDeletejob = (jobitem) => {
    setListjob((prev) => {
      const newlistjob = listjob.filter((item) => item !== jobitem);
      const jsonlistjob = JSON.stringify(newlistjob);
      localStorage.setItem("listjob", jsonlistjob);
      return newlistjob;
    });
  };
  return (
    <div className="App container">
      <h1 className="text-center">To Do List</h1>
      <div className="form-inline mb-3">
        <input
          className="form-control"
          placeholder="Nhập công việc..."
          ref={inputRef}
          value={job}
          onChange={(e) => setjob(e.target.value)}
        />
        <button className="ml-3 btn btn-success" onClick={handleAddjob}>
          Add
        </button>
        <button className="ml-3 btn btn-danger" onClick={handleClearjob}>
          ClearAll
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th
              style={{
                width: "100%",
                overflowWrap: "break-Word",
                wordWrap: "break-word",
                wordBreak: "break-Word",
              }}
            >
              Công việc
            </th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {listjob.map((jobitem, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td
                style={{
                  width: "100%",
                  overflowWrap: "break-Word",
                  wordWrap: "break-word",
                  wordBreak: "break-Word",
                }}
              >
                {jobitem}
              </td>
              <td>
                <button
                  onClick={() => handleDeletejob(jobitem)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ToDoList;
