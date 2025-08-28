import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
