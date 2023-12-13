import { Box, Flex, Slide, useMediaQuery } from "@chakra-ui/react";
import EnergyDrinks from "./components/EnergyDrinks";
import SettingsBar from "./components/Settings/SettingsBar";
import { shops } from "../data/shopsMock.json";
import React from "react";
import { sortOrderValues, sortTypeValues } from "./types";

const App = () => {
  const [sortTypeState, setSortTypeState] = React.useState<number>(
    sortTypeValues.PRICE
  );
  const [sortOrderState, setSortOrderState] = React.useState<number>(
    sortOrderValues.ASCENDING
  );
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
  const [settingsIsHidden, setSettingsIsHidden] =
    React.useState<boolean>(isLargerThan1000);

  return (
    <Flex flexDir={"row"} width={window.innerWidth}>
      <Box>
        <Slide
          direction="left"
          in={!settingsIsHidden}
          style={{
            zIndex: 10,
            width: "fit-content",
            display: "inline-block",
            position: !isLargerThan1000 ? "fixed" : "sticky",
          }}
        >
          <SettingsBar
            settingsIsHidden={settingsIsHidden}
            setSortOrderState={setSortOrderState}
            setSortTypeState={setSortTypeState}
          />
        </Slide>
      </Box>

      <EnergyDrinks
        shops={shops}
        settingsIsHidden={settingsIsHidden}
        setSettingsIsHidden={setSettingsIsHidden}
        sortType={sortTypeState}
        sortOrder={sortOrderState}
      />
    </Flex>
  );
};

export default App;
