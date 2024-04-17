import React, { useState } from "react";
import {
  Flex, Avatar, Heading,
  Text, Divider, Stack,
  Box, List, ListItem, ListIcon,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

const EmployeeProfilePage = ({ name, skills }) => {
  // setting useState
  const [experience, setExperience] = useState("second");
  const [education, setEduceducation] = useState("second");
  const [languages, setLanguages] = useState("second");

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      padding="4"
    >

       {/* setting employeee details */}

      <Avatar size="xl" name={name} />
      <Heading mt="4">{name}</Heading>
      <Text fontSize="lg" color="gray.500">
        Front-end Developer
      </Text>
      <Divider my="4" />

      <Stack spacing="4" align="flex-start" width="100%">

        <Box>
          <Text fontWeight="bold">Skills:</Text>
          <Text>{skills}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold">Experience:</Text>
          <Text>{experience}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold">Education:</Text>
          <Text>{education}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold">Languages:</Text>
          <List spacing={2}>
      
            {/* {languages?.map((language) => (
              <ListItem key={language}>
                <ListIcon as={MdCheckCircle} color="green.500" />
                {language}
              </ListItem>))} */}
          </List>
        </Box>
     
      </Stack>
    </Flex>
  );};

export default EmployeeProfilePage;
