import { useRoutes } from "react-router-dom";
import Footer from "./footer";
import { NavBar } from "./header";
import { Profile } from "./profile";
import Zoom from "react-reveal/Zoom";
import "./style.css";
import ChatComponet from "./chatComponet";
import Publication from "./publication";
import MemberProfile from "./MemberProfile";

export default function Home({ user }) {
  let route = useRoutes([
    {
      path: "/Profile",
      element: (
        <Zoom>
          <Profile user={user} />
        </Zoom>
      ),
    },
    {
      path: "/Chat",
      element: <ChatComponet />,
    },
    {
      path: "/Publication",
      element: (
        <Zoom>
          <Publication />
        </Zoom>
      ),
    },
    {
      path: "/:id",
      element: (
        <Zoom>
          <MemberProfile />
        </Zoom>
      ),
    },
  ]);
  return (
    <div className='body'>
      <NavBar user={user} />
      {route}
      <Footer />
    </div>
  );
}
