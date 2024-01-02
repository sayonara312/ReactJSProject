import ToDoList from "./ToDoList.js";
import WebSocketComponent from "./WebSocketComponent.js";
function App() {
  // const [show, setShow] = useState(false);

  return (
    // <div className="container">
    //   <button
    //     className=" mt-3 btn btn-primary"
    //     onClick={() => {
    //       setShow(!show);
    //     }}
    //   >
    //     Toggle
    //   </button>
    //   {show && <Content />}
    // </div>
    <WebSocketComponent>
      <ToDoList />
    </WebSocketComponent>
  );
}

export default App;
