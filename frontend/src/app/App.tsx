import { Header, Footer } from "@/shared/ui";
import { Top } from "@/pages/top";
import "./styles/app.css";

export default function App() {
  return (
    <>
      <Header />
      <main className="page__content">
        <Top />
      </main>
      <Footer />
    </>
  );
}
