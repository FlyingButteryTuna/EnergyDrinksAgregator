import { Button, Flex, useColorMode } from "@chakra-ui/react";
import SortOptions from "./SortOptions";

interface SettingBarProps {
  setSortTypeState: React.Dispatch<React.SetStateAction<number>>;
  setSortOrderState: React.Dispatch<React.SetStateAction<number>>;
  settingsIsHidden: boolean;
}

const SettingsBar: React.FC<SettingBarProps> = (props) => {
  const { toggleColorMode } = useColorMode();

  return (
    <Flex
      width={window.innerWidth * 0.15}
      height={window.innerHeight}
      position={"sticky"}
      minW={"300px"}
      top={"0"}
      left={"0"}
      alignSelf={"flex-start"}
      borderRightWidth={"5px"}
      borderColor={"black"}
      flexDir={"column"}
      rowGap={2}
      padding={2}
      alignItems={"center"}
      backgroundColor={"Window"}
    >
      <Button size="sm" onClick={toggleColorMode}>
        {"Включить/выключить освещение"}
      </Button>
      <SortOptions {...props}></SortOptions>
    </Flex>
  );
};

export default SettingsBar;
