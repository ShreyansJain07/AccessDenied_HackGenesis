import {  Box, Flex, Heading, Text, Stack, Container, Avatar, useColorModeValue,} from "@chakra-ui/react";



const Testimonial = (props) => {

  const { children } = props;

  return <Box>{children}</Box>;
};

const TestimonialContent = (props) => {

  const { children } = props;

  return (

    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >

      {children}
    </Stack>
  );
};

const TestimonialHeading = (props) => {
  const { children } = props;

  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = (props) => {
  const { children } = props;

  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ src, name, title }) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function WithSpeechBubbles() {
  return (
    <Box bg={useColorModeValue("green.200", "green.700")}>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>

        <Stack spacing={0} align={"center"}>
          <Heading>Our Clients Speak</Heading>

          <Text>We have been working with clients around the world</Text>
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >

          <Testimonial>
            
            {/* all testimonies here */}

            <TestimonialContent>
             
             {/* student testimony */}

              <TestimonialHeading>Awesome Mentors</TestimonialHeading>

              <TestimonialText>
                "I can't express how grateful I am for the mentorship I received
                through this platform. My mentor guided me through tough career
                decisions and provided invaluable insights that helped me
                navigate challenges with confidence. Thanks to their support,
                I've achieved milestones I never thought possible."
              </TestimonialText>

            </TestimonialContent>
            
            <TestimonialAvatar
              src={
                "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              }
              name={"Sarah Johnson"}
              title={"CEO at ABC Corporation"}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>

              <TestimonialHeading>Thank you sooo much!!</TestimonialHeading>
             
              {/* teacher testimony */}
             
              <TestimonialText>

                "Being a mentor here has been amazing. 
                Seeing my mentees develop both professionally and personally has been incredibly fulfilling. 
                The platform's easy-to-use interface and strong support system make 
                mentoring here a breeze and really enjoyable."
              
              </TestimonialText>
            
            </TestimonialContent>
           
            <TestimonialAvatar
              src={
                "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              }
              name={"Mark Chen"}
              
              title={"CEO at L&T Corporation"}
            />
          </Testimonial>
          <Testimonial>
            
            <TestimonialContent>
               {/* student testimonies */}
            
              <TestimonialHeading>Friendly</TestimonialHeading>
            
              <TestimonialText>
                "I was hesitant to seek mentorship at first, but I'm so glad I
                did. My mentor's guidance and encouragement have been
                instrumental in shaping my career trajectory. Their unwavering
                support and actionable advice have empowered me to pursue my
                dreams fearlessly."
              </TestimonialText>
            
            </TestimonialContent>
            
            <TestimonialAvatar
              src={
                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
              }
              name={"Emily Rodriguez"}
              title={"CEO at ABC Corporation"}
            />
          </Testimonial>
        </Stack>

      </Container>
    </Box>
  );
}
