import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, IconButton, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { CgOptions } from "@react-icons/all-files/cg/CgOptions";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit"
import { FiDelete } from "@react-icons/all-files/fi/FiDelete"
import React, { RefObject, useContext, useEffect } from "react";
import { NoteContext } from "./TableNotes";
import noteApi from "../../api/noteApi";
import NoteForm from "../forms/NoteForm";

interface OptionId {
    id: number
}

export default function OptionButton({ id }: OptionId) {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenModal, 
        onOpen: onOpenModal, 
        onClose: onCloseModal  } = useDisclosure()
    const cancelRef = React.useRef() as  RefObject<HTMLButtonElement>
    const { change, changeData } = useContext(NoteContext)

    
    useEffect(() => {
        onClose()
        onCloseModal()
    }, [change])

    async function RemoveNote() {
        try {
            const response = await noteApi.delete('api/tasks/'+id,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }});
            changeData()
            onClose()
            toast({
                title: 'Note.',
                description: "Note remove successful",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        } catch (error) {
            console.log(error)
            toast({
                title: 'Please Review your title information must be unique.',
                description: "Something in your information is wrong ",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            
        }
    }

    return (
        <>
            <AlertDialog
                leastDestructiveRef={cancelRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Note
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You not reverse this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef } onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => RemoveNote()} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Modal
                isOpen={isOpenModal}
                onClose={onCloseModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit note {id} </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <NoteForm id={id}></NoteForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onCloseModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<CgOptions />}
                    variant='outline'
                />
                <MenuList>
                    <MenuItem onClick={onOpenModal} icon={<FiEdit />} >
                        Edit Note
                    </MenuItem>
                    <MenuItem onClick={onOpen} icon={<FiDelete />}>
                        Remove Note
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}
