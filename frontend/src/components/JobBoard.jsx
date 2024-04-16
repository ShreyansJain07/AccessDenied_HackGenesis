import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  useDisclosure,
  Input,
  Button,
  Text,
  Image,
  Container,
  Spacer,
  useBreakpointValue
} from "@chakra-ui/react";
import { Search2Icon } from '@chakra-ui/icons';


const BookDetails = ({ title, author, coverImage, description, price, delivery, link }) => {
  return (
    <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" display="flex" flexDirection="column">
      <Box>
        <Image src={coverImage} alt={title} />
        <Box p="4">
          <Text fontSize="xl" fontWeight="semibold" mb="2">
            {title}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Source: {author}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Price: {price}+{delivery}
          </Text>
          <Text mt="2">{description}</Text>
        </Box>
      </Box>
      <Spacer />
      <Box pb="4">
        <Button as="a" href={link} colorScheme="green" alignSelf="flex-end"width={"full"} >
          View Details
        </Button>
      </Box>
    </Box>
  );
};


const JobList = ({ jobs }) => {
  console.log("jobs", jobs);
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing="4">
      {jobs?.map((book) => (
        <BookDetails
          key={book.product_id}
          title={book.title}
          author={book.source}
          price={book.price}
          delivery={book.delivery}
          coverImage={book.thumbnail}
          link={book.link}
          description={book.description}
        />
      ))}
    </SimpleGrid>
  );
};

const JobBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filteredJobs, setFilteredJobs] = useState();

  // const query="data scientist"

  const fetchData = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:8000/jobs?query=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
          },
          // You can add a request body if your server expects it
        }
      );

      // Use await to get the actual data from the response
      const responseData = await response.json();
      console.log(responseData);
      const jobDataFromAPI = responseData.shopping_results;
      console.log(jobDataFromAPI);
      // Use jobDataFromAPI in your setDummyJobData function
      setFilteredJobs(jobDataFromAPI);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  const handleFilter = (filter) => {
    const filtered = filtered.filter((job) =>
      job.position.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  const [query, setQuery] = useState("");
  const [responseData, setResponseData] = useState(null);

  const handleSearch = () => {
    fetchData(query);
  };

  // Determine button size based on breakpoint
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });


  return (
    <Container maxW="container.xl">
      <Container maxW="xl">
      <Box p={6} m={4} boxShadow="sm" rounded="lg" display="flex" flexDirection={{ base: 'column', md: 'row' }}>
      <Input
        placeholder="Enter search query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        mb={{ base: 4, md: 0 }}
        mr={{ base: 0, md: 4 }}
      />
      <Button
        colorScheme="green"
        size={buttonSize}
        rightIcon={<Search2Icon />}
        onClick={handleSearch}
        alignSelf={{ base: 'flex-start', md: 'flex-end' }} // Align button to the end on small screens, and start on medium and above screens
      >
        Search
      </Button>
    </Box>
      </Container>
      <JobList jobs={filteredJobs} py={4} />
    </Container>
  );
};

export default JobBoard;
