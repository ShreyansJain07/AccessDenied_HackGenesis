import {
  HStack,
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import pillarimg from "../assests/pillars.jpg";
export default function WithBackgroundImage() {
  return (
    <Flex
      w={"full"}
      h={"90vh"}
      backgroundImage={pillarimg}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.500, blackAlpha.200)"}
      >
        <Stack maxW={"5xl"} spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            align={"center"}
            fontSize={useBreakpointValue({ base: "5xl", md: "6xl" })}
          >
            Where Guidance Meets Growth Your Path to Success
          </Text>
          <Text
            color={"white"}
            lineHeight={1.2}
            align={"center"}
            bgGradient='linear(to-l, green, yellow,green)'
            bgClip='text'
            fontWeight='extrabold'          
            fontSize={useBreakpointValue({ base: "7xl", md: "9xl" })}
          >
                        Mentorify
          </Text>
          <HStack justify={'center'} >
            <Button rounded={"full"} color={"white"} colorScheme="green">
              Find your Mentor
            </Button>
            <Button
              colorScheme="yellow"
              rounded={"full"}
              bgColor={"yellow.200"}
            >
              Upskill
            </Button>
          </HStack>
        </Stack>
      </VStack>
    </Flex>
  );
}
