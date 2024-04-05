import "./App.css";
import MainComponet from "./componets/MainContent";
import { Container } from "@mui/material";
function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        marginTop: "250px",
        color: "white",
      }}
    >
      <Container maxWidth="xl">
        <MainComponet />
      </Container>
    </div>
  );
}

export default App;
