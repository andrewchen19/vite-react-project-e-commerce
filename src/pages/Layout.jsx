import { Outlet, useNavigation } from "react-router-dom";
import { Navbar, Footer, Loading } from "../components";

const Layout = () => {
  const navigation = useNavigation();
  // console.log(navigation);
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        // 確保螢幕最少有 100vh，中間的 <Outlet> (1fr) 為彈性大小，可以延伸
        <main className="grid grid-rows-[auto,1fr,auto] min-h-screen">
          <Navbar />
          <Outlet />
          <Footer />
        </main>
      )}
    </>
  );
};

export default Layout;
