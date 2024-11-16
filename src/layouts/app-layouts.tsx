import { Outlet } from "react-router-dom";
import Header from "./header";

const AppLayouts = () => {
  return (
    <div>
      <Header />
      <main className="min-h-screen container">
        <Outlet />
      </main>

      <footer>
        <div className="text-center py-4">Made by Hasan Rahman 😍</div>
      </footer>
    </div>
  );
};

export default AppLayouts;
