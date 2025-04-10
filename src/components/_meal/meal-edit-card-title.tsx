import Image from 'next/image';
const MealEditCardTitle = () => {
  return (
    <div className="items-cent er flex shrink-0 flex-grow gap-4 self-stretch pl-1">
      <div className="flex shrink-0 flex-grow items-center gap-1">
        <span className="text-base/[22px] font-semibold">장조림</span>
        <button className="flex h-[1.625rem] w-[1.625rem] items-center justify-center gap-2 rounded-full bg-white p-1.5 backdrop-blur-[10px]">
          <Image src="/icons/edit_3_line.svg" width="14" height="14" alt="icon" className="h-[0.875rem] w-[0.875rem]" />
        </button>
      </div>
      <div className="flex aspect-[1/1] h-8 w-8 items-center justify-center">
        <button className="flex h-[1.625rem] w-[1.625rem] items-center justify-center gap-2 rounded-full bg-white p-1.5 backdrop-blur-[10px]">
          <Image src="/icons/close_line.svg" width="14" height="14" alt="icon" className="h-[0.875rem] w-[0.875rem]" />
        </button>
      </div>
    </div>
  );
};

export default MealEditCardTitle;
