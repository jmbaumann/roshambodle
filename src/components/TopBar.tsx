import Settings from "./Settings";
import Statistics from "./Statistics";

export default function TopBar({
  openSettings,
  openStatistics,
  setOpenSettings,
  setOpenStatistics,
}: {
  openSettings: boolean;
  openStatistics: boolean;
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenStatistics: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="mb-1 flex w-full flex-row items-center bg-[#2d2d2d] p-2">
      <div className="font-amazon mx-auto my-2 text-3xl text-white">🪨📄✂️</div>
      <div className="absolute right-3">
        <Statistics open={openStatistics} setOpen={setOpenStatistics} />
        <Settings open={openSettings} setOpen={setOpenSettings} />
      </div>
    </div>
  );
}
