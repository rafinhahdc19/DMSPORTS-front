import Image from 'next/image';

export default function Banner({ dataarray3 }) {
  return (
    <div className="z-10 pb-3 ease-in-out duration-300 items-center p-2 justify-center flex bg-gray-100">
      {process.browser && (
        <img
          className="z-10 w-full ease-in-out duration-300 rounded-lg sm:my-3 my-2"
          src={window.innerWidth < 718 ? "/dm mobile.png" : "/dm pc.png"}
          height={415}
          width={1600}
          alt="banner"
        />
      )}
    </div>
  );
}