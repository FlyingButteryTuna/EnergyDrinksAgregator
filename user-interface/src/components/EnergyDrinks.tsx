import { Box, Flex, Input, Button, useMediaQuery } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import * as React from "react";
import EnergyDrinkItem from "./EnergyDrinkItem";
import {
  Shop,
  SortedEnergyDrink,
  sortOrderValues,
  sortTypeValues,
} from "../types";

interface EnergyDrinksProps {
  shops: Shop[];
  sortType: number;
  sortOrder: number;
  setSettingsIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
  settingsIsHidden: boolean;
}

const EnergyDrinks: React.FC<EnergyDrinksProps> = ({
  shops,
  sortType,
  sortOrder,
  settingsIsHidden,
  setSettingsIsHidden,
}) => {
  const [searchString, setSearchString] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
  const itemsPerPage = 30;

  const getSortedData = () => {
    let sortedData: SortedEnergyDrink[] = [];

    shops.forEach((shop) => {
      const modifiedDrinks: SortedEnergyDrink[] = shop.energyDrinks.map(
        (drink) => ({
          ...drink,
          shopInfo: {
            name: shop.name,
            image: shop.image,
          },
        })
      );
      sortedData.push(...modifiedDrinks);
    });

    sortedData.sort((a, b) => {
      let sortValue1: number;
      let sortValue2: number;
      if (sortType === sortTypeValues.DISCOUNT) {
        sortValue1 = a.discount;
        sortValue2 = b.discount;
      } else {
        sortValue1 = a.priceWithDiscount;
        sortValue2 = b.priceWithDiscount;
      }

      if (sortOrder === sortOrderValues.ASCENDING) {
        return sortValue1 - sortValue2;
      } else {
        return sortValue2 - sortValue1;
      }
    });

    return sortedData;
  };

  const sortedData = getSortedData();

  const filteredData = sortedData.filter((item) =>
    item.fullName.toLowerCase().includes(searchString)
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    const validPage = Math.max(1, Math.min(newPage, totalPages));
    setCurrentPage(validPage);
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isLargerThan1000 && settingsIsHidden) {
      setSettingsIsHidden(false);
    }
  }, [isLargerThan1000]);

  return (
    <Flex
      flexDir={"column"}
      padding={3}
      rowGap={2}
      maxWidth={"100vw"}
      minHeight={window.innerHeight}
      minWidth={settingsIsHidden ? "90vw" : window.innerWidth * 0.8}
      onClick={() => {
        if (!settingsIsHidden && !isLargerThan1000) {
          setSettingsIsHidden(true);
        }
      }}
      filter={isLargerThan1000 ? "" : !settingsIsHidden ? "blur(5px)" : ""}
      justifyContent={"center"}
    >
      <Flex flexDir={"row"}>
        <Box hidden={isLargerThan1000}>
          <HamburgerIcon
            fontSize={"2em"}
            onClick={() => {
              setSettingsIsHidden(!settingsIsHidden);
            }}
          ></HamburgerIcon>
        </Box>

        <Input
          mx={"auto"}
          size="lg"
          maxW={"80%"}
          placeholder="Поиск по ассортименту "
          borderColor={"teal"}
          onChange={handleSearchInput}
        />
      </Flex>
      <Flex
        ml={"auto"}
        wrap={"wrap"}
        gap={1}
        justifyContent={"center"}
        width={"inherit"}
        minW={"inherit"}
      >
        {paginatedData.map((item, index) => (
          <EnergyDrinkItem
            isHidden={false}
            shopIconData={item.shopInfo.image}
            imgData={item.image}
            drinkName={item.fullName}
            volume={item.volume}
            priceWithDiscount={item.priceWithDiscount}
            priceWithOutDiscount={item.priceWithOutDiscount}
            discount={item.discount}
            key={index}
          />
        ))}
      </Flex>
      <Flex mt={"auto"}>
        <Button
          onClick={() => {
            handlePageChange(1);
          }}
          colorScheme={"teal"}
          mr={"auto"}
        >
          First
        </Button>
        <Button
          onClick={
            currentPage <= 1
              ? () => {}
              : () => handlePageChange(currentPage - 1)
          }
          colorScheme={currentPage <= 1 ? "orange" : "teal"}
          mx={1}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        <Button colorScheme="teal" mx={1} disabled>
          {currentPage}
        </Button>
        <Button
          onClick={
            currentPage >= totalPages
              ? () => {}
              : () => handlePageChange(currentPage + 1)
          }
          colorScheme={currentPage >= totalPages ? "orange" : "teal"}
          mx={1}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>

        <Button
          onClick={() => {
            handlePageChange(totalPages);
          }}
          colorScheme={"teal"}
          ml={"auto"}
        >
          Last
        </Button>
      </Flex>
    </Flex>
  );
};

export default EnergyDrinks;
