import { Button } from "@/Components/ui/button";

const Contact = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // For example, send an email or store the form data
    console.log("Form submitted!");
  };

  return (
    <div className="flex flex-col items-center h-screen mt-16">
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <form onSubmit={handleFormSubmit} className="w-1/2">
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block font-medium">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <Button type="submit" className=" w-full text-lg">
          Send
        </Button>
      </form>
    </div>
  );
};

export default Contact;
