import { Heading, Stack, Text, } from "@chakra-ui/react";
import TableNotes from "../../components/tables/TableNotes";
import Head from "next/head";

export default function Notes() {
    return (
        <div>
             <Head>
                <title>{"Notes"}</title>
                <meta name="author" content="Ulises Mora"></meta>
                <meta
                    name="description"
                    content="Información sobre notas"
                ></meta>
            </Head>
            <Stack
                align={'center'}
                w='100%'
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}>

                <Stack w='100%' flex={1} spacing={{ base: 5, md: 10 }}>
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: '2xl', sm: '2xl', lg: '2xl' }}>
                        <Text
                            marginLeft={'10%'}
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: '30%',
                                bg: 'red.400',
                                marginLeft: '10%'
                            }}>
                            Write once,
                        </Text>
                        <br />
                        <Text
                            marginLeft={'10%'} as={'span'} color={'red.400'}>
                            use everywhere!
                        </Text>
                    </Heading>
                </Stack>

                <TableNotes />

            </Stack>
        </div>
    )
}
