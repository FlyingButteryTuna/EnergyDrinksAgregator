import {
  HStack,
  Stack,
  useRadio,
  Box,
  useToast,
  useRadioGroup,
  Icon,
  Flex,
  Text,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import { MdDiscount } from "react-icons/md";
import { MdMonetizationOn } from "react-icons/md";
import { IoMdArrowRoundUp } from "react-icons/io";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IconType } from "react-icons";
import { sortOrderValues, sortTypeValues } from "../../types";
import { sortToastMessage, sortToasts } from "./toastvalues";

interface SortOptionsProps {
  setSortTypeState: React.Dispatch<React.SetStateAction<number>>;
  setSortOrderState: React.Dispatch<React.SetStateAction<number>>;
}

const SortOptions: React.FC<SortOptionsProps> = (props) => {
  interface SortRadioProps {
    icon: IconType;
  }

  const SortRadio: React.FC<SortRadioProps> = (props: SortRadioProps) => {
    const { icon, ...radioProps } = props;
    const { state, getInputProps, getRadioProps, htmlProps } =
      useRadio(radioProps);

    return (
      <chakra.label {...htmlProps} cursor="pointer">
        <input {...getInputProps({})} hidden />
        <Box {...getRadioProps()} w={12} p={1}>
          <Flex width={"60px"} height={"60px"} alignContent={"center"}>
            <Icon
              color={state.isChecked ? "green" : ""}
              boxSize={"3.5em"}
              as={icon}
            ></Icon>
          </Flex>
        </Box>
      </chakra.label>
    );
  };

  const toast = useToast();

  const handleChange = (value: string) => {
    toast({
      title: `${sortToastMessage} ${sortToasts.get(Number(value))}!`,
      status: "success",
      duration: 2000,
    });
  };

  const handleChangeSortType = (value: string) => {
    handleChange(value);
    props.setSortTypeState(Number(value));
  };

  const handleChangeSortOrder = (value: string) => {
    handleChange(value);
    props.setSortOrderState(Number(value));
  };

  let sortTypeRadioGroupHook = useRadioGroup({
    defaultValue: String(sortTypeValues.PRICE),
    onChange: handleChangeSortType,
  });

  let sortOrderRadioGroupHook = useRadioGroup({
    defaultValue: String(sortOrderValues.ASCENDING),
    onChange: handleChangeSortOrder,
  });

  return (
    <Stack {...sortTypeRadioGroupHook.getRootProps}>
      <HStack>
        <Text>{"Тип сортировки:"}</Text>
        <Flex
          mr={"auto"}
          justifyContent={"flex-end"}
          width={"100%"}
          columnGap={2}
        >
          <SortRadio
            icon={MdMonetizationOn}
            {...sortTypeRadioGroupHook.getRadioProps({
              value: String(sortTypeValues.PRICE),
            })}
          />
          <SortRadio
            icon={MdDiscount}
            {...sortTypeRadioGroupHook.getRadioProps({
              value: String(sortTypeValues.DISCOUNT),
            })}
          />
        </Flex>
      </HStack>
      <HStack>
        <Text>{"Направление сортировки:"}</Text>
        <Flex justifyContent={"flex-end"} width={"100%"} columnGap={2}>
          <SortRadio
            icon={IoMdArrowRoundUp}
            {...sortOrderRadioGroupHook.getRadioProps({
              value: String(sortOrderValues.ASCENDING),
            })}
          />
          <SortRadio
            icon={IoMdArrowRoundDown}
            {...sortOrderRadioGroupHook.getRadioProps({
              value: String(sortOrderValues.DESCENDING),
            })}
          />
        </Flex>
      </HStack>
    </Stack>
  );
};

export default SortOptions;
