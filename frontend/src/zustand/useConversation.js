import {create} from 'zustand';

const useConversation = create((set)=>({
    selectedConversation: null,
    setselectedConversation: (setselectedConversation) = set({selectedConversation}),
    messages:[],
    setMessages:(messages)=>set({messages}),
}))

export default useConversation;