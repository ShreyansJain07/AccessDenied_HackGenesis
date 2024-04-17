import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { GrGroup } from "react-icons/gr";



import mentorback from "../assests/ill1.jpeg"
const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

export default function SplitWithImage() {
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
       
          <Heading>Empowering Futures, One Mentorship at a Time</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
          A dynamic platform where students can seamlessly connect with mentors who share their interests and career aspirations. With a diverse pool of mentors, integrated messaging features, and progress tracking tools, our website facilitates meaningful relationships and fosters growth for both students and mentors alike.          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
            <Feature
              icon={<Icon as={FaChalkboardTeacher} color={'yellow.500'} w={5} h={5} />}
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'Personalized mentorship experiences'}
            />
            <Feature
              icon={<Icon as={MdOutlinePersonAddAlt1} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Receive tailored guidance'}
            />
            <Feature
              icon={<Icon as={GrGroup} color={'purple.500'} w={5} h={5} />}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Communication made easy'}
            />
          </Stack>
        </Stack>
        <Flex align={'center'}>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={mentorback}
            objectFit={'cover'}
            height={'min-content'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  )
}