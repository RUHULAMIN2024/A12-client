import { Circles } from "react-loader-spinner";

function LoaderSpinner() {
  return (
    <div className="flex w-full h-screen justify-center items-center text-center py-8">
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default LoaderSpinner;
