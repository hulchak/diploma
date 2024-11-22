export default function Label() {
  return (
    <div className="w-[154px] h-[27px] flex items-center gap-[10px]">
      <div className="text-black font-jost text-[18px] font-medium leading-[27px] capitalize">
        Зайти / Реєстрація
      </div>
      <div className="w-[48px] h-[48px] p-[10px] flex justify-center items-center gap-[10px] rounded-[24px] border-2 border-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l2 2m-2-2V6m0 8v6m0 0H6m4 0h4"
          />
        </svg>
      </div>
    </div>
  );
}
