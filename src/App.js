import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
// debugging을 도와주는 ReactQueryDevtoolsPanel
import { ReactQueryDevtoolsPanel } from "react-query/devtools";
import "./App.css";
import Home from "./components/Home";
import RQSuperHeroes from "./components/RQSuperHeroes";
import SuperHeroes from "./components/SuperHeroes";
import RQSuperHero from "./components/RQSuperHero";
import ParallelQueries from "./components/ParallelQueries";
import { DynamicParallelPage } from "./components/DynamicParallel";
import DependentQueries from "./components/DependentQueries";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/super-heroes" element={<SuperHeroes />} />
          <Route path="/rq-super-heroes" element={<RQSuperHeroes />} />
          <Route path="/rq-super-heroes/:heroId" element={<RQSuperHero />} />
          <Route path="/rq-parallel-queries" element={<ParallelQueries />} />
          <Route
            path="/rq-dynamic-parallel"
            element={<DynamicParallelPage heroIds={[1, 3]} />}
          />
          <Route
            path="/rq-dependent-queries"
            element={<DependentQueries email="kmkim4238@naver.com" />}
          />
        </Routes>
      </div>
      <ReactQueryDevtoolsPanel initialisopem="false" position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
