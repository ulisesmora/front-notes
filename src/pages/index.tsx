import Head from 'next/head'
import { Box, Button, Container, Flex, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, Image } from '@chakra-ui/react'
import SignUpForm from '../../components/forms/SignUpForm'
import { useState } from 'react'
import LoginForm from '../../components/forms/LogInForm'

export default function Home() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLogin, setIsLogin] = useState<boolean>(false)

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <main>
        <Container maxW={'7xl'}>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create your account</ModalHeader>
              <Button colorScheme='red' onClick={() => setIsLogin(() => !isLogin)} > {isLogin ? "not is your first time - Login" : "is your first time ? Register in the app"  }  </Button>
              <ModalCloseButton />
              <ModalBody pb={6}>
                {isLogin === false ? 
                  <SignUpForm /> : <LoginForm/>
                }
              </ModalBody>

              <ModalFooter>

                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Stack
            align={'center'}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
            direction={{ base: 'column', md: 'row' }}>
            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                <Text
                  as={'span'}
                  position={'relative'}
                  _after={{
                    content: "''",
                    width: 'full',
                    height: '30%',
                    position: 'absolute',
                    bottom: 1,
                    left: 0,
                    bg: 'red.400',
                    zIndex: -1,
                  }}>
                  Write once,
                </Text>
                <br />
                <Text as={'span'} color={'red.400'}>
                  use everywhere!
                </Text>
              </Heading>
              <Text color={'gray.500'}>
                noty app that lets you create your own
                notes and even sync them in the cloud so
                you can use them anywhere. All that is free!
              </Text>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: 'column', sm: 'row' }}>
                <Button
                  rounded={'full'}
                  size={'lg'}
                  fontWeight={'normal'}
                  px={6}
                  onClick={onOpen}
                  colorScheme={'red'}
                  bg={'red.400'}
                  _hover={{ bg: 'red.500' }}>
                  Get started
                </Button>
              </Stack>
            </Stack>
            <Flex
              flex={1}
              justify={'center'}
              align={'center'}
              position={'relative'}
              w={'full'}>
              <Box
                position={'relative'}
                height={'300px'}
                rounded={'2xl'}
                boxShadow={'2xl'}
                width={'full'}
                overflow={'hidden'}>
                <IconButton
                  aria-label={'Play Button'}
                  variant={'ghost'}
                  _hover={{ bg: 'transparent' }}
                  size={'lg'}
                  color={'white'}
                  position={'absolute'}
                  left={'50%'}
                  top={'50%'}
                  transform={'translateX(-50%) translateY(-50%)'}
                />
                <Image
                  alt={'Hero Image'}
                  fit={'cover'}
                  align={'center'}
                  w={'100%'}
                  h={'100%'}
                  src={
                    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                  }
                />
              </Box>
            </Flex>
          </Stack>
        </Container>
      </main>
    </div>
  )
}
