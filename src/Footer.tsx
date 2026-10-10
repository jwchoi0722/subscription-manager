import { Toggle } from "@/components/ui/toggle"

import { useAppStore } from "./store"
import { getTestModeDate } from "./dateTimeService"

function Footer() {
  const isTestMode: boolean = useAppStore((state) => state.isTestMode);
  const setTestMode: (isTestMode: boolean) => void = useAppStore((state) => state.setTestMode);

  return (
    <div id="footer" className="flex w-full justify-end">
      <Toggle key="toggle_test_date" variant="outline" title={getTestModeDate().toDateString()} pressed={isTestMode} onClick={() => setTestMode(!isTestMode)}>
        Use Test Mode
      </Toggle>
    </div>
  );
}

export default Footer;
