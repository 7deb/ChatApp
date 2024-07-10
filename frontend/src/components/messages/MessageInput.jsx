import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    <form className="px-4 my-3 relative flex">
      <input
        type="text"
        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
        placeholder="Send a message"
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
      >
        <BsSend />
      </button>
    </form>
  );
};

export default MessageInput;
