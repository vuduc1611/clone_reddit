import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

export const Loading = (props) => {
  const { loadingType, color, size, loading } = props;

  const homepageLoading = css`
    display: block;
    margin: 0 auto;
  `;
  return (
    <>
      <div className="flex items-center justify-center">
        {loadingType === "ClipLoader" && (
          <ClipLoader
            color={color}
            loading={loading}
            size={size}
            css={homepageLoading}
          />
        )}
        {loadingType === "BeatLoader" && (
          <BeatLoader
            color={color}
            loading={loading}
            size={size}
            css={homepageLoading}
          />
        )}
      </div>
    </>
  );
};
