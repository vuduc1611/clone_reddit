import { Content } from "../Content/Content";
import { Header } from "../Header/Header";
import { RightBox } from "../RightBox/RightBox";
import { Sidebar } from "../Sidebar/Sidebar";

export const HomePage = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Content />
      <RightBox />
    </>
  );
};
