import HeaderPublic from "./components/navigarion/HeaderPublic.jsx";

export default function App() {

  return (
    <>
      <HeaderPublic/>
      <div className="pt-[75px]">
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-4xl font-bold text-center">Welcome to the School</h1>
        </div>
      </div>
    </>
  );
}