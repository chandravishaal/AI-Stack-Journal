// import Layout from "./layouts/Layout";
// import HomePage from "./pages/Home";

// function App() {
//   return (
//     <Layout>
//       <HomePage />
//     </Layout>
//   );
// }

// export default App;
//BASIC app.jsx



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import AppRoutes from "./routes/Approutes";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <Layout>
        <ScrollToTop/>
       <AppRoutes/>
      </Layout>
    </Router>
  );
}

export default App;