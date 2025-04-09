import CloseIcon from './close_icon';
import EditIcon from './edit_icon';

const MealEditCard = () => {
  return (
    <div className="flex w-[22.6rem] flex-col items-start gap-[1rem] self-stretch rounded-2xl border px-[0.75rem] py-[1rem] backdrop-blur-[50px]">
      {/* 헤더 */}
      <div className="items-cent er flex shrink-0 flex-grow gap-4 self-stretch pl-1">
        <div className="flex shrink-0 flex-grow items-center gap-1">
          <span className="text-base/[22px] font-semibold">장조림</span>
          <button className="flex h-[1.625rem] w-[1.625rem] items-center justify-center gap-2 rounded-full bg-white p-1.5 backdrop-blur-[10px]">
            <EditIcon />
          </button>
        </div>
        <div className="flex aspect-[1/1] h-8 w-8 items-center justify-center">
          <button className="flex h-[1.625rem] w-[1.625rem] items-center justify-center gap-2 rounded-full bg-white p-1.5 backdrop-blur-[10px]">
            <CloseIcon />
          </button>
        </div>
      </div>
      {/* 칼로리 구역 */}
      <div className="flex items-start gap-2 self-stretch">
        <div className="flex h-12 flex-grow items-center gap-2 rounded-lg border border-[#F8F8F8] px-2 pb-4 pt-3">
          <input type="text" className="w-0 shrink-0 flex-grow" />
          <span className="font-normal/[1.225rem] text-[0.875rem] text-[#2F2F2F]">g</span>
        </div>
        <div className="flex h-12 flex-grow items-center gap-2 rounded-lg border border-[#F8F8F8] px-2 pb-4 pt-3">
          <input type="text" className="w-0 shrink-0 flex-grow" />
          <span className="text-[0.875rem]/[20px] font-normal text-[#2F2F2F]">kcal</span>
        </div>
      </div>
      {/* 영양소 구역 */}
      <ul className="flex items-center gap-4 self-stretch py-1">
        <div className="flex shrink-0 flex-grow items-start gap-[0.375rem]">
          <div className="flex h-5 items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
              <circle cx="4" cy="4" r="4" fill="var(--carbohydrate)" />
            </svg>
          </div>
          <div className="flex shrink-0 flex-grow flex-col items-start gap-[2px]">
            <span className="text-[0.875rem]/[20px] font-medium text-[#717171]">탄수화물</span>
            <span className="self-stretch text-[0.875rem]/[20px] font-semibold text-[#2f2f2f]">999g</span>
          </div>
        </div>
        <div className="flex shrink-0 flex-grow items-start gap-[0.375rem]">
          <div className="flex h-5 items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
              <circle cx="4" cy="4" r="4" fill="var(--protein)" />
            </svg>
          </div>
          <div className="flex shrink-0 flex-grow flex-col items-start gap-[2px]">
            <span className="text-[0.875rem]/[20px] font-medium text-[#717171]">탄수화물</span>
            <span className="self-stretch text-[0.875rem]/[20px] font-semibold text-[#2f2f2f]">999g</span>
          </div>
        </div>
        <div className="flex shrink-0 flex-grow items-start gap-[0.375rem]">
          <div className="flex h-5 items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
              <circle cx="4" cy="4" r="4" fill="var(--fat)" />
            </svg>
          </div>
          <div className="flex shrink-0 flex-grow flex-col items-start gap-[2px]">
            <span className="text-[0.875rem]/[20px] font-medium text-[#717171]">탄수화물</span>
            <span className="self-stretch text-[0.875rem]/[20px] font-semibold text-[#2f2f2f]">999g</span>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default MealEditCard;
