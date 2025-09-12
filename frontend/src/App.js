import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateImageToPoll from "./pages/CreateImageToPoll";
import CreateTextToPoll from "./pages/CreateTextToPoll";
import PreviewImageToPoll from "./pages/PreviewImageToPoll";
import PreviewTextToPoll from "./pages/PreviewTextToPoll";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-image-to-poll" element={<CreateImageToPoll />} />
        <Route path="/create-text-to-poll" element={<CreateTextToPoll />} />
        <Route path="/preview-image-to-poll" element={<PreviewImageToPoll />} />
        <Route path="/preview-text-to-poll" element={<PreviewTextToPoll />} />
      </Routes>
    </Router>
  );
}

export default App;
