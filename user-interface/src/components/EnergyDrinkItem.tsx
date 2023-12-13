import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface EnergyDrinkItemProps {
  shopIconData: string;
  imgData: string;
  drinkName: string;
  volume: number;
  priceWithDiscount: number;
  priceWithOutDiscount: number;
  discount: number;
  isHidden: boolean;
}

const EnergyDrinkItem: React.FC<EnergyDrinkItemProps> = ({
  shopIconData,
  imgData,
  drinkName,
  volume,
  priceWithDiscount,
  priceWithOutDiscount,
  discount,
  isHidden,
}) => {
  const priceWithDiscountProps = {
    mt: "2",
    fontSize: "small",
    textDecoration: "line-through",
  };
  const priceWithOutDiscountProps = {
    mt: "2",
    fontSize: "medium",
    fontWeight: "bold",
  };
  return (
    <Flex
      width={"10%"}
      borderWidth={"2px"}
      borderColor={"black"}
      flexDir={"column"}
      minWidth={"160px"}
      maxWidth={"4em"}
      padding={"2"}
      hidden={isHidden}
    >
      <Box height={"80%"}>
        <Image
          boxSize={"10em"}
          objectFit={"scale-down"}
          src={`data:image/jpeg;base64,${imgData}`}
        ></Image>

        <Text
          pt={"2"}
          fontSize={"large"}
          fontWeight={"bold"}
          noOfLines={3}
          lineHeight={"normal"}
          mt={"auto"}
        >
          {drinkName}
        </Text>
      </Box>
      <Flex alignItems={"center"} minH={"10%"}>
        <Text
          hidden={discount == 0 ? true : false}
          {...(discount == 0
            ? priceWithDiscountProps
            : priceWithOutDiscountProps)}
        >
          {priceWithDiscount}₽
        </Text>
        <Text ml={"auto"} fontSize={"small"}>
          {volume} ml
        </Text>
      </Flex>
      <Flex flexDir={"row"}>
        <Text
          {...(discount == 0
            ? priceWithOutDiscountProps
            : priceWithDiscountProps)}
        >
          {priceWithOutDiscount}₽
        </Text>
        <Text
          hidden={discount == 0 ? true : false}
          mt={"2"}
          ml={"3"}
          fontSize={"small"}
          color={"red"}
        >
          {Math.ceil(discount * 100)}%OFF
        </Text>
        <Image
          maxH={"2.1em"}
          ml={"auto"}
          boxSize={"2em"}
          src={`data:image/jpeg;base64,${shopIconData}`}
        ></Image>
      </Flex>
    </Flex>
  );
};

export default EnergyDrinkItem;
