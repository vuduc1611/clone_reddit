import { listContainer } from "../../utils/listContainer";
export const Sidebar = () => {
  const { routes } = listContainer;
  return (
    <div className="fixed w-1/6 border-solid border-r border-gray-400 text-xl pl-4 pt-2 mt-20 z-50">
      {routes.map((item, index) => (
        <div
          className="flex items-center gap-2 w-11/12 h-10 p-4 rounded-full hover:bg-slate-200"
          key={index}
        >
          <img src={item.icon} alt="" className="w-6 h-6 bg-transparent mr-4" />
          <span className="text-lg">{item.name}</span>
        </div>
      ))}
    </div>
  );
};
