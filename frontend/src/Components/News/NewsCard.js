import { format } from "timeago.js";

export const NewsCard = (props) => {
  const { title, name, author, url, urlToImage, publishedAt } = props;
  return (
    <div className="bg-gray-200 w-[80%] rounded-2xl">
      <div className="flex gap-6 mt-2 ml-1">
        <p className="font-semibold">v/{name}</p>
        <div className="font-light">{format(publishedAt)}</div>
      </div>
      <div>
        <div className="text-3xl">{title}</div>
        <div>
          <a href={`${url}`} rel="noreferrer" target="_blank">
            <img src={urlToImage} alt="News" className="rounded-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};
