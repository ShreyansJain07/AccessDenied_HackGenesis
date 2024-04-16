import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Card,
} from "@chakra-ui/react";
import DataTable from "./DataTable";
export default function UserInvitations() {
  const [noOfInvitations, setNoOfInvitations] = useState(0);
  const [noOfOngoingInvitations, setNoOfOngoingInvitations] = useState(0);
  return (
    <Card m={2} p={2}>
      <Accordion defaultIndex={[0, 1]} allowMultiple>
        <AccordionItem p={2}>
          <Card>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Invitations {noOfInvitations}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}></AccordionPanel>
          </Card>
        </AccordionItem>

        <AccordionItem p={2}>
          <Card>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Ongoing Invitations and Applications
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <DataTable />
            </AccordionPanel>
          </Card>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
