import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import React, { useState, useContext } from "react";

function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      position="sticky"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      boxShadow="lg"
    >
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color="green.800" // Change text color to green.800
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link to={"/"}>
            



            <Box>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as={Link}
                p={2}
                to={"/"}
                fontSize={"xl"}
                bgGradient='linear(to-l, green.400, yellow.300,green.400)'
                bgClip='text'
                fontWeight='extrabold'          
    
              >
                Mentorify
              </Box>
            </PopoverTrigger>
          </Popover>
        </Box>


          </Link>
          <Spacer />
          <Flex
            display={{ base: "none", md: "flex" }}
            ml={10}
            align="center" // Center vertically
            justify="center" // Center horizontally
          >
            <DesktopNav />
          </Flex>

          <Spacer />
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={Link}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            to={"/signup"}
          >
            Login
          </Button>
          <Button
            as={Link}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color="white"
            to={"/signup"}
            colorScheme="green"
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("green", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem, ind) => (
        <Box key={ind}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as={Link}
                p={2}
                to={navItem.to ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>
            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, to, subLabel }) => {
  return (
    <Box
      as={Link}
      to={to}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("green.50", "gray.900") }}
    >
      <Stack
        direction={"row"}
        align={"center"}
        // style={{ alignItems: "center" }}
      >
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "green.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"green.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  const user = useContext(UserContext);
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
      style={{ display: "flex", alignItems: "center" }}
    >
      {/* {NAV_ITEMS.map((navItem, ind) => (
        <MobileNavItem key={ind} {...navItem} />
      ))} */}
      {NAV_ITEMS.map((navItem, ind) => {
        if (navItem.label == "Mentors" && user?.role == "Employee") {
          console.log("hello");
          return null; // Hide "Employers" for users with role "Employee"
        } else {
          return <MobileNavItem key={ind} {...navItem} />;
        }
      })}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, to }) => {
  const { isOpen, onToggle } = useDisclosure();
  const user = useContext(UserContext);

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as={Link}
        to={to ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          // color={''}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child, ind) => (
              <Box as={Link} py={2} to={child.to} key={ind}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Mentors",
    to: "/virtualassistant",
  },
  {
    label: "Resource Library",
    to: "/jobs",
  },
  {
    label: "Upskill",
    to: "/aicourse",
  },

  {
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    label: "Community",
    to: "/community",
  },
  {
    label: "Education",
    to: "/disabilityrightsinfo",
  },
  {
    label: "Feedback",
    to: "/feedback",
  },
];

export default WithSubnavigation;
