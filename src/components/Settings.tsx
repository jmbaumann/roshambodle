import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Info } from "lucide-react";
// import Consensu5Logo from "./Consensu5";
// import { Switch } from "./ui/switch";
// import { Label } from "./ui/label";
// import { useLocalStore } from "@/utils/store";

export default function Settings({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const store = useLocalStore();
  // const updateStore = useLocalStore((state) => state.update);

  // const handleShowArrow = (show: boolean) => {
  //   updateStore({
  //     ...store,
  //     settings: { showArrow: show },
  //   });
  // };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="px-2 py-2 text-white">
        {/* <Gear size={24} /> */}
        <Info size={24} />
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-h-[90%] bg-[#2d2d2d] text-white"
      >
        <SheetHeader>
          <SheetDescription className="text-white">
            <div className="flex flex-col">
              <div className="mt-2 text-lg font-semibold">How To Play</div>
              <div className="mb-2 text-sm">
                Guess the price of the item in 6 tries or less
              </div>
              <div className="mb-2 text-sm">
                The color of the tiles will change to show how close your guess
                was to the price
              </div>
              <div className="mb-2 text-sm">
                The arrow to the right of your guess tells you if the actual
                price is higher or lower
              </div>
              <div className="mb-2 text-sm">
                The price used is the one-time purchase list price of the
                product at the time it was added to the pool of products and
                does not account for any sales, deals, or price changes in the
                time since
              </div>
              <div className="mb-2 text-sm">
                Blatant ripoff of{" "}
                <a
                  href="https://www.nytimes.com/games/wordle/index.html"
                  target="_blank"
                  className="underline"
                >
                  Wordle
                </a>
              </div>

              <div className="mt-6 text-lg font-semibold">Settings</div>
              {/* <div className="mx-auto flex items-center space-x-2">
                <Switch
                  className="data-[state=checked]:bg-green-600"
                  id="show-higher-lower"
                  checked={store.settings.showArrow}
                  onCheckedChange={handleShowArrow}
                />
                <Label htmlFor="show-higher-lower">
                  Show Higher / Lower Arrow
                </Label>
              </div> */}

              {/* <div className="mt-6 text-lg font-semibold">More Games</div>
              <div className="mb-2 text-sm">
                <a href="https://consensu5.com" target="_blank">
                  <Consensu5Logo />
                </a>
              </div> */}

              <div className="mt-16 text-center text-xs">
                &copy; {new Date().getFullYear()}
                {"   "}&bull;{"   "}
                <a href="https://twitter.com/jeremy_baumann">
                  jeremy made this :)
                </a>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
