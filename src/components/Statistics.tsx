import { TwitterShareButton, TwitterIcon } from "next-share";
import { BarChartBig, Share } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { useLocalStore, useTweetStore } from "@/utils/store";
import { cn } from "@/lib/utils";

export default function Statistics({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const stats = useLocalStore((state) => state.stats);
  const tweet = useTweetStore();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="px-2 py-2 text-white">
        <BarChartBig size={24} />
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-h-[90%] items-center bg-[#2d2d2d] text-white"
      >
        <SheetHeader>
          <SheetTitle className="text-center text-white">Statistics</SheetTitle>
          <SheetDescription className="text-white">
            <div className="mb-8 flex flex-row justify-evenly">
              <div className="w-[64px]">
                <div className="text-center text-xl font-semibold">
                  {stats.gamesPlayed}
                </div>
                <div className="text-center text-xs">Played</div>
              </div>
              <div className="w-[64px]">
                <div className="text-center text-xl font-semibold">
                  {stats.wins}-{stats.losses}-{stats.draws}
                </div>
                <div className="text-center text-xs">Record</div>
              </div>
              <div className="w-[64px]">
                <div
                  className={cn(
                    "text-center text-xl font-semibold",
                    stats.streak.startsWith("W") ? "text-green-400" : "",
                    stats.streak.startsWith("L") ? "text-red-600" : "",
                  )}
                >
                  {stats.streak}
                </div>
                <div className="text-center text-xs">Streak</div>
              </div>
              <div className="w-[64px]">
                <div className="text-center text-xl font-semibold">
                  {stats.winStreak}
                </div>
                <div className="text-center text-xs">Best Win Streak</div>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center">
              <div className="text-md mb-1 text-center">Share</div>
              <div className="flex flex-row">
                <Button
                  className="mx-2 h-[48px] w-[48px] rounded-3xl border-none bg-white hover:bg-white hover:text-[#131921] focus-visible:ring-0"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    void navigator.clipboard.writeText(
                      tweet.header + "\n" + tweet.answers,
                    );
                    toast({ title: "Results copied to clipboard" });
                  }}
                >
                  <Share className="mx-2 my-4 text-[#131921] hover:cursor-pointer" />
                </Button>
                <div className="mx-2">
                  <TwitterShareButton
                    url={""}
                    title={tweet.header + "\n" + tweet.answers}
                  >
                    <TwitterIcon size={48} round />
                  </TwitterShareButton>
                </div>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

// const GuessBar: React.FC<{ num: number; total: number }> = ({ num, total }) => {
//   const stats = useLocalStore((state) => state.stats);
//   const most = Math.max(
//     ...Object.keys(stats.guesses).map(
//       (e) => stats.guesses[e as keyof typeof stats.guesses],
//     ),
//   );
//   const width = { width: total ? `${(total / most) * 100}%` : "16px" };
//   return (
//     <div className="flex items-center">
//       <p className="mx-2 inline tabular-nums">{num}</p>
//       <div className="flex h-4 items-center bg-white" style={width}>
//         <p className="ml-auto mr-1 inline tabular-nums text-[#131921]">
//           {total}
//         </p>
//       </div>
//     </div>
//   );
// };
