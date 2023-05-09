import { Box, Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import OptionButton from "./OptionButton";
import { createContext, useEffect, useState } from "react";
import noteApi from "../../api/noteApi";
import { TaskResponse, Tasks } from "../../interfaces/TaskResponse";
import SignUpForm from "../forms/SignUpForm";
import NoteForm from "../forms/NoteForm";

interface NotesContext {
    change: boolean;
    changeData: () => void;
}

const defaultState = {
    change: false,
    changeData: () => {}
}

export const NoteContext = createContext<NotesContext>(defaultState);

export default function TableNotes() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [tasks, setTaks] = useState<Tasks[]>([])
    const [change, setChange] = useState<boolean>(defaultState.change)

    useEffect(() => {
        GetMyNotes()
    }, [change])


    const changeData = () => {
        setChange(!change);
    }

    async function GetMyNotes() {
        try {
            const data = await noteApi.get<TaskResponse>('api/tasks/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setTaks(() => data.data.taks)
            onClose()
        } catch (error) {

        }
    }

    return (
        <NoteContext.Provider value={{change, changeData}}>
            <Button onClick={onOpen} colorScheme="red" >Add Note</Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new note</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <NoteForm id={0}></NoteForm>
                    </ModalBody>

                    <ModalFooter>

                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <TableContainer w='80%'>
                <Table w='full' variant='striped' colorScheme='red'>
                    <Thead>
                        <Tr>
                            <Th>Title</Th>
                            <Th>Description</Th>
                            <Th>Options</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tasks.map((task, index) =>
                            <Tr key={index}>
                                <Td>{task.title}</Td>
                                <Td>{task.description}</Td>
                                <Td></Td>
                                <div><OptionButton id={task.id}></OptionButton></div>
                            </Tr>
                        )}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Your Private Notes</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </NoteContext.Provider>
    )
}
